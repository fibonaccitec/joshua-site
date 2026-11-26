import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { brl, packages, type Package } from "@/lib/pricing";
import { demoUrl, monthlyPrice, openGraph, site } from "@/lib/site";

const description =
  "Planos do Joshua por tamanho de equipe: Standard até 5 usuários por R$ 690/mês, Premium até 15 usuários por R$ 1.490/mês e Enterprise sob consulta.";

export const metadata: Metadata = {
  title: "Preços",
  description,
  alternates: { canonical: "/precos" },
  openGraph: openGraph("/precos", "Preços · Joshua", description),
};

const faq = [
  {
    q: "Quem conta como usuário?",
    a: "Toda pessoa que faz login no Joshua. Vendedor, projetista, financeiro e técnico de campo contam igual; não há usuário de “meio preço”.",
  },
  {
    q: "Somos mais de 15 pessoas.",
    a: "A partir de 16 usuários o pacote é o Enterprise, e o valor sai de uma conversa com o time comercial.",
  },
  {
    q: "Quanto custa a implantação?",
    a: "Não tem preço de tabela. A gente analisa a sua empresa primeiro, inclusive se há dados para migrar, e só então passa o valor.",
  },
  {
    q: "Como é a demonstração?",
    a: "Uma conversa de 30 a 60 minutos com o Claudio, do time do Joshua, olhando o sistema com os exemplos da sua integradora.",
  },
] as const;

const appliesToAll = [
  "Cada login conta como um usuário, do escritório ou do campo.",
  "Implantação orçada depois de analisar a sua empresa, por exemplo se haverá migração de dados.",
  "As funcionalidades de cada pacote são apresentadas na demonstração.",
] as const;

function usersLabel(pkg: Package, previousMax: number | null) {
  if (pkg.maxUsers !== null) {
    return (
      <>
        até <strong className="font-bold text-ink">{pkg.maxUsers}</strong> usuários
      </>
    );
  }
  return (
    <>
      <strong className="font-bold text-ink">{(previousMax ?? 0) + 1}</strong> usuários ou mais
    </>
  );
}

function ctaFor(pkg: Package) {
  if (pkg.monthly === null) {
    return {
      label: "Falar com o time comercial",
      href: demoUrl("Olá! Somos uma equipe grande e quero falar com o time comercial do Joshua."),
    };
  }
  return {
    label: "Agendar demonstração",
    href: demoUrl(`Olá! Quero agendar uma demonstração do Joshua (pacote ${pkg.name}).`),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: site.name,
      description: site.description,
      brand: { "@type": "Brand", name: site.name },
      offers: packages
        .filter((p) => p.monthly !== null)
        .map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.monthly,
          priceCurrency: "BRL",
          priceSpecification: monthlyPrice(p.monthly as number),
          url: `${site.url}/precos`,
        })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
      <JsonLd data={jsonLd} />
      <SiteHeader current="/precos" />

      <main>
        <section className="grid items-end gap-8 pt-20 pb-14 md:pt-24 lg:grid-cols-[1fr_380px] lg:gap-x-20">
          <p className="caption text-brand lg:col-span-2">Preços</p>
          <h1 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] font-light tracking-[-0.045em]">
            Quanto custa para <b className="block font-bold">a sua equipe.</b>
          </h1>
          <p className="pb-1.5 text-lede text-body">
            Três pacotes, separados pelo número de pessoas que entram no sistema. Conte todo mundo
            que faz login, do escritório ou de campo: cada login é um usuário.
          </p>
        </section>

        <section aria-label="Pacotes" className="pb-22">
          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((pkg, i) => {
              const cta = ctaFor(pkg);
              const lead = pkg.id === "premium";
              return (
                <article
                  key={pkg.id}
                  className={`flex flex-col rounded bg-white p-8 ${
                    lead ? "border-2 border-ink p-[31px]" : "border border-line"
                  }`}
                >
                  <h2 className={`caption ${lead ? "text-brand" : "text-mute"}`}>{pkg.name}</h2>
                  <p className="mt-3.5 text-lede text-body">
                    {usersLabel(pkg, i > 0 ? packages[i - 1].maxUsers : null)}
                  </p>
                  {pkg.monthly !== null ? (
                    <p className="mt-6 flex min-h-11 items-start text-[2.75rem] leading-none font-bold tracking-[-0.03em] tabular-nums">
                      <span className="mt-1 mr-1 text-lg font-medium tracking-normal">R$</span>
                      {brl.format(pkg.monthly).replace(/^R\$\s?/, "")}
                      <span className="mt-auto ml-1 text-base font-normal tracking-normal text-mute">
                        /mês
                      </span>
                    </p>
                  ) : (
                    <p className="mt-6 min-h-11 text-4xl leading-none font-light">Sob consulta</p>
                  )}
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 block rounded bg-signal px-5 py-3.5 text-center text-[0.9375rem] font-bold text-on-signal transition-colors hover:bg-ink hover:text-paper"
                  >
                    {cta.label}
                    <span className="sr-only"> (abre o WhatsApp)</span>
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-4 rounded border border-line px-8 py-6 md:grid-cols-[220px_1fr] md:gap-x-10">
            <h2 className="caption text-mute">Vale para os três pacotes</h2>
            <ul className="grid gap-2 text-[0.9375rem] leading-relaxed text-body">
              {appliesToAll.map((item) => (
                <li key={item} className="before:mr-2.5 before:text-mute before:content-['—']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="faq-titulo"
          className="grid gap-10 border-t border-line pt-18 pb-24 lg:grid-cols-[260px_1fr] lg:gap-x-20"
        >
          <h2 id="faq-titulo" className="caption text-brand">
            Perguntas antes da demonstração
          </h2>
          <dl className="grid gap-x-14 gap-y-10 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="mb-2.5 text-lede font-bold tracking-[-0.01em]">{item.q}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-body">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
