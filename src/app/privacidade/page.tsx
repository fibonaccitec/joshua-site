import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageBand } from "@/components/page-band";
import { Toc } from "@/components/toc";
import { openGraph, shell, supportEmail } from "@/lib/site";

const description =
  "Política de Privacidade do Joshua OPS: quais dados o app de campo coleta, como são usados, armazenados e compartilhados, e os seus direitos pela LGPD.";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description,
  alternates: { canonical: "/privacidade" },
  openGraph: openGraph("/privacidade", "Política de Privacidade | Joshua", description),
};

const sections = [
  { id: "introducao", label: "1. Introdução" },
  { id: "dados-coletados", label: "2. Dados que coletamos" },
  { id: "uso", label: "3. Como utilizamos os dados" },
  { id: "armazenamento", label: "4. Armazenamento e segurança" },
  { id: "compartilhamento", label: "5. Compartilhamento de dados" },
  { id: "permissoes", label: "6. Permissões do dispositivo" },
  { id: "retencao", label: "7. Retenção de dados" },
  { id: "direitos", label: "8. Seus direitos (LGPD)" },
  { id: "menores", label: "9. Menores de idade" },
  { id: "alteracoes", label: "10. Alterações nesta política" },
  { id: "contato", label: "11. Contato" },
] as const;

type Row = readonly [string, string, string];

function Required() {
  return (
    <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-brand">
      Obrigatório
    </span>
  );
}

function Optional() {
  return (
    <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-mute">
      Opcional
    </span>
  );
}

