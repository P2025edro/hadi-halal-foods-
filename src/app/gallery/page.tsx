import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { shopPhotos } from "@/config/photos";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from inside ${site.legalName}.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const hasPhotos = shopPhotos.length > 0;
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside the shop" intro="A look around the aisles at our neighbourhood grocery." />
      <section className="py-16 sm:py-20" aria-label="Photo gallery">
        <Container>
          {hasPhotos ? (
            <Gallery photos={shopPhotos} />
          ) : (
            <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-brand-200 bg-white px-6 py-14 text-center">
              <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Camera aria-hidden="true" className="size-7" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold">New photos coming soon</h2>
              <p className="mt-3 text-muted">
                We’re taking fresh photos of the shop. In the meantime, browse our categories or come in and see us.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/categories" arrow>
                  Explore Categories
                </ButtonLink>
                <ButtonLink href="/contact#visit" variant="outline-dark">
                  Find Our Store
                </ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
