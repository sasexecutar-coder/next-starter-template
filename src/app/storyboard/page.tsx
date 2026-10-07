import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Callout } from "@/app/_components/ui/callout";
import { Chip } from "@/app/_components/ui/chip";
import { Eyebrow } from "@/app/_components/ui/eyebrow";
import { Highlight } from "@/app/_components/ui/highlight";
import { Panel } from "@/app/_components/ui/panel";
import { Section, SectionHeader } from "@/app/_components/ui/section";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { ResourceCard } from "@/app/_components/blog/resource-card";
import { Carousel } from "@/app/_components/blog/carousel";
import { RelationChain } from "@/app/_components/relation-chain";
import { ArrowRight, FunctionIcon } from "@/app/_components/icons";
import { PostBody } from "@/app/_components/post-body";
import brain from "@/app/_components/brain/brain-stage.module.css";
import { FUNCTIONS } from "@/content/functions";
import { getPostIndex } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { CategoryDemo, LoadingButton } from "./demos";

export const metadata: Metadata = {
  title: "Storyboard de componentes",
  description: "Componentes vivos do Risco Cognitivo, com estados e regras de uso.",
  robots: { index: false, follow: false },
};

// Storyboard vivo (ponto 1 do feedback; modelo: docs/design-kit/04-handoff/storyboard).
// Cada quadro usa o MESMO componente que as páginas usam: mudar um primitivo muda o site e este quadro.
const FRAMES = [
  ["tokens", "Tokens"],
  ["botoes", "Botões"],
  ["cabecalhos", "Eyebrow e cabeçalho"],
  ["destaques", "Destaques da marca"],
  ["chips", "Chips"],
  ["cards", "Painel, callout e card"],
  ["carrossel", "Carrossel"],
  ["filtros", "Seletor e busca"],
  ["navegacao", "Menu e sub-nav"],
  ["cerebro", "Cérebro"],
  ["faq-cta", "FAQ e CTA final"],
  ["editorial", "Blocos editoriais"],
  ["checklist", "Antes de integrar"],
] as const;

const SAMPLE_MD = `Parágrafo de corpo com **negrito na cor da marca**, que destaca o termo principal da frase, e um [link](/artigos).

> Quando a execução trava, quase nunca é falta de vontade.

:::callout{title="Como ler este mapa"}
O mapa mostra relações. Não é diagnóstico.
:::

:::definition{term="Função executiva"}
Capacidade que sustenta a execução, como planejar, segurar impulsos e manter informações.
:::
`;

