import Container from "../container";
import { SectionHeader } from "../section-header";
import { GapChip } from "../gap-chip";
import { RISKS } from "@/content/risks";

export function Risks() {
  return (
    <section aria-labelledby="riscos" className="border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="riscos"
          eyebrow="Riscos cognitivos"
          title="Nove riscos que afetam a execução."
          lead="Cada risco terá definição, sinais, funções relacionadas e controles. As fichas são publicadas à medida que o conteúdo tiver fonte validada."
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {RISKS.map((r) => (
            <li key={r.id} className="card-micro flex min-h-[96px] flex-col justify-between gap-3">
              <span className="font-mono text-sm font-medium">{r.id}</span>
              {r.status === "GAP" || !r.title ? (
                <GapChip />
              ) : (
                <span className="font-medium">{r.title}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
