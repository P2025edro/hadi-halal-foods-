import Link from "next/link";
import { categories } from "@/config/categories";
import { nav, site } from "@/config/site";
import { Wordmark } from "./brand/Wordmark";
import { Container } from "./ui";

const linkCls = "text-paper/75 transition-colors duration-200 hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, address, mapUrl } = site.contact;

  return (
    <footer className="on-dark bg-teal text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="grid gap-12 pb-12 pt-16 md:grid-cols-12 lg:pt-20">
        <div className="md:col-span-12 lg:col-span-4">
          <Wordmark className="w-[112px] text-paper" title={site.shortName} />
          <p className="mt-6 max-w-xs leading-relaxed text-paper/75">
            {site.legalName}. A neighbourhood grocery for fresh produce, halal food, Asian groceries and everyday
            essentials.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
          <h3 className="font-sans text-[0.9375rem] font-semibold text-[#9fe0e6]">Pages</h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkCls}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5 lg:col-span-3">
          <h3 className="font-sans text-[0.9375rem] font-semibold text-[#9fe0e6]">In the shop</h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className={linkCls}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h3 className="font-sans text-[0.9375rem] font-semibold text-[#9fe0e6]">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-paper/75">
            {address && (
              <li>
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
              <li>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className={linkCls}>
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className={linkCls}>
                  {email}
                </a>
              </li>
            )}
            <li>
              <Link href="/contact" className="text-link font-semibold text-paper">
                Send us a message
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/15">
        <Container className="flex flex-col gap-3 py-6 text-[0.875rem] text-paper/65 md:flex-row md:items-start md:justify-between md:gap-10">
          <p>
            © {year} {site.legalName}
          </p>
          <p className="max-w-2xl md:text-right">
            Food photography is licensed stock imagery and does not show our shop.{" "}
            <Link href="/credits" className="text-link text-paper/80 hover:text-paper">
              Photo credits
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/privacy" className="text-link text-paper/80 hover:text-paper">
              Privacy notice
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
