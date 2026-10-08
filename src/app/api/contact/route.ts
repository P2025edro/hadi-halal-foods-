import { NextResponse, type NextRequest } from "next/server";
import {
  checkFormToken,
  contactSchema,
  rateLimit,
  sendContactEmail,
  statusMessages,
  toFieldErrors,
  type ContactStatus,
  type FieldErrors,
} from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const httpStatus: Record<ContactStatus, number> = {
  success: 200,
  invalid: 400,
  rejected: 400,
  too_fast: 400,
  expired: 400,
  rate_limited: 429,
  not_configured: 503,
  error: 502,
};

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");

  const respond = (status: ContactStatus, fieldErrors?: FieldErrors) => {
    if (wantsJson) {
      return NextResponse.json(
        { status, message: statusMessages[status], ...(fieldErrors ? { fieldErrors } : {}) },
        { status: httpStatus[status], headers: { "Cache-Control": "no-store" } },
      );
    }
    // No-JS fallback: redirect back to the contact page with a status flag.
    const url = new URL(`/contact?status=${status}#contact-form`, req.url);
    return NextResponse.redirect(url, 303);
  };

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return respond("rejected");

  let raw: Record<string, unknown>;
  try {
    if (wantsJson) {
      const body = await req.json();
      raw = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      raw = Object.fromEntries((await req.formData()).entries());
    } else {
      return respond("rejected");
    }
  } catch {
    return respond("rejected");
  }

  // 1. Honeypot: real visitors never see or fill this field.
  if (typeof raw.website === "string" && raw.website.trim() !== "") return respond("rejected");

  // 2. Signed timing token: blocks instant bot submissions and replayed old forms.
  const token = checkFormToken(raw.token);
  if (token !== "ok") return respond(token);

  // 3. Validate fields.
  const parsed = contactSchema.safeParse({
    name: raw.name,
    email: raw.email,
    phone: raw.phone ?? "",
    message: raw.message,
    consent: raw.consent,
  });
  if (!parsed.success) return respond("invalid", toFieldErrors(parsed.error));

  // 4. Rate limit per client IP (best effort).
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) return respond("rate_limited");

  // 5. Deliver. Status reflects what actually happened.
  const result = await sendContactEmail(parsed.data);
  return respond(result);
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
