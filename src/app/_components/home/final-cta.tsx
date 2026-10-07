import Link from "next/link";
import Container from "../container";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-final" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-lg bg-indigo px-6 py-12 text-white sm:px-12">
          <h2 id="cta-final" className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
            Comece pelo mapa ou por uma ferramenta.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/mapas" className="btn bg-white text-indigo hover:bg-light-blue">
              Explorar o mapa
            </Link>
            <Link href="/ferramentas" className="btn border-white text-white hover:bg-white/10">
              Ver ferramentas
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
