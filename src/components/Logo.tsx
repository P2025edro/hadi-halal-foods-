import Link from "next/link";
import { site } from "@/config/site";
import { Lockup } from "./brand/Wordmark";
import { cx } from "./ui";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cx("inline-flex shrink-0 items-center py-1", className)} aria-label={`${site.legalName}, home`}>
      <Lockup tone={tone} />
    </Link>
  );
}
