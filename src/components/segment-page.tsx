import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PhoneFrame } from "@/components/device";
import { brl, startingPackage } from "@/lib/pricing";
import { segmentBySlug, segmentPath, segments, type SegmentSlug } from "@/lib/segments";
import { demoUrl, openGraph, shell, site } from "@/lib/site";

export function segmentMetadata(slug: SegmentSlug): Metadata {
  const s = segmentBySlug(slug);
  const path = segmentPath(slug);
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraph(path, `${s.title} | Joshua`, s.description),
      images: [{ url: `/og/${slug}.png`, width: 1200, height: 630, alt: s.h1 }],
    },
  };
}

/**
 * Segment landing page (direction "Antes e depois", approved 2026-11-27):
 * the page is built from "Hoje × Com o Joshua" rows, each proven by a real
 * screen with that segment's data.
 */
export function SegmentPage({ slug }: { slug: SegmentSlug }) {
  const s = segmentBySlug(slug);
  const path = segmentPath(slug);
  const siblings = segments.filter((x) => x.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}${path}#webpage`,
        url: `${site.url}${path}`,
        name: s.title,
        description: s.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#software` },
        audience: { "@type": "BusinessAudience", audienceType: s.audience },
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
          {
            "@type": "ListItem",
            position: 3,
            name: s.label,
            item: `${site.url}${path}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader current="/segmentos" />

      <main>
        <section className={`${shell} pt-10 pb-12 md:pt-14 md:pb-14`}>
          <nav aria-label="Trilha" className="text-sm text-mute">
            <ol className="flex flex-wrap gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand">
                  Início
                </Link>{" "}
                <span aria-hidden="true">›</span>
              </li>
              <li>
                <Link href="/segmentos" className="hover:text-brand">
                  Segmentos
                </Link>{" "}
                <span aria-hidden="true">›</span>
              </li>
              <li aria-current="page" className="text-body">
                {s.label}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-[24ch] text-[clamp(2.25rem,4.4vw,3.25rem)] leading-[1.05] font-light tracking-[-0.035em]">
            {s.h1}
          </h1>
          <p className="mt-5 max-w-[48ch] text-intro text-mute">{s.lede}</p>
          <a
            href={demoUrl(s.demoMessage)}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block rounded-full bg-signal px-7 py-4 text-[1.0625rem] font-bold text-on-signal transition-colors hover:bg-ink hover:text-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Agendar demonstração
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        </section>

        <section aria-labelledby="muda-titulo" className={`${shell} pb-14`}>
          <h2 id="muda-titulo" className="text-[1.625rem] font-semibold tracking-[-0.02em]">
            {s.changeHeading}
          </h2>
          <ol className="mt-6">
            {s.rows.map((row) => (
              <li
                key={row.before}
                className="grid gap-5 border-t border-ink/10 py-7 md:grid-cols-[1fr_1fr_1.15fr] md:gap-8"
              >
                <div>
                  <p className="text-sm font-semibold text-before">Hoje</p>
                  <p className="mt-1.5 text-lg leading-snug text-mute">{row.before}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-after">Com o Joshua</p>
                  <p className="mt-1.5 text-lg leading-snug">{row.after}</p>
                </div>
                {row.phone ? (
                  <div className="flex justify-center rounded-screen bg-[linear-gradient(var(--color-ink),var(--color-brand))] px-6 pt-6 md:h-[260px] md:overflow-hidden">
                    <PhoneFrame
                      screen={row.screen}
                      sizes="200px"
                      className="w-[180px] border-bezel"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] overflow-hidden rounded-screen border border-ink/10 bg-white md:aspect-auto md:h-[260px]">
                    <Image
                      src={row.screen.src}
                      width={row.screen.width}
                      height={row.screen.height}
                      alt={row.screen.alt}
                      sizes="(min-width: 768px) 460px, 100vw"
                      quality={90}
                      className="h-full w-full object-cover object-left-top max-md:h-[180%] max-md:w-[180%] max-md:max-w-none"
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="nao-faz-titulo" className={`${shell} mb-16`}>
          <div className="grid gap-6 rounded-band bg-signal-soft px-8 py-10 md:grid-cols-2 md:gap-12 md:px-12">
            <div>
              <h2 id="nao-faz-titulo" className="text-[1.625rem] font-semibold tracking-[-0.02em]">
                O que o Joshua não faz
              </h2>
              <p className="mt-2 max-w-[44ch] text-mute">{s.notDoneNote}</p>
            </div>
            <ul className="grid list-disc gap-2 pl-5 text-lg">
              {s.notDone.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-titulo" className={`${shell} pb-16`}>
          <h2 id="faq-titulo" className="text-[1.625rem] font-semibold tracking-[-0.02em]">
            Perguntas
          </h2>
          <dl className="mt-4">
            {s.faq.map((f) => (
              <div
                key={f.q}
                className="grid gap-2 border-t border-ink/10 py-5 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-8"
              >
                <dt className="font-semibold">{f.q}</dt>
                <dd className="text-mute">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="preco-titulo" className={`${shell} pb-20 md:pb-28`}>
          <div className="flex flex-col gap-6 rounded-band bg-ink px-8 py-10 text-on-ink md:flex-row md:items-center md:px-12">
            <div>
              <h2 id="preco-titulo" className="text-[1.75rem] font-extrabold tracking-[-0.03em]">
                A partir de {brl.format(startingPackage.monthly)} por mês.
              </h2>
              <p className="mt-2 text-on-ink-soft">
                Mesmos planos para todos os segmentos.{" "}
                <Link
                  href="/precos"
                  className="font-semibold text-on-ink underline decoration-on-ink/40 underline-offset-4 hover:decoration-on-ink"
                >
                  Ver os pacotes
                </Link>
              </p>
            </div>
            <a
              href={demoUrl(s.demoMessage)}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-signal px-7 py-4 text-center font-bold text-on-signal transition-colors hover:bg-on-ink md:ml-auto"
            >
              Agendar demonstração
              <span className="sr-only"> (abre o WhatsApp)</span>
            </a>
          </div>

          <nav aria-labelledby="outros-titulo" className="mt-12">
            <h2 id="outros-titulo" className="text-sm font-semibold text-mute">
              Outros segmentos
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {siblings.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={segmentPath(x.slug)}
                    className="font-semibold text-brand hover:underline"
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
