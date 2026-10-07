// Painel (D-32, tokens do Brain Home v2): fundo elevado, borda 1, raio 2 e 4 marcas de canto de 10 px.
// É o único card do site; "interactive" acende borda e marcas na cor da marca no hover/foco.
type Props = {
  as?: "div" | "li" | "article" | "aside";
  tone?: "raised" | "subtle";
  compact?: boolean;
  interactive?: boolean;
  ticks?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

export function Panel({ as: Tag = "div", tone = "raised", compact, interactive, ticks = true, className = "", children, ...rest }: Props) {
  const cls = ["panel", tone === "subtle" && "panel-subtle", compact && "panel-compact", interactive && "panel-interactive", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...rest}>
      {ticks && <Ticks />}
      {children}
    </Tag>
  );
}

export function Ticks() {
  return (
    <>
      <i className="tick" aria-hidden="true" />
      <i className="tick" aria-hidden="true" />
      <i className="tick" aria-hidden="true" />
      <i className="tick" aria-hidden="true" />
    </>
  );
}
