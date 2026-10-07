import { Section } from "../ui/section";
import { Panel } from "../ui/panel";
import { Eyebrow } from "../ui/eyebrow";
import { FUNCTIONS } from "@/content/functions";

// Dores reconhecíveis = "dificuldade possível" de cada função (fonte: Brain Home v1).
export function Problem() {
  return (
    <Section
      id="problema"
      eyebrow="O problema"
      title="Quando a execução trava, quase nunca é falta de vontade."
      lead="Algumas dificuldades aparecem com frequência quando a demanda passa do que as funções executivas sustentam naquele momento."
    >
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FUNCTIONS.map((f) => (
          <Panel as="li" key={f.id}>
            <p className="text-lg font-medium leading-snug">{f.difficulty}</p>
            <Eyebrow className="mt-3">{f.name}</Eyebrow>
          </Panel>
        ))}
      </ul>
    </Section>
  );
}
