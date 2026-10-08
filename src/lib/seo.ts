import { site } from "@/config/site";

/**
 * Structured data built only from verified config values. Unknown fields
 * (address, phone, hours) are omitted rather than guessed.
 */
export function localBusinessJsonLd() {
  const { phone, email, address, mapUrl, openingHours } = site.contact;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: site.legalName,
    description: site.description,
    url: site.url,
  };
  if (phone) data.telephone = phone;
  if (email) data.email = email;
  if (address) data.address = address.join(", ");
  if (mapUrl) data.hasMap = mapUrl;
  if (openingHours) data.openingHours = openingHours.map((h) => `${h.days} ${h.hours}`);
  return data;
}
