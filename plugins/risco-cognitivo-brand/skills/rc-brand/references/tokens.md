# Tokens — referência completa

Gerado por `scripts/tokens_doc.py` a partir de `assets/tokens/tokens.json` (que vem de `src/app/globals.css`).
Valores resolvidos (sem `var()`). Temas: **Atual** (padrão, marca) · **Claro** e **Noite** (tokens do blog-starter, D-33).
Aplicar o tema com `data-theme="claro|noite"` em `<html>`; sem atributo = Atual.

## Marca e semântica (iguais nos 3 temas)

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--brand-canvas` | `#fffdfa` | `#fffdfa` | `#fffdfa` |
| `--brand-dark-gray` | `#545454` | `#545454` | `#545454` |
| `--brand-light-gray` | `#ececec` | `#ececec` | `#ececec` |
| `--brand-light-blue` | `#cbd4ff` | `#cbd4ff` | `#cbd4ff` |
| `--brand-light-blue-soft` | `rgb(203 212 255 / 48%)` | `rgb(203 212 255 / 48%)` | `rgb(203 212 255 / 48%)` |
| `--brand-dark-indigo` | `#0e025d` | `#0e025d` | `#0e025d` |
| `--brand-action-blue` | `#2d5ce6` | `#2d5ce6` | `#2d5ce6` |
| `--brand-action-blue-strong` | `#1f46bf` | `#1f46bf` | `#1f46bf` |
| `--semantic-risk` | `#ff0000` | `#ff0000` | `#ff0000` |
| `--semantic-solution` | `#00bf63` | `#00bf63` | `#00bf63` |
| `--attention-surface` | `#ffe659` | `#ffe659` | `#ffe659` |
| `--attention-ink` | `#8a5a00` | `#8a5a00` | `#8a5a00` |
| `--on-attention` | `#000000` | `#000000` | `#000000` |

## Cérebro 3D (D-23)

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--brain-accent` | `#6e72f0` | `#6e72f0` | `#6e72f0` |
| `--brain-accent-strong` | `#4f53d9` | `#4f53d9` | `#4f53d9` |
| `--brain-accent-soft` | `#e4e6ff` | `#e4e6ff` | `#272a5c` |
| `--brain-accent-line` | `#a3a8f5` | `#a3a8f5` | `#a3a8f5` |
| `--brain-accent-text` | `#4f53d9` | `#4f53d9` | `#a3a8f5` |
| `--brain-border-strong` | `#cbcbcb` | `#cbcbcb` | `#475569` |

## Texto, superfícies e bordas

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--text-primary` | `#000000` | `#171717` | `#ededed` |
| `--text-secondary` | `#545454` | `#333333` | `#94a3b8` |
| `--text-on-dark` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--surface-page` | `#fffdfa` | `#ffffff` | `#0f172a` |
| `--surface-subtle` | `#f4f3f0` | `#fafafa` | `#1e293b` |
| `--surface-raised` | `#ffffff` | `#ffffff` | `#1e293b` |
| `--line-subtle` | `#ececec` | `#eaeaea` | `#334155` |
| `--border-subtle` | `#ececec` | `#eaeaea` | `#334155` |
| `--border-control` | `#85847f` | `#85847f` | `#94a3b8` |
| `--border-strong` | `#cbcbcb` | `#cccccc` | `#475569` |
| `--action-text` | `#2d5ce6` | `#2d5ce6` | `#8fa9ff` |
| `--action-line` | `rgb(45 92 230 / 45%)` | `rgb(45 92 230 / 45%)` | `rgb(143 169 255 / 50%)` |
| `--dot-grid` | `#d9d9de` | `#e5e5e5` | `#263248` |
| `--selection` | `#cbd4ff` | `#cbd4ff` | `#1f46bf` |

