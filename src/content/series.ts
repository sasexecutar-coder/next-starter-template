import type { ContentStatus } from "./types";

export type SeriesItem = {
  number: string;
  title: string;
  level: "FUNDADOR" | "BASE EXPLICATIVA" | "DESDOBRAMENTO PRÁTICO";
  topics: string[];
  slug: string | null; // post publicado em _posts; null = em preparação
  status: ContentStatus;
};

// Série editorial: docs/design-kit/03-editorial/arquitetura/esquemas-editoriais.md
export const SERIES: SeriesItem[] = [
  { number: "00", title: "O que são riscos cognitivos?", level: "FUNDADOR", topics: ["tese central", "o problema", "lógica da série"], slug: null, status: "GAP" },
  { number: "01", title: "O conceito", level: "BASE EXPLICATIVA", topics: ["o que é", "o que não é", "limites do conceito"], slug: null, status: "GAP" },
  { number: "02", title: "O mecanismo", level: "BASE EXPLICATIVA", topics: ["funções executivas", "gestão de riscos", "gestão de projetos"], slug: null, status: "GAP" },
  { number: "03", title: "Os impactos", level: "BASE EXPLICATIVA", topics: ["rotina", "estudos", "trabalho"], slug: null, status: "GAP" },
  { number: "04", title: "O que fazer", level: "DESDOBRAMENTO PRÁTICO", topics: ["estratégias práticas", "ferramentas", "mapas", "checklists", "planejamento"], slug: null, status: "GAP" },
];
