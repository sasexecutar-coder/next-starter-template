import type { ContentStatus } from "./types";

export type Tool = {
  id: string;
  name: string;
  purpose: string;
  status: ContentStatus;
};

// Catálogo definido em D-06. Nenhuma ferramenta funcional nesta fase.
export const TOOLS: Tool[] = [
  { id: "mapa-de-risco", name: "Mapa de risco", purpose: "Localizar onde a execução costuma falhar.", status: "GAP" },
  { id: "planejamento-visual", name: "Planejamento visual", purpose: "Transformar uma meta em etapas visíveis.", status: "GAP" },
  { id: "proxima-acao", name: "Próxima ação", purpose: "Definir o próximo passo concreto.", status: "GAP" },
  { id: "plano-semanal", name: "Plano semanal", purpose: "Distribuir as etapas na semana.", status: "GAP" },
  { id: "status", name: "Status / acompanhamento", purpose: "Acompanhar o que andou e o que travou.", status: "GAP" },
];

export const TOOL_STEPS = [
  { n: "1", title: "Entenda", text: "O que você vai fazer, o que precisa ter em mãos e os passos." },
  { n: "2", title: "Preencha", text: "Uma decisão por vez, sem formulário gigante." },
  { n: "3", title: "Gere", text: "Resumo, plano e próxima ação, prontos para PDF ou impressão." },
] as const;