export default async function StoryboardPage() {
  const posts = getPostIndex();
  const html = await markdownToHtml(SAMPLE_MD);
  const f = FUNCTIONS[1] ?? FUNCTIONS[0];

  return (
    <main>
      <Section
        as="h1"
        id="storyboard"
        eyebrow="Design system"
        title="Storyboard de componentes"
        lead="Cada quadro mostra o componente vivo, os estados e a regra de uso. Troque o tema: todos os quadros respondem, porque usam os mesmos tokens do site."
        className="border-b border-line"
      >
        <div className="flex flex-wrap items-center gap-4">
          <ThemeToggle />
          <p className="meta">Atual = marca (padrão) · Claro e Noite = tokens do blog-starter (D-33)</p>
        </div>
        <nav aria-label="Quadros" className="stack-section">
          <ol className="flex flex-wrap gap-2">
            {FRAMES.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="chip chip-tag min-h-[44px] px-3">
                  {String(i + 1).padStart(2, "0")} {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Section>

      {/* 01 TOKENS */}
      <Frame id="tokens" n={1} title="Tokens" file="src/app/globals.css · tailwind.config.ts" rules={[
        "Componentes nunca usam hex: só tokens (conferido por npm run audit:ds).",
        "Os temas trocam só os neutros; o azul da marca (D-01) fica em todos.",
        "Ritmo: 96 entre blocos no desktop e 64 no mobile (metade em cima e metade embaixo de cada bloco); 48/32 do cabeçalho ao conteúdo; 32 entre itens; 24 dentro de componentes.",
        "Raios: 2 painel/callout/card · 4 checkbox · 8 botão · 12 botão de ícone · 16 busca, seletor e imagem.",
      ]}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="font-display font-semibold">Cores do tema</h4>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["--surface-page", "Fundo"],
                ["--surface-subtle", "Superfície"],
                ["--surface-raised", "Elevada"],
                ["--border-subtle", "Divisor"],
                ["--border-control", "Controle"],
                ["--text-primary", "Texto"],
                ["--text-secondary", "Texto secundário"],
                ["--action-text", "Marca (texto)"],
                ["--brand-action-blue", "Marca (botão)"],
                ["--brand-dark-indigo", "Índigo"],
                ["--brain-accent", "Cérebro (D-23)"],
                ["--attention-surface", "GAP (D-10)"],
              ].map(([v, label]) => (
                <li key={v} className="text-sm">
                  <span className="block h-12 rounded-md border border-line" style={{ background: `var(${v})` }} />
                  <span className="mt-2 block font-medium">{label}</span>
                  <code className="meta">{v}</code>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8">
            <div>
              <h4 className="font-display font-semibold">Espaçamento</h4>
              <ul className="mt-4 grid gap-2">
                {[
                  ["--space-24", "96 · entre blocos (desktop)"],
                  ["--space-16", "64 · entre blocos (mobile)"],
                  ["--space-12", "48 · cabeçalho → conteúdo"],
                  ["--space-8", "32 · entre itens"],
                  ["--space-6", "24 · dentro do componente"],
                  ["--space-4", "16 · dentro do grupo"],
                  ["--space-2", "8"],
                ].map(([v, label]) => (
                  <li key={v} className="flex items-center gap-3 text-sm">
                    <span className="h-3 shrink-0 bg-action" style={{ width: `var(${v})` }} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold">Tipografia (D-03)</h4>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">DM Sans · títulos</p>
              <p className="mt-2 text-lg">Inter · leitura e interface, 16/24 e 18/1,65 no artigo</p>
              <p className="mt-2 font-mono text-sm">DM Mono · sistema e metadados</p>
            </div>
          </div>
        </div>
      </Frame>

      {/* 02 BOTÕES */}
      <Frame id="botoes" n={2} title="Botões" file="src/app/_components/ui/button.tsx" rules={[
        "Todo CTA de navegação ou conversão é primário azul (D-31), inclusive sobre o índigo.",
        "Contorno só para ação utilitária: limpar, item “Em breve”, ação secundária ao lado de um primário.",
        "Grande 40/18, médio 36/16, ícone 40×40; a área de toque chega a 44 com ::before.",
        "Estados: hover escurece, pressionado scale(.98), desabilitado 40 %, carregando aria-busy, foco com anel de 2 px.",
      ]}>
        <div className="grid gap-6">
          <Row label="Primário">
            <Button href="/mapas">Começar agora</Button>
            <Button href="/ferramentas" size="md">
              Médio
            </Button>
            <Button href="/ferramentas">
              Com ícone <ArrowRight />
            </Button>
            <Button disabled>Desabilitado</Button>
            <LoadingButton />
          </Row>
          <Row label="Contorno (utilitário)">
            <Button variant="secondary">Limpar filtros</Button>
            <Button variant="secondary" size="md">
              Médio
            </Button>
            <Button soon variant="secondary">
              Fale conosco
            </Button>
          </Row>
          <Row label="Ícone">
            <Button variant="icon" aria-label="Anterior">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </Button>
            <Button variant="icon" aria-label="Próximo" disabled>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </Button>
          </Row>
          <div className="rounded-xl bg-indigo p-6">
            <p className="meta !text-on-dark">Sobre o índigo (bloco final): o mesmo primário</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/mapas">Explorar o mapa</Button>
              <Button href="/ferramentas">Ver ferramentas</Button>
            </div>
          </div>
        </div>
      </Frame>

      {/* 03 CABEÇALHOS */}
      <Frame id="cabecalhos" n={3} title="Eyebrow e cabeçalho de seção" file="src/app/_components/ui/{eyebrow,section}.tsx" rules={[
        "Eyebrow: mono maiúsculo na cor da marca, sem fundo (D-35). Barras índigo só no hero do cérebro.",
        "Eyebrow → título 16, título → lead 16, cabeçalho → conteúdo 48 (32 no mobile).",
        "Toda seção de página é um <Section>: nada de py-* avulso.",
      ]}>
        <div className="grid gap-8 md:grid-cols-2">
          <SectionHeader eyebrow="Riscos cognitivos" title="Nove riscos que afetam a execução." lead="Lead em texto secundário, até ~2 linhas." />
          <div className="grid content-start justify-items-start gap-4">
            <Eyebrow>Eyebrow da marca</Eyebrow>
            <Eyebrow variant="bars">Mapa interativo</Eyebrow>
          </div>
        </div>
      </Frame>

      {/* 04 DESTAQUES */}
      <Frame id="destaques" n={4} title="Destaques da marca" file="src/app/_components/ui/highlight.tsx · markdown-styles.module.css" rules={[
        "Negrito de destaque em azul da marca (ref. “negrito cor de marca”).",
        "Citação: fio fino em cima e embaixo, com segmento grosso da marca centrado (ref. “duas linhas finas”).",
        "No artigo, a citação é o > do Markdown; fora dele, o <Highlight>.",
      ]}>
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-lg">
            O mapa mostra <strong className="brand-strong">relações entre funções, demandas e estratégias</strong>, não diagnósticos.
          </p>
          <Highlight>Quando a execução trava, quase nunca é falta de vontade.</Highlight>
        </div>
      </Frame>

      {/* 05 CHIPS */}
      <Frame id="chips" n={5} title="Chips" file="src/app/_components/ui/chip.tsx" rules={[
        "GAP (amarelo de atenção) = conteúdo sem fonte; nunca é apresentado como fato (D-10).",
        "O amarelo fica restrito ao GAP (D-35); “Em breve” usa a superfície neutra.",
        "Chips nunca quebram linha.",
      ]}>
        <Row label="Variantes">
          <Chip variant="gap" />
          <Chip variant="gap">Fontes em preparação</Chip>
          <Chip variant="soon" />
          <Chip variant="tag">Rótulo</Chip>
        </Row>
      </Frame>

      {/* 06 CARDS */}
      <Frame id="cards" n={6} title="Painel, callout e card de recurso" file="src/app/_components/ui/{panel,callout}.tsx · blog/resource-card.tsx" rules={[
        "Tokens do Brain Home v2 (D-32): painel com borda 1 e 4 marcas de canto; callout tracejado com colchetes.",
        "O painel é o único card do site; em hover/foco a borda e as marcas acendem na cor da marca.",
        "Callout = destaque de orientação (ex.: “Como ler este mapa”). Faixas laterais marrons não existem mais.",
        "Card de recurso: link único no título (área toda clicável), faixa de topo de 44, descrição em 3 linhas.",
      ]}>
        <div className="grid gap-8 md:grid-cols-3">
          <Panel>
            <p className="text-lg font-medium leading-snug">{f.difficulty}</p>
            <Eyebrow className="mt-3">{f.name}</Eyebrow>
          </Panel>
          <Panel tone="subtle" ticks={false}>
            <Eyebrow>Sem marcas</Eyebrow>
            <p className="mt-2 text-muted">Variante sutil, para listas densas e chips de relação.</p>
          </Panel>
          <Callout title="Como ler este mapa">
            <ul className="list-disc pl-6">
              <li>O mapa mostra relações.</li>
              <li>Não é diagnóstico.</li>
            </ul>
          </Callout>
          {posts.slice(0, 1).map((p) => (
            <ResourceCard key={p.slug} post={p} />
          ))}
          <div className="md:col-span-2">
            <RelationChain />
          </div>
        </div>
      </Frame>

      {/* 07 CARROSSEL */}
      <Frame id="carrossel" n={7} title="Carrossel" file="src/app/_components/blog/carousel.tsx" rules={[
        "scroll-snap, sem avanço automático; setas desabilitadas nas pontas (D-30).",
        "1 item: sem controles. Mais de 7: contador “3 de 9” no lugar dos pontos.",
        "Ponto ativo na cor da marca.",
      ]}>
        <Carousel posts={posts} />
      </Frame>

      {/* 08 SELETOR E BUSCA */}
      <Frame id="filtros" n={8} title="Seletor de categoria e busca" file="src/app/_components/blog/{category-select,filters}.tsx · artigos/hub.tsx" rules={[
        "O seletor abre sempre para baixo, ancorado ao campo (ref. f12); nada de select nativo.",
        "Teclado: ↑/↓, Home/End, Enter, Esc e busca por letra; a opção escolhida fica em azul com ✓.",
        "Campo de busca de 44, raio 16; o estado de busca e filtros fica na URL.",
      ]}>
        <div className="grid gap-8 md:grid-cols-2">
          <CategoryDemo />
          <p className="meta">
            Uso real: <Link href="/artigos" className="text-action-text underline">/artigos</Link>
          </p>
        </div>
      </Frame>

      {/* 09 NAVEGAÇÃO */}
      <Frame id="navegacao" n={9} title="Menu e sub-nav" file="src/app/_components/site-header.tsx · blog/sub-nav.tsx" rules={[
        "Header de 72; um único CTA primário (“Começar agora”).",
        "Menu mobile: abre e fecha com fade + 12 px em 320 ms e linhas em cascata (ref. f10); com movimento reduzido, só fade.",
        "Ao abrir, o foco vai para o painel, sem anel visível (ref. f05); Tab entra no primeiro item, Esc fecha e devolve o foco.",
        "Item atual em azul da marca, com aria-current. Itens sem página: “Em breve”, não clicáveis.",
      ]}>
        <Panel className="max-w-sm !p-0" ticks={false}>
          <ul className="px-6">
            {["Blog", "Mapas", "Ferramentas"].map((l, i) => (
              <li key={l} className={`flex min-h-[76px] items-center justify-between border-b border-line text-lg ${i === 1 ? "font-medium text-action-text" : ""}`}>
                {l}
                {i === 0 && <span aria-hidden="true">+</span>}
              </li>
            ))}
            <li className="flex min-h-[76px] items-center text-lg text-muted">
              Comunidade <Chip variant="soon" className="ml-2" />
            </li>
          </ul>
        </Panel>
      </Frame>

      {/* 10 CÉREBRO */}
      <Frame id="cerebro" n={10} title="Cérebro: marcador, callout e painel" file="src/app/_components/brain/brain-stage.tsx" rules={[
        "Cena da v1 (D-22) com a interface da v2 (D-32); acento índigo restrito ao cérebro (D-23).",
        "Marcador: círculo de 36 com ícone, alvo de 44; preenchido quando o callout está aberto, com anel quando selecionado.",
        "Callouts automáticos pela orientação: 1 no mobile, 2 no desktop, troca só após 6 s.",
        "Sem pausa, reset ou switch de movimento (D-36): o movimento segue o sistema.",
      ]}>
        <div className="grid gap-8 md:grid-cols-[1fr_340px]">
          <div className="relative min-h-[220px] rounded-xs border border-dashed border-line">
            <div className={`${brain.mk}`} style={{ transform: "translate(40px, 40px)" }} aria-hidden="true">
              <i>
                <FunctionIcon id="plan" />
              </i>
            </div>
            <div className={`${brain.mk} ${brain.on}`} style={{ transform: "translate(40px, 110px)" }} aria-hidden="true">
              <i>
                <FunctionIcon id="mem" />
              </i>
            </div>
            <div className={`${brain.co} ${brain.show}`} style={{ transform: "translate(100px, 96px)" }} aria-hidden="true">
              <i className={brain.c} />
              <i className={brain.c} />
              <i className={brain.c} />
              <i className={brain.c} />
              <b>{f.name}</b>
              <span>{f.short}</span>
            </div>
          </div>
          <div className={brain.panel} style={{ minHeight: 0 }}>
            <i className={brain.k} />
            <i className={brain.k} />
            <i className={brain.k} />
            <i className={brain.k} />
            <h2>Funções executivas</h2>
            {FUNCTIONS.slice(0, 2).map((fn) => (
              <div key={fn.id} className={brain.pick}>
                <span className={brain.ic}>
                  <FunctionIcon id={fn.id} />
                </span>
                <span>
                  <b>{fn.name}</b>
                  <span>{fn.short}</span>
                </span>
                <span />
              </div>
            ))}
            <p className={brain.note}>Os marcadores indicam acessos a redes distribuídas, não regiões clínicas exatas.</p>
          </div>
        </div>
      </Frame>

      {/* 11 FAQ E CTA */}
      <Frame id="faq-cta" n={11} title="FAQ e CTA final" file="src/app/_components/home/{faq,final-cta}.tsx" rules={[
        "Pergunta com alvo de 56, “+” na cor da marca que gira ao abrir.",
        "Bloco final: fundo índigo, padding 48/24, botões primários azuis.",
      ]}>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="divide-y divide-line border-y border-line">
            <details className="group" open>
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium [&::-webkit-details-marker]:hidden">
                O mapa é um diagnóstico?
                <span aria-hidden="true" className="font-mono text-action-text transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-muted">Não. O mapa mostra relações e não avalia pessoas.</p>
            </details>
          </div>
          <div className="rounded-xl bg-indigo px-6 py-12 text-on-dark">
            <p className="font-display text-2xl font-semibold">Comece pelo mapa ou por uma ferramenta.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/mapas">Explorar o mapa</Button>
            </div>
          </div>
        </div>
      </Frame>

      {/* 12 EDITORIAL */}
      <Frame id="editorial" n={12} title="Blocos editoriais" file="markdown-styles.module.css · src/lib/remark-editorial-blocks.ts" rules={[
        "Corpo em Inter 18/1,65, coluna de 68ch; negrito e links na cor da marca.",
        "> vira citação com régua; :::callout vira callout v2; :::definition tem fio da marca.",
      ]}>
        <div className="mx-auto max-w-measure">
          <PostBody content={html} />
        </div>
      </Frame>

      {/* 13 CHECKLIST */}
      <Section divider id="checklist" title="Antes de integrar" lead="O que conferir antes de abrir um PR que mexe em interface.">
        <ul className="grid max-w-3xl gap-3">
          {[
            "npm run audit:ds sem violações (hex, btn-*, espaçamento fora da escala, select nativo).",
            "O componente vem de src/app/_components/ui/ ou já está neste storyboard.",
            "CTA = primário azul; contorno só para ação utilitária.",
            "Blocos com <Section>; distância entre blocos 96/64, cabeçalho → conteúdo 48/32.",
            "Funciona nos 3 temas (Atual, Claro, Noite), com contraste ≥ 4,5:1 no texto e ≥ 3:1 em controles.",
            "Alvos ≥ 44 × 44; foco visível; nada de conteúdo inventado: sem fonte vira “Em preparação”.",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-sm border border-control text-action-text">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

function Frame({ id, n, title, file, rules, children }: { id: string; n: number; title: string; file: string; rules: string[]; children: React.ReactNode }) {
  return (
    <Section divider id={id} eyebrow={String(n).padStart(2, "0")} title={title} lead={<code className="meta">{file}</code>}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">{children}</div>
        <Panel as="aside" tone="subtle" ticks={false} aria-label={`Regras de uso: ${title}`}>
          <h3 className="font-display font-semibold">Regras de uso</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {rules.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden="true" className="text-action-text">—</span>
                {r}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="meta">{label}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
