import type { ContentStatus } from "./types";

export type FunctionId = "plan" | "stop" | "mem" | "flex";

export type ExecutiveFunction = {
  id: FunctionId;
  name: string;
  short: string;
  lead: string;
  demand: string;
  difficulty: string;
  strategy: string;
  // Direção da âncora no espaço do objeto do cérebro (+x anterior, +y superior, +z hemisfério direito).
  // Conceitual: marca a entrada de uma rede distribuída, não uma localização clínica.
  dir: [number, number, number];
  relatedRisks: string[]; // IDs RC-xx; vazio enquanto não houver fonte
  evidence: string[]; // referências; vazio = GAP
  status: ContentStatus;
  draft: boolean; // HANDOFF: texto ainda em rascunho, pendente de aprovação G2
  source: string;
};

// Lista e textos canônicos: Brain Home v1 (D-05 atualizada, D-22).
const SOT = "docs/design-kit/04-handoff/brain-home/brain-home-v1.html";

export const FUNCTIONS: ExecutiveFunction[] = [
  {
    id: "plan",
    name: "Planejamento",
    short: "Define metas, organiza passos e prioriza ações.",
    lead: "Define metas, organiza passos e prioriza ações antes de começar.",
    demand: "Transformar um objetivo em uma sequência de etapas com ordem e prazo.",
    difficulty: "Começar sem rota, subestimar o tempo e travar na primeira decisão.",
    strategy: "Quebrar a meta em próximos passos visíveis, cada um com data.",
    dir: [1, 0.25, 0.3],
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    draft: true,
    source: SOT,
  },
  {
    id: "stop",
    name: "Controle inibitório",
    short: "Ajuda a focar e evitar distrações.",
    lead: "Ajuda a focar no que importa e a segurar respostas automáticas.",
    demand: "Manter a atenção na tarefa diante de estímulos concorrentes.",
    difficulty: "Responder no impulso e trocar de tarefa a cada notificação.",
    strategy: "Reduzir gatilhos no ambiente: notificações desligadas e blocos de foco com horário.",
    dir: [0.55, -0.55, 0.65],
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    draft: true,
    source: SOT,
  },
  {
    id: "mem",
    name: "Memória de trabalho",
    short: "Mantém e manipula informações no curto prazo.",
    lead: "Mantém e manipula informações enquanto você executa uma tarefa.",
    demand: "Lidar com múltiplas informações ao mesmo tempo.",
    difficulty: "Esquecer etapas, perder o fio da tarefa e se sobrecarregar.",
    strategy: "Externalizar no ambiente: listas, checklists e blocos visuais.",
    dir: [0.2, 0.85, 0.5],
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    draft: false,
    source: SOT,
  },
  {
    id: "flex",
    name: "Flexibilidade",
    short: "Permite adaptar estratégias e lidar com mudanças.",
    lead: "Permite adaptar estratégias e lidar com mudanças de plano.",
    demand: "Ajustar o caminho quando as condições ou prioridades mudam.",
    difficulty: "Insistir em uma abordagem que não funciona e desorganizar-se com imprevistos.",
    strategy: "Prever um plano B e revisar o plano em checkpoints curtos.",
    dir: [-0.65, 0.55, 0.55],
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    draft: true,
    source: SOT,
  },
];
