import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PhoneFrame, ScreenFrame } from "@/components/device";
import { ProductTour, type TourStep } from "@/components/product-tour";
import { SegmentPicker } from "@/components/segment-picker";
import { otherSegments, pickerItems } from "@/lib/segments";
import { brl, startingPackage } from "@/lib/pricing";
import { appScreens, webScreens } from "@/lib/screens";
import { demoUrl, openGraph, shell, site } from "@/lib/site";
import { softwareNode } from "@/lib/schema";

const title = "Sistema de gestão para empresas de instalação | Joshua";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: openGraph("/", title, site.description),
};

/** Organization and website live in the layout; the priced product is declared here. */
const webPage = {
  "@context": "https://schema.org",
  "@graph": [
    softwareNode,
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: title,
      description: site.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#software` },
    },
  ],
};

const tour: readonly TourStep[] = [
  {
    label: "Vender",
    text: "Todas as oportunidades num funil, com o valor em jogo em cada etapa.",
    screen: webScreens.oportunidades,
  },
  {
    label: "Orçar",
    text: "Proposta montada por soluções. O total muda de cor conforme a margem.",
    screen: webScreens.proposta,
  },
  {
    label: "Projetar",
    text: "Cada projeto com responsável, revisão e o que falta para andar.",
    screen: webScreens.projetos,
  },
  {
    label: "Comprar",
    text: "Do orçamento ao recebido, cada ordem de compra no lugar.",
    screen: webScreens.compras,
  },
  {
    label: "Executar",
    text: "O andamento de cada obra, etapa por etapa, com a história toda registrada.",
    screen: webScreens.obra,
  },
];

function DemoButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={demoUrl()}
      target="_blank"
      rel="noopener"
      className={`inline-block rounded-full bg-signal px-6 py-3.5 text-base font-bold text-on-signal transition-colors hover:bg-ink hover:text-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
    >
      Agendar demonstração
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <JsonLd data={webPage} />
      <SiteHeader />

      <main>
        <div className="overflow-hidden">
          <section>
            <div className={`${shell} pt-14 md:pt-20`}>
              <h1 className="tracking-[-0.045em]">
                <span className="block max-w-[60ch] text-[0.9375rem] leading-normal font-semibold tracking-normal text-brand">
                  Sistema de gestão para empresas que vendem e instalam: energia solar,
                  ar-condicionado, automação e segurança, esquadrias, cortinas e persianas.
                </span>
                <span className="mt-5 block max-w-[16ch] text-hero font-extrabold">
                  Venda, obra e equipe de campo numa tela só.
                </span>
              </h1>
              <p className="mt-6 max-w-[40ch] text-intro text-mute">
                Proposta com margem, compras, obras, ordens de serviço, app do técnico e financeiro
                no mesmo sistema. Sem planilha, sem depender de quem está de férias.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <DemoButton />
                <span className="text-[0.9375rem] text-mute">30 a 60 minutos pelo WhatsApp</span>
              </div>
            </div>

            {/* Light top, ink stage: the dark begins behind the product screens. */}
            <div className="mt-14 bg-[linear-gradient(var(--color-white)_0_3.5rem,var(--color-ink)_3.5rem)] md:mt-16 lg:bg-[linear-gradient(var(--color-white)_0_6rem,var(--color-ink)_6rem)]">
              <div
                className={`${shell} relative h-[260px] overflow-y-clip sm:h-[420px] lg:h-[560px]`}
              >
                <div className="relative h-full">
                  <ScreenFrame
                    screen={webScreens.obra}
                    sizes="(min-width: 1024px) 1100px, 90vw"
                    eager
                    className="absolute top-0 bottom-0 left-0 w-[88%] lg:right-[220px] lg:w-auto"
                  />
                  <PhoneFrame
                    screen={appScreens.osDetalhe}
                    sizes="(min-width: 1024px) 250px, 30vw"
                    className="absolute top-14 right-0 w-[32%] max-w-[250px] shadow-stage sm:top-20 lg:top-24 lg:right-10"
                  />
                </div>
                {/* Screens sink into the ink stage instead of ending on a hard crop. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-[100vw] bottom-0 h-28 bg-linear-to-b from-ink/0 to-ink"
                />
              </div>
            </div>
          </section>

          <section
            id="segmentos"
            aria-labelledby="segmentos-titulo"
            className="relative -mt-px bg-ink pt-16 pb-8 text-on-ink md:pt-24"
          >
            <div className={shell}>
              <SegmentPicker
                items={pickerItems}
                others={otherSegments}
                headingId="segmentos-titulo"
              />
            </div>
          </section>

          <section
            id="como-funciona"
            aria-labelledby="como-funciona-titulo"
            className="bg-ink pt-16 pb-24 text-on-ink md:pt-24 md:pb-32"
          >
            <div className={shell}>
              <h2
                id="como-funciona-titulo"
                className="mb-10 max-w-[24ch] border-t border-on-ink/10 pt-16 text-[clamp(2rem,3.6vw,2.75rem)] font-light tracking-[-0.03em] md:pt-24"
              >
                Da venda à obra entregue, no mesmo sistema
              </h2>
              <ProductTour steps={tour} />
            </div>
          </section>
        </div>

        <section
          id="app-de-campo"
          aria-labelledby="app-de-campo-titulo"
          className={`${shell} grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2`}
        >
          <div>
            <h2
              id="app-de-campo-titulo"
              className="max-w-[16ch] text-statement font-extrabold tracking-[-0.04em]"
            >
              O técnico resolve no celular. O escritório vê na hora.
            </h2>
            <p className="mt-5 max-w-[36ch] text-intro text-mute">
              Ordem de serviço, retirada de material e foto do serviço pronto, até sem internet.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-10 sm:gap-5">
            <PhoneFrame
              screen={appScreens.osLista}
              sizes="(min-width: 1024px) 200px, 30vw"
              className="w-[30%] max-w-[200px] border-ink shadow-float"
            />
            <PhoneFrame
              screen={appScreens.confirmarInstalacao}
              sizes="(min-width: 1024px) 200px, 30vw"
              className="w-[30%] max-w-[200px] -translate-y-10 border-ink shadow-float"
            />
            <PhoneFrame
              screen={appScreens.servicoConcluido}
              sizes="(min-width: 1024px) 200px, 30vw"
              className="w-[30%] max-w-[200px] border-ink shadow-float"
            />
          </div>
        </section>

        <section aria-labelledby="preco-titulo" className={`${shell} pb-24 md:pb-32`}>
          <div className="flex flex-col gap-8 rounded-band bg-brand px-8 py-12 text-on-ink md:flex-row md:items-center md:gap-12 md:px-14 md:py-14">
            <div>
              <h2
                id="preco-titulo"
                className="text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.035em]"
              >
                A partir de {brl.format(startingPackage.monthly)} por mês.
              </h2>
              <p className="mt-3 text-lg text-brand-soft">
                Até {startingPackage.maxUsers} pessoas. Equipes maiores,{" "}
                <Link
                  href="/precos"
                  className="font-semibold text-on-ink underline decoration-on-ink/40 decoration-2 underline-offset-4 hover:decoration-on-ink"
                >
                  veja os pacotes
                </Link>
                .
              </p>
            </div>
            <div className="md:ml-auto md:text-right">
              <DemoButton className="px-7 py-4 text-[1.0625rem]" />
              <p className="mt-3 text-sm text-brand-soft">
                Com o time do Joshua, de 30 a 60 minutos
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
