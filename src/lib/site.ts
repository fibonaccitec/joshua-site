/** Site-wide constants shared by metadata, JSON-LD and navigation. */
export const site = {
  name: "Joshua",
  url: "https://www.appjoshua.com",
  appUrl: "https://web.appjoshua.com",
  description:
    "Sistema de gestão para integradoras de automação, áudio, vídeo e segurança: proposta, projeto, compras, obra, campo e financeiro no mesmo lugar.",
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

export const nav = [
  { href: "/#problema", label: "O problema" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/precos", label: "Preços" },
] as const;
