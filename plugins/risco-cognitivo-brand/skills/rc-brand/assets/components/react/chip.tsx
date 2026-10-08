// Chips (D-10, D-35). gap = conteúdo sem fonte ("Em preparação", amarelo de atenção);
// soon = item sem página ("Em breve"); tag = rótulo neutro. Nunca quebram linha.
type Props = { variant?: "gap" | "soon" | "tag"; children?: React.ReactNode; className?: string };

// Literais para o Tailwind manter as classes de @layer components
const CLS = { gap: "chip chip-gap", soon: "chip chip-soon", tag: "chip chip-tag" } as const;

export function Chip({ variant = "tag", children, className = "" }: Props) {
  const label = children ?? (variant === "gap" ? "Em preparação" : variant === "soon" ? "Em breve" : null);
  return <span className={`${CLS[variant]} ${className}`.trim()}>{label}</span>;
}
