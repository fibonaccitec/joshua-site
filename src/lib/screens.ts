/**
 * Real Joshua screens shown on the marketing site. Every capture had its
 * customer data replaced with fictitious names and values before export.
 */
export type Screen = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const webScreens = {
  oportunidades: {
    src: "/screens/web-oportunidades.webp",
    width: 1600,
    height: 1000,
    alt: "Funil de oportunidades do Joshua, com colunas Prospect, Frio, Morno e Quente e o valor de cada negócio",
  },
  proposta: {
    src: "/screens/web-proposta.webp",
    width: 1040,
    height: 968,
    alt: "Proposta no Joshua montada por soluções, com o total em verde indicando margem saudável",
  },
  projetos: {
    src: "/screens/web-projetos.webp",
    width: 1600,
    height: 1000,
    alt: "Quadro de projetos do Joshua por situação: aguardando aprovação, em execução, fila de espera",
  },
  compras: {
    src: "/screens/web-compras.webp",
    width: 1600,
    height: 1000,
    alt: "Ordens de compra do Joshua agrupadas por etapa, do orçamento ao recebido",
  },
  obra: {
    src: "/screens/web-obra.webp",
    width: 1600,
    height: 1000,
    alt: "Painel de uma obra no Joshua com vendas, pontos, progresso por etapa e linha do tempo",
  },
} as const satisfies Record<string, Screen>;

export const appScreens = {
  osLista: {
    src: "/screens/app-os-lista.webp",
    width: 645,
    height: 1398,
    alt: "App de campo do Joshua mostrando a lista de ordens de serviço do técnico",
  },
  osDetalhe: {
    src: "/screens/app-os-detalhe.webp",
    width: 645,
    height: 1398,
    alt: "App de campo do Joshua com os serviços de uma ordem de serviço",
  },
  confirmarInstalacao: {
    src: "/screens/app-confirmar-instalacao.webp",
    width: 645,
    height: 1398,
    alt: "App de campo do Joshua pedindo a confirmação da instalação de um item",
  },
  servicoConcluido: {
    src: "/screens/app-servico-concluido.webp",
    width: 645,
    height: 1398,
    alt: "App de campo do Joshua registrando um serviço concluído com solução e foto",
  },
} as const satisfies Record<string, Screen>;
