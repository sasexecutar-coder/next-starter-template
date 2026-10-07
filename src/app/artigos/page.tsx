import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/app/_components/ui/section";
import { ResourceCard } from "@/app/_components/blog/resource-card";
import { getPostIndex } from "@/lib/api";
import { Hub } from "./hub";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Artigos, guias, assets e vídeos do Risco Cognitivo.",
};

// Hub do blog (handoff de arquitetura UX): H1 → seletor (L3) → destaques → busca + filtros (L4) → lista.
export default function ArtigosPage() {
  const posts = getPostIndex();
  return (
    <main>
      <Section
        as="h1"
        id="artigos-titulo"
        title="Artigos e recursos"
        lead="Textos, guias e materiais práticos sobre funções executivas, riscos cognitivos e execução no dia a dia."
      >
        {/* Sem JavaScript (ou antes da hidratação): a lista completa, sem filtros */}
        <Suspense
          fallback={
            <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <ResourceCard post={p} />
                </li>
              ))}
            </ul>
          }
        >
          <Hub posts={posts} />
        </Suspense>
      </Section>
    </main>
  );
}
