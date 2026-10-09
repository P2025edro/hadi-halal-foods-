import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Photo } from "@/components/Photo";
import { ButtonLink, Container, TextLink } from "@/components/ui";
import { categories } from "@/config/categories";
import type { PhotoKey } from "@/config/images";
import { shopPhotos } from "@/config/photos";
import { hasVisitDetails, site } from "@/config/site";

const features = [
  { title: "Fresh produce", text: "Fruit and vegetables for everyday cooking." },
  { title: "Halal selection", text: "Halal food for family meals." },
  { title: "Everyday essentials", text: "Dairy, pantry staples and household basics." },
  { title: "Local convenience", text: "A quick stop, close to home." },
];

const highlights = [
  {
    title: "Fresh food for the week",
    text: "Fruit, vegetables and chilled basics for the meals you cook most often.",
  },
  {
    title: "Flavours from home",
    text: "Halal food, spices, rice and Asian pantry staples alongside the everyday shop.",
  },
  {
    title: "Easy to pop in",
    text: "Come in for one thing or a full basket. If you can’t find something, ask us.",
  },
];

type Aisle = { title: string; text: string; photo: PhotoKey; href: string };
const aisles: Aisle[] = [
  { title: "The produce shelves", text: "Aubergines, onions, peppers, greens and the week’s vegetables.", photo: "produce", href: "/categories/vegetables" },
  { title: "Spices and pantry", text: "Whole and ground spices, rice, flour and dried goods.", photo: "pantry", href: "/categories/asian-groceries" },
  { title: "The fruit bowl", text: "Citrus, apples and seasonal fruit.", photo: "fruitBowl", href: "/categories/fruit" },
  { title: "Pulses and grains", text: "Lentils, beans, seeds and grains.", photo: "pulses", href: "/categories/asian-groceries" },
];

const heroGutter = "lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]";

