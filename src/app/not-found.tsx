import type { Metadata } from "next";
import { House } from "lucide-react";
import { CategoryArt } from "@/components/art/CategoryArt";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display text-7xl font-extrabold text-brand-500 sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">This aisle seems to be empty</h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            The page you’re looking for doesn’t exist or may have moved. Let’s get you back to the shop.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">
              <House aria-hidden="true" className="size-4" />
              Back to home
            </ButtonLink>
            <ButtonLink href="/categories" variant="outline-dark" arrow>
              Browse categories
            </ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-[2rem] bg-brand-50 p-6">
          <CategoryArt art="fruit" className="h-auto w-full" />
        </div>
      </Container>
    </section>
  );
}
