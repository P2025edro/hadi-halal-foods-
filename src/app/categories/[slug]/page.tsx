import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { Photo } from "@/components/Photo";
import { Container, TextLink } from "@/components/ui";
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
  const related = [1, 2, 3, 4].map((n) => categories[(index + n) % categories.length]!);

  return (
    <>
      {/* Photograph left, title and summary right */}
      <section className="grid lg:grid-cols-12">
        <Photo name={category.photo} priority sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[540px]" />
        <div className="flex flex-col justify-end px-4 pb-12 pt-8 sm:px-6 lg:col-span-5 lg:pb-16 lg:pl-14 lg:pr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.9rem] text-muted">
              <li>
                <Link href="/" className="hover:text-teal hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/categories" className="hover:text-teal hover:underline">
                  Categories
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-teal">
                {category.name}
              </li>
            </ol>
          </nav>
          <h1 className="text-display">{category.name}</h1>
          <p className="mt-5 max-w-md text-lead text-muted">{category.summary}</p>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="max-w-[36rem] space-y-5 text-lead lg:col-span-7">
            {category.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-2 text-base text-muted">
              Availability changes, so please check in store, or{" "}
              <TextLink href="/contact" className="text-turquoise-ink">
                ask us about an item
              </TextLink>
              .
            </p>
          </div>
          <aside aria-labelledby="look-for" className="lg:col-span-4 lg:col-start-9">
            <h2 id="look-for" className="text-heading">
              What to look for
            </h2>
            <ul className="mt-5 border-b border-line">
              {category.lookFor.map((item) => (
                <li key={item} className="border-t border-line py-3.5 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="related-title" className="bg-stone py-14 lg:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="text-title">
              More around the shop
            </h2>
            <TextLink href="/categories" className="text-turquoise-ink">
              All categories
            </TextLink>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((c) => (
              <li key={c.slug}>
                <CategoryCard category={c} sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 46vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
