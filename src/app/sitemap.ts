import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/categories", "/gallery", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${site.url}/categories/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
