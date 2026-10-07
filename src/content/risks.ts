import type { ContentStatus } from "./types";

export type CognitiveRisk = {
  id: string;
  title: string | null; // null = sem fonte ainda
  summary: string | null;
  status: ContentStatus;
};

// RC-01…RC-09: IDs definidos no projeto; títulos e descrições ainda sem fonte (GAP).
export const RISKS: CognitiveRisk[] = Array.from({ length: 9 }, (_, i) => ({
  id: `RC-0${i + 1}`,
  title: null,
  summary: null,
  status: "GAP" as const,
}));
