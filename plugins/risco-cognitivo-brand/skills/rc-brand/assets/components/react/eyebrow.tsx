// Eyebrow (D-35): rótulo mono maiúsculo na cor da marca. "bars" = hero do cérebro (v1, barras índigo).
export function Eyebrow({ children, variant = "brand", className = "" }: { children: React.ReactNode; variant?: "brand" | "bars"; className?: string }) {
  return <p className={`${variant === "bars" ? "eyebrow-bars" : "eyebrow"} ${className}`.trim()}>{children}</p>;
}
