import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui";
import { photosInUse } from "@/config/images";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Photo credits",
  description: `Credits and licences for the stock photography used on the ${site.legalName} website.`,
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <section className="pb-24 pt-12 lg:pt-16">
      <Container className="max-w-[880px]">
        <p className="kicker mb-4">Legal</p>
        <h1 className="text-title">Photo credits</h1>
        <p className="mt-4 max-w-2xl text-muted">
          The food photographs on this website are stock images used under open licences. They are illustrative and do
          not show our shop. Thank you to the photographers below.
        </p>
        <ul className="mt-10 border-b border-line">
          {photosInUse.map((p) => (
            <li key={p.src} className="grid grid-cols-[88px_1fr] gap-5 border-t border-line py-5 sm:grid-cols-[120px_1fr]">
              <div className="photo relative aspect-[4/3]">
                <Image src={p.src} alt="" fill sizes="120px" className="object-cover" />
              </div>
              <div className="text-[0.95rem]">
                <p className="font-semibold text-teal">{p.credit.title}</p>
                <p className="mt-1 text-muted">
                  {p.credit.author} ·{" "}
                  <a href={p.credit.url} className="text-link" target="_blank" rel="noopener noreferrer">
                    {p.credit.source}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>{" "}
                  ·{" "}
                  {p.credit.licenceUrl ? (
                    <a href={p.credit.licenceUrl} className="text-link" target="_blank" rel="noopener noreferrer">
                      {p.credit.licence}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    p.credit.licence
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.9rem] text-muted">Photos are shown cropped and resized; no other changes have been made.</p>
      </Container>
    </section>
  );
}
