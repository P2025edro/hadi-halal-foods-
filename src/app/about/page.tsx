import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { ButtonLink, Container, TextLink } from "@/components/ui";
import { categories } from "@/config/categories";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.legalName}, a neighbourhood grocery for fresh produce, halal food, Asian groceries and everyday essentials.`,
  alternates: { canonical: "/about" },
};

const offer = [
  { title: "Fresh produce", text: "Fruit and vegetables for everyday cooking, with seasonal arrivals through the year." },
  { title: "Halal groceries", text: "Halal food at the centre of the shop, for weeknight dinners and family meals." },
  { title: "Asian food products", text: "Rice, flour, lentils, spices and sauces for cooking the dishes you know." },
  { title: "Dairy", text: "Milk, yoghurt, butter and cheese from the chiller." },
  { title: "Everyday essentials", text: "Household basics, newspapers, confectionery and phone top-ups." },
  { title: "Close to home", text: "A neighbourhood shop for a quick stop or a bigger shop." },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro: statement on the left, tall photograph on the right */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pt-10">
            <p className="kicker mb-4">About us</p>
            <h1 className="max-w-[16ch] text-display">
              A neighbourhood grocery for everyday life
            </h1>
            <div className="mt-8 max-w-[34rem] space-y-5 text-lead text-muted">
              <p>
                {site.legalName} is a local grocery shop. We bring together fresh produce, halal food, Asian groceries and
                the everyday essentials a household needs, so most of the weekly shop can be done in one stop.
              </p>
              <p>
                It’s a shop for quick visits and bigger baskets alike. If you’re looking for something in particular,
                just ask.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Photo name="aboutTall" priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] lg:aspect-[4/5]" />
          </div>
        </Container>
      </section>

      {/* What you'll find: a two-column list rather than icon cards */}
      <section aria-labelledby="offer-title" className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="offer-title" className="text-title">
              What you’ll find
            </h2>
            <p className="mt-4 max-w-sm text-muted">The shop is organised into {categories.length} sections.</p>
            <TextLink href="/categories" className="mt-3 inline-block text-turquoise-ink">
              Browse the categories
            </TextLink>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {offer.map((o) => (
              <div key={o.title} className="border-t border-line py-6">
                <dt className="font-display text-[1.3rem] text-teal [font-variation-settings:'SOFT'_50,'opsz'_72]">{o.title}</dt>
                <dd className="mt-2 text-muted">{o.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Photo strip */}
      <section aria-label="Around the shelves" className="pb-16 lg:pb-24">
        <Container className="grid gap-4 sm:grid-cols-3">
          <Photo name="aboutStrip1" sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] sm:aspect-[3/4]" />
          <Photo name="aboutStrip2" sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] sm:mt-12 sm:aspect-[3/4]" />
          <Photo name="aboutStrip3" sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] sm:aspect-[3/4]" />
        </Container>
      </section>

      <section className="bg-stone py-14">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-[1.5rem] leading-snug text-teal [font-variation-settings:'SOFT'_50,'opsz'_72]">
            Questions about the shop, or looking for a product? Get in touch.
          </p>
          <ButtonLink href="/contact" variant="quiet">
            Contact us
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
