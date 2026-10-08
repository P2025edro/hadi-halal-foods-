import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/config/categories";
import { nav, site } from "@/config/site";
import { Logo } from "./Logo";
import { Container } from "./ui";

const linkCls =
  "rounded text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, address, mapUrl } = site.contact;

  return (
    <footer className="bg-brand-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 leading-relaxed text-white/70">
            Your neighbourhood grocery for fresh produce, halal food, Asian groceries and everyday essentials.
          </p>
          <div aria-hidden="true" className="mt-6 flex gap-1.5">
            <span className="h-1.5 w-10 rounded-full bg-brand-500" />
            <span className="h-1.5 w-5 rounded-full bg-accent-500" />
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-200">Explore</h3>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkCls}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkCls}>
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-200">In store</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 xl:gap-x-6">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className={linkCls}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-200">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-white/70">
            {address && (
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                <address className="not-italic">
                  {mapUrl ? (
                    <a href={mapUrl} className={linkCls} target="_blank" rel="noopener noreferrer">
                      {address.join(", ")}
                    </a>
                  ) : (
                    address.join(", ")
                  )}
                </address>
              </li>
            )}
            {phone && (
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className={linkCls}>
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-400" />
                <a href={`mailto:${email}`} className={linkCls}>
                  {email}
                </a>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                <Mail aria-hidden="true" className="size-4" />
                Send us a message
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <Link href="/privacy" className={linkCls}>
            Privacy notice
          </Link>
        </Container>
      </div>
    </footer>
  );
}
