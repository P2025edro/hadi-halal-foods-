/**
 * Central business content for Hadi Halal Foods Grocery ltd.
 *
 * ACCURACY RULE: only verified facts go here. Anything unknown stays `null`
 * and the site hides the related UI automatically. Do not add opening hours,
 * phone numbers, addresses, prices, reviews, delivery or certification claims
 * until the business has confirmed them.
 */

export type OpeningHoursEntry = { days: string; hours: string };

export type SiteConfig = {
  legalName: string;
  shortName: string;
  wordmark: { primary: string; secondary: string };
  description: string;
  url: string;
  contact: {
    phone: string | null;
    email: string | null;
    /** Street address lines, exactly as the business wants them shown. */
    address: string[] | null;
    /** Link to a map listing (e.g. Google Maps share link). */
    mapUrl: string | null;
    openingHours: OpeningHoursEntry[] | null;
  };
  social: { label: string; href: string }[];
};

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site: SiteConfig = {
  legalName: "Hadi Halal Foods Grocery ltd",
  shortName: "Hadi Halal Foods",
  wordmark: { primary: "Hadi", secondary: "Halal Foods Grocery" },
  description:
    "Hadi Halal Foods Grocery ltd is a neighbourhood grocery shop for fresh fruit and vegetables, halal food, Asian groceries, dairy, confectionery and everyday essentials.",
  url: resolveSiteUrl(),
  contact: {
    phone: null,
    email: null,
    address: null,
    mapUrl: null,
    openingHours: null,
  },
  social: [],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Categories", href: "/categories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const hasVisitDetails = Boolean(
  site.contact.address || site.contact.openingHours || site.contact.mapUrl,
);
