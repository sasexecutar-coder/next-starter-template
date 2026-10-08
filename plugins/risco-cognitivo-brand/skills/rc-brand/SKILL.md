---
name: rc-brand
description: >-
  Brand guidelines e design system em código da marca Risco Cognitivo: cores (3 temas), tipografia DM Sans/Inter/DM Mono,
  ritmo de espaçamento, raios, componentes, regras editoriais e de figuras, com tokens exportáveis (CSS, JSON DTCG,
  Tailwind, Python). Use sempre que a tarefa pedir a identidade visual do Risco Cognitivo, aplicar a marca, criar qualquer
  asset com a marca (página, componente, artigo, ebook, card, carrossel, infográfico, documento, slide), exportar tokens
  para outro projeto ou sistema de IA, ou conferir se algo segue a marca — mesmo sem dizer "brand guidelines". Também é o
  ponto de entrada dos comandos /marca-* (IDs CV-MARCA-001…012).
---

# Risco Cognitivo — Brand Guidelines

Aplicar a identidade do Risco Cognitivo a qualquer artefato, a partir de tokens verificados. A fonte de verdade é o
design kit do site (decisões D-01…D-36) e `src/app/globals.css`; esta skill carrega uma cópia gerada e validada desses
tokens em `assets/tokens/`. Consulte `references/brand-sources.md` antes de declarar uma regra como oficial.
Nunca invente token, cor, fonte, número ou regra ausente: o que não tem fonte fica `A DEFINIR` e aparece ao público como
"Em preparação" (D-10).

**Keywords:** identidade visual, brand guidelines, design tokens, tipografia, paleta, Risco Cognitivo, funções executivas, editorial, acessibilidade, assets de marca

## Como usar esta skill (progressive disclosure)

1. Leia esta página: ela basta para cor, tipo e regras gerais.
2. Identifique o **entregável** e abra só a referência dele em `references/deliverable-rules.md` (tabela por tipo).
3. Para código, copie de `assets/` em vez de redigitar valores.
4. Para produzir um tipo específico, prefira a skill da função (abaixo) — ela traz template e script.
5. Antes de entregar, rode a auditoria (`/marca-auditar` ou a skill `rc-audit`).

| Precisa de… | Use |
|---|---|
| Aplicar a marca a algo existente (HTML, DOCX, PPTX, PDF) | skill `rc-brand-layer` · `/marca-aplicar` |
| Conferir tokens, usos, formatos, @page, vetores, contraste | skill `rc-audit` · `/marca-auditar` |
| Especificação de um canal/peça (Reels, carrossel, newsletter…) | skill `rc-formats` · `/marca-formato` |
| Ebook, one-page, onboarding standalone | skill `rc-ebook` · `/marca-ebook` |
| Card de prompt A4 (tutorial · mockup · prompt) | skill `rc-cards` · `/marca-card` |
| Carrossel 4:5, post, story | skill `rc-social` · `/marca-carrossel` |
| Prompt de infográfico/vetor por perfil | skill `rc-infographic` · `/marca-infografico` |
| Componente de UI em HTML/React | skill `rc-components` · `/marca-componente` |
| Artigo/MDX com blocos editoriais | skill `rc-editorial` · `/marca-editorial` |
| Pacote de assets de um ciclo | workflow `marca-pacote-campanha` · `/marca-campanha` |
| Exportar tokens | `/marca-tokens` (abaixo, "Implementação técnica") |

Índice completo de comandos, sinônimos e regras de interação: `references/commands.md`.

## Brand Guidelines

### Cores

Tema padrão "Atual". Valores exatos em `assets/tokens/tokens.json`; temas Claro e Noite em `references/tokens.md`.

| Papel | Token | Valor | Uso | Fonte |
| --- | --- | --- | --- | --- |
| Dark (texto) | `--text-primary` | `#000000` | Texto principal, títulos | BRAND-COLOR-SYSTEM |
| Light (fundo) | `--brand-canvas` / `--surface-page` | `#FFFDFA` | Fundo de página, papel, fundo de figura | BRAND-COLOR-SYSTEM, D-11 |
| Mid gray | `--brand-dark-gray` / `--text-secondary` | `#545454` | Texto secundário, traço de ilustração | BRAND-COLOR-SYSTEM |
| Light gray | `--brand-light-gray` / `--border-subtle` | `#ECECEC` | Divisores, linhas auxiliares | BRAND-COLOR-SYSTEM |
| Accent 1 — Ação | `--brand-action-blue` | `#2D5CE6` | Todo CTA (sempre sólido), links, negrito/eyebrow/estado ativo | D-01, D-31, D-35 |
| Accent 2 — Índigo | `--brand-dark-indigo` | `#0E025D` | Bloco final de CTA, divisor institucional, favicon | BRAND-COLOR-SYSTEM |
| Accent 3 — Azul-claro | `--brand-light-blue` | `#CBD4FF` | Seleção, fundo de destaque suave | BRAND-COLOR-SYSTEM |
| Semântica — Risco | `--semantic-risk` | `#FF0000` | Só risco/falha, com rótulo em texto preto | D-01 |
| Semântica — Solução | `--semantic-solution` | `#00BF63` | Só controle/solução, com rótulo em texto preto | D-01 |
| Semântica — Atenção | `--attention-surface` | `#FFE659` | Só fundo do chip "Em preparação" (GAP), texto preto | D-01, D-35 |
| Cérebro | `--brain-accent` | `#6E72F0` | Exclusivo do componente cérebro 3D (marcador/traço; texto em `#4F53D9`) | D-23 |

Regras de cor:
- **Mono-first com acento semântico**: 80–95% neutro, 5–20% cor com significado. Nunca usar cor só para variar.
- **Texto sobre cor**: branco sobre azul, índigo e `#545454`; preto sobre vermelho, verde e amarelo.
- O amarelo nunca é texto nem linha; o verde e o vermelho nunca são o único portador de significado.

