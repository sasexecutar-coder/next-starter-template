# Componentes — anatomia, estados e regras de uso

Código pronto: `assets/components/components.css` (HTML puro) e `assets/components/react/*.tsx` (React/Next + Tailwind
com o preset). Mesma fonte do storyboard vivo do site (`/storyboard`). Decisões: D-25, D-28, D-31, D-32, D-34, D-35, D-36.

## Índice
1. Button · 2. Section/SectionHeader · 3. Panel · 4. Callout · 5. Chip · 6. Eyebrow · 7. Highlight · 8. ThemeToggle ·
9. Padrões compostos (cards, carrossel de UI, seletor, menu, cérebro) · 10. Proibições

## 1. Button (`.btn` / `<Button>`)
| Variante | Classe | Uso | Medidas |
|---|---|---|---|
| primary | `btn btn-primary` | **Todo CTA** de navegação ou conversão, inclusive sobre índigo (D-31) | 40 alt. / 18px; `btn-md` 36/16 |
| secondary | `btn btn-secondary` | Só utilitário: limpar, "Em breve", ação secundária ao lado de um primário | idem, borda `--border-control` |
| icon | `btn-icon` | Setas, fechar; `aria-label` obrigatório | 40×40, raio 12 |
Estados: hover escurece (`--brand-action-blue-strong`); pressionado `scale(.98)`; desabilitado opacidade .4;
carregando `aria-busy="true"`; foco anel 2px `--action-text`. Área de toque ≥ 44 via `::before`.
"Em breve": `<span role="link" aria-disabled="true">` (nunca link sem destino).
```html
<a class="btn btn-primary" href="/mapas">Começar agora</a>
<button class="btn btn-secondary btn-md" type="button">Limpar filtros</button>
```

## 2. Section / SectionHeader (`.page-block` + `.stack-section`)
Bloco de página = metade da distância entre blocos em cima e embaixo (`--block-y` 32/48) → vizinhos somam 64/96 (D-34).
Cabeçalho: eyebrow → título → lead, 16 entre eles; cabeçalho → conteúdo `--stack-section` (32/48). Container 1120 + gutter 32/48.
```html
<section class="page-block"><div class="container-page">
  <p class="eyebrow">Riscos cognitivos</p><h2>Nove riscos que afetam a execução.</h2><p class="lead">…</p>
  <div class="stack-section">…conteúdo…</div>
</div></section>
```

## 3. Panel (`.panel`) — o único card
Fundo `--surface-raised`, borda 1 `--border-subtle`, raio 2, padding 24. Modificadores: `panel-subtle` (fundo sutil),
`panel-compact` (12/16), `panel-interactive` (hover/foco: borda `--action-text` + `--shadow-card-raised`).
**Sem marcas de canto** — elas existem só no painel do cérebro (D-32 revista). Cor semântica nunca no card inteiro;
só em micro-elemento (borda esquerda de 4px, chip), sempre com rótulo em texto.

## 4. Callout (`.callout`)
Destaque de orientação: linha tracejada 1px `--action-line`, 4 colchetes 12×2 em `--action-text`, fundo raised 90%,
padding 16/24. Marcação: `<div class="callout"><i class="bracket"></i>×4<p class="title">…</p>…</div>`.
Máx. 1 por H2; título até 5 palavras; corpo 20–60 palavras.

## 5. Chip (`.chip`)
`chip-gap` = "Em preparação" (amarelo, texto preto, D-10) · `chip-soon` = "Em breve" (neutro) · `chip-tag` = rótulo
(contorno; ativo/atual em azul). DM Mono 12, raio 4, **nunca quebra linha**.

## 6. Eyebrow (`.eyebrow`)
DM Mono 12 caixa alta, cor da marca, sem fundo (D-35). Variante `.eyebrow-bars` (barras índigo) só no hero do cérebro.

## 7. Highlight (`.highlight`) — citação com régua
Fio 1px `--border-strong` em cima e embaixo, segmento azul 48×4 centrado em cada fio; DM Sans 700. No artigo, é o `>`.
Negrito de destaque: `.brand-strong` (azul, 700).

## 8. ThemeToggle
`data-theme` em `<html>` (`claro`/`noite`; sem atributo = Atual), salvo em `localStorage` `rc-theme`, aplicado por script
no início do `<body>` (não no `<head>`: evita erro de hidratação). Seletor segmentado `.segmented` com `aria-pressed`.

## 9. Padrões compostos
- **Card de recurso:** link único no título (`::after` cobre o card), faixa de topo 44 (tipo + data `<time>`), descrição 3
  linhas, ilustração opcional 108×108 em célula própria.
- **Carrossel de UI (D-30):** scroll-snap, sem autoplay/loop, setas desabilitadas nas pontas, 1 item sem controles,
  > 7 itens com contador "3 de 9", ponto ativo azul. (Não confundir com carrossel de rede social → `rc-social`.)
- **Seletor (D-36):** listbox próprio que abre para baixo; ↑↓ Home/End Enter Esc e busca por letra. Sem `<select>` nativo.
- **Menu:** header 72; mobile em tela cheia com fade + 12px em 320ms e linhas em cascata; foco no painel sem anel ao abrir.
- **Cérebro (D-22/D-23/D-32/D-36):** cena v1 + UI v2 (marcador circular 36/alvo 44, callout tracejado com colchetes,
  painel com 4 marcas de canto 10×10). Nota obrigatória: "Os marcadores indicam acessos a redes distribuídas, não regiões
  clínicas exatas." Sem pausa/reset/switch de movimento — só `prefers-reduced-motion`. Índigo restrito a ele.

## 10. Proibições (reprovadas por `rc-audit`)
Hex solto em componente; `bg-white`/`text-white` fora dos primitivos; espaçamento fora da escala; raio arbitrário;
`<select>` nativo; marcas de canto fora do cérebro; card inteiro em cor semântica; mais de um CTA primário por bloco;
CTA em outra cor que não o azul de ação.
