import Link from "next/link";
import Container from "../container";
import { SectionHeader } from "../section-header";
import { FUNCTIONS } from "@/content/functions";
import { ArrowRight, FunctionIcon } from "../icons";

export function MapPreview() {
  return (
    <section aria-labelledby="mapa" className="border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="mapa"
          eyebrow="Mapa"
          title="Três funções, uma rede de relações."
          lead="Cada função sustenta demandas diferentes. O mapa mostra o que cada uma faz, o que pode dar errado e o que ajuda."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FUNCTIONS.map((f) => (
            <article key={f.id} className="card-feature flex flex-col">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-action text-action">
                <FunctionIcon id={f.id} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{f.name}</h3>
              <p className="mt-2 text-muted">{f.lead}</p>
              <div className="card-micro mt-8 self-start">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">Estratégia</p>
                <p className="mt-1 text-sm font-medium">{f.strategy}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/mapas" className="btn btn-secondary mt-8">
          Abrir o mapa interativo <ArrowRight />
        </Link>
      </Container>
    </section>
  );
}
