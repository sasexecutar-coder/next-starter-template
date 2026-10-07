import Container from "../container";
import { SectionHeader } from "../section-header";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <section aria-labelledby="faq" className="page-block border-t border-line">
      <Container>
        <SectionHeader id="faq" eyebrow="Perguntas frequentes" title="Limites, segurança e dúvidas." />
        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {item.q}
                <span aria-hidden="true" className="font-mono text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-measure text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
