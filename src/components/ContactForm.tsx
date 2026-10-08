"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { buttonClasses, cx } from "./ui";

type Field = "name" | "email" | "phone" | "message" | "consent";
type FieldErrors = Partial<Record<Field, string>>;
type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; fieldErrors?: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: Record<string, string>): FieldErrors {
  const e: FieldErrors = {};
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const phone = (data.phone ?? "").trim();
  if (name.length < 2) e.name = "Please enter your name.";
  else if (name.length > 80) e.name = "Name must be 80 characters or fewer.";
  if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";
  if (phone && !/^[+()\d\s-]{0,30}$/.test(phone)) e.phone = "Please use digits, spaces, +, - or brackets only.";
  if (message.length < 10) e.message = "Please write a little more (at least 10 characters).";
  else if (message.length > 2000) e.message = "Message must be 2,000 characters or fewer.";
  if (data.consent !== "yes") e.consent = "Please confirm you have read the privacy notice.";
  return e;
}

export function ContactForm({ token, initialStatus }: { token: string; initialStatus?: { ok: boolean; message: string } }) {
  const [state, setState] = useState<State>(
    initialStatus
      ? initialStatus.ok
        ? { kind: "success", message: initialStatus.message }
        : { kind: "error", message: initialStatus.message }
      : { kind: "idle" },
  );
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const fieldErrors = state.kind === "error" ? (state.fieldErrors ?? {}) : {};

  const focusFirstError = (errs: FieldErrors) => {
    const first = (["name", "email", "phone", "message", "consent"] as Field[]).find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, typeof v === "string" ? v : ""]),
    ) as Record<string, string>;

    const errs = validate(data);
    if (Object.keys(errs).length) {
      setState({ kind: "error", message: "Please check the highlighted fields and try again.", fieldErrors: errs });
      focusFirstError(errs);
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as
        | { status?: string; message?: string; fieldErrors?: FieldErrors }
        | null;
      if (res.ok && json?.status === "success") {
        setState({ kind: "success", message: json.message ?? "Thank you! Your message has been sent." });
        form.reset();
        setMessageLength(0);
      } else {
        const fe = json?.fieldErrors;
        setState({
          kind: "error",
          message: json?.message ?? "Sorry, something went wrong and your message was NOT sent. Please try again later.",
          fieldErrors: fe,
        });
        if (fe) focusFirstError(fe);
      }
    } catch {
      setState({
        kind: "error",
        message: "We couldn’t reach the server, so your message was NOT sent. Please check your connection and try again.",
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const inputCls = (invalid: boolean) =>
    cx(
      "block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70",
      "transition-[border-color,box-shadow] duration-200 outline-none",
      "focus:border-brand-600 focus:ring-4 focus:ring-brand-500/20",
      invalid ? "border-red-600 focus:border-red-600 focus:ring-red-500/20" : "border-line hover:border-brand-200",
    );

  const err = (f: Field) =>
    fieldErrors[f] ? (
      <p id={`${uid}-${f}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
        <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
        {fieldErrors[f]}
      </p>
    ) : null;

  const described = (f: Field, extra?: string) =>
    [fieldErrors[f] ? `${uid}-${f}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      id="contact-form"
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="space-y-6"
      aria-describedby={`${uid}-required`}
    >
      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.kind === "error" ? "alert" : "status"}
        aria-live="polite"
        className="outline-none"
      >
        {state.kind === "success" && (
          <div className="flex gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}
        {state.kind === "error" && (
          <div className="flex gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}
      </div>

      <p id={`${uid}-required`} className="text-sm text-muted">
        Fields marked <span aria-hidden="true" className="font-semibold text-accent-700">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <input type="hidden" name="token" value={token} />
      {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block font-semibold text-ink">
            Name <span aria-hidden="true" className="text-accent-700">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={described("name")}
            className={inputCls(Boolean(fieldErrors.name))}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block font-semibold text-ink">
            Email <span aria-hidden="true" className="text-accent-700">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={described("email")}
            className={inputCls(Boolean(fieldErrors.email))}
          />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className="mb-2 block font-semibold text-ink">
          Phone <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={30}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={described("phone")}
          className={inputCls(Boolean(fieldErrors.phone))}
        />
        {err("phone")}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-2 block font-semibold text-ink">
          Message <span aria-hidden="true" className="text-accent-700">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          maxLength={2000}
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={described("message", `${uid}-count`)}
          className={cx(inputCls(Boolean(fieldErrors.message)), "resize-y")}
        />
        <div className="flex items-start justify-between gap-4">
          {err("message") ?? <span />}
          <p id={`${uid}-count`} className="mt-2 shrink-0 text-sm tabular-nums text-muted">
            {messageLength}/2000
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-3">
          <input
            id={`${uid}-consent`}
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-invalid={Boolean(fieldErrors.consent)}
            aria-describedby={described("consent")}
            className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-brand-700"
          />
          <label htmlFor={`${uid}-consent`} className="cursor-pointer text-muted">
            I understand my details will be used to reply to my message, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900">
              privacy notice
            </Link>
            . <span aria-hidden="true" className="text-accent-700">*</span>
          </label>
        </div>
        {err("consent")}
      </div>

      <button
        type="submit"
        disabled={state.kind === "sending"}
        aria-disabled={state.kind === "sending"}
        className={buttonClasses("primary", "w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto")}
      >
        {state.kind === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
