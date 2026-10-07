import { RELATION_CHAIN } from "@/content/relations";

// Acento semântico só onde há significado (D-11): Risco = vermelho, Controle = verde.
const ACCENT: Record<string, string> = {
  Risco: "border-risk",
  Controle: "border-solution",
};

export function RelationChain() {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Cadeia de relações">
      {RELATION_CHAIN.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className={`card-micro border-l-4 ${ACCENT[step] ?? "border-transparent"} font-medium`}>
            <span className="mr-2 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            {step}
          </span>
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