function DataTable({ head, rows }: { head: Row; rows: readonly Row[] }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-[0.9375rem]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-line px-3 py-2.5 text-left text-[0.8125rem] font-semibold text-brand"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} className="border-b border-line/60 px-3 py-2.5 align-top text-body">
                  {cell === "Obrigatório" ? <Required /> : cell === "Opcional" ? <Optional /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const dataHead: Row = ["Dado", "Finalidade", "Tipo"];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <SiteHeader />

      <main>
        <PageBand
          title="Política de Privacidade"
          lede="Joshua OPS, aplicativo de gestão de serviços em campo."
        />

        <div
          className={`${shell} grid gap-14 pt-14 pb-24 md:pb-32 lg:grid-cols-[240px_minmax(0,1fr)]`}
        >
          <Toc items={sections} />

          <article className="max-w-[720px] min-w-0 text-base leading-[1.7] text-body [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:text-[1.375rem] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-[1.0625rem] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mb-1.5 [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
            <h2 id="introducao">1. Introdução</h2>
            <p>
              Esta Política de Privacidade descreve como o aplicativo <strong>Joshua OPS</strong>{" "}
              (&quot;Aplicativo&quot;), desenvolvido e operado por <strong>Fibonacci</strong>{" "}
              (&quot;nós&quot;, &quot;nosso&quot;), coleta, utiliza, armazena e protege os dados
              pessoais dos seus usuários (&quot;você&quot;, &quot;usuário&quot;).
            </p>
            <p>
              O Joshua OPS é um aplicativo corporativo destinado a técnicos de campo para gestão de
              ordens de serviço, requisições de materiais e registro de execução de serviços. O
              acesso é restrito a colaboradores autorizados pelas empresas clientes.
            </p>

            <h2 id="dados-coletados">2. Dados que Coletamos</h2>
            <h3>2.1 Dados de Autenticação</h3>
            <DataTable
              head={dataHead}
              rows={[
                ["E-mail corporativo", "Identificação e login no aplicativo", "Obrigatório"],
                ["Token de sessão", "Manter o usuário autenticado de forma segura", "Obrigatório"],
                [
                  "Biometria (Face ID / Touch ID)",
                  "Autenticação rápida e segura no dispositivo",
                  "Opcional",
                ],
              ]}
            />
            <h3>2.2 Dados de Execução de Serviços</h3>
            <DataTable
              head={dataHead}
              rows={[
                [
                  "Fotografias",
                  "Registro de evidências de execução dos serviços em campo",
                  "Obrigatório",
                ],
                ["Localização (em uso)", "Registrar onde os serviços foram executados", "Opcional"],
              ]}
            />
            <h3>2.3 Dados Técnicos</h3>
            <DataTable
              head={dataHead}
              rows={[
                [
                  "Token de notificação push",
                  "Enviar alertas sobre requisições e ordens de serviço",
                  "Obrigatório",
                ],
                ["Dados em cache local", "Permitir uso offline do aplicativo", "Obrigatório"],
              ]}
            />

            <h2 id="uso">3. Como Utilizamos os Dados</h2>
            <p>Utilizamos os dados coletados exclusivamente para:</p>
            <ul>
              <li>
                <strong>Autenticação e segurança</strong> — verificar a identidade do usuário e
                proteger o acesso à conta
              </li>
              <li>
                <strong>Operação do serviço</strong> — registrar a execução de serviços em campo com
                evidências fotográficas e localização
              </li>
              <li>
                <strong>Comunicação operacional</strong> — notificar sobre novas requisições,
                atualizações de ordens de serviço e alertas relevantes
              </li>
              <li>
                <strong>Funcionamento offline</strong> — armazenar dados temporariamente no
                dispositivo para uso sem conexão à internet
              </li>
            </ul>
            <p>
              <strong>Não utilizamos</strong> seus dados para fins publicitários, marketing direto,
              venda a terceiros ou qualquer finalidade não relacionada à operação do aplicativo.
            </p>

            <h2 id="armazenamento">4. Armazenamento e Segurança</h2>
            <h3>4.1 Armazenamento em Nuvem</h3>
            <p>
              Os dados são armazenados em servidores <strong>Supabase</strong> (infraestrutura
              PostgreSQL), hospedados na região <strong>América do Sul (sa-east-1)</strong>, com:
            </p>
            <ul>
              <li>Criptografia em trânsito (TLS/HTTPS)</li>
              <li>Criptografia em repouso</li>
              <li>
                Políticas de segurança em nível de linha (Row Level Security) para isolamento de
                dados entre empresas
              </li>
              <li>Autenticação via tokens JWT com expiração automática</li>
            </ul>
            <h3>4.2 Armazenamento no Dispositivo</h3>
            <p>No seu dispositivo, armazenamos:</p>
            <ul>
              <li>
                <strong>Tokens de autenticação</strong> — em armazenamento seguro do sistema
                operacional (Keychain no iOS, Keystore no Android)
              </li>
              <li>
                <strong>Cache de dados operacionais</strong> — em banco SQLite local, isolado no
                sandbox do aplicativo pelo sistema operacional e removido ao fazer logout
              </li>
              <li>
                <strong>Dados biométricos</strong> — processados exclusivamente pelo sistema
                operacional do dispositivo; o Joshua OPS nunca acessa ou armazena dados biométricos
                diretamente
              </li>
            </ul>

            <h2 id="compartilhamento">5. Compartilhamento de Dados</h2>
            <p>Seus dados são compartilhados apenas com:</p>
            <ul>
              <li>
                <strong>Sua empresa empregadora</strong> — que contratou o serviço Joshua e
                administra as ordens de serviço
              </li>
              <li>
                <strong>Supabase Inc.</strong> — como provedor de infraestrutura em nuvem
                (sub-processador)
              </li>
              <li>
                <strong>Expo / EAS</strong> — para entrega de notificações push ao dispositivo
              </li>
            </ul>
            <p>
              <strong>Não vendemos, alugamos ou compartilhamos</strong> dados pessoais com terceiros
              para fins comerciais, publicitários ou de marketing.
            </p>

            <h2 id="permissoes">6. Permissões do Dispositivo</h2>
            <DataTable
              head={["Permissão", "Motivo", "Quando é solicitada"]}
              rows={[
                [
                  "Câmera",
                  "Fotografar evidências de execução dos serviços",
                  "Ao registrar conclusão de serviço",
                ],
                [
                  "Localização (em uso)",
                  "Registrar onde os serviços foram executados",
                  "Ao registrar execução de serviço",
                ],
                [
                  "Face ID / Touch ID",
                  "Autenticação rápida e segura",
                  "Ao ativar biometria nas configurações",
                ],
                [
                  "Notificações",
                  "Alertas sobre requisições e ordens de serviço",
                  "No primeiro acesso ao aplicativo",
                ],
              ]}
            />
            <p>
              Todas as permissões podem ser revogadas a qualquer momento nas configurações do
              dispositivo. A revogação pode limitar funcionalidades específicas do aplicativo.
            </p>

            <h2 id="retencao">7. Retenção de Dados</h2>
            <ul>
              <li>
                <strong>Dados operacionais</strong> (fotos, registros de serviço) — retidos enquanto
                a empresa cliente mantiver contrato ativo com a Fibonacci
              </li>
              <li>
                <strong>Dados de autenticação</strong> — removidos quando o acesso do usuário é
                desativado pelo administrador da empresa
              </li>
              <li>
                <strong>Cache local</strong> — removido automaticamente ao fazer logout ou ao
                desinstalar o aplicativo
              </li>
              <li>
                <strong>Tokens de sessão</strong> — a sessão é encerrada automaticamente após 8
                horas de inatividade
              </li>
            </ul>

            <h2 id="direitos">8. Seus Direitos (LGPD)</h2>
            <p>
              Em conformidade com a{" "}
              <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>, você tem direito
              a:
            </p>
            <ul>
              <li>
                <strong>Acesso</strong> — solicitar quais dados pessoais possuímos sobre você
              </li>
              <li>
                <strong>Correção</strong> — solicitar a correção de dados incompletos ou inexatos
              </li>
              <li>
                <strong>Eliminação</strong> — solicitar a exclusão de dados pessoais desnecessários
              </li>
              <li>
                <strong>Portabilidade</strong> — solicitar a transferência dos seus dados a outro
                fornecedor
              </li>
              <li>
                <strong>Revogação de consentimento</strong> — retirar consentimento a qualquer
                momento
              </li>
              <li>
                <strong>Informação</strong> — saber com quem seus dados são compartilhados
              </li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail abaixo. Responderemos em até
              15 dias úteis.
            </p>

            <h2 id="menores">9. Menores de Idade</h2>
            <p>
              O Joshua OPS é um aplicativo corporativo destinado exclusivamente a profissionais
              autorizados. Não coletamos intencionalmente dados de menores de 18 anos.
            </p>

            <h2 id="alteracoes">10. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Alterações
              significativas serão comunicadas por meio de notificação no aplicativo. A data da
              última atualização está indicada ao final deste documento.
            </p>

            <h2 id="contato">11. Contato</h2>
            <div className="rounded-screen bg-brand/5 p-6 [&_p]:mb-1">
              <p>
                <strong>Fibonacci</strong>
              </p>
              <p>
                E-mail:{" "}
                <a href={`mailto:${supportEmail}`} className="font-semibold text-brand">
                  {supportEmail}
                </a>
              </p>
              <p>Responsável pela Proteção de Dados (DPO): Equipe de Privacidade Fibonacci</p>
            </div>

            <p className="mt-10 text-sm text-mute">Última atualização: 11 de setembro de 2026</p>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