## Espaço e ritmo (D-25, D-34)

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--space-1` | `4px` | `4px` | `4px` |
| `--space-2` | `8px` | `8px` | `8px` |
| `--space-3` | `12px` | `12px` | `12px` |
| `--space-4` | `16px` | `16px` | `16px` |
| `--space-6` | `24px` | `24px` | `24px` |
| `--space-8` | `32px` | `32px` | `32px` |
| `--space-12` | `48px` | `48px` | `48px` |
| `--space-16` | `64px` | `64px` | `64px` |
| `--space-24` | `96px` | `96px` | `96px` |
| `--block-y` | `32px` | `32px` | `32px` |
| `--stack-section` | `32px` | `32px` | `32px` |
| `--stack-items` | `32px` | `32px` | `32px` |
| `--stack-inner` | `24px` | `24px` | `24px` |
| `--gutter` | `32px` | `32px` | `32px` |
| `--container` | `1120px` | `1120px` | `1120px` |
| `--header-h` | `72px` | `72px` | `72px` |
| `--subnav-h` | `52px` | `52px` | `52px` |

## Raios, sombras, movimento

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--radius-xs` | `2px` | `2px` | `2px` |
| `--radius-sm` | `4px` | `4px` | `4px` |
| `--radius-md` | `8px` | `8px` | `8px` |
| `--radius-lg` | `12px` | `12px` | `12px` |
| `--radius-xl` | `16px` | `16px` | `16px` |
| `--shadow-sm` | `0 0 0 1px #ececec` | `0 0 0 1px #eaeaea` | `0 0 0 1px #334155` |
| `--shadow-md` | `0 0 0 1px #ececec, 0 6px 18px rgb(0 0 0 / 6%)` | `0 0 0 1px #eaeaea, 0 6px 18px rgb(0 0 0 / 6%)` | `0 0 0 1px #334155, 0 6px 18px rgb(0 0 0 / 6%)` |
| `--shadow-card-raised` | `0 4px 16px rgb(20 20 19 / 8%)` | `0 4px 16px rgb(20 20 19 / 8%)` | `0 4px 16px rgb(0 0 0 / 40%)` |
| `--scrim` | `rgb(20 20 19 / 20%)` | `rgb(20 20 19 / 20%)` | `rgb(0 0 0 / 50%)` |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | `cubic-bezier(0.2, 0, 0, 1)` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--dur-menu` | `320ms` | `320ms` | `320ms` |

## Editorial (superfície artigo, --ed-*)

| Token | Atual | Claro | Noite |
|---|---|---|---|
| `--ed-paper` | `#fffdfa` | `#ffffff` | `#0f172a` |
| `--ed-ink` | `#000000` | `#171717` | `#ededed` |
| `--ed-heading` | `#000000` | `#171717` | `#ededed` |
| `--ed-label` | `#545454` | `#333333` | `#94a3b8` |
| `--ed-link` | `#2d5ce6` | `#2d5ce6` | `#8fa9ff` |
| `--ed-strong` | `#2d5ce6` | `#2d5ce6` | `#8fa9ff` |
| `--ed-callout-head` | `#0e025d` | `#0e025d` | `#0e025d` |
| `--ed-callout-head-text` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--ed-callout-bg` | `rgb(203 212 255 / 48%)` | `rgb(203 212 255 / 48%)` | `rgb(45 92 230 / 18%)` |
| `--ed-callout-text` | `#000000` | `#171717` | `#ededed` |
| `--ed-rule` | `#ececec` | `#eaeaea` | `#334155` |
| `--ed-fs-body` | `1.0625rem` | `1.0625rem` | `1.0625rem` |
| `--ed-lh-body` | `1.6` | `1.6` | `1.6` |
| `--ed-fs-h3` | `1.2rem` | `1.2rem` | `1.2rem` |
| `--ed-fs-h2` | `clamp(1.4rem, 1.1rem + 1.2vw, 1.75rem)` | `clamp(1.4rem, 1.1rem + 1.2vw, 1.75rem)` | `clamp(1.4rem, 1.1rem + 1.2vw, 1.75rem)` |
| `--ed-fs-title` | `clamp(2.25rem, 1.2rem + 4.5vw, 3.75rem)` | `clamp(2.25rem, 1.2rem + 4.5vw, 3.75rem)` | `clamp(2.25rem, 1.2rem + 4.5vw, 3.75rem)` |
| `--ed-lh` | `calc(1.0625rem * 1.6)` | `calc(1.0625rem * 1.6)` | `calc(1.0625rem * 1.6)` |
| `--ed-measure` | `68ch` | `68ch` | `68ch` |
| `--ed-sp-title-to-body` | `calc(calc(1.0625rem * 1.6) * 2.5)` | `calc(calc(1.0625rem * 1.6) * 2.5)` | `calc(calc(1.0625rem * 1.6) * 2.5)` |
| `--ed-sp-h-before` | `calc(calc(1.0625rem * 1.6) * 2)` | `calc(calc(1.0625rem * 1.6) * 2)` | `calc(calc(1.0625rem * 1.6) * 2)` |
| `--ed-sp-h2-after` | `calc(calc(1.0625rem * 1.6) * 0.75)` | `calc(calc(1.0625rem * 1.6) * 0.75)` | `calc(calc(1.0625rem * 1.6) * 0.75)` |
| `--ed-sp-h3-after` | `calc(calc(1.0625rem * 1.6) * 0.5)` | `calc(calc(1.0625rem * 1.6) * 0.5)` | `calc(calc(1.0625rem * 1.6) * 0.5)` |
| `--ed-sp-paragraph` | `calc(calc(1.0625rem * 1.6) * 0.75)` | `calc(calc(1.0625rem * 1.6) * 0.75)` | `calc(calc(1.0625rem * 1.6) * 0.75)` |
| `--ed-sp-callout-before` | `calc(1.0625rem * 1.6)` | `calc(1.0625rem * 1.6)` | `calc(1.0625rem * 1.6)` |
| `--ed-sp-callout-after` | `calc(calc(1.0625rem * 1.6) * 1.5)` | `calc(calc(1.0625rem * 1.6) * 1.5)` | `calc(calc(1.0625rem * 1.6) * 1.5)` |

