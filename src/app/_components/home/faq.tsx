import { Section } from "../ui/section";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <Section divider id="faq" eyebrow="Perguntas frequentes" title="Limites, segurança e dúvidas.">
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {FAQ.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden="true" className="font-mono text-action-text transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="max-w-measure pb-4 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
