import Container from "./container";
import { Wordmark } from "./wordmark";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-subtle">
      <Container className="grid gap-6 py-12 md:grid-cols-[1fr_2fr]">
        <div>
          <Wordmark />
          <p className="mt-2 text-sm text-muted">{SITE.description}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-ink">Limites</p>
          <p className="mt-1 max-w-measure">
            O conteúdo deste site é educativo. Não é diagnóstico, avaliação clínica nem substitui
            acompanhamento profissional.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
