import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { GapChip } from "@/app/_components/gap-chip";
import { RelationChain } from "@/app/_components/relation-chain";
import { SectionHeader } from "@/app/_components/section-header";
import { FUNCTIONS } from "@/content/functions";
import { RISKS } from "@/content/risks";
import { BrainStage } from "@/app/_components/brain/brain-stage";

export const metadata: Metadata = {
  title: "Mapas",
  description: "Entenda sua execução no mapa: funções executivas, demandas, dificuldades e estratégias.",
};

// Rota /mapas — contrato D-05 (8 seções).
export default function MapasPage() {
  return (
    <main>
      {/* 01 HERO */}
      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <p className="eyebrow mb-5">Mapas</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Entenda sua execução no mapa.
          </h1>
        </Container>
      </section>

      {/* 02 ORIENTAÇÃO */}
      <section aria-labelledby="orientacao" className="py-10">
        <Container>
          <div className="max-w-3xl border-l-4 border-attention-ink bg-attention/40 px-5 py-4">
            <h2 id="orientacao" className="font-semibold">
              Como ler este mapa
            </h2>
            <ul className="mt-2 list-disc pl-5 text-ink">
              <li>O mapa mostra relações.</li>
              <li>Não é diagnóstico.</li>
              <li>Não representa “uma função = uma região cerebral”.</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* 03 MAPA (cérebro 3D, D-22) · 04 SELETOR (marcadores e pontos) · 05 DETALHE (card) */}
      <section aria-label="Mapa interativo das funções" className="pb-16">
        <Container>
          <BrainStage functions={FUNCTIONS} variant="mapas" />
        </Container>
      </section>

      {/* 06 RISCOS RELACIONADOS */}
      <section aria-labelledby="riscos-relacionados" className="border-t border-line py-16">
        <Container>
          <SectionHeader
            id="riscos-relacionados"
            title="Riscos relacionados"
            lead="As ligações entre cada função e os riscos RC-01 a RC-09 serão publicadas com as fichas de risco."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {RISKS.map((r) => (
              <li key={r.id} className="card-micro flex items-center gap-3">
                <span className="font-mono text-sm font-medium">{r.id}</span>
                {r.status === "GAP" && <GapChip />}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 07 RELAÇÕES */}
      <section aria-labelledby="relacoes" className="border-t border-line py-16">
        <Container>
          <SectionHeader id="relacoes" title="Relações" lead="Como uma demanda chega a um impacto — e onde o controle entra." />
          <div className="mt-8">
            <RelationChain />
          </div>
        </Container>
      </section>

      {/* 08 FONTES / LIMITES */}
      <section aria-labelledby="fontes" className="border-t border-line py-16">
        <Container>
          <SectionHeader id="fontes" title="Fontes e limites" />
          <div className="mt-6 max-w-measure space-y-3 text-muted">
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
        </Container>
      </section>
    </main>
  );
}
