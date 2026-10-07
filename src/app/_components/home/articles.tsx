import Link from "next/link";
import { Section } from "../ui/section";
import { Chip } from "../ui/chip";
import { Button } from "../ui/button";
import { ResourceCard } from "../blog/resource-card";
import { SERIES } from "@/content/series";
import type { PostSummary } from "@/interfaces/post";

export function Articles({ posts }: { posts: PostSummary[] }) {
  return (
    <Section
      divider
      id="artigos"
      eyebrow="Artigos"
      title="Série editorial Risco Cognitivo."
      lead="Um artigo fundador, uma base explicativa em três partes e um desdobramento prático."
    >
      <ol className="divide-y divide-line border-y border-line">
        {SERIES.map((s) => (
          <li key={s.number} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
            <span className="font-mono text-[14px] text-action-text">{s.number}</span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">{s.level}</p>
              <h3 className="mt-1 text-xl font-semibold">
                {s.slug ? (
                  <Link href={`/posts/${s.slug}`} className="hover:text-action-text">
                    {s.title}
                  </Link>
                ) : (
                  s.title
                )}
              </h3>
              <p className="mt-1 text-[14px] text-muted">{s.topics.join(" · ")}</p>
            </div>
            {s.status === "GAP" && <Chip variant="gap" />}
          </li>
        ))}
      </ol>
      {posts.length > 0 && (
        <div className="stack-section">
          <h3 className="font-display text-2xl font-semibold">Publicados</h3>
          <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <ResourceCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
          <Button href="/artigos" className="stack-section">
            Ver todos os artigos
          </Button>
        </div>
      )}
    </Section>
  );
}
