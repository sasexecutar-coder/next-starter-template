import type { Metadata } from "next";
import { Panel } from "@/app/_components/ui/panel";
import { Eyebrow } from "@/app/_components/ui/eyebrow";
import { Section } from "@/app/_components/ui/section";
import { ToolGrid } from "@/app/_components/home/tools-preview";
import { TOOL_STEPS } from "@/content/tools";

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
      <Section as="h1" eyebrow="Ferramentas" title="Do risco observado à próxima ação." id="ferramentas-titulo" className="border-b border-line" />

      {/* 02 COMO FUNCIONA */}
      <Section id="como-funciona" title="Como funciona">
        <ol className="grid gap-8 md:grid-cols-3">
          {TOOL_STEPS.map((s) => (
            <Panel as="li" key={s.n}>
              <span className="font-mono text-sm text-action-text">{s.n}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </Panel>
          ))}
        </ol>
      </Section>

      {/* 03 CATÁLOGO */}
      <Section
        divider
        id="catalogo"
        title="Catálogo de ferramentas"
        lead="As ferramentas estão em preparação. Cada uma será publicada quando o fluxo e o tratamento de dados estiverem prontos."
      >
        <ToolGrid />
      </Section>

      {/* 04 EXECUÇÃO DA FERRAMENTA */}
      <Section divider id="execucao" title="Como cada ferramenta é usada" lead="Toda ferramenta segue as mesmas três telas.">
        <ol className="grid gap-8 md:grid-cols-3">
          {TOOL_SCREENS.map((s, i) => (
            <Panel as="li" tone="subtle" ticks={false} key={s.n}>
              <Eyebrow>{s.n}</Eyebrow>
              <h3 className="mt-2 text-lg font-semibold">{s.role}</h3>
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
            </Panel>
          ))}
        </ol>
      </Section>

      {/* 05 PRIVACIDADE / LIMITES */}
      <Section divider id="privacidade" title="Privacidade e limites">
        <div className="max-w-measure space-y-3 text-muted">
          <p>
            Antes de qualquer ferramenta ser publicada, esta seção vai dizer o que é guardado, onde e
            por quanto tempo.
          </p>
          <p>As ferramentas ajudam a organizar a execução. Não são diagnóstico nem avaliação clínica.</p>
        </div>
      </Section>
    </main>
  );
}
