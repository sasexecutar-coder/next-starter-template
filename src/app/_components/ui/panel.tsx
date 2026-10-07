// Painel (D-32 revista): fundo elevado, borda 1 e raio 2. É o único card do site.
// Marcas de canto NÃO são usadas em cards: ficam só no painel do cérebro (brain-stage), referência v2.
// "interactive" acende a borda na cor da marca e adiciona sombra no hover/foco.
type Props = {
  as?: "div" | "li" | "article" | "aside";
  tone?: "raised" | "subtle";
  compact?: boolean;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

export function Panel({ as: Tag = "div", tone = "raised", compact, interactive, className = "", children, ...rest }: Props) {
  const cls = ["panel", tone === "subtle" && "panel-subtle", compact && "panel-compact", interactive && "panel-interactive", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
