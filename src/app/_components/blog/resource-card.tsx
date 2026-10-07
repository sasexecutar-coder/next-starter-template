import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { PostSummary } from "@/interfaces/post";
import { PROGRAMS, termLabel, typeLabel } from "@/content/taxonomy";
import { TypeIcon } from "./type-icon";

type Props = {
  post: PostSummary;
  variant?: "list" | "featured";
  headingLevel?: "h2" | "h3";
};

// "7 out 2026" (handoff: data em pt-BR dentro de <time datetime>)
export function shortDate(iso: string) {
  return format(parseISO(iso), "d MMM yyyy", { locale: ptBR }).replace(".", "");
}

// Card de recurso (handoff, D-25 + painel v2, D-32): padding 24, faixa de topo de 44, link único no título,
// borda fina que acende na cor da marca no hover/foco (sem marcas de canto, D-32 revista).
// A ilustração tem célula própria no grid e nunca cobre o texto (corrige o defeito da referência).
export function ResourceCard({ post, variant = "list", headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const program = termLabel(PROGRAMS, post.program);
  const featured = variant === "featured";
  return (
    <article
      className={`panel panel-interactive group flex flex-col !p-0 hover:-translate-y-0.5 focus-within:-translate-y-0.5 motion-reduce:transform-none ${featured ? "h-[395px]" : ""}`}
    >
      {/* Faixa de topo: tipo e data */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-line px-6 text-[14px]">
        <span className="flex items-center gap-2 text-ink">
          <TypeIcon type={post.type} />
          {typeLabel(post.type)}
        </span>
        <time dateTime={post.date} className="text-muted">
          {shortDate(post.date)}
        </time>
      </div>

      <div className={`grid flex-1 gap-x-4 p-6 ${post.illustration ? "grid-cols-[1fr_108px]" : "grid-cols-1"}`}>
        <div className="flex min-w-0 flex-col">
          <H
            className={`font-display font-semibold leading-tight text-ink ${featured ? "text-2xl line-clamp-5" : "text-lg line-clamp-4"}`}
          >
            <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {post.title}
            </Link>
          </H>
          <p className="mt-2 line-clamp-3 text-[16px] leading-6 text-muted">{post.excerpt}</p>
        </div>
        {post.illustration && (
          <img src={post.illustration} alt="" width={108} height={108} className="h-[108px] w-[108px] self-end object-contain" />
        )}
      </div>

      {program && (
        <div className="flex items-center gap-2 px-6 pb-6 text-[14px] text-ink">
          <TypeIcon type="frente" />
          {program}
        </div>
      )}
      {/* Anel de foco visível no card quando o link do título recebe foco */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xs group-has-[a:focus-visible]:outline group-has-[a:focus-visible]:outline-2 group-has-[a:focus-visible]:outline-offset-2 group-has-[a:focus-visible]:outline-[var(--action-text)]" />
    </article>
  );
}
