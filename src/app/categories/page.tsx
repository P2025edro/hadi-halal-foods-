import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { Container, TextLink } from "@/components/ui";
import { categories } from "@/config/categories";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse the sections at ${site.legalName}: fruit, vegetables, halal food, Asian groceries, dairy, confectionery, newspapers, essentials and top-ups.`,
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      {/* Compact title row with an index of sections */}
      <section className="border-b border-line pb-10 pt-12 lg:pb-12 lg:pt-16">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <h1 className="text-display">Categories</h1>
            <p className="mt-5 max-w-md text-lead text-muted">
              What you’ll find around the shop. Ranges change with the seasons, so ask us about anything specific.
            </p>
          </div>
          <nav aria-label="Jump to a category" className="lg:col-span-5 lg:col-start-8">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[0.975rem]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <a href={`#${c.slug}`} className="text-teal/80 hover:text-teal hover:underline hover:decoration-orange hover:underline-offset-4">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <section aria-label="All categories" className="py-14 lg:py-20">
        <Container>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:gap-y-20">
            {categories.map((c) => (
              <li key={c.slug} id={c.slug}>
                <CategoryCard category={c} headingLevel="h2" layout="landscape" showSummary sizes="(min-width: 1280px) 600px, (min-width: 640px) 48vw, 100vw" />
              </li>
            ))}
          </ul>
          <p className="mt-20 max-w-xl border-t border-line pt-8 text-muted">
            Can’t see what you’re after?{" "}
            <TextLink href="/contact" className="text-turquoise-ink">
              Send us a message
            </TextLink>{" "}
            and we’ll let you know if we have it.
          </p>
        </Container>
      </section>
    </>
  );
}
