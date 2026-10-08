// Ícones de linha do Brain Home v1: monocromáticos, herdam currentColor.
type P = { className?: string };
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true } as const;

const PATHS: Record<string, React.ReactNode> = {
  plan: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  stop: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6 6 12 12" />
    </>
  ),
  mem: (
    <>
      <rect x="3" y="11" width="10" height="10" rx="1" />
      <rect x="11" y="3" width="10" height="10" rx="1" />
    </>
  ),
  flex: <path strokeLinecap="round" d="M19.5 9A8 8 0 0 0 5 7.5M4.5 15A8 8 0 0 0 19 16.5M5 3.5v4h4M19 20.5v-4h-4" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  warn: (
    <>
      <path strokeLinejoin="round" d="M12 3.5 2.5 20h19Z" />
      <path strokeLinecap="round" d="M12 10v4.5m0 2.5v.5" />
    </>
  ),
  bulb: (
    <path
      strokeLinecap="round"
      d="M9 17h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v2h6v-2c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3Z"
    />
  ),
};

export const Icon = ({ name, className = "h-5 w-5" }: P & { name: string }) => (
  <svg {...base} className={className}>
    {PATHS[name]}
  </svg>
);

export const FunctionIcon = ({ id, className = "h-5 w-5" }: P & { id: string }) => <Icon name={id} className={className} />;

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className} strokeLinecap="round" strokeWidth={2}>
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);
