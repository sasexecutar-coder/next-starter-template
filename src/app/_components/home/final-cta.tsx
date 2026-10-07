import { Section } from "../ui/section";
import { Button } from "../ui/button";

// D-31: os dois CTAs são primários azuis; o bloco mantém o fundo índigo da marca.
export function FinalCta() {
  return (
    <Section label="Comece agora">
      <div className="rounded-xl bg-indigo px-6 py-12 text-on-dark sm:px-12">
        <h2 id="cta-final" className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
          Comece pelo mapa ou por uma ferramenta.
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/mapas">Explorar o mapa</Button>
          <Button href="/ferramentas">Ver ferramentas</Button>
        </div>
      </div>
    </Section>
  );
}
