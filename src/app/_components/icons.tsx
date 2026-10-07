// Ícones de linha (protótipo Brain Home v2): monocromáticos, herdam currentColor.
type P = { className?: string };
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true } as const;

export const FunctionIcon = ({ id, className = "h-5 w-5" }: P & { id: string }) => {
  if (id === "inibicao")
    return (
      <svg {...base} className={className}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m6 6 12 12" />
      </svg>
    );
  if (id === "memoria")
    return (
      <svg {...base} className={className}>
        <rect x="3" y="11" width="10" height="10" rx="1" />
        <rect x="11" y="3" width="10" height="10" rx="1" />
      </svg>
    );
  return (
    <svg {...base} className={className} strokeLinecap="round">
      <path d="M19.5 9A8 8 0 0 0 5 7.5M4.5 15A8 8 0 0 0 19 16.5M5 3.5v4h4M19 20.5v-4h-4" />
    </svg>
  );
};

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className} strokeLinecap="round" strokeWidth={2}>
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);
