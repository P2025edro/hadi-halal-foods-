import Link from "next/link";
import { site } from "@/config/site";
import { cx } from "./ui";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="12" fill="#02a9ba" />
      <path d="M12 10v20M28 10v20M12 20h16" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M26 6c3-1 6 0 7 3-3 1-6 0-7-3Z" fill="#f47735" />
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href="/"
      className={cx("group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label={`${site.legalName} home`}
    >
      <LogoMark className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-display text-xl font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {site.wordmark.primary}
        </span>
        <span
          className={cx(
            "mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em]",
            tone === "light" ? "text-brand-200" : "text-brand-700",
          )}
        >
          {site.wordmark.secondary}
        </span>
      </span>
    </Link>
  );
}
