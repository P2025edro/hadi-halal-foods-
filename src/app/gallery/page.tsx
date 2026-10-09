import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { Container, TextLink } from "@/components/ui";
import { shopPhotos } from "@/config/photos";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from inside ${site.legalName}.`,
  alternates: { canonical: "/gallery" },
};

/** Frames reserved for real photographs of the shop. Shown only until approved photos are added. */
const placeholderFrames = [
  { label: "Shop front", ratio: "aspect-[4/5]" },
  { label: "Fresh produce", ratio: "aspect-[4/3]" },
  { label: "Halal and Asian grocery aisles", ratio: "aspect-[4/3]" },
  { label: "Chiller and dairy", ratio: "aspect-[4/5]" },
  { label: "Counter and top-ups", ratio: "aspect-[4/3]" },
  { label: "Everyday essentials", ratio: "aspect-[4/5]" },
];

export default function GalleryPage() {
  const hasPhotos = shopPhotos.length > 0;
  return (
    <>
      <section className="pb-10 pt-12 lg:pb-14 lg:pt-16">
        <Container className="max-w-[880px] text-center">
          <h1 className="text-display">Inside the shop</h1>
          <p className="mx-auto mt-5 max-w-lg text-lead text-muted">
            {hasPhotos
              ? "A look around the aisles. Select a photo to see it larger."
              : "We’re photographing the shop. These frames will be replaced with real photos of our aisles."}
          </p>
        </Container>
      </section>
      <section aria-label={hasPhotos ? "Photo gallery" : "Photos coming soon"} className="pb-20 lg:pb-28">
        <Container>
          {hasPhotos ? (
            <Gallery photos={shopPhotos} />
          ) : (
            <>
              <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
                {placeholderFrames.map((f) => (
                  <li key={f.label} className="break-inside-avoid">
                    <figure>
                      <div
                        role="img"
                        aria-label={`Placeholder: photo of the ${f.label.toLowerCase()} to be added`}
                        className={`${f.ratio} flex items-end border border-dashed border-teal/25 bg-stone p-4 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgb(7_57_61/0.035)_14px_15px)]`}
                      >
                        <span className="bg-paper px-2 py-1 text-[0.8rem] font-medium text-muted">Photo to come</span>
                      </div>
                      <figcaption className="mt-2 text-[0.95rem] text-teal">{f.label}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-muted">
                In the meantime, <TextLink href="/categories" className="text-turquoise-ink">browse the categories</TextLink>.
              </p>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
