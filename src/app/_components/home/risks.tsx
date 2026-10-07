import { Section } from "../ui/section";
import { Panel } from "../ui/panel";
import { Chip } from "../ui/chip";
import { RISKS } from "@/content/risks";

export function Risks() {
  return (
    <Section
      divider
      id="riscos"
      eyebrow="Riscos cognitivos"
      title="Nove riscos que afetam a execução."
      lead="Cada risco terá definição, sinais, funções relacionadas e controles. As fichas são publicadas à medida que o conteúdo tiver fonte validada."
    >
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {RISKS.map((r) => (
          <Panel as="li" compact key={r.id} className="flex min-h-[96px] flex-col justify-between gap-3">
            <span className="font-mono text-sm font-medium">{r.id}</span>
            {r.status === "GAP" || !r.title ? <Chip variant="gap" /> : <span className="font-medium">{r.title}</span>}
          </Panel>
        ))}
      </ul>
    </Section>
  );
}
