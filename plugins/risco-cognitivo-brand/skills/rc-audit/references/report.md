# Relatório de auditoria — design system + acessibilidade (v1.0.0 · 2026-10-08)

Fluxos aplicados: `design:design-system` (audit) e `design:accessibility-review` (WCAG 2.1 AA), com evidência de
`validate_tokens.py`, `audit_html.py` e scan Playwright (contraste computado por elemento, alvos, teclado, landmarks,
reflow 320px) em 3 temas × 2 larguras sobre os renders do build (`dist/renders`).

## Design System Audit
**Componentes revisados:** 9 primitivos + 4 templates · **Achados:** 6 (2 corrigidos no build) · **Score:** 88/100

### Consistência de nomes
| Achado | Onde | Decisão |
|---|---|---|
| Classe de tipo de slide `stat` colidia com `.stat` (número 220px, tracking −0.05em) → slide ilegível | rc-social template | **Corrigido**: slide usa `kind-<tipo>` |
| Tokens de marca fixos (`brand-*`) × semânticos temáticos (`surface-*`, `text-*`, `action-text`) | camada de marca | **Corrigido**: `apply_brand.py` prioriza semânticos (fundo `brand-canvas` falhava 1,15:1 no tema noite) |

### Cobertura de tokens
| Categoria | Definidos | Valores fixos encontrados |
|---|---|---|
| Cor | 86 base + 9 claro + 19 noite | 0 hex fora de `:root` em templates e renders |
| Espaço | escala 4…96 | 1 (`.eyebrow-bars` gap 18px — herdado do site) |
| Tipografia | 3 famílias; `--ed-fs-*` só para editorial | tamanhos de UI em rem soltos (.75/.8125/.875/.9375/1/1.1875) — **sem escala tokenizada** |
| Fontes fora do Next | — | `--font-*` não existiam fora de `next/font` → **corrigido** com `fonts.css` gerado e validado |

### Completude de componentes
| Componente | Estados | Variantes | Docs | Score |
|---|---|---|---|---|
| Button | ✅ hover/active/disabled/busy/foco | ✅ primary/secondary/md/icon | ✅ | 10/10 |
| Panel | ✅ hover/foco (interactive) | ✅ subtle/compact/interactive | ✅ | 9/10 |
| Callout / Highlight | n/a | ⚠️ variantes semânticas GAP | ✅ | 7/10 |
| Chip | ⚠️ alvo 22px no `chip-tag` | ✅ gap/soon/tag | ✅ | 7/10 |
| Eyebrow / Meta | n/a | ✅ | ✅ | 9/10 |
| ThemeToggle (segmented) | ✅ aria-pressed | ✅ 3 temas | ✅ | 10/10 |

### Ações prioritárias
1. Tokenizar a escala tipográfica de UI (`--fs-xs…--fs-lg`) no site e propagar pelo build (GAP-DS-01).
2. `chip-tag` interativo: área de toque ≥ 24px (WCAG 2.2 2.5.8) via `::before`, como em `.btn` (GAP-DS-02, no site).
3. `.eyebrow-bars` gap 18 → 16 ou 24 (decisão de design; mantido para paridade com o site).

## Accessibility Audit — renders do plugin
**Padrão:** WCAG 2.1 AA · **Arquivos:** ONBOARDING, ebook-entrega, card A4, galeria de primitivos, carrossel (HTML-fonte)
**Achados:** 7 · **Críticos:** 0 (após correções) · **Maiores:** 2 corrigidos · **Menores:** 2 abertos

| # | Achado | Critério | Severidade | Status |
|---|---|---|---|---|
| 1 | `<button>` com fundo nativo claro no tema noite → `chip-tag` 1,02:1 | 1.4.3 | 🔴 | **Corrigido** (`button{background-color:transparent}`, igual ao preflight do site) |
| 2 | Barra superior do ebook transbordava a 320px (botão "Baixar PDF") | 1.4.10 Reflow | 🟡 | **Corrigido** (wordmark vira só ícone ≤ 480px) |
| 3 | Link do wordmark com 28px de altura | 2.5.5 | 🟡 | **Corrigido** (`min-height:44px`) |
| 4 | HTML-fonte do carrossel sem landmark/H1 | 1.3.1 | 🟢 | **Corrigido** (`<main>` + H1 oculto) |
| 5 | `chip-tag` 22px de altura | 2.5.8 (2.2) | 🟢 | Aberto — primitivo do site (GAP-DS-02) |
| 6 | HTML-fonte do carrossel rola a 320px | 1.4.10 | — | Exceção: página de render 1080px, não é superfície de leitura; o entregável é PNG/PDF |
| 7 | Imagens do carrossel precisam de texto alternativo na publicação | 1.1.1 | 🟢 | Processo: alt "Slide N de M — …" no post |

### Contraste (tokens, 3 temas — `validate_tokens.py`)
48 pares avaliados; menor razão 3,22:1 (controle/não-texto, exige 3:1). Exemplos: ação `#2D5CE6` sobre canvas 5,46:1;
texto secundário sobre canvas 7,46:1; branco sobre índigo 17,7:1; ação no tema noite `#8FA9FF` ≥ 4,5:1.
Scan por elemento nos renders após correções: **0 falhas** de contraste em 3 temas × 2 larguras.

### Teclado e leitor de tela
Tab percorre na ordem visual (marca → temas → PDF → navegação) com foco visível em todos os elementos; landmarks
`header/nav/main/footer` no ebook/onboarding; 1 H1 por página, sem pular níveis; checklist com `<label>`; FAQ em
`<details>`; tema com `aria-pressed`; progresso `aria-hidden`. Teste manual com VoiceOver/NVDA: **A DEFINIR** (não
executado neste ambiente).
