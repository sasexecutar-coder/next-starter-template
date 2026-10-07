import type { ContentStatus } from "./types";

export type ExecutiveFunction = {
  id: "inibicao" | "memoria" | "flexibilidade";
  name: string;
  summary: string;
  lead: string;
  demand: string;
  difficulty: string;
  strategy: string;
  relatedRisks: string[]; // IDs RC-xx; vazio enquanto não houver fonte
  evidence: string[]; // referências; vazio = GAP
  status: ContentStatus;
  source: string;
};

// Lista canônica: decisão D-05 (Inibição, Memória de Trabalho, Flexibilidade Cognitiva).
// Textos: protótipo Brain Home v2 (docs/design-kit/04-handoff/prototipos/brain-home-v2.html).
const PROTOTYPE = "docs/design-kit/04-handoff/prototipos/brain-home-v2.html";

export const FUNCTIONS: ExecutiveFunction[] = [
  {
    id: "inibicao",
    name: "Inibição",
    summary: "Ajuda a focar e evitar distrações.",
    lead: "Ajuda a focar no que importa e a segurar respostas automáticas.",
    demand: "Manter a atenção na tarefa diante de estímulos concorrentes.",
    difficulty: "Responder no impulso e trocar de tarefa a cada notificação.",
    strategy:
      "Reduzir gatilhos no ambiente: notificações desligadas e blocos de foco com horário.",
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    source: PROTOTYPE,
  },
  {
    id: "memoria",
    name: "Memória de Trabalho",
    summary: "Mantém e manipula informações no curto prazo.",
    lead: "Mantém e manipula informações enquanto você executa uma tarefa.",
    demand: "Lidar com múltiplas informações ao mesmo tempo.",
    difficulty: "Esquecer etapas, perder o fio da tarefa e se sobrecarregar.",
    strategy: "Externalizar no ambiente: listas, checklists e blocos visuais.",
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    source: PROTOTYPE,
  },
  {
    id: "flexibilidade",
    name: "Flexibilidade Cognitiva",
    summary: "Permite adaptar estratégias e lidar com mudanças.",
    lead: "Permite adaptar estratégias e lidar com mudanças de plano.",
    demand: "Ajustar o caminho quando as condições ou prioridades mudam.",
    difficulty:
      "Insistir em uma abordagem que não funciona e desorganizar-se com imprevistos.",
    strategy: "Prever um plano B e revisar o plano em checkpoints curtos.",
    relatedRisks: [],
    evidence: [],
    status: "PUBLISHED",
    source: PROTOTYPE,
  },
];
