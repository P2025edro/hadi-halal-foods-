import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, ChevronRight, MessageCircle } from "lucide-react";
import { CategoryArt } from "@/components/art/CategoryArt";
import { CategoryCard } from "@/components/CategoryCard";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { categories, getCategory } from "@/config/categories";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.summary} At ${site.legalName}.`,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const index = categories.findIndex((c) => c.slug === category.slug);
  const related = [1, 2, 3].map((n) => categories[(index + n) % categories.length]!).filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-500/20 blur-3xl" />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
                <li>
                  <Link href="/" className="rounded hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" />
                </li>
                <li>
                  <Link href="/categories" className="rounded hover:text-white">
                    Categories
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" />
                </li>
                <li aria-current="page" className="font-medium text-white">
                  {category.name}
                </li>
              </ol>
            </nav>
            <Eyebrow tone="light">{category.tagline}</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{category.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{category.summary}</p>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[2rem] bg-cream p-4 shadow-[var(--shadow-lift)]">
            <CategoryArt art={category.art} className="h-auto w-full" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">About this section</h2>
            {category.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside aria-labelledby="look-for" className="h-fit rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-8">
            <h2 id="look-for" className="text-xl font-bold">
              What to look for
            </h2>
            <ul className="mt-5 space-y-3">
              {category.lookFor.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
              Availability changes, so please check in store or ask us about specific items.
            </p>
            <ButtonLink href="/contact" variant="outline-dark" className="mt-5 w-full">
              <MessageCircle aria-hidden="true" className="size-4" />
              Ask about an item
            </ButtonLink>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="related-title" className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-extrabold sm:text-3xl">
              More around the shop
            </h2>
            <ButtonLink href="/categories" variant="ghost-dark" arrow>
              All categories
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => (
              <li key={c.slug}>
                <CategoryCard category={c} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
