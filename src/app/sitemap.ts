import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Only routes that exist today. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/precos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/suporte`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
