import Link from "next/link";
import Container from "../container";
import { SectionHeader } from "../section-header";
import { GapChip } from "../gap-chip";
import { MoreStories } from "../more-stories";
import { SERIES } from "@/content/series";
import type { Post } from "@/interfaces/post";

export function Articles({ posts }: { posts: Post[] }) {
  return (
    <section aria-labelledby="artigos" className="border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="artigos"
          eyebrow="Artigos"
          title="Série editorial Risco Cognitivo."
          lead="Um artigo fundador, uma base explicativa em três partes e um desdobramento prático."
        />
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {SERIES.map((s) => (
            <li key={s.number} className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
              <span className="font-mono text-sm text-muted">{s.number}</span>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted">{s.level}</p>
                <h3 className="mt-1 text-xl font-semibold">
                  {s.slug ? (
                    <Link href={`/posts/${s.slug}`} className="hover:text-action">
                      {s.title}
                    </Link>
                  ) : (
                    s.title
                  )}
                </h3>
                <p className="mt-1 text-sm text-muted">{s.topics.join(" · ")}</p>
              </div>
              {s.status === "GAP" && <GapChip />}
            </li>
          ))}
        </ol>
        {posts.length > 0 && (
          <div className="mt-14">
            <h3 className="mb-6 text-2xl font-semibold">Publicados</h3>
            <MoreStories posts={posts} />
          </div>
        )}
      </Container>
    </section>
  );
}
