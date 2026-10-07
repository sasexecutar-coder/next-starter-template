import { Section } from "../ui/section";
import { Panel } from "../ui/panel";
import { Chip } from "../ui/chip";
import { Button } from "../ui/button";
import { ArrowRight } from "../icons";
import { TOOLS } from "@/content/tools";

export function ToolsPreview() {
  return (
    <Section
      divider
      id="ferramentas"
      eyebrow="Ferramentas"
      title="Do risco observado à próxima ação."
      lead="Ferramentas práticas em três passos: entenda, preencha, gere."
    >
      <ToolGrid />
      <Button href="/ferramentas" className="stack-section">
        Conhecer as ferramentas <ArrowRight />
      </Button>
    </Section>
  );
}

export function ToolGrid() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.map((t) => (
        <Panel as="li" key={t.id}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold">{t.name}</h3>
            {t.status === "GAP" && <Chip variant="gap" />}
          </div>
          <p className="mt-2 text-muted">{t.purpose}</p>
        </Panel>
      ))}
    </ul>
  );
}
