import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Apple, Clock, HandHeart, MapPin, ShoppingBasket, Sparkles, Store } from "lucide-react";
import { CategoryArt, EditorialArt, HeroArt } from "@/components/art/CategoryArt";
import { CategoryCard } from "@/components/CategoryCard";
import { ButtonLink, Container, Eyebrow, SectionHeading, cx } from "@/components/ui";
import { categories, type ArtKey } from "@/config/categories";
import { shopPhotos } from "@/config/photos";
import { hasVisitDetails, site } from "@/config/site";

const features = [
  { icon: Apple, title: "Fresh Produce", text: "Fruit and vegetables for everyday cooking" },
  { icon: HandHeart, title: "Halal Selection", text: "Halal food for family meals" },
  { icon: ShoppingBasket, title: "Everyday Essentials", text: "The basics, all in one stop" },
  { icon: Store, title: "Local Convenience", text: "Your grocery, close to home" },
];

const highlights = [
  { title: "Fresh, everyday food", text: "Fruit, vegetables and chilled basics for the meals you cook every week." },
  { title: "Flavours you know", text: "Halal food, spices and Asian pantry staples alongside the everyday shop." },
  { title: "Quick, friendly stops", text: "Pop in for one thing or a full basket. Ask us if you can’t find something." },
];

type Showcase = { title: string; text: string; art: ArtKey; href: string; tint: string; big?: boolean };

