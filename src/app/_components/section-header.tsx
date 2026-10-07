type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
};

// CARD-HIERARCHY-SYSTEM: H0 seção → H1 eyebrow → H2 título → H3 lead. Alinhado à esquerda (Nocturne).
export function SectionHeader({ eyebrow, title, lead, id }: Props) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl" style={{ textWrap: "balance" }}>
        {title}
      </h2>
      {lead && <p className="mt-3 text-lg text-muted">{lead}</p>}
    </div>
  );
}
