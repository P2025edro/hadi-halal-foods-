import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
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
      <PageHeader
        eyebrow="Categories"
        title="Shop by category"
        intro="Here’s what you’ll find around the shop. Ranges change with the seasons, so pop in or ask us about anything specific."
      />
      <section className="py-16 sm:py-20" aria-label="All categories">
        <Container>
          <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <CategoryCard category={c} index={i} headingLevel="h2" showSummary />
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl text-lg text-muted">
              Can’t see what you’re after? Get in touch and we’ll let you know if we have it.
            </p>
            <ButtonLink href="/contact" arrow>
              Ask us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
