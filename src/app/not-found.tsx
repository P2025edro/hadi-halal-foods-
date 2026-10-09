import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { ButtonLink, Container, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="kicker mb-4">Error 404</p>
          <h1 className="max-w-[14ch] text-display">
            We can’t find that page
          </h1>
          <p className="mt-5 max-w-md text-lead text-muted">
            It may have moved, or the link may be mistyped. Try the homepage or browse the shop by category.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href="/">Go to the homepage</ButtonLink>
            <TextLink href="/categories" className="text-turquoise-ink">
              Browse categories
            </TextLink>
          </div>
        </div>
        <Photo name="notFound" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] lg:col-span-5 lg:col-start-8" />
      </Container>
    </section>
  );
}
