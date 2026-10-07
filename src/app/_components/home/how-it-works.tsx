import Container from "../container";
import { SectionHeader } from "../section-header";
import { RelationChain } from "../relation-chain";

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona" className="page-block border-t border-line">
      <Container>
        <SectionHeader
          id="como-funciona"
          eyebrow="Como funciona"
          title="Da demanda ao controle."
          lead="Uma demanda encontra uma vulnerabilidade. Com exposição, vira risco; o risco pode virar um evento com impacto. O controle entra para interromper essa cadeia."
        />
        <div className="mt-10">
          <RelationChain />
        </div>
      </Container>
    </section>
  );
}
