// Callout (D-32, v2): destaque com linha tracejada e colchetes de canto na cor da marca.
// Substitui faixas laterais coloridas (o marrom de atenção fica só no chip GAP).
type Props = {
  title?: string;
  titleId?: string;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "aside";
};

export function Callout({ title, titleId, children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`callout ${className}`.trim()} aria-labelledby={title && titleId ? titleId : undefined}>
      <Brackets />
      {title && (
        <p id={titleId} className="font-display text-[16px] font-semibold text-ink">
          {title}
        </p>
      )}
      <div className={title ? "mt-2 text-[16px] leading-6 text-muted" : "text-[16px] leading-6 text-muted"}>{children}</div>
    </Tag>
  );
}

export function Brackets() {
  return (
    <>
      <i className="bracket" aria-hidden="true" />
      <i className="bracket" aria-hidden="true" />
      <i className="bracket" aria-hidden="true" />
      <i className="bracket" aria-hidden="true" />
    </>
  );
}
