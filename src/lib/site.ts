/** Site-wide constants shared by metadata, JSON-LD and navigation. */
export const site = {
  name: "Joshua",
  url: "https://www.appjoshua.com",
  appUrl: "https://web.appjoshua.com",
  description:
    "Sistema de gestão para empresas que vendem e instalam: proposta com margem, compras, obra, OS, app de campo offline e financeiro. A partir de R$ 690/mês.",
  publisher: "Fibonacci",
  locale: "pt_BR",
} as const;

/**
 * Demo requests go to WhatsApp until the own booking flow (THUB-12) ships.
 * Number taken from the previous site.
 */
const WHATSAPP_NUMBER = "5511944997808";

/** Open Graph block per page; openGraph is replaced (not merged) per route. */
export function openGraph(path: string, title: string, description: string) {
  return {
    type: "website" as const,
    locale: site.locale,
    siteName: site.name,
    url: path,
    title,
    description,
  };
}

/** schema.org monthly price, so parsers do not read it as a one-off price. */
export function monthlyPrice(price: number) {
  return {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "BRL",
    unitCode: "MON",
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
  };
}

export function demoUrl(message = "Olá! Quero agendar uma demonstração do Joshua."): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Page container shared by every section of the site. */
export const shell = "mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14";

export const supportEmail = "joshua@appjoshua.com";

/** Joshua OPS (field app) store listings, verified live on 2026-11-27. */
export const appStores = {
  ios: "https://apps.apple.com/br/app/joshua-ops/id6756849886",
  android: "https://play.google.com/store/apps/details?id=com.fibonacci.joshuaops",
} as const;

export const nav = [
  { href: "/segmentos", label: "Segmentos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#app-de-campo", label: "App de campo" },
  { href: "/precos", label: "Preços" },
] as const;
