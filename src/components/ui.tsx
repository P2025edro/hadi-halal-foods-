import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

type Variant = "primary" | "quiet" | "on-dark";

const variants: Record<Variant, string> = {
  // The one orange action per view.
  primary: "bg-orange text-ink hover:bg-[#f68a50] active:bg-[#e8692a]",
  // Secondary actions on light backgrounds.
  quiet: "border border-teal/25 text-teal hover:border-teal hover:bg-teal hover:text-paper",
  // Secondary actions on deep teal.
  "on-dark": "border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-teal",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cx(
    "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] px-6 text-[0.975rem] font-semibold",
    "transition-[background-color,border-color,color] duration-200 ease-out",
    variants[variant],
    className,
  );
}

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={buttonClasses(variant, className)} />;
}

/** Inline text link with a quiet underline that firms up on hover. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={cx("text-link font-semibold", className)} />;
}

/** Page title block used by internal pages. Each page composes it differently. */
export function PageTitle({ kicker, title, children, className }: { kicker?: string; title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h1 className="text-display">{title}</h1>
      {children}
    </div>
  );
}
