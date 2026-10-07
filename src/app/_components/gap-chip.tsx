// D-10: conteúdo sem fonte validada aparece como "Em preparação", nunca como fato.
export function GapChip({ label = "Em preparação" }: { label?: string }) {
  return <span className="chip-gap">{label}</span>;
}
