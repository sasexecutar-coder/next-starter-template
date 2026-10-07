import Link from "next/link";
import Container from "../container";
import { SectionHeader } from "../section-header";
import { GapChip } from "../gap-chip";
import { ArrowRight } from "../icons";
import { TOOLS } from "@/content/tools";

export function ToolsPreview() {
  return (
    <section aria-labelledby="ferramentas" className="page-block border-t border-line">
      <Container>
        <SectionHeader
          id="ferramentas"
          eyebrow="Ferramentas"
          title="Do risco observado à próxima ação."
          lead="Ferramentas práticas em três passos: entenda, preencha, gere."
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
        <Link href="/ferramentas" className="btn btn-secondary mt-12">
          Conhecer as ferramentas <ArrowRight />
        </Link>
      </Container>
    </section>
  );
}
