import type { Metadata } from "next";
import { Chip } from "@/app/_components/ui/chip";
import { Callout } from "@/app/_components/ui/callout";
import { Panel } from "@/app/_components/ui/panel";
import { Section } from "@/app/_components/ui/section";
import { RelationChain } from "@/app/_components/relation-chain";
import { FUNCTIONS } from "@/content/functions";
import { RISKS } from "@/content/risks";
import { BrainStage } from "@/app/_components/brain/brain-stage";

export const metadata: Metadata = {
  title: "Mapas",
  description: "Entenda sua execução no mapa: funções executivas, demandas, dificuldades e estratégias.",
};

// Rota /mapas — contrato D-05 (8 seções). Ritmo D-34: cada <Section> é um bloco.
export default function MapasPage() {
  return (
    <main>
      {/* 01 HERO + 02 ORIENTAÇÃO (callout v2 na cor da marca, D-32/D-35) */}
      <Section as="h1" eyebrow="Mapas" title="Entenda sua execução no mapa." id="mapas-titulo" className="border-b border-line">
        <Callout title="Como ler este mapa" titleId="orientacao" className="max-w-3xl">
          <ul className="list-disc pl-6">
            <li>O mapa mostra relações.</li>
            <li>Não é diagnóstico.</li>
            <li>Não representa “uma função = uma região cerebral”.</li>
          </ul>
        </Callout>
      </Section>

      {/* 03 MAPA (cérebro 3D, D-22) · 04 SELETOR (marcadores e pontos) · 05 DETALHE (painel) */}
      <Section label="Mapa interativo das funções">
        <BrainStage functions={FUNCTIONS} variant="mapas" />
      </Section>

      {/* 06 RISCOS RELACIONADOS */}
      <Section
        divider
        id="riscos-relacionados"
        title="Riscos relacionados"
        lead="As ligações entre cada função e os riscos RC-01 a RC-09 serão publicadas com as fichas de risco."
      >
        <ul className="flex flex-wrap gap-2">
          {RISKS.map((r) => (
            <Panel as="li" compact ticks={false} key={r.id} className="flex items-center gap-3">
              <span className="font-mono text-sm font-medium">{r.id}</span>
              {r.status === "GAP" && <Chip variant="gap" />}
            </Panel>
          ))}
        </ul>
      </Section>

      {/* 07 RELAÇÕES */}
      <Section divider id="relacoes" title="Relações" lead="Como uma demanda chega a um impacto — e onde o controle entra.">
        <RelationChain />
      </Section>

      {/* 08 FONTES / LIMITES */}
      <Section divider id="fontes" title="Fontes e limites">
        <div className="max-w-measure space-y-3 text-muted">
          <p>
            Os textos das funções vêm do mapa interativo do projeto (Brain Home v1). As referências
            científicas de cada ficha estão em preparação e serão citadas aqui.
          </p>
          <p>
            O modelo 3D é a anatomia real de um cérebro adulto (OpenNeuro ds006128, licença CC0). Os
            marcadores indicam pontos de acesso a redes distribuídas, não regiões clínicas exatas: o mapa
            não avalia pessoas, não localiza funções no cérebro e não substitui acompanhamento profissional.
          </p>
        </div>
      </Section>
    </main>
  );
}
