import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PageBand } from "@/components/page-band";
import { SegmentPicker } from "@/components/segment-picker";
import { otherSegments, pickerItems, segmentPath, segments } from "@/lib/segments";
import { openGraph, shell, site } from "@/lib/site";

const title = "Sistema de gestão por segmento de instalação";
const description =
  "Energia solar, ar-condicionado, automação e segurança, esquadrias, cortinas e persianas: veja como o Joshua organiza venda, obra e campo em cada segmento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/segmentos" },
  openGraph: {
    ...openGraph("/segmentos", `${title} | Joshua`, description),
    images: [{ url: "/og/segmentos.png", width: 1200, height: 630, alt: title }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/segmentos#webpage`,
      url: `${site.url}/segmentos`,
      name: title,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#software` },
      hasPart: segments.map((s) => ({
        "@type": "WebPage",
        name: s.title,
        url: `${site.url}${segmentPath(s.slug)}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: `${site.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Segmentos",
          item: `${site.url}/segmentos`,
        },
      ],
    },
  ],
};

export default function SegmentsHub() {
  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader current="/segmentos" />

      <main>
        <PageBand
          title="Para empresas que vendem o produto instalado"
          lede="Se a sua venda termina numa obra, o Joshua acompanha do orçamento à entrega: proposta com margem, compras, obra, equipe de campo e financeiro."
        />

        <section aria-labelledby="picker-titulo" className="bg-ink py-16 text-on-ink md:py-20">
          <div className={shell}>
            <SegmentPicker items={pickerItems} others={otherSegments} headingId="picker-titulo" />
          </div>
        </section>

        <section aria-labelledby="lista-titulo" className={`${shell} py-16 md:py-20`}>
          <h2 id="lista-titulo" className="text-[1.625rem] font-semibold tracking-[-0.02em]">
            Páginas por segmento
          </h2>
          <ul className="mt-6">
            {segments.map((s) => (
              <li key={s.slug} className="border-t border-ink/10 py-6">
                <Link
                  href={segmentPath(s.slug)}
                  className="group grid gap-2 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-8"
                >
                  <span className="text-xl font-semibold group-hover:text-brand">{s.title}</span>
                  <span className="text-mute">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
