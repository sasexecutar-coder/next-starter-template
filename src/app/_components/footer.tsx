import Link from "next/link";
import Container from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      <Container className="grid gap-8 py-12 md:grid-cols-[1fr_2fr]">
        <div>
          <Wordmark />
          <p className="mt-2 text-sm text-muted">{SITE.description}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-medium text-ink">Limites</p>
          <p className="mt-2 max-w-measure">
            O conteúdo deste site é educativo. Não é diagnóstico, avaliação clínica nem substitui
            acompanhamento profissional.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 md:col-span-2">
          <Link href="/storyboard" className="inline-flex min-h-[44px] items-center text-sm text-muted hover:text-ink">
            Storyboard de componentes
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
