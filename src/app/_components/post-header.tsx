import Image from "next/image";
import { typeLabel } from "@/content/taxonomy";
import { shortDate } from "./blog/resource-card";
import { TypeIcon } from "./blog/type-icon";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  type?: string;
};

// Cabeçalho de artigo (handoff): categoria → H1 → data, centrados; imagem 16:9 de largura total, raio 16.
// Espaçamento: 40 até a categoria, 24 entre categoria/H1/data/imagem, 48 até o corpo.
export function PostHeader({ title, coverImage, date, excerpt, type }: Props) {
  return (
    <header className="pt-10 text-center">
      <p className="inline-flex items-center gap-2 font-display text-[16px] font-semibold text-ink">
        <TypeIcon type={type} />
        {typeLabel(type)}
      </p>
      <h1
        className="mx-auto mt-6 max-w-[22ch] font-display font-semibold leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(34px, 1.2rem + 3.6vw, 56px)", textWrap: "balance" }}
      >
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-[60ch] text-[18px] leading-7 text-muted" style={{ textWrap: "balance" }}>
        {excerpt}
      </p>
      <p className="mt-6 text-[16px] text-muted">
        <time dateTime={date}>{shortDate(date)}</time>
      </p>
      <div className="relative mx-auto mt-6 aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-[#dddcd2]">
        <Image src={coverImage} alt="" fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
      </div>
    </header>
  );
}
