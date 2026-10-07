// Ícones de tipo de conteúdo: 20 px, traço 1,5 (handoff).
const P: Record<string, React.ReactNode> = {
  artigo: (
    <>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M9 10h6M9 14h6M9 18h4" />
    </>
  ),
  guia: (
    <>
      <path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z" />
      <path d="M12 5.5V19" />
    </>
  ),
  asset: (
    <>
      <path d="M12 4v11m-4-4 4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  frente: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 10l-2 2 2 2m8-4 2 2-2 2" />
    </>
  ),
};

export function TypeIcon({ type = "artigo", className = "h-5 w-5" }: { type?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[type] ?? P.artigo}
    </svg>
  );
}
