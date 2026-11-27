import { packages } from "@/lib/pricing";
import { segments } from "@/lib/segments";
import { appStores, demoUrl, monthlyPrice, site, supportEmail } from "@/lib/site";

/** Stable @id values so page nodes can reference the site-wide entities. */
export const ids = {
  org: `${site.url}/#org`,
  website: `${site.url}/#website`,
  software: `${site.url}/#software`,
} as const;

/** Organization + WebSite: emitted once by the root layout on every page. */
export const siteEntities = [
  {
    "@type": "Organization",
    "@id": ids.org,
    name: site.publisher,
    url: site.url,
    brand: { "@type": "Brand", name: site.name, logo: `${site.url}/brand/joshua-logo-color.png` },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: demoUrl(),
        areaServed: "BR",
        availableLanguage: "pt-BR",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: supportEmail,
        areaServed: "BR",
        availableLanguage: "pt-BR",
      },
    ],
  },
  {
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    alternateName: "appjoshua",
    url: site.url,
    inLanguage: "pt-BR",
    publisher: { "@id": ids.org },
  },
];

const priced = packages.filter((p): p is typeof p & { monthly: number } => p.monthly !== null);

/**
 * The product itself, with prices. Emitted only where prices are shown
 * (home and /precos); other pages reference it by @id.
 */
export const softwareNode = {
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: site.description,
  url: site.url,
  publisher: { "@id": ids.org },
  sameAs: [appStores.ios, appStores.android],
  audience: segments.map((s) => ({ "@type": "BusinessAudience", audienceType: s.audience })),
  offers: priced.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.monthly,
    priceCurrency: "BRL",
    priceSpecification: monthlyPrice(p.monthly),
    availability: "https://schema.org/InStock",
    url: `${site.url}/precos`,
  })),
};
