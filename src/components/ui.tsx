import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Variant = "primary" | "outline-light" | "outline-dark" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-ink hover:bg-accent-400 active:bg-accent-600 shadow-[0_8px_20px_-8px_rgb(244_119_53/0.65)]",
  "outline-light": "border border-white/35 text-white hover:bg-white/10 hover:border-white/60",
  "outline-dark": "border border-ink/20 text-ink hover:border-brand-700 hover:text-brand-700 bg-white",
  "ghost-dark": "text-brand-700 hover:text-brand-900 px-0!",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cx(
    "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[0.95rem] font-semibold",
    "transition-[background-color,border-color,color,scale] duration-200 ease-out active:scale-[0.98]",
    variants[variant],
    className,
  );
}

export function ButtonLink({
  variant = "primary",
  arrow,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link {...props} className={buttonClasses(variant, cx("group", className))}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={cx(
        "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-accent-700" : "text-accent-300",
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  tone = "dark",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cx(
            "text-3xl font-extrabold leading-[1.1] sm:text-4xl",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={cx("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-muted" : "text-white/80")}>
            {intro}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-accent-500/10 blur-3xl" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
