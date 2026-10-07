// Destaque com régua (D-35, ref. f02): frase de efeito entre dois fios finos, com segmento da marca.
export function Highlight({ children, cite, className = "" }: { children: React.ReactNode; cite?: string; className?: string }) {
  return (
    <figure className={`highlight ${className}`.trim()}>
      <blockquote>{children}</blockquote>
      {cite && <cite>{cite}</cite>}
    </figure>
  );
}
