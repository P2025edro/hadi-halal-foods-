import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/config/categories";
import { CategoryArt } from "./art/CategoryArt";
import { cx } from "./ui";

const tints = ["bg-brand-50", "bg-accent-50", "bg-[#eef6e8]", "bg-sand"];

export function CategoryCard({
  category,
  index = 0,
  headingLevel = "h3",
  showSummary = false,
}: {
  category: Category;
  index?: number;
  headingLevel?: "h2" | "h3";
  showSummary?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <div data-reveal className="h-full" style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}>
    <Link
      href={`/categories/${category.slug}`}
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white",
        "shadow-[var(--shadow-card)] transition-[translate,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]",
      )}
    >
      <div className={cx("relative m-2 overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)]", tints[index % tints.length])}>
        <CategoryArt
          art={category.art}
          className="aspect-[4/3] w-full transition-[scale] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-sm transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-ink"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2 sm:px-5 sm:pb-5 sm:pt-3">
        <Heading className="text-base font-bold leading-snug text-ink sm:text-lg">{category.name}</Heading>
        <p className="mt-1 text-sm text-muted">{showSummary ? category.summary : category.tagline}</p>
      </div>
    </Link>
    </div>
  );
}
