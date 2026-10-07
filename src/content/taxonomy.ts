// Taxonomia do blog (D-27). Fonte: handoff de arquitetura UX, seção "Adaptação ao blog".
// Valores "a definir" no handoff ficam com label null (GAP) e não aparecem como filtro.

export type Term = { id: string; label: string | null };

export const TYPES = [
  { id: "artigo", label: "Artigo" },
  { id: "guia", label: "Guia" },
  { id: "asset", label: "Asset" },
  { id: "video", label: "Vídeo" },
] as const satisfies readonly Term[];
export type TypeId = (typeof TYPES)[number]["id"];

// Os 3 pilares editoriais existem como vagas; nomes a definir (GAP).
export const PILLARS: Term[] = [
  { id: "pilar-1", label: null },
  { id: "pilar-2", label: null },
  { id: "pilar-3", label: null },
];

// Frente do Programa (proposta do handoff, a validar).
export const PROGRAMS: Term[] = [
  { id: "executar-app", label: "Executar App" },
  { id: "consultoria", label: "Consultoria e serviços" },
  { id: "marketplace", label: "Marketplace" },
  { id: "comunidade", label: "Comunidade" },
  { id: "schola-ai", label: "Schola.ai" },
];

// Situação do leitor: valores a definir com o público (GAP).
export const USE_CASES: Term[] = [];

export const FILTER_GROUPS = [
  { key: "tipo", label: "Tipo", terms: TYPES as readonly Term[] },
  { key: "pilar", label: "Pilar editorial", terms: PILLARS },
  { key: "frente", label: "Frente do Programa", terms: PROGRAMS },
  { key: "situacao", label: "Situação do leitor", terms: USE_CASES },
] as const;
export type FilterKey = (typeof FILTER_GROUPS)[number]["key"];

export const typeLabel = (id?: string) => TYPES.find((t) => t.id === id)?.label ?? "Artigo";
export const termLabel = (terms: readonly Term[], id?: string) => terms.find((t) => t.id === id)?.label ?? null;
