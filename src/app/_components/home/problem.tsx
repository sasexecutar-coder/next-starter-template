import Container from "../container";
import { SectionHeader } from "../section-header";
import { FUNCTIONS } from "@/content/functions";

// Dores reconhecíveis = "dificuldade possível" de cada função (fonte: Brain Home v1).
export function Problem() {
  return (
    <section aria-labelledby="problema" className="page-block">
      <Container>
        <SectionHeader
          id="problema"
          eyebrow="O problema"
          title="Quando a execução trava, quase nunca é falta de vontade."
          lead="Algumas dificuldades aparecem com frequência quando a demanda passa do que as funções executivas sustentam naquele momento."
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
