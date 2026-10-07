import Container from "../container";
import { SectionHeader } from "../section-header";
import { FUNCTIONS } from "@/content/functions";

// Dores reconhecíveis = "dificuldade possível" de cada função (fonte: protótipo Brain Home v2).
export function Problem() {
  return (
    <section aria-labelledby="problema" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="problema"
          eyebrow="O problema"
          title="Quando a execução trava, quase nunca é falta de vontade."
          lead="Algumas dificuldades aparecem com frequência quando a demanda passa do que as funções executivas sustentam naquele momento."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {FUNCTIONS.map((f) => (
            <li key={f.id} className="card-feature">
              <p className="text-lg font-medium leading-snug">{f.difficulty}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">{f.name}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
