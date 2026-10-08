import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

/* ----------------------------- Validation ----------------------------- */

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .max(254, "Email address is too long.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .regex(/^[+()\d\s-]*$/, "Please use digits, spaces, +, - or brackets only.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (at least 10 characters).")
    .max(2000, "Message must be 2,000 characters or fewer."),
  consent: z.literal("yes", { errorMap: () => ({ message: "Please confirm you have read the privacy notice." }) }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactStatus =
  | "success"
  | "invalid"
  | "rejected"
  | "too_fast"
  | "expired"
  | "rate_limited"
  | "not_configured"
  | "error";

export const statusMessages: Record<ContactStatus, string> = {
  success: "Thank you! Your message has been sent. We’ll reply by email as soon as we can.",
  invalid: "Please check the highlighted fields and try again.",
  rejected: "Your message could not be sent. Please try again.",
  too_fast: "That was quick! Please take a moment to check your message, then send it again.",
  expired: "This form has expired. Please refresh the page and try again.",
  rate_limited: "You’ve sent several messages in a short time. Please wait a few minutes and try again.",
  not_configured:
    "Our online contact form isn’t connected yet, so your message was NOT sent. Please contact us in store in the meantime.",
  error: "Sorry, something went wrong and your message was NOT sent. Please try again later.",
};

/* --------------------------- Timing token ----------------------------- */

const MIN_FILL_MS = 3_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

// Prefer a dedicated secret; fall back to the (also secret) Resend key so
// tokens can't be forged in production. The constant is for local dev only.
function secret() {
  return process.env.CONTACT_FORM_SECRET || process.env.RESEND_API_KEY || "local-dev-only-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

/** Token issued when the form is rendered: "<timestamp>.<hmac>". */
export function issueFormToken(now = Date.now()) {
  const ts = String(now);
  return `${ts}.${sign(ts)}`;
}

export function checkFormToken(token: unknown, now = Date.now()): "ok" | "too_fast" | "expired" | "rejected" {
  if (typeof token !== "string" || !token.includes(".")) return "rejected";
  const [ts, mac] = token.split(".");
  if (!ts || !mac || !/^\d{12,14}$/.test(ts)) return "rejected";
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "rejected";
  const age = now - Number(ts);
  if (age < MIN_FILL_MS) return "too_fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

/* -------------------------- Rate limiting ----------------------------- */
// Best-effort, per server instance. For stronger protection add a shared
// store (e.g. Upstash Redis) or Vercel Firewall rate limiting.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return true;
}

/* ------------------------------ Delivery ------------------------------ */

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  return apiKey && to && from ? { apiKey, to, from } : null;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendContactEmail(input: ContactInput): Promise<"success" | "not_configured" | "error"> {
  const config = emailConfig();
  if (!config) return "not_configured";

  const text = [
    "New message from the website contact form",
    "",
    `Name: ${oneLine(input.name)}`,
    `Email: ${oneLine(input.email)}`,
    `Phone: ${input.phone ? oneLine(input.phone) : "(not provided)"}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: config.to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: oneLine(input.email),
        subject: `Website enquiry from ${oneLine(input.name).slice(0, 80)}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[contact] Email provider responded with", res.status);
      return "error";
    }
    return "success";
  } catch (err) {
    console.error("[contact] Email delivery failed", err instanceof Error ? err.message : err);
    return "error";
  }
}

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
