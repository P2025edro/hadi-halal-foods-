import { cx } from "../ui";
import { WORDMARK_LETTERS, WORDMARK_TITTLE, WORDMARK_VIEWBOX } from "./wordmark-paths";

/** The "Hadi" wordmark on its own. Letters inherit `currentColor`; the tittle is always orange. */
export function Wordmark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={cx("block h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" d={WORDMARK_LETTERS} />
      <path fill="#F47735" d={WORDMARK_TITTLE} />
    </svg>
  );
}

/**
 * Full lockup: wordmark, a turquoise rule, and the descriptor.
 * `tone="light"` is for warm-white backgrounds, `tone="dark"` for deep teal.
 */
export function Lockup({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Wordmark className={cx(compact ? "w-[64px]" : "w-[74px]", tone === "light" ? "text-teal" : "text-paper")} />
      <span aria-hidden="true" className="h-7 w-px bg-turquoise" />
      <span
        className={cx(
          "text-[0.78rem] font-medium leading-[1.15] tracking-[0.01em]",
          tone === "light" ? "text-turquoise-ink" : "text-[#9fe0e6]",
        )}
      >
        Halal Foods
        <br />
        Grocery
      </span>
    </span>
  );
}
