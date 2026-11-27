import type { Screen } from "@/lib/screens";

/**
 * Segment landing pages. Every screen under /screens/segmentos was captured
 * from the real product with fictitious, segment-specific data.
 *
 * Honesty rule: `notDone` lists what Joshua does not do for the segment, and
 * the copy must never promise those things (see docs in the SEO plan).
 */
export type SegmentSlug =
  | "energia-solar"
  | "ar-condicionado"
  | "automacao-e-seguranca"
  | "esquadrias-e-vidracarias"
  | "cortinas-e-persianas";

type Row = {
  /** The pain, in the segment's own words. */
  before: string;
  /** What changes with Joshua. Only features that exist. */
  after: string;
  screen: Screen;
  /** Field-app screens render as a phone. */
  phone?: boolean;
};

export type Segment = {
  slug: SegmentSlug;
  /** Short label for chips and links. */
  label: string;
  /** Page <title> (the layout appends "| Joshua"). */
  title: string;
  description: string;
  h1: string;
  lede: string;
  /** schema.org BusinessAudience.audienceType */
  audience: string;
  /** "O que muda na sua ..." */
  changeHeading: string;
  rows: readonly Row[];
  notDone: readonly string[];
  notDoneNote: string;
  faq: readonly { q: string; a: string }[];
  /** WhatsApp opening message for this segment. */
  demoMessage: string;
};

const web = (slug: SegmentSlug, name: "proposta" | "obra" | "compras", alt: string): Screen => ({
  src: `/screens/segmentos/${slug}-${name}.webp`,
  width: name === "proposta" ? 1040 : 1600,
  height: name === "proposta" ? 968 : 1000,
  alt,
});

const app = (slug: SegmentSlug, name: "servico-concluido", alt: string): Screen => ({
  src: `/screens/segmentos/${slug}-app-${name}.webp`,
  width: 645,
  height: 1398,
  alt,
});

