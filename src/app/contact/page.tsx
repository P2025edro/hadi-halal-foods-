import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { Container } from "@/components/ui";
import { issueFormToken, statusMessages, type ContactStatus } from "@/lib/contact";
import { hasVisitDetails, site } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.legalName}. Send a message about the shop or a product you’re looking for.`,
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ status?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const status = raw && raw in statusMessages ? (raw as ContactStatus) : undefined;
  const initialStatus = status ? { ok: status === "success", message: statusMessages[status] } : undefined;
  const { phone, email, address, mapUrl, openingHours } = site.contact;

  return (
    <section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Form column carries the page title */}
        <div className="lg:col-span-7">
          <h1 className="text-display">Get in touch</h1>
          <p className="mt-5 max-w-lg text-lead text-muted">
            Questions about the shop, or looking for something in particular? Send a message and we’ll reply by email.
          </p>
          <div className="mt-10 max-w-2xl border-t border-line pt-10">
            <ContactForm token={issueFormToken()} initialStatus={initialStatus} />
          </div>
        </div>

        {/* Visit column */}
        <aside id="visit" aria-labelledby="visit-title" className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          <Photo name="contact" sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3] lg:aspect-[5/4]" />
          <div className="on-dark bg-teal p-7 text-paper">
            <h2 id="visit-title" className="text-heading text-paper">
              Visit {site.shortName}
            </h2>
            {hasVisitDetails ? (
              <div className="mt-5 space-y-5 text-paper/85">
                {address && (
                  <address className="not-italic">
                    {address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                )}
                {openingHours && (
                  <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
                    {openingHours.map((h) => (
                      <div key={h.days} className="contents">
                        <dt className="font-semibold text-paper">{h.days}</dt>
                        <dd>{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {mapUrl && (
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-block font-semibold text-paper">
                    Get directions<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-4 leading-relaxed text-paper/80">
                Send us a message using the form and we’ll reply with directions and anything else you need for your visit.
              </p>
            )}
            {(phone || email) && (
              <ul className="mt-6 space-y-2 border-t border-paper/15 pt-5">
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-link font-semibold text-paper">
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-link font-semibold text-paper">
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
          <p className="mt-6 text-[0.95rem] text-muted">
            Looking for a product? Tell us what you’re after in your message and we’ll let you know if we have it.
          </p>
        </aside>
      </Container>
    </section>
  );
}
