import Link from "next/link";
import Container from "../container";
import { BrainStage } from "../brain/brain-stage";
import { FUNCTIONS } from "@/content/functions";

// Bloco 01 + 03 (D-24): composição do Brain Home v1 — mapa interativo no Hero.
const STEPS = [
  {
    n: "01",
    title: "Entenda",
    text: "Conheça as funções executivas e como elas influenciam sua execução no dia a dia.",
    href: "/mapas",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  {
    n: "02",
    title: "Estruture",
    text: "Relacione demandas, vulnerabilidades e estratégias de apoio com base em evidências.",
    href: "/#riscos",
    icon: (
      <>
        <rect x="3" y="11" width="10" height="10" rx="1" />
        <rect x="11" y="3" width="10" height="10" rx="1" />
      </>
    ),
  },
  {
    n: "03",
    title: "Execute",
    text: "Aplique sistemas simples para reduzir o custo cognitivo e aumentar sua consistência.",
    href: "/ferramentas",
    icon: <path strokeLinecap="round" d="M5 12h14m-5-5 5 5-5 5" />,
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-line"
      style={{
        backgroundImage: "radial-gradient(circle, #d9d9de 1px, transparent 1.2px)",
        backgroundSize: "22px 22px",
        backgroundPosition: "center top",
      }}
    >
      <Container className="pt-16 text-center">
        <p className="inline-flex items-center gap-[18px] text-[13px] font-medium uppercase tracking-[0.28em] text-muted before:h-[30px] before:w-[3px] before:bg-[var(--brain-accent)] before:content-[''] after:h-[30px] after:w-[3px] after:bg-[var(--brain-accent)] after:content-['']">
          Mapa interativo
        </p>
        <h1
          id="hero-title"
          className="mx-auto mb-[18px] mt-[26px] font-bold leading-none"
          style={{ fontSize: "clamp(42px, 7vw, 84px)", letterSpacing: "-0.045em" }}
        >
          Entenda sua execução.
        </h1>
        <p
          className="mx-auto max-w-[30ch] text-muted"
          style={{ fontSize: "clamp(19px, 2.2vw, 28px)", lineHeight: 1.3, textWrap: "balance" }}
        >
          Explore as relações entre funções executivas, demandas e estratégias.
        </p>
      </Container>
      <Container className="pt-2">
        <BrainStage functions={FUNCTIONS} variant="home" />
      </Container>
      <Container className="pb-24 pt-12">
        <ol className="grid gap-12 border-t border-line pt-8 md:grid-cols-3 md:gap-0">
          {STEPS.map((st, i) => (
            <li key={st.n} className={`grid content-start gap-2.5 ${i > 0 ? "md:border-l md:border-line md:pl-9" : ""} md:pr-9`}>
              <span className="mb-3.5 grid h-16 w-16 place-items-center rounded-[10px] bg-subtle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[34px] w-[34px]" aria-hidden="true">
                  {st.icon}
                </svg>
              </span>
              <small className="text-[15px] font-medium text-muted">{st.n}</small>
              <h3 className="text-4xl font-bold" style={{ letterSpacing: "-0.035em" }}>
                {st.title}
              </h3>
              <p className="mb-4 max-w-[28ch] text-lg text-muted">{st.text}</p>
              <Link
                href={st.href}
                aria-label={st.title}
                className="grid h-[54px] w-[54px] place-items-center rounded-full border-2 border-[var(--brain-accent)] text-[var(--brain-accent-strong)] hover:bg-[var(--brain-accent-soft)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 12h14m-5-5 5 5-5 5" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
