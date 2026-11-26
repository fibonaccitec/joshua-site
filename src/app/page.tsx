import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Situation } from "@/components/situation";
import { JsonLd } from "@/components/json-ld";
import { brl, packages, startingPackage } from "@/lib/pricing";
import { demoUrl, monthlyPrice, openGraph, site } from "@/lib/site";

const title = "Joshua · Sistema de gestão para integradoras";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: openGraph("/", title, site.description),
};

/* Text needs AA contrast on paper, so the evidence uses the darkest ladder step. */
const marginHigh = "var(--color-margin-high)";

const flow = ["Proposta", "Aceite", "Projeto", "Compras", "Obra", "Campo", "Financeiro"];

const priced = packages.filter((p): p is typeof p & { monthly: number } => p.monthly !== null);

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: site.description,
  url: site.url,
  publisher: { "@type": "Organization", name: site.publisher },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "BRL",
    lowPrice: startingPackage.monthly,
    highPrice: Math.max(...priced.map((p) => p.monthly)),
    offerCount: priced.length,
    offers: priced.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.monthly,
      priceCurrency: "BRL",
      priceSpecification: monthlyPrice(p.monthly),
    })),
  },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-[120px]">
      <JsonLd data={softwareApplication} />
      <SiteHeader />

      <main>
        <section className="border-b border-line pt-20 pb-16 md:pt-28 md:pb-24">
          <p className="caption mb-7 text-brand">Para donos de integradora</p>
          <h1 className="mb-14 max-w-[15ch] text-display font-light tracking-[-0.045em] md:mb-18">
            O técnico mais antigo saiu de férias.{" "}
            <span className="block font-bold">E a empresa parou junto.</span>
          </h1>
          <div className="grid gap-8 text-lede md:ml-[33%] md:grid-cols-2 md:gap-20">
            <p>
              A planta estava no celular dele. A lista de material, na cabeça do projetista. A última
              proposta, no WhatsApp do vendedor. Nenhuma dessas pessoas fez nada errado: é a empresa
              que ainda não tem onde guardar o que sabe.
            </p>
            <p>
              O Joshua é esse lugar. Da proposta à obra entregue, o que sua equipe sabe fica no
              sistema, e a empresa{" "}
              <span className="highlight">vende mais sem depender de quem está de plantão.</span>
            </p>
          </div>
        </section>

        <section id="problema" aria-labelledby="problema-titulo" className="py-6">
          <h2 id="problema-titulo" className="sr-only">
            Situações que o Joshua resolve
          </h2>

          <Situation
            n="01"
            title="O desconto que comeu a obra."
            evidence={[
              { label: "Desconto", value: "5%" },
              { label: "Total", value: "R$ 45.790", tone: marginHigh },
            ]}
            caption="O total muda de cor conforme a margem."
          >
            <p>
              Você descobre no fim da obra que trabalhou quase de graça. No Joshua, a margem muda de
              cor enquanto o vendedor baixa o preço. Ele negocia sabendo até onde pode ir, e você
              para de ser surpreendido no fechamento.
            </p>
          </Situation>

          <Situation
            n="02"
            title="As horas que ninguém cobrou."
            evidence={[
              { label: 'Caixa in-ceiling 8"', value: "Instalação 1,5 h" },
              { label: "Keypad 6 teclas", value: "Programação 0,5 h" },
            ]}
            caption="Horas cadastradas uma vez, usadas em toda venda."
          >
            <p>
              Instalação e programação saem no chute, ou ficam de fora, ou dependem do olho do técnico
              veterano. Cada produto já traz as horas por tipo de profissional, e até o vendedor que
              chegou ontem monta a proposta com as contas certas.
            </p>
          </Situation>

          <Situation
            n="03"
            title="O cliente aprovou. E agora?"
            evidence={[
              { label: "Aceite", value: "3 parcelas criadas" },
              { label: "Engenharia", value: "Projeto aberto" },
            ]}
            caption="Um aceite, três departamentos sabendo."
          >
            <p>
              O financeiro lança parcela por parcela e a engenharia nem sabe que a obra existe. No
              aceite, as parcelas aparecem no financeiro e o projeto entra no quadro da engenharia,
              sem ninguém digitar nada de novo.
            </p>
          </Situation>

          <Situation
            n="04"
            title="Só o projetista mais antigo sabe quanto cabo vai."
            evidence={[
              { label: "Regras de cálculo", value: "Da sua empresa" },
              { label: "Lista de material", value: "Gerada do projeto" },
            ]}
            caption="O critério sai da cabeça e entra no sistema."
          >
            <p>
              Quando ele erra ou sai da empresa, falta material na obra. Com as regras de cálculo da
              sua empresa gravadas no sistema, um projetista menos experiente monta o planejamento do
              mesmo jeito.
            </p>
          </Situation>

          <Situation
            n="05"
            title="“O ponto não foi instalado.”"
            evidence={[
              { label: "Câmera 04 · garagem", value: "Concluído 14:32" },
              { label: "Evidência", value: "Foto com legenda" },
            ]}
            caption="O que acontece em campo chega ao escritório com prova."
          >
            <p>
              A foto que provaria o contrário ficou no celular do técnico. Cada serviço concluído
              volta ao escritório com foto e legenda, e o motivo fica escrito quando algo não foi
              feito. A discussão com o cliente acaba ali.
            </p>
          </Situation>

          <Situation
            n="06"
            title="O vendedor saiu, e o negócio foi junto."
            evidence={[
              { label: "Planta", value: "Na ficha do negócio" },
              { label: "Última proposta", value: "Na ficha do negócio" },
            ]}
            caption="O negócio fica com a empresa, não com o vendedor."
          >
            <p>
              Férias, demissão, troca de carteira: ninguém acha a planta, a última proposta ou o que
              foi combinado com o cliente. Com tudo junto na ficha do negócio, quem assume continua
              de onde ele parou.
            </p>
          </Situation>
        </section>

        <section
          id="como-funciona"
          aria-labelledby="como-funciona-titulo"
          className="border-b border-line py-20 md:py-28"
        >
          <p className="caption mb-7 text-brand">Como funciona</p>
          <h2
            id="como-funciona-titulo"
            className="mb-10 max-w-[24ch] text-section font-light tracking-[-0.025em]"
          >
            Um sistema só, em que cada departamento enxerga o que o anterior fez.
          </h2>
          <ol className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-section font-bold tracking-[-0.025em]">
            {flow.map((step, i) => (
              <li key={step} className="flex items-baseline gap-3">
                {step}
                {i < flow.length - 1 && (
                  <span aria-hidden="true" className="font-light text-mute">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[60ch] text-lede text-body">
            No escritório, pelo navegador. Em campo, pelo aplicativo do técnico, que funciona mesmo
            sem sinal. Cada um vê o que precisa para fazer a sua parte, e o dono vê tudo.
          </p>
        </section>

        <section aria-labelledby="preco-titulo" className="py-24 md:ml-[176px] md:py-32">
          <h2 id="preco-titulo" className="caption mb-7 text-brand">
            Quanto custa
          </h2>
          <p className="mb-10 max-w-[28ch] text-section font-light leading-tight tracking-[-0.02em] md:text-[2.25rem]">
            Um plano com todos os módulos. Você paga pelo tamanho da equipe:{" "}
            <strong className="font-bold">
              a partir de {brl.format(startingPackage.monthly)} por mês
            </strong>
            , até {startingPackage.maxUsers} pessoas.{" "}
            <Link href="/precos" className="cta-link font-bold">
              Ver os pacotes
            </Link>
          </p>
          <p className="mb-10 max-w-[28ch] text-section font-light leading-tight tracking-[-0.02em] md:text-[2.25rem]">
            Antes de qualquer coisa, a gente conversa.{" "}
            <a href={demoUrl()} target="_blank" rel="noopener" className="cta-link">
              Marque uma demonstração <span aria-hidden="true">→</span>
              <span className="sr-only"> (abre o WhatsApp)</span>
            </a>
          </p>
          <p className="caption text-mute">
            Quem conduz a demonstração é o Claudio, do time do Joshua · 30 a 60 minutos
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
