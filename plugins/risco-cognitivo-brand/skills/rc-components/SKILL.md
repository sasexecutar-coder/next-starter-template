---
name: rc-components
description: >-
  Componentes de interface da marca Risco Cognitivo prontos para outros projetos: Button, Section, Panel, Callout,
  Chip, Eyebrow, Highlight, ThemeToggle e Wordmark em HTML/CSS puro (tokens.css + components.css) ou React/Next com
  Tailwind (preset + .tsx). Use quando pedirem para criar tela, landing, componente, página, card de UI, botão, seletor
  de tema ou "monta essa interface com o nosso design system", em qualquer stack web.
---

# Componentes de UI (CV-MARCA-010 · /marca-componente)

Não invente componente novo quando um primitivo resolve: a consistência vem de reusar os mesmos 9 primitivos. Anatomia,
estados e proibições: `../rc-brand/references/components.md`.

## Escolha da stack
| Projeto | Use |
|---|---|
| HTML estático, e-mail-like, CMS | `../rc-brand/assets/tokens/tokens.css` + `fonts.css` + `../rc-brand/assets/components/components.css` |
| React/Next + Tailwind | `tailwind.preset.cjs` em `presets`, `tokens.css` + `fonts.css` (ou `next/font` com as mesmas variáveis) no CSS global e os `.tsx` de `../rc-brand/assets/components/react/` |
| Outra (Vue, Svelte, Astro) | mesmas classes do `components.css`; markup igual ao HTML de referência |
Fontes: DM Sans, Inter, DM Mono (Google Fonts ou `next/font`), expostas como `--font-display/-body/-mono`.

## Fluxo
1. Monte a tela só com primitivos + tokens (`var(--…)`); nenhum hex, px fora da escala ou fonte extra.
2. Confira a galeria viva: `python3 scripts/render_gallery.py -o dist/primitivos.html` (3 temas no seletor).
3. Audite: `python3 ../rc-audit/scripts/audit_html.py <arquivo>` e, em página real,
   `node ../rc-audit/scripts/render_check.mjs <arquivo> --themes` (sem erro, sem rolagem horizontal).

## Regras que mais quebram
- Todo CTA é `btn-primary` (inclusive sobre índigo); `btn-secondary` só para utilitário.
- Panel é o único card; marcas de canto só no painel do cérebro; cor semântica só em micro-elemento com rótulo.
- Alvo ≥ 44px (o `::before` dos botões já compensa 40/36px); `aria-label` em botão de ícone; foco visível.
- Espaço entre blocos 64/96 (metade em cima, metade embaixo); container 1120 + gutter 32/48.
- "Em breve" nunca é link sem destino: `<span role="link" aria-disabled="true">`.
