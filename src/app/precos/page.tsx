import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PageBand } from "@/components/page-band";
import { brl, packages, type Package } from "@/lib/pricing";
import { demoUrl, monthlyPrice, openGraph, shell, site } from "@/lib/site";

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
    a: "Uma conversa de 30 a 60 minutos com o time do Joshua, olhando o sistema com os exemplos da sua integradora.",
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
    <div className="bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader current="/precos" />

      <main>
        <PageBand
          title="Quanto custa para a sua equipe."
          lede="Três pacotes, separados pelo número de pessoas que entram no sistema. Cada login é um usuário, do escritório ou do campo."
        />

        <div className={`${shell} pb-24 md:pb-32`}>
          <section aria-label="Pacotes" className="grid gap-5 md:grid-cols-3">
            {packages.map((pkg, i) => {
              const cta = ctaFor(pkg);
              const lead = pkg.id === "premium";
              return (
                <article
                  key={pkg.id}
                  className={`flex flex-col rounded-screen bg-white p-8 shadow-float ${
                    lead ? "outline-2 outline-brand" : ""
                  }`}
                >
                  <h2 className="text-[0.9375rem] font-bold text-brand">{pkg.name}</h2>
                  <p className="mt-2.5 text-[1.0625rem] text-mute">
                    {usersLabel(pkg, i > 0 ? packages[i - 1].maxUsers : null)}
                  </p>
                  {pkg.monthly !== null ? (
                    <p className="mt-6 mb-8 flex min-h-12 items-baseline text-5xl font-extrabold tracking-[-0.035em] tabular-nums">
                      <span className="mr-1 text-lg font-semibold tracking-normal">R$</span>
                      {brl.format(pkg.monthly).replace(/^R\$\s?/, "")}
                      <span className="ml-1 text-base font-normal tracking-normal text-mute">
                        /mês
                      </span>
                    </p>
                  ) : (
                    <p className="mt-6 mb-8 flex min-h-12 items-baseline text-4xl font-light">
                      Sob consulta
                    </p>
                  )}
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-auto block rounded-full bg-signal px-5 py-3.5 text-center text-[0.9375rem] font-bold text-on-signal transition-colors hover:bg-ink hover:text-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {cta.label}
                    <span className="sr-only"> (abre o WhatsApp)</span>
                  </a>
                </article>
              );
            })}
          </section>

          <section
            aria-labelledby="vale-titulo"
            className="mt-14 grid gap-5 md:grid-cols-[260px_1fr] md:gap-10"
          >
            <h2 id="vale-titulo" className="text-[1.375rem] font-bold tracking-[-0.02em]">
              Vale para os três pacotes
            </h2>
            <ul className="grid gap-2.5 text-[1.0625rem] leading-relaxed text-body">
              {appliesToAll.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 before:mt-[0.6em] before:size-1.5 before:shrink-0 before:rounded-full before:bg-brand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="faq-titulo"
            className="mt-18 grid gap-8 md:grid-cols-[260px_1fr] md:gap-10"
          >
            <h2 id="faq-titulo" className="text-[1.375rem] font-bold tracking-[-0.02em]">
              Perguntas antes da demonstração
            </h2>
            <dl className="grid gap-x-12 gap-y-9 md:grid-cols-2">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="mb-1.5 text-[1.0625rem] font-bold">{item.q}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-mute">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
