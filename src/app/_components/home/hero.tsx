import Link from "next/link";
import Container from "../container";
import { FUNCTIONS } from "@/content/functions";
import { FunctionIcon } from "../icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 id="hero-title" className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Entenda sua execução.
          </h1>
          <p className="mt-6 max-w-xl text-xl text-muted" style={{ textWrap: "balance" }}>
            Explore as relações entre funções executivas, demandas e estratégias — e transforme o que
            você entendeu em uma próxima ação.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mapas" className="btn btn-primary">
              Explorar o mapa
            </Link>
            <Link href="/ferramentas" className="btn btn-secondary">
              Ver ferramentas
            </Link>
          </div>
        </div>
        {/* Visual principal: figura monocromática; azul = ação (D-11) */}
        <figure aria-label="As três funções executivas do mapa" className="card-feature">
          <ul className="grid gap-3">
            {FUNCTIONS.map((f) => (
              <li key={f.id} className="card-micro flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-action text-action">
                  <FunctionIcon id={f.id} />
                </span>
                <span>
                  <span className="block font-medium">{f.name}</span>
                  <span className="block text-sm text-muted">{f.summary}</span>
                </span>
              </li>
            ))}
          </ul>
        </figure>
      </Container>
    </section>
  );
}
