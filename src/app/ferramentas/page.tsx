import type { Metadata } from "next";
import Container from "@/app/_components/container";
import { GapChip } from "@/app/_components/gap-chip";
import { SectionHeader } from "@/app/_components/section-header";
import { TOOL_STEPS, TOOLS } from "@/content/tools";

export const metadata: Metadata = {
  title: "Ferramentas",
  description: "Do risco observado à próxima ação: ferramentas práticas em três passos.",
};

// Padrão de ferramenta (D-06): orientação → entrada progressiva → resultado/exportação.
const TOOL_SCREENS = [
  { n: "Tela 01", role: "Instrução", items: ["O que você vai fazer", "O que precisa ter em mãos", "3 passos"] },
  { n: "Tela 02", role: "Formulário", items: ["Uma decisão por vez", "Revelação progressiva", "Sem formulário gigante"] },
  { n: "Tela 03", role: "Resultado", items: ["Resumo", "Plano e próxima ação", "PDF / impressão"] },
] as const;

export default function FerramentasPage() {
  return (
    <main>
      {/* 01 HERO */}
      <section className="border-b border-line">
        <Container className="pb-16 pt-16">
          <p className="eyebrow mb-5">Ferramentas</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Do risco observado à próxima ação.
          </h1>
        </Container>
      </section>

      {/* 02 COMO FUNCIONA */}
      <section aria-labelledby="como-funciona" className="page-block">
        <Container>
          <SectionHeader id="como-funciona" title="Como funciona" />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {TOOL_STEPS.map((s) => (
              <li key={s.n} className="card-feature">
                <span className="font-mono text-sm text-action">{s.n}</span>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 03 CATÁLOGO */}
      <section aria-labelledby="catalogo" className="page-block border-t border-line">
        <Container>
          <SectionHeader
            id="catalogo"
            title="Catálogo de ferramentas"
            lead="As ferramentas estão em preparação. Cada uma será publicada quando o fluxo e o tratamento de dados estiverem prontos."
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <li key={t.id} className="card-feature">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  {t.status === "GAP" && <GapChip />}
                </div>
                <p className="mt-2 text-muted">{t.purpose}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 04 EXECUÇÃO DA FERRAMENTA */}
      <section aria-labelledby="execucao" className="page-block border-t border-line">
        <Container>
          <SectionHeader
            id="execucao"
            title="Como cada ferramenta é usada"
            lead="Toda ferramenta segue as mesmas três telas."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {TOOL_SCREENS.map((s, i) => (
              <li key={s.n} className="card-micro" style={{ padding: "1.25rem" }}>
                <p className="font-mono text-xs uppercase tracking-wider text-muted">{s.n}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.role}</h3>
                <ul className="mt-3 space-y-1 text-muted">
                  {s.items.map((it) => (
                    <li key={it}>— {it}</li>
                  ))}
                </ul>
                {i < TOOL_SCREENS.length - 1 && (
                  <span aria-hidden="true" className="mt-3 block font-mono text-muted md:hidden">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 05 PRIVACIDADE / LIMITES */}
      <section aria-labelledby="privacidade" className="page-block border-t border-line">
        <Container>
          <SectionHeader id="privacidade" title="Privacidade e limites" />
          <div className="mt-6 max-w-measure space-y-3 text-muted">
            <p>
              Antes de qualquer ferramenta ser publicada, esta seção vai dizer o que é guardado, onde e
              por quanto tempo.
            </p>
            <p>As ferramentas ajudam a organizar a execução. Não são diagnóstico nem avaliação clínica.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
