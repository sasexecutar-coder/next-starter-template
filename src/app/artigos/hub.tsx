"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { PostSummary } from "@/interfaces/post";
import { FILTER_GROUPS, PILLARS, TYPES } from "@/content/taxonomy";
import { Carousel } from "@/app/_components/blog/carousel";
import { FilterDrawer, FilterGroups, countSelected, type Group, type Selection } from "@/app/_components/blog/filters";
import { ResourceCard } from "@/app/_components/blog/resource-card";
import { CategorySelect } from "@/app/_components/blog/category-select";
import { Button } from "@/app/_components/ui/button";
import { Panel } from "@/app/_components/ui/panel";

const KEYS = FILTER_GROUPS.map((g) => g.key);

// Estado na URL (?q=&tipo=&pilar=&frente=&situacao=): link compartilhável e Voltar funcionando.
function readSelection(params: URLSearchParams): Selection {
  const s: Selection = {};
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) s[k] = v.split(",").filter(Boolean);
  }
  return s;
}

const fieldOf: Record<string, (p: PostSummary) => string[]> = {
  tipo: (p) => (p.type ? [p.type] : []),
  pilar: (p) => (p.pillar ? [p.pillar] : []),
  frente: (p) => (p.program ? [p.program] : []),
  situacao: (p) => p.useCase ?? [],
};

const norm = (t: string) => t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function Hub({ posts }: { posts: PostSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const selection = useMemo(() => readSelection(new URLSearchParams(params.toString())), [params]);
  const [drawer, setDrawer] = useState(false);
  const filterBtn = useRef<HTMLButtonElement>(null);
  const [draftQ, setDraftQ] = useState(q);

  // Grupos e termos visíveis: só os que têm pelo menos um post e nome definido (sem filtrar para o vazio)
  const groups: Group[] = useMemo(
    () =>
      FILTER_GROUPS.map((g) => ({
        key: g.key,
        label: g.label,
        terms: g.terms.filter((t) => t.label && posts.some((p) => fieldOf[g.key](p).includes(t.id))),
      })).filter((g) => g.terms.length > 0),
    [posts],
  );

  const update = (next: Selection, nextQ = q) => {
    const sp = new URLSearchParams();
    if (nextQ) sp.set("q", nextQ);
    for (const k of KEYS) if (next[k]?.length) sp.set(k, next[k].join(","));
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return posts.filter((p) => {
      if (nq && !norm(`${p.title} ${p.excerpt}`).includes(nq)) return false;
      return KEYS.every((k) => !selection[k]?.length || fieldOf[k](p).some((v) => selection[k]!.includes(v)));
    });
  }, [posts, q, selection]);

  const featured = useMemo(() => {
    const f = posts.filter((p) => p.featured);
    return (f.length ? f : posts).slice(0, 5);
  }, [posts]);

  const n = countSelected(selection);
  const category = selection.tipo?.length === 1 ? `tipo:${selection.tipo[0]}` : "";

  return (
    <>
      {/* L3: seletor de categoria (listbox próprio, abre para baixo — f12) */}
      <div>
        <CategorySelect
          label="Categoria"
          value={category}
          onChange={(v) => update({ ...selection, tipo: v.startsWith("tipo:") ? [v.slice(5)] : [] })}
          options={[
            { value: "", label: "Todos os recursos" },
            ...PILLARS.map((p, i) => ({ value: `pilar:${p.id}`, label: p.label ?? `Pilar ${i + 1} — em preparação`, disabled: !p.label, group: "Pilares editoriais" })),
            ...TYPES.map((t) => ({ value: `tipo:${t.id}`, label: t.label, group: "Tipos" })),
          ]}
        />
      </div>

      {/* Destaques (só sem filtros e sem busca) */}
      {!q && n === 0 && (
        <div className="stack-section">
          <Carousel posts={featured} />
        </div>
      )}

      {/* L4: busca + filtro */}
      <div className="stack-section grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Desktop: filtros numa barra lateral fixa de 280 */}
        <aside aria-label="Filtros" className="hidden lg:block">
          <h2 className="border-b border-line pb-4 font-display text-xl font-semibold">Filtrar</h2>
          <FilterGroups groups={groups} value={selection} onChange={(s) => update(s)} />
          <Button variant="secondary" size="md" className="mt-6 w-full" disabled={n === 0} onClick={() => update({})}>
            Limpar filtros
          </Button>
        </aside>

        <div>
          <form
            role="search"
            className="flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              update(selection, draftQ.trim());
            }}
          >
            <div className="relative flex-1">
              <label htmlFor="busca" className="sr-only">
                Buscar recursos
              </label>
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                id="busca"
                type="search"
                value={draftQ}
                onChange={(e) => {
                  setDraftQ(e.target.value);
                  update(selection, e.target.value.trim());
                }}
                placeholder="Buscar recursos"
                className="h-11 w-full rounded-xl border border-control bg-raised pl-12 pr-12 text-[16px] text-ink placeholder:text-muted focus:border-action-text focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--action-text)] [&::-webkit-search-cancel-button]:hidden"
              />
              {draftQ && (
                <button
                  type="button"
                  aria-label="Limpar busca"
                  className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-muted"
                  onClick={() => {
                    setDraftQ("");
                    update(selection, "");
                  }}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              )}
            </div>
            <Button
              variant="icon"
              ref={filterBtn}
              className="h-11 w-11 lg:hidden"
              aria-label={n ? `Filtros (${n} ativos)` : "Filtros"}
              aria-haspopup="dialog"
              onClick={() => setDrawer(true)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
                <circle cx="16" cy="7" r="2" />
                <circle cx="10" cy="17" r="2" />
              </svg>
              {n > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-action px-1 text-xs text-on-dark">{n}</span>}
            </Button>
          </form>

          <h2 className="sr-only">Todos os recursos</h2>
          <p className="meta mt-12" aria-live="polite">
            {results.length === 1 ? "1 resultado" : `${results.length} resultados`}
          </p>

          {results.length ? (
            <ul className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <ResourceCard post={p} />
                </li>
              ))}
            </ul>
          ) : (
            <Panel tone="subtle" className="mt-4">
              <p className="text-[16px] text-ink">Nenhum resultado para esses filtros.</p>
              <Button
                variant="secondary"
                size="md"
                className="mt-4"
                onClick={() => {
                  setDraftQ("");
                  update({}, "");
                }}
              >
                Limpar filtros
              </Button>
            </Panel>
          )}
        </div>
      </div>

      <FilterDrawer open={drawer} onClose={() => setDrawer(false)} groups={groups} value={selection} onApply={(s) => update(s)} returnFocus={filterBtn} />
    </>
  );
}
