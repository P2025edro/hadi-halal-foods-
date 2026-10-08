import type { Metadata } from "next";
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Container, PageHeader } from "@/components/ui";
import { issueFormToken, statusMessages, type ContactStatus } from "@/lib/contact";
import { hasVisitDetails, site } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.legalName}. Send us a message about the shop or a product you’re looking for.`,
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
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about the shop, or looking for something in particular? Send us a message and we’ll get back to you by email."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-muted">We usually reply by email. Please don’t include payment or sensitive personal details.</p>
            <div className="mt-8">
              <ContactForm token={issueFormToken()} initialStatus={initialStatus} />
            </div>
          </div>

          <aside id="visit" aria-labelledby="visit-title" className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 p-8 text-white">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/25 blur-2xl" />
              <h2 id="visit-title" className="relative text-2xl font-extrabold">
                Visit {site.shortName}
              </h2>

              {hasVisitDetails ? (
                <ul className="relative mt-6 space-y-5">
                  {address && (
                    <li className="flex gap-3">
                      <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                      <address className="not-italic text-white/85">
                        {address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </li>
                  )}
                  {openingHours && (
                    <li className="flex gap-3">
                      <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-white/85">
                        {openingHours.map((h) => (
                          <div key={h.days} className="contents">
                            <dt className="font-semibold text-white">{h.days}</dt>
                            <dd>{h.hours}</dd>
                          </div>
                        ))}
                      </dl>
                    </li>
                  )}
                  {mapUrl && (
                    <li>
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-500 px-5 font-semibold text-ink transition-colors hover:bg-accent-400"
                      >
                        Get directions
                        <ExternalLink aria-hidden="true" className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="relative mt-4 leading-relaxed text-white/80">
                  Send us a message using the form and we’ll reply with directions and any details you need for your
                  visit.
                </p>
              )}
            </div>

            {(phone || email) && (
              <div className="rounded-[2rem] border border-line bg-white p-8">
                <h2 className="text-xl font-bold">Other ways to reach us</h2>
                <ul className="mt-5 space-y-4">
                  {phone && (
                    <li className="flex items-center gap-3">
                      <Phone aria-hidden="true" className="size-5 text-brand-700" />
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-semibold text-brand-700 hover:text-brand-900">
                        {phone}
                      </a>
                    </li>
                  )}
                  {email && (
                    <li className="flex items-center gap-3">
                      <Mail aria-hidden="true" className="size-5 text-brand-700" />
                      <a href={`mailto:${email}`} className="font-semibold text-brand-700 hover:text-brand-900">
                        {email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="rounded-[2rem] border border-line bg-sand p-8">
              <MessageCircle aria-hidden="true" className="size-6 text-accent-700" />
              <h2 className="mt-3 text-xl font-bold">Looking for a product?</h2>
              <p className="mt-2 text-muted">
                Tell us what you’re after in your message. Ranges change, so we’ll let you know what we can help with.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
