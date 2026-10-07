import { Section } from "../ui/section";
import { RelationChain } from "../relation-chain";

export function HowItWorks() {
  return (
    <Section
      divider
      id="como-funciona"
      eyebrow="Como funciona"
      title="Da demanda ao controle."
      lead="Uma demanda encontra uma vulnerabilidade. Com exposição, vira risco; o risco pode virar um evento com impacto. O controle entra para interromper essa cadeia."
    >
      <RelationChain />
    </Section>
  );
}
