import type { MetadataRoute } from "next";
import { segmentPath, segments } from "@/lib/segments";
import { site } from "@/lib/site";

/**
 * Only routes that exist today. lastModified is the date each page's content
 * last changed; bump it when the copy changes.
 */
const updated = {
  home: "2026-11-27",
  segments: "2026-11-27",
  pricing: "2026-11-27",
  support: "2026-11-26",
  privacy: "2026-09-11",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: updated.home },
    { url: `${site.url}/segmentos`, lastModified: updated.segments },
    ...segments.map((s) => ({
      url: `${site.url}${segmentPath(s.slug)}`,
      lastModified: updated.segments,
    })),
    { url: `${site.url}/precos`, lastModified: updated.pricing },
    { url: `${site.url}/suporte`, lastModified: updated.support },
    { url: `${site.url}/privacidade`, lastModified: updated.privacy },
  ];
}