export const segments: readonly Segment[] = [
  {
    slug: "energia-solar",
    label: "Energia solar",
    title: "Sistema para empresa de energia solar",
    description:
      "Para integradoras solares: proposta com margem, compra do kit, obra com etapas de homologação, app do instalador offline e financeiro. A partir de R$ 690/mês.",
    h1: "Sistema de gestão para empresas de energia solar",
    lede: "Da proposta à usina instalada, sem perder margem nem material no caminho.",
    audience: "Empresas de energia solar fotovoltaica",
    changeHeading: "O que muda na sua integradora solar",
    rows: [
      {
        before: "Vende bem e só descobre a margem quando a obra acaba.",
        after:
          "A proposta junta kit e mão de obra por solução e mostra a margem em cor enquanto você monta o desconto.",
        screen: web(
          "energia-solar",
          "proposta",
          "Proposta de sistema fotovoltaico de 8,8 kWp no Joshua, com módulos, inversor, estrutura e total em verde",
        ),
      },
      {
        before: "O kit chega e ninguém sabe o que foi para qual telhado.",
        after:
          "Ordens de compra e requisições ficam ligadas à obra, e o instalador registra no app o que retirou e o que devolveu.",
        screen: web(
          "energia-solar",
          "compras",
          "Ordens de compra de kits solares no Joshua, agrupadas por situação, do orçamento ao recebido",
        ),
      },
      {
        before: "A homologação atrasa e o cliente cobra no WhatsApp.",
        after:
          "A obra anda por etapas que você define, da visita técnica à troca do medidor, com a história toda registrada.",
        screen: web(
          "energia-solar",
          "obra",
          "Painel de obra solar no Joshua com etapas de projeto, homologação e instalação",
        ),
      },
      {
        before: "A foto do serviço pronto some no celular do instalador.",
        after:
          "O app de campo guarda a solução e a foto na ordem de serviço, mesmo sem sinal no telhado.",
        screen: app(
          "energia-solar",
          "servico-concluido",
          "App de campo do Joshua registrando a conclusão da instalação dos módulos, com solução e foto",
        ),
        phone: true,
      },
    ],
    notDone: [
      "Dimensionamento e simulação de geração",
      "Pedido de acesso no portal da distribuidora",
      "Monitoramento de usinas",
    ],
    notDoneNote:
      "Use o Joshua junto com o seu software de dimensionamento: o kit escolhido entra na proposta e acompanha a obra.",
    faq: [
      {
        q: "Serve para integradora solar pequena?",
        a: "Sim. Uma integradora com até 5 pessoas, entre vendas, projeto e instaladores, cabe no pacote Standard, de R$ 690 por mês.",
      },
      {
        q: "O app funciona sem internet no telhado?",
        a: "Funciona. O instalador registra módulos, inversor e fotos sem sinal, e o app envia tudo quando a conexão volta.",
      },
      {
        q: "O Joshua faz o dimensionamento do sistema?",
        a: "Não. Faça o dimensionamento no seu software e traga o kit para a proposta do Joshua.",
      },
      {
        q: "Dá para acompanhar a homologação?",
        a: "Sim, como etapas da obra: pedido de acesso, parecer, vistoria e troca do medidor, cada uma com percentual e registro na linha do tempo.",
      },
    ],
    demoMessage:
      "Olá! Tenho uma empresa de energia solar e quero agendar uma demonstração do Joshua.",
  },
  {
    slug: "ar-condicionado",
    label: "Ar-condicionado",
    title: "Sistema para empresa de ar-condicionado",
    description:
      "Para instaladoras de split, multi-split e VRF: proposta com margem, compras, obra por etapas, app offline do técnico e financeiro. A partir de R$ 690/mês.",
    h1: "Sistema de gestão para empresas de ar-condicionado e climatização",
    lede: "Do orçamento do split ao start-up do VRF, a obra inteira num só lugar.",
    audience: "Empresas de instalação de ar-condicionado e climatização",
    changeHeading: "O que muda na sua instaladora de ar-condicionado",
    rows: [
      {
        before: "O orçamento sai pelo WhatsApp e a margem só aparece no fim.",
        after:
          "Condensadora, evaporadoras, tubulação e horas de instalação na mesma proposta, com a margem em cor antes de enviar.",
        screen: web(
          "ar-condicionado",
          "proposta",
          "Proposta de sistema VRF no Joshua, com condensadora, evaporadoras, tubulação e total em verde",
        ),
      },
      {
        before: "Falta tubulação no meio da obra e alguém corre até a loja.",
        after:
          "Compras e requisições ficam ligadas à obra, e o técnico registra no app o material que saiu e o que voltou.",
        screen: web(
          "ar-condicionado",
          "compras",
          "Ordens de compra de equipamentos de climatização no Joshua",
        ),
      },
      {
        before: "Ninguém sabe se a carga de gás do 2º andar já foi feita.",
        after:
          "Etapas com percentual (infraestrutura, drenos, vácuo, carga de gás e start-up) e a linha do tempo de cada decisão.",
        screen: web(
          "ar-condicionado",
          "obra",
          "Painel de obra de climatização no Joshua com etapas de instalação e start-up",
        ),
      },
      {
        before: "A foto do serviço fica no celular do instalador.",
        after: "Cada ordem de serviço guarda solução e foto, mesmo sem sinal na laje.",
        screen: app(
          "ar-condicionado",
          "servico-concluido",
          "App de campo do Joshua registrando a conclusão da instalação de uma evaporadora, com solução e foto",
        ),
        phone: true,
      },
    ],
    notDone: [
      "PMOC e manutenção preventiva recorrente",
      "Cálculo de carga térmica",
      "Projeto em CAD",
    ],
    notDoneNote:
      "O Joshua cuida da venda e da instalação; o plano de manutenção continua na sua ferramenta atual.",
    faq: [
      {
        q: "Serve para quem instala split residencial?",
        a: "Sim. Um split residencial vira uma proposta simples e uma obra com poucas etapas. Para equipes de até 5 pessoas, o Standard custa R$ 690 por mês.",
      },
      {
        q: "Funciona para obras de VRF?",
        a: "Sim. A obra é acompanhada por etapas e por pontos, como evaporadoras, drenos e controles, com cada decisão registrada.",
      },
      {
        q: "O Joshua faz PMOC?",
        a: "Não. O foco é a venda e a instalação, não a manutenção recorrente.",
      },
      {
        q: "O app funciona sem sinal na obra?",
        a: "Funciona. O técnico registra vácuo, carga de gás e fotos mesmo sem sinal na laje, e o app envia tudo quando a conexão volta.",
      },
    ],
    demoMessage:
      "Olá! Tenho uma empresa de ar-condicionado e quero agendar uma demonstração do Joshua.",
  },
  {
    slug: "automacao-e-seguranca",
    label: "Automação e segurança",
    title: "Sistema para integradoras de automação e segurança",
    description:
      "Automação residencial, home theater, CFTV e redes: proposta com margem, compras, obra por pontos, app offline do técnico e financeiro num só sistema.",
    h1: "Sistema de gestão para integradoras de automação, áudio e vídeo e segurança eletrônica",
    lede: "Pontos, ambientes e o cronograma da construtora, da proposta ao treinamento do cliente.",
    audience: "Integradoras de automação, áudio e vídeo e segurança eletrônica",
    changeHeading: "O que muda na sua integradora",
    rows: [
      {
        before: "Só descobre o lucro depois que a obra acaba.",
        after:
          "CFTV, rede, automação e som na mesma proposta, por solução, com a margem em cor enquanto você negocia.",
        screen: web(
          "automacao-e-seguranca",
          "proposta",
          "Proposta de CFTV, rede, automação e som ambiente no Joshua",
        ),
      },
      {
        before: "A equipe chega na obra e falta cabo.",
        after:
          "Compras e requisições ligadas à obra, com retirada e devolução de material registradas no app.",
        screen: web(
          "automacao-e-seguranca",
          "compras",
          "Ordens de compra de equipamentos de automação e segurança no Joshua",
        ),
      },
      {
        before: "A obra segue o cronograma da construtora e ninguém sabe em que pé está.",
        after:
          "Etapas com percentual e pontos por tipo (câmeras, rede, keypads, som), com a linha do tempo de cada obra.",
        screen: web(
          "automacao-e-seguranca",
          "obra",
          "Painel de obra de automação no Joshua com pontos por tipo e etapas",
        ),
      },
      {
        before: "O cliente diz que o ponto não foi instalado.",
        after: "Cada serviço concluído volta ao escritório com solução e foto.",
        screen: app(
          "automacao-e-seguranca",
          "servico-concluido",
          "App de campo do Joshua registrando a conclusão da instalação de uma câmera, com solução e foto",
        ),
        phone: true,
      },
    ],
    notDone: [
      "Central de monitoramento de alarmes",
      "Programação dos dispositivos de automação",
      "Contratos de manutenção com SLA",
    ],
    notDoneNote:
      "O Joshua organiza a venda e a obra; a programação continua na ferramenta de cada fabricante.",
    faq: [
      {
        q: "Serve para empresa de segurança eletrônica?",
        a: "Serve para quem vende e instala CFTV, alarmes, controle de acesso e redes. A central de monitoramento fica fora do Joshua.",
      },
      {
        q: "Dá para controlar os pontos de cada obra?",
        a: "Sim. A obra mostra os pontos por tipo, como câmeras, rede, keypads e som, junto com as etapas e o percentual de cada uma.",
      },
      {
        q: "Serve para integradora pequena?",
        a: "Sim. Uma integradora com até 5 pessoas, contando quem vende, quem projeta e quem instala, cabe no pacote Standard, de R$ 690 por mês.",
      },
      {
        q: "O técnico consegue usar o app sem internet?",
        a: "Funciona. O técnico registra câmeras, pontos de rede e fotos mesmo sem sinal na obra, e o app envia tudo quando a conexão volta.",
      },
    ],
    demoMessage:
      "Olá! Tenho uma integradora de automação e segurança e quero agendar uma demonstração do Joshua.",
  },
  {
    slug: "esquadrias-e-vidracarias",
    label: "Esquadrias e vidraçarias",
    title: "Sistema para empresa de esquadrias e vidraçaria",
    description:
      "Para vidraçarias e empresas de esquadrias que instalam na obra: orçamento com margem, compras de perfis e vidros, obra por etapas e app do instalador.",
    h1: "Sistema de gestão para empresas de esquadrias e vidraçarias que instalam na obra",
    lede: "Da medição à vedação, cada vão acompanhado sem planilha.",
    audience: "Empresas de esquadrias, vidraçarias e serralherias",
    changeHeading: "O que muda na sua empresa de esquadrias",
    rows: [
      {
        before: "O orçamento passa por três pessoas e a margem some no desconto.",
        after:
          "Esquadrias, sacada, box e instalação na mesma proposta, com a margem em cor e assinatura digital do cliente.",
        screen: web(
          "esquadrias-e-vidracarias",
          "proposta",
          "Orçamento de esquadrias de alumínio e envidraçamento de sacada no Joshua",
        ),
      },
      {
        before: "O vidro chega errado e ninguém sabe de qual pedido era.",
        after: "Pedidos de perfis, vidros e acessórios ligados à obra, do orçamento ao recebido.",
        screen: web(
          "esquadrias-e-vidracarias",
          "compras",
          "Ordens de compra de perfis e vidros no Joshua",
        ),
      },
      {
        before: "A construtora pergunta em que pé está a instalação.",
        after:
          "Etapas que você define (medição, produção, contramarcos, instalação, vedação, vistoria) com percentual e histórico.",
        screen: web(
          "esquadrias-e-vidracarias",
          "obra",
          "Painel de obra de esquadrias no Joshua com etapas de medição a vistoria",
        ),
      },
      {
        before: "O cliente reclama da vedação depois da entrega.",
        after: "O instalador fecha cada serviço no app com solução e foto do vão pronto.",
        screen: app(
          "esquadrias-e-vidracarias",
          "servico-concluido",
          "App de campo do Joshua registrando a conclusão da instalação de uma janela, com solução e foto",
        ),
        phone: true,
      },
    ],
    notDone: [
      "Cálculo de esquadrias por tipologia",
      "Plano de corte e otimização de barras",
      "Controle de produção da fábrica",
    ],
    notDoneNote:
      "Use o Joshua junto com o seu software de cálculo: o resultado entra no orçamento e acompanha a obra.",
    faq: [
      {
        q: "Serve para vidraçaria pequena?",
        a: "Sim. Uma vidraçaria com até 5 pessoas, entre balcão, medição e instalação, cabe no pacote Standard, de R$ 690 por mês.",
      },
      {
        q: "O Joshua calcula esquadrias e plano de corte?",
        a: "Não. O cálculo continua no seu software; o Joshua cuida do orçamento, das compras, da obra e da equipe de instalação.",
      },
      {
        q: "Funciona em obra de construtora?",
        a: "Sim. Cada obra tem etapas, pontos por tipo (janelas, portas, box) e os envolvidos, como construtora e arquiteto.",
      },
      {
        q: "O app funciona sem internet no andar da obra?",
        a: "Funciona. O instalador registra cada vão e as fotos mesmo sem sinal no andar, e o app envia tudo quando a conexão volta.",
      },
    ],
    demoMessage: "Olá! Tenho uma empresa de esquadrias e quero agendar uma demonstração do Joshua.",
  },
  {
    slug: "cortinas-e-persianas",
    label: "Cortinas e persianas",
    title: "Sistema para empresa de cortinas e persianas",
    description:
      "Da medição à instalação: orçamento com margem, assinatura digital, compras, agenda de instaladores e app com foto do serviço. Para quem vende e instala.",
    h1: "Sistema de gestão para empresas de cortinas, persianas e toldos que vendem e instalam",
    lede: "Medição, pedido à fábrica e instalação no mesmo fluxo, com foto de cada vão pronto.",
    audience: "Empresas de cortinas, persianas e toldos",
    changeHeading: "O que muda na sua empresa de cortinas e persianas",
    rows: [
      {
        before: "O orçamento fica no caderno e o desconto come a margem.",
        after:
          "Cortinas, persianas, motorização e instalação na mesma proposta, com a margem em cor e assinatura digital.",
        screen: web(
          "cortinas-e-persianas",
          "proposta",
          "Orçamento de cortinas, persianas e motorização no Joshua",
        ),
      },
      {
        before: "A fábrica atrasa e ninguém avisa o cliente.",
        after:
          "Cada pedido à fábrica fica ligado à obra, com a situação à vista: aguardando, enviado, em trânsito, recebido.",
        screen: web(
          "cortinas-e-persianas",
          "compras",
          "Pedidos de tecidos, persianas e trilhos no Joshua",
        ),
      },
      {
        before: "O cliente liga perguntando quando a cortina fica pronta.",
        after:
          "A obra mostra as etapas da medição à entrega, os pontos por tipo e o que aconteceu em cada dia.",
        screen: web(
          "cortinas-e-persianas",
          "obra",
          "Painel de obra de cortinas e persianas no Joshua com etapas de medição a entrega",
        ),
      },
      {
        before: "O cliente diz que a persiana ficou torta.",
        after: "Cada instalação concluída volta com foto, registrada na ordem de serviço.",
        screen: app(
          "cortinas-e-persianas",
          "servico-concluido",
          "App de campo do Joshua registrando a conclusão da instalação de uma persiana, com solução e foto",
        ),
        phone: true,
      },
    ],
    notDone: [
      "Cálculo de tecido por metro",
      "Ordem de produção da confecção",
      "Emissão de nota fiscal",
    ],
    notDoneNote:
      "O Joshua acompanha a venda, o pedido e a instalação; a confecção e a nota fiscal ficam nas ferramentas que você já usa.",
    faq: [
      {
        q: "Serve para loja pequena?",
        a: "Sim. Uma loja com até 5 pessoas, contando vendedores e instaladores, cabe no pacote Standard, de R$ 690 por mês.",
      },
      {
        q: "Funciona para projetos de prédio ou hotel?",
        a: "Sim. Cada obra tem etapas, pontos por tipo (cortinas, persianas, motores) e os envolvidos, como arquiteto e síndico.",
      },
      {
        q: "O Joshua emite nota fiscal?",
        a: "Não. A nota fiscal continua no sistema que você já usa.",
      },
      {
        q: "O instalador consegue usar o app sem internet?",
        a: "Funciona. O instalador registra cada cortina e persiana com foto mesmo sem sinal, e o app envia tudo quando a conexão volta.",
      },
    ],
    demoMessage:
      "Olá! Tenho uma empresa de cortinas e persianas e quero agendar uma demonstração do Joshua.",
  },
];

/** Other kinds of companies that sell an installed product; mentioned, no page. */
export const otherSegments =
  "Também para elétrica, carregadores de veículo elétrico, marcenaria planejada e outras empresas que vendem e instalam.";

export function segmentBySlug(slug: SegmentSlug): Segment {
  const found = segments.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown segment: ${slug}`);
  return found;
}

export const segmentPath = (slug: SegmentSlug) => `/segmentos/${slug}`;

/** Data for the "Qual é a sua empresa?" picker: the first pain and its proposal screen. */
export const pickerItems = segments.map((s) => ({
  slug: s.slug,
  label: s.label,
  href: segmentPath(s.slug),
  before: s.rows[0].before,
  after: s.rows[0].after,
  screen: s.rows[0].screen,
}));
