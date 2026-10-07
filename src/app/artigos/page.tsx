import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/app/_components/container";
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
      <Container className="pt-16 pb-24">
        <h1 className="font-display text-[34px] font-semibold leading-tight sm:text-5xl">Artigos e recursos</h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-7 text-muted">
          Textos, guias e materiais práticos sobre funções executivas, riscos cognitivos e execução no dia a dia.
        </p>
        {/* Sem JavaScript (ou antes da hidratação): a lista completa, sem filtros */}
        <Suspense
          fallback={
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
      </Container>
    </main>
  );
}