export default function HomePage() {
  const [mainAisle, ...otherAisles] = aisles;
  return (
    <>
      {/* HERO: asymmetric — copy on deep teal, produce photograph bleeding to the right edge */}
      <section aria-labelledby="hero-title" className="grid bg-paper lg:min-h-[min(calc(100svh-76px),720px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="hero-photo relative order-1 aspect-[4/3] sm:aspect-[16/9] lg:order-2 lg:aspect-auto">
          <Photo name="hero" priority sizes="(min-width: 1024px) 58vw, 100vw" className="absolute inset-0" />
        </div>
        <div className={`on-dark order-2 flex flex-col justify-end bg-teal px-4 pb-12 pt-10 sm:px-6 lg:order-1 lg:pb-16 lg:pr-12 lg:pt-16 ${heroGutter}`}>
          <div className="hero-copy max-w-[30rem]">
            <p className="kicker mb-5">Your neighbourhood grocery</p>
            <h1 id="hero-title" className="text-display text-paper">
              Fresh Choices for Every Home
            </h1>
            <p className="mt-6 text-lead text-paper/80">
              Fruit and vegetables, halal food, Asian groceries, dairy and the everyday essentials, all in one local shop.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href="/categories">Explore categories</ButtonLink>
              <TextLink href="/contact#visit" className="text-paper">
                Find our store
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* What we're about, as plain statements rather than icon tiles */}
      <section aria-label="What you’ll find at Hadi" className="border-b border-line">
        <Container>
          <ul className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {features.map((f, i) => (
              <li
                key={f.title}
                className={`py-6 sm:py-8 ${i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-8" : ""} ${i === 2 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""}`}
              >
                <p className="font-semibold text-teal">{f.title}</p>
                <p className="mt-1 text-[0.95rem] text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SHOP BY CATEGORY */}
      <section aria-labelledby="categories-title" className="py-20 lg:py-28">
        <Container>
          <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <h2 id="categories-title" className="text-title">
                Shop by category
              </h2>
              <p className="mt-4 text-muted">
                Eight sections cover most of the weekly shop. Ranges change with the seasons, so ask us if you’re looking
                for something in particular.
              </p>
            </div>
            <TextLink href="/categories" className="shrink-0 text-turquoise-ink">
              All categories
            </TextLink>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
            {categories.map((c) => (
              <li key={c.slug}>
                <CategoryCard category={c} sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 46vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* EDITORIAL */}
      <section aria-labelledby="editorial-title" className="bg-stone">
        <div className="grid lg:grid-cols-12">
          <Photo name="editorial" sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[620px]" />
          <div className="px-4 py-14 sm:px-6 lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:py-20 lg:pl-14 lg:pr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
            <h2 id="editorial-title" className="max-w-md text-title">
              Your Neighbourhood Grocery, Made for Everyday Life
            </h2>
            <p className="mt-5 max-w-md text-muted">
              A local shop that keeps the everyday simple: fresh food, familiar flavours and the basics you need, close to
              home.
            </p>
            <dl className="mt-10 max-w-md">
              {highlights.map((h) => (
                <div key={h.title} className="border-t border-teal/15 py-5">
                  <dt className="font-semibold text-teal">{h.title}</dt>
                  <dd className="mt-1 text-muted">{h.text}</dd>
                </div>
              ))}
            </dl>
            <TextLink href="/about" className="mt-4 self-start text-turquoise-ink">
              About the shop
            </TextLink>
          </div>
        </div>
      </section>

      {/* DISCOVER WHAT'S IN STORE */}
      <section aria-labelledby="discover-title" className="py-20 lg:py-28">
        <Container>
          <div className="mb-10 max-w-2xl lg:mb-14">
            <h2 id="discover-title" className="text-title">
              Discover What’s In Store
            </h2>
            <p className="mt-4 text-muted">A walk around the shelves. What’s in stock changes, so please check in store.</p>
          </div>
          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12">
            {mainAisle && (
              <Link href={mainAisle.href} className="group block lg:col-span-7">
                <Photo
                  name={mainAisle.photo}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="aspect-[4/3] lg:aspect-[7/6]"
                  imgClassName="transition-[scale] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                />
                <h3 className="mt-4 text-heading decoration-orange decoration-2 underline-offset-[6px] group-hover:underline">
                  {mainAisle.title}
                </h3>
                <p className="mt-1 text-muted">{mainAisle.text}</p>
              </Link>
            )}
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2 lg:content-between">
              {otherAisles.map((a, i) => (
                <Link key={a.title} href={a.href} className={`group block ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <Photo
                    name={a.photo}
                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
                    className={i === 0 ? "aspect-[16/10]" : "aspect-square"}
                    imgClassName="transition-[scale] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                  />
                  <h3 className="mt-4 text-[1.2rem] leading-tight decoration-orange decoration-2 underline-offset-[6px] group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[0.95rem] text-muted">{a.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* GENUINE SHOP PHOTOS — appears only once approved, current photos are added */}
      {shopPhotos.length > 0 && (
        <section aria-labelledby="shop-photos-title" className="border-t border-line py-20 lg:py-28">
          <Container>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 id="shop-photos-title" className="text-title">
                Inside the shop
              </h2>
              <TextLink href="/gallery" className="text-turquoise-ink">
                View the gallery
              </TextLink>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shopPhotos.slice(0, 3).map((p) => (
                <li key={p.src} className="photo aspect-[4/3]">
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* VISIT */}
      <section aria-labelledby="visit-title" className="grid lg:grid-cols-2">
        <Photo name="visit" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[460px]" />
        <div className="on-dark flex flex-col justify-center bg-teal px-4 py-14 sm:px-6 lg:px-16 lg:py-20">
          <h2 id="visit-title" className="text-title text-paper">
            Pop in for your next shop
          </h2>
          <p className="mt-4 max-w-md text-paper/80">
            {hasVisitDetails
              ? "Find our address and directions on the contact page, or send us a question before you visit."
              : "Got a question about the shop, or looking for something specific? Send us a message and we’ll reply by email."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact#visit" variant="on-dark">
              Find our store
            </ButtonLink>
            <ButtonLink href="/contact" variant="on-dark" className="border-transparent px-2 hover:bg-transparent hover:text-paper hover:underline">
              Contact us
            </ButtonLink>
          </div>
          <p className="mt-10 text-[0.875rem] text-paper/60">{site.legalName}</p>
        </div>
      </section>
    </>
  );
}