const showcase: Showcase[] = [
  { title: "From the produce stand", text: "Colourful fruit and vegetables for the week ahead.", art: "vegetables", href: "/categories/vegetables", tint: "bg-[#eef6e8]", big: true },
  { title: "Pantry & spice shelf", text: "Rice, lentils, spices and sauces.", art: "asian", href: "/categories/asian-groceries", tint: "bg-accent-50" },
  { title: "From the chiller", text: "Milk, yoghurt, butter and cheese.", art: "dairy", href: "/categories/dairy", tint: "bg-brand-50" },
  { title: "Little treats", text: "Chocolate, sweets and biscuits.", art: "confectionery", href: "/categories/confectionery", tint: "bg-sand" },
  { title: "Daily bits & pieces", text: "Newspapers and household basics.", art: "newspapers", href: "/categories/newspapers-and-essentials", tint: "bg-brand-50" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 size-[28rem] rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute -right-20 bottom-0 size-[30rem] rounded-full bg-brand-400/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        </div>

        <Container className="relative grid items-center gap-8 pb-10 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-14 lg:pt-20">
          <div className="max-w-xl">
            <Eyebrow tone="light">Your neighbourhood grocery</Eyebrow>
            <h1 id="hero-title" className="text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              Fresh Choices <span className="block text-brand-300">for Every Home</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
              Fresh fruit and vegetables, halal food, Asian groceries, dairy and everyday essentials, all under one
              roof at {site.legalName}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/categories" arrow>
                Explore Categories
              </ButtonLink>
              <ButtonLink href="/contact#visit" variant="outline-light">
                <MapPin aria-hidden="true" className="size-4" />
                Find Our Store
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <HeroArt className="animate-float-soft h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" />
          </div>
        </Container>

        {/* Feature strip */}
        <Container className="relative pb-10 lg:pb-14">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4 bg-brand-950/60 p-5 backdrop-blur-sm">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-200 ring-1 ring-inset ring-brand-400/30">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <span>
                  <span className="block font-display font-bold text-white">{title}</span>
                  <span className="block text-sm text-white/70">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SHOP BY CATEGORY */}
      <section aria-labelledby="categories-title" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="categories-title"
            eyebrow="Shop by category"
            title="Everything for the weekly shop"
            intro="Browse the sections you’ll find in store, from fresh produce to the everyday bits and pieces."
            action={
              <ButtonLink href="/categories" variant="ghost-dark" arrow className="self-start md:self-auto">
                View all categories
              </ButtonLink>
            }
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <CategoryCard category={c} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* EDITORIAL */}
      <section aria-labelledby="editorial-title" className="pb-20 sm:pb-24">
        <Container>
          <div
            data-reveal
            className="relative grid overflow-hidden rounded-[2rem] bg-brand-900 text-white lg:grid-cols-[1fr_1.05fr]"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative p-8 sm:p-12 lg:p-14">
              <Eyebrow tone="light">Made for everyday life</Eyebrow>
              <h2 id="editorial-title" className="text-3xl font-extrabold leading-[1.1] sm:text-4xl">
                Your Neighbourhood Grocery, Made for Everyday Life
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                A local shop that keeps the everyday simple: fresh food, familiar flavours and the essentials you need,
                close to home.
              </p>
              <ul className="mt-8 space-y-5">
                {highlights.map((h, i) => (
                  <li key={h.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-sm font-extrabold text-ink">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-bold">{h.title}</span>
                      <span className="mt-1 block text-white/75">{h.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/about" variant="outline-light" arrow className="mt-10">
                About the shop
              </ButtonLink>
            </div>
            <div className="relative flex min-h-72 items-center bg-sand lg:min-h-full">
              <EditorialArt className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* DISCOVER WHAT'S IN STORE */}
      <section aria-labelledby="discover-title" className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="discover-title"
            eyebrow="In the aisles"
            title="Discover What’s In Store"
            intro="A look around the shop. Ranges change with the seasons, so pop in or ask us about anything in particular."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {showcase.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                className={cx(s.big && "sm:col-span-2 lg:row-span-2")}
              >
                <Link
                  href={s.href}
                  className={cx(
                    "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-6 transition-[box-shadow] duration-300 hover:shadow-[var(--shadow-lift)]",
                    s.tint,
                  )}
                >
                  <span className={cx("block", s.big ? "font-display text-2xl font-extrabold sm:text-3xl" : "font-display text-lg font-bold")}>
                    {s.title}
                  </span>
                  <span className="mt-1 block text-muted">{s.text}</span>
                  <CategoryArt
                    art={s.art}
                    className={cx(
                      "mt-auto w-full transition-[scale] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]",
                      s.big ? "pt-6" : "pt-2",
                    )}
                  />
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Explore
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* GENUINE SHOP PHOTOS (shown only when approved current photos exist) */}
      {shopPhotos.length > 0 && (
        <section aria-labelledby="shop-photos-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              id="shop-photos-title"
              eyebrow="Inside the shop"
              title="Take a look around"
              action={
                <ButtonLink href="/gallery" variant="ghost-dark" arrow>
                  View gallery
                </ButtonLink>
              }
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shopPhotos.slice(0, 3).map((p) => (
                <li key={p.src} data-reveal className="overflow-hidden rounded-[var(--radius-card)] bg-sand">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* CONTACT / LOCATION CTA */}
      <section aria-labelledby="visit-cta-title" className="py-20 sm:py-24">
        <Container>
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] bg-accent-500 px-6 py-12 text-ink sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-16"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-white/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-40 size-56 rounded-full bg-accent-600/40" />
            <div className="relative max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
                <Sparkles aria-hidden="true" className="size-4" />
                Come and see us
              </p>
              <h2 id="visit-cta-title" className="text-3xl font-extrabold leading-[1.1] sm:text-4xl">
                Pop in for your next shop
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/85">
                {hasVisitDetails
                  ? "Find our address and details below, or send us a message with any questions."
                  : "Have a question about the shop or looking for something specific? Send us a message and we’ll get back to you."}
              </p>
              {site.contact.openingHours && (
                <p className="mt-4 inline-flex items-center gap-2 font-semibold">
                  <Clock aria-hidden="true" className="size-5" />
                  See opening hours on our contact page
                </p>
              )}
            </div>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <Link
                href="/contact#visit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition-[background-color,scale] duration-200 hover:bg-brand-950 active:scale-[0.98]"
              >
                <MapPin aria-hidden="true" className="size-4" />
                Find Our Store
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/30 px-6 font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-white/20"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