## Breakpoints

- `(min-width: 640px)`: `--gutter: 48px`, `--stack-section: var(--space-12)`, `--ed-fs-body: 1.125rem`, `--ed-lh-body: 1.65`, `--ed-sp-title-to-body: calc(var(--ed-lh) * 3.5)`, `--ed-sp-h-before: calc(var(--ed-lh) * 2.4)`
- `(min-width: 768px)`: `--block-y: var(--space-12)`
- `(min-width: 1024px)`: `--ed-sp-title-to-body: calc(var(--ed-lh) * 4.8)`, `--ed-sp-h-before: calc(var(--ed-lh) * 2.6)`

## Tipografia (D-03)

| Papel | Família | Tamanho / altura / peso |
|---|---|---|
| H1 de seção | DM Sans | 40px → 60px (≥640), lh 1.05, 600, `text-wrap: balance` |
| H2 de seção | DM Sans | 30px → 36px, 600 |
| Lead | Inter | 18px, `--text-secondary` |
| H1 de artigo | DM Sans | `clamp(34px, 1.2rem + 3.6vw, 56px)`, lh 1.05, máx. 22ch |
| Corpo do artigo | Inter | `--ed-fs-body` 17px/1.6 → 18px/1.65 (≥640), medida 68ch |
| H2/H3 de artigo | DM Sans | `--ed-fs-h2` clamp(1.4rem…1.75rem) / `--ed-fs-h3` 1.2rem, 600 |
| Meta | Inter | 14/20 (D-28) |
| Eyebrow | DM Mono | 12px, 500, caixa alta, tracking largo, cor `--action-text` (D-35) |
| Botão | Inter | grande 40px alt./18px · médio 36/16, 500 |
| Destaque (Highlight) | DM Sans | 700, clamp(1.25rem, 1rem + 1vw, 1.625rem), lh 1.3 |

Fontes OFL via Google Fonts: `DM+Sans:wght@400;500;600;700`, `Inter:wght@400;500;600;700`, `DM+Mono:wght@400;500`.