### Tipografia

| Função | Fonte | Fallback | Faixa/estilo | Fonte da regra |
| --- | --- | --- | --- | --- |
| Títulos (h1–h3, wordmark) | DM Sans | system-ui, Arial, sans-serif | 400–700; seção h1 40→60px, h2 30→36px, peso 600, tracking apertado | D-03, `ui/section.tsx` |
| Corpo e UI | Inter | system-ui, Arial, sans-serif | 16/24 na UI; artigo 17px/1.6 → 18px/1.65 (≥640) | D-03, `--ed-fs-body` |
| Técnico/metadados | DM Mono | ui-monospace, Menlo, monospace | eyebrow 12px caixa alta, IDs, schemas | D-03, D-35 |

As três famílias são OFL (Google Fonts). Se indisponíveis, use os fallbacks e registre a substituição. Serif não é usada.

## Regras de aplicação

1. **Identifique o formato** do artefato (web, componente, artigo, ebook/print, carrossel 4:5, post, story, infográfico,
   figura vetorial, card RC, capa, newsletter, onboarding, prompt card, slide, DOCX) e abra a linha dele em
   `references/deliverable-rules.md`.
2. **Preserve conteúdo e hierarquia**; a marca é a camada visual, não reescrita. Hierarquia vem de tamanho, peso, espaço
   e luminosidade — a cor reforça, nunca sinaliza sozinha.
3. **Tipografia:** DM Sans nos títulos, Inter no texto e na UI, DM Mono em rótulos técnicos e eyebrows.
4. **Contraste:** texto ≥ 4,5:1 e controles/não-texto ≥ 3:1 em todos os temas (WCAG 2.1 AA); alvos de toque ≥ 44px.
   Verifique com `scripts/contrast.py`.
5. **Acentos:** um único CTA primário azul sólido por bloco (D-31); destaques (eyebrow, negrito, régua de citação,
   colchetes de callout) no azul da marca (D-35); amarelo só no chip GAP.
6. **Logo:** a marca oficial é o **wordmark tipográfico** "Risco Cognitivo" em DM Sans 600 (`assets/brand/wordmark.svg`,
   D-04). Não existe símbolo aprovado (GAP-005): não desenhe um. O monograma "RC" de `favicon.svg` é provisório.
7. **Ritmo:** distância entre blocos 96 (desktop) / 64 (mobile); cabeçalho → conteúdo 48/32; itens 32; dentro de
   componente 24; grupos 8–16 (D-34). Escala 4/8/12/16/24/32/48/64/96 — nada fora dela.
8. **Conteúdo:** sem depoimentos, logos de clientes, pricing ou números de marketing sem fonte (D-07…D-10). Neurodivergência
   nunca como déficit; nada de diagnóstico.
9. **Verifique e relate** (`rc-audit`): substituições de fonte, regras sem evidência e qualquer valor `A DEFINIR`.

## Implementação técnica

**Ambientes:** HTML/CSS, React/Next.js, Tailwind, MDX, Python (python-pptx, python-docx, reportlab), geradores de imagem (via prompts).
**Tokens compartilhados (fonte de verdade):** `assets/tokens/tokens.json` (DTCG), gerado de `src/app/globals.css` por
`scripts/build_tokens.py`; paridade checada por `scripts/validate_tokens.py --site …`.
**Conversão de cores:** HEX validado → RGB com `tokens.rgb()` (`assets/tokens/tokens.py`); cores com alfa (`rgb(… / 45%)`)
são compostas sobre o fundo real antes de medir contraste (`scripts/contrast.py`). Não há equivalência CMYK garantida.
**Fontes:** `assets/tokens/fonts.css` (importa DM Sans, Inter e DM Mono do Google Fonts e define `--font-display/-body/-mono`); no Next, `next/font` com as mesmas variáveis; em PDF, embuta as fontes. Sem elas, fallbacks acima.
**Por formato:**
- **Web/HTML:** carregue `assets/tokens/tokens.css`, `assets/tokens/fonts.css` e `assets/components/components.css`; use classes `.btn .btn-primary`,
  `.panel`, `.callout` (+4 `<i class="bracket">`), `.chip .chip-gap`, `.highlight`, `.eyebrow`, `.page-block`. Tema via
  `data-theme="claro|noite"` em `<html>`.
- **React/Next:** copie `assets/components/react/*.tsx` (Button, Section, Panel, Callout, Chip, Eyebrow, Highlight,
  ThemeToggle) e o preset `assets/tokens/tailwind.preset.cjs`.
- **PPTX/DOCX:** `from tokens import TOKENS, rgb` → `RGBColor(*rgb(TOKENS["atual"]["brand-action-blue"]))`. `python-pptx`
  só vale para PowerPoint; não presuma que serve a HTML, MDX ou imagens.
- **Impressão/PDF:** `references/print.md` (`@page` A4, margens, quebras).
- **Figuras SVG:** `references/vector.md` (viewBox obrigatório, traço, paleta mono-first).

## Evidência e limites

Cada token e regra tem origem em `references/brand-sources.md`, classificada como **oficial** (decisão D-xx do kit),
**extraído de referência** ou **decisão do projeto**. Conflitos com outras fontes (laranja `#F56A1C` do schema técnico,
azul `#2563EB` da Campanha 01, marca "Custo Cognitivo" nos cards de exemplo) estão em `references/evidence/conflicts.md`
e **não** são adotados. Lacunas (símbolo do logo, safe areas de redes, provedor de newsletter, tema definitivo…) em
`references/evidence/gaps.md`. Quando faltar um valor obrigatório, marque `A DEFINIR` e peça somente esse dado.
