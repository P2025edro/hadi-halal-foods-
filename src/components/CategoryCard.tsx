import Link from "next/link";
import type { Category } from "@/config/categories";
import { Photo } from "./Photo";
import { cx } from "./ui";

/**
 * Photo-led category link. The whole tile is the link; the photo carries it,
 * with the name set underneath rather than inside a card.
 */
export function CategoryCard({
  category,
  headingLevel = "h3",
  layout = "portrait",
  sizes,
  showSummary = false,
}: {
  category: Category;
  headingLevel?: "h2" | "h3";
  layout?: "portrait" | "landscape";
  sizes: string;
  showSummary?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <Link href={`/categories/${category.slug}`} className="group block focus-visible:outline-offset-4">
      <Photo
        name={category.photo}
        sizes={sizes}
        className={cx(layout === "portrait" ? "aspect-[4/5]" : "aspect-[3/2]")}
        imgClassName="transition-[scale] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.035]"
      />
      <Heading
        className={cx(
          "mt-4 text-teal decoration-orange decoration-2 underline-offset-[6px] group-hover:underline",
          layout === "portrait" ? "text-[1.3rem] leading-tight" : "text-heading leading-tight",
        )}
      >
        {category.name}
      </Heading>
      <p className={cx("mt-1.5 text-muted", layout === "portrait" ? "text-[0.95rem]" : "max-w-md")}>
        {showSummary ? category.summary : category.tagline}
      </p>
    </Link>
  );
}
