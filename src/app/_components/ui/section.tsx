import Container from "../container";
import { Eyebrow } from "./eyebrow";

// Bloco de página (D-34). Regra: 96 entre blocos (64 no mobile), aplicada como metade em cima e
// metade embaixo, para que dois blocos vizinhos somem exatamente a regra. Cabeçalho → conteúdo:
// --stack-section (48 / 32). Toda seção de página usa este componente; nada de py-* avulso.
type HeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
};

// CARD-HIERARCHY-SYSTEM: eyebrow → título → lead, 16 entre cada um.
export function SectionHeader({ eyebrow, title, lead, id, as = "h2" }: HeaderProps) {
  const H = as;
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <H
        id={id}
        className={
          as === "h1"
            ? "text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            : "text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        }
        style={{ textWrap: "balance" }}
      >
        {title}
      </H>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}

type SectionProps = Partial<HeaderProps> & {
  children?: React.ReactNode;
  divider?: boolean;
  label?: string;
  className?: string;
  containerClassName?: string;
};

export function Section({ children, divider = false, label, className = "", containerClassName = "", ...header }: SectionProps) {
  const hasHeader = !!header.title;
  return (
    <section
      aria-labelledby={hasHeader && header.id ? header.id : undefined}
      aria-label={!hasHeader ? label : undefined}
      className={`page-block ${divider ? "border-t border-line" : ""} ${className}`.trim()}
    >
      <Container className={containerClassName}>
        {hasHeader && <SectionHeader {...(header as HeaderProps)} />}
        {children !== undefined && (hasHeader ? <div className="stack-section">{children}</div> : children)}
      </Container>
    </section>
  );
}
