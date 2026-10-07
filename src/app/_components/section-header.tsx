type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
};

// CARD-HIERARCHY-SYSTEM: eyebrow → H2 → lead. Espaços: 16 eyebrow→título, 16 título→lead; 48 até o conteúdo (D-25).
export function SectionHeader({ eyebrow, title, lead, id }: Props) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl" style={{ textWrap: "balance" }}>
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}
