import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PageBand } from "@/components/page-band";
import { openGraph, shell, supportEmail } from "@/lib/site";

const description =
  "Central de suporte do Joshua OPS, o app de campo do Joshua: contato por e-mail e respostas sobre login, uso sem internet, fotos, localização e exclusão de dados.";

export const metadata: Metadata = {
  title: "Suporte",
  description,
  alternates: { canonical: "/suporte" },
  openGraph: openGraph("/suporte", "Suporte · Joshua", description),
};

const faq = [
  {
    q: "Como faço login no app?",
    a: "Use o e-mail e senha fornecidos pela sua empresa. Se não tem credenciais, entre em contato com o administrador da sua organização.",
  },
  {
    q: "O app funciona sem internet?",
    a: "Sim. O Joshua OPS funciona offline. Seus dados são sincronizados automaticamente quando a conexão for restabelecida.",
  },
  {
    q: "Como excluir minha conta ou meus dados?",
    a: `O acesso ao Joshua OPS é provisionado pela empresa em que você trabalha: não há criação de conta dentro do aplicativo. Para desativar seu acesso, fale com o administrador da sua organização. Para solicitar a exclusão dos seus dados pessoais, envie um e-mail para ${supportEmail} a partir do endereço cadastrado. A solicitação é processada em até 15 dias úteis.`,
  },
  {
    q: "Minhas fotos são seguras?",
    a: "Sim. Todas as fotos são armazenadas com criptografia em servidores seguros na América do Sul e são acessíveis apenas pela sua organização.",
  },
  {
    q: "O app usa minha localização?",
    a: "Apenas quando você está executando um serviço, para registrar onde o trabalho foi realizado. A localização não é rastreada em segundo plano.",
  },
] as const;

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function SupportPage() {
  return (
    <div className="bg-white">
      <JsonLd data={faqPage} />
      <SiteHeader />

      <main>
        <PageBand
          title="Central de suporte do Joshua OPS."
          lede="O app de campo do Joshua. Escreva para a gente e respondemos em até 2 dias úteis."
        />

        <div className={`${shell} pb-24 md:pb-32`}>
          <section
            aria-label="Contato"
            className="flex flex-col gap-6 rounded-screen bg-white p-8 shadow-float md:flex-row md:items-center md:gap-14"
          >
            <div>
              <p className="text-sm font-semibold text-mute">E-mail</p>
              <p className="mt-1 text-[1.375rem] font-bold tracking-[-0.01em]">{supportEmail}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-mute">Tempo de resposta</p>
              <p className="mt-1 text-[1.375rem] font-bold tracking-[-0.01em]">Até 2 dias úteis</p>
            </div>
            <a
              href={`mailto:${supportEmail}`}
              className="rounded-full bg-signal px-6 py-3.5 text-center text-[0.9375rem] font-bold text-on-signal transition-colors hover:bg-ink hover:text-on-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:ml-auto"
            >
              Escrever para o suporte
            </a>
          </section>

          <section
            aria-labelledby="faq-titulo"
            className="mt-18 grid gap-8 md:grid-cols-[260px_1fr] md:gap-10"
          >
            <h2 id="faq-titulo" className="text-[1.375rem] font-bold tracking-[-0.02em]">
              Perguntas frequentes
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

          <p className="mt-14 text-[0.9375rem] text-mute md:ml-[300px]">
            Veja também a{" "}
            <Link href="/privacidade" className="font-semibold text-brand hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
