import type { Metadata } from "next";
import { HandHeart, ShoppingBasket, Store, Apple } from "lucide-react";
import { EditorialArt } from "@/components/art/CategoryArt";
import { ButtonLink, Container, PageHeader, SectionHeading } from "@/components/ui";
import { categories } from "@/config/categories";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.legalName}, a neighbourhood grocery for fresh produce, halal food, Asian groceries and everyday essentials.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Apple, title: "Fresh food", text: "Fruit and vegetables for everyday home cooking." },
  { icon: HandHeart, title: "Halal choices", text: "A halal food selection at the heart of the shop." },
  { icon: ShoppingBasket, title: "Everyday essentials", text: "Dairy, pantry staples, treats and household basics." },
  { icon: Store, title: "Local and convenient", text: "A neighbourhood shop for quick stops and bigger shops." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A neighbourhood grocery for everyday life"
        intro={`${site.legalName} is a local grocery shop bringing together fresh produce, halal food, Asian groceries and the everyday essentials your household needs.`}
      />

      <section className="py-20 sm:py-24" aria-labelledby="about-what">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <SectionHeading id="about-what" eyebrow="What we do" title="One stop for the everyday shop" />
            <div className="-mt-4 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                We keep things simple: a friendly local shop where you can pick up fresh fruit and vegetables, halal
                food, spices and Asian pantry staples alongside dairy, everyday basics and a treat or two.
              </p>
              <p>
                Our shelves cover {categories.length} main sections, from{" "}
                {categories
                  .slice(0, 3)
                  .map((c) => c.name.toLowerCase())
                  .join(", ")}{" "}
                through to newspapers, essentials and phone top-ups. If you are looking for something in particular,
                just ask.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/categories" arrow>
                Explore Categories
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-dark">
                Get in touch
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
            <EditorialArt className="aspect-[5/4] h-auto w-full" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24" aria-labelledby="about-values">
        <Container>
          <SectionHeading id="about-values" eyebrow="What you’ll find" title="What matters to us" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="rounded-[var(--radius-card)] border border-line bg-cream p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
