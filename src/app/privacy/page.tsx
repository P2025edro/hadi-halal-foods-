import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${site.legalName} handles personal data sent through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/*
 * DRAFT — PENDING LEGAL REVIEW.
 * Written to match what this website actually does today:
 *  - a contact form that emails the store via Resend (an email delivery provider),
 *  - hosting on Vercel (server logs),
 *  - no analytics, no advertising cookies, no newsletter, no accounts, no payments.
 * Update this page if any of that changes, and complete the bracketed items.
 */
const lastUpdated = "8 October 2026";

export default function PrivacyPage() {
  const contactLine = site.contact.email
    ? `email us at ${site.contact.email}`
    : "contact us using the form on our Contact page";

  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy notice" intro={`How ${site.legalName} handles personal data sent through this website.`} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div role="note" className="mb-10 flex gap-3 rounded-xl border border-accent-300 bg-accent-50 p-5 text-ink">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-700" />
            <p>
              <strong>Draft, pending legal review.</strong> This notice describes how the website currently handles
              data. It has not yet been reviewed by a legal professional and may change.
            </p>
          </div>

          <div className="space-y-10 text-lg leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            <p className="text-base">Last updated: {lastUpdated}</p>

            <section>
              <h2>Who we are</h2>
              <p>
                This website is operated by {site.legalName} (“we”, “us”). We are the data controller for personal data
                you send us through this website. To ask anything about this notice, {contactLine}.
              </p>
            </section>

            <section>
              <h2>What we collect</h2>
              <p>When you use our contact form, we collect:</p>
              <ul>
                <li>your name and email address,</li>
                <li>your phone number, if you choose to provide it,</li>
                <li>the content of your message.</li>
              </ul>
              <p className="mt-3">
                Like most websites, our hosting provider automatically processes technical data such as your IP address
                and browser details to deliver the site securely and to protect the contact form from abuse.
              </p>
            </section>

            <section>
              <h2>Why we use it, and our legal basis</h2>
              <ul>
                <li>
                  <strong className="text-ink">To reply to your enquiry.</strong> Our legal basis is our legitimate
                  interest in responding to people who contact us, or taking steps at your request.
                </li>
                <li>
                  <strong className="text-ink">To keep the website secure</strong> and prevent spam. Our legal basis is
                  our legitimate interest in protecting the site.
                </li>
              </ul>
              <p className="mt-3">We do not use your details for marketing and we do not sell your data.</p>
            </section>

            <section>
              <h2>Who we share it with</h2>
              <p>We use trusted service providers who process data on our behalf:</p>
              <ul>
                <li>
                  <strong className="text-ink">Vercel Inc.</strong>, which hosts this website.
                </li>
                <li>
                  <strong className="text-ink">Resend</strong>, which delivers contact form messages to our inbox.
                </li>
                <li>Our email provider, where your message is stored once received. [Business to confirm provider.]</li>
              </ul>
              <p className="mt-3">
                Some of these providers may process data outside the European Economic Area. Where they do, we rely on
                appropriate safeguards such as the EU Standard Contractual Clauses or an adequacy decision.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                We keep contact form messages for as long as needed to deal with your enquiry and then delete them,
                normally within [12 months — business to confirm], unless we need to keep them longer for a legal reason.
              </p>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                This website does not use analytics, advertising or tracking cookies. If that changes, we will update this
                notice and ask for consent where required.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                Under the GDPR you have the right to access, correct or delete your personal data, to restrict or object
                to how we use it, and to data portability. To use these rights, {contactLine}.
              </p>
              <p className="mt-3">
                You can also complain to the Data Protection Commission (Ireland) at{" "}
                <a
                  href="https://www.dataprotection.ie"
                  className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dataprotection.ie
                </a>
                , or the data protection authority where you live.
              </p>
            </section>

            <section>
              <h2>Changes to this notice</h2>
              <p>We may update this notice. The date at the top shows when it was last changed.</p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
