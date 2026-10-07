import { RELATION_CHAIN } from "@/content/relations";
import { Panel } from "./ui/panel";

// Acento semântico só onde há significado (D-11): Risco = vermelho, Controle = verde.
const ACCENT: Record<string, string> = {
  Risco: "border-l-4 border-l-risk",
  Controle: "border-l-4 border-l-solution",
};

export function RelationChain() {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Cadeia de relações">
      {RELATION_CHAIN.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <Panel compact ticks={false} className={`font-medium ${ACCENT[step] ?? ""}`}>
            <span className="mr-2 font-mono text-xs text-action-text">{String(i + 1).padStart(2, "0")}</span>
            {step}
          </Panel>
          {i < RELATION_CHAIN.length - 1 && (
            <span aria-hidden="true" className="text-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
