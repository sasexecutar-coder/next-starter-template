# Risco Cognitivo — Design Kit

Fonte de verdade de marca, design e editorial do site Risco Cognitivo. O site que aplica este kit está na raiz deste repositório (Next.js no Cloudflare Workers).

| Campo | Valor |
|---|---|
| ID do pacote | RC-DESIGN-KIT-001 |
| Versão | 1.2.0 (organização 1.0.0 + Fase 1 + cérebro 3D HOME-BRAIN-001) |
| Área | Design / Editorial / Handoff |
| Status | Organização VERIFIED; decisões D-01…D-24 aplicadas no site; pendências em [DECISIONS](00-governanca/DECISIONS.md) |
| Owner | A DEFINIR |
| Evidência | [verification.json](07-validacao/verification.json), [contrast-report.md](07-validacao/contrast-report.md) |

## Objetivo

Reunir num só lugar a identidade, o sistema visual, os contratos editoriais e os handoffs do Risco Cognitivo. Cada regra aplicada no site precisa ser rastreável até um arquivo deste kit ou até uma decisão registrada.

## Ordem de leitura

1. **Este README:** o que é o kit e onde está cada coisa.
2. **[DECISIONS](00-governanca/DECISIONS.md):** decisões canônicas, precedência de tokens e pendências.
3. **`02-design-system/`:** fundamentos (cores), layout editorial, cards e linguagem visual.
4. **`03-editorial/`:** leitura cognitiva, contratos de blocos e MDX, arquitetura da série.
5. **`04-handoff/`:** aplicação por superfície (site, editorial, storyboard, protótipos).
6. **[MASTER-INDEX.csv](MASTER-INDEX.csv):** para localizar qualquer arquivo pelo ID.
7. **`01-referencias/` e `05-exemplos/`:** só consulta, quando necessário.

## Onde está cada coisa

| Pasta | Conteúdo | Autoridade |
|---|---|---|
| `00-governanca/` | DECISIONS (decisões, precedência, pendências) e MAPPING (ID ↔ nome original) | Canônica |
| `01-referencias/marca/` | OBRAND-STYLING-001: referência externa OpenAI | Só referência (D-15) |
| `01-referencias/visuais/` | 16 imagens de referência, preservadas sem classificação inferida | Só referência |
| `01-referencias/design-systems/nocturne/` | Design system Nocturne | Estrutura adotada, paleta não (D-13) |
| `02-design-system/fundamentos/` | BRAND-COLOR-SYSTEM | Canônica (global) |
| `02-design-system/layout/` | EDITORIAL-LAYOUT-SYSTEM | Canônica (superfície artigo) |
| `02-design-system/componentes/` | CARD-HIERARCHY-SYSTEM | Canônica |
| `02-design-system/linguagem-visual/` | Figuras vetoriais, infográficos isométricos, ilustração | Canônica, com acentos limitados por D-11 |
| `03-editorial/leitura/` | Leitura cognitiva | Canônica |
| `03-editorial/contratos/` | BLOCKS e MDX contract | Canônica (implementados por D-17) |
| `03-editorial/arquitetura/` | Série editorial | Canônica (`src/content/series.ts`) |
| `04-handoff/site/` | Handoff do site Astro Mainline | Padrão de componentes e rotas (D-14) |
| `04-handoff/editorial/` | Tokens editoriais de blog e ebooks | Superfície artigo, slots pela marca |
| `04-handoff/storyboard/` | Storyboard de componentes | Consulta |
| `04-handoff/brain-home/` | Cérebro 3D HOME-BRAIN-001: **v1 = fonte de verdade**, cena, assets, gerador, brutos FreeSurfer, HANDOFF e PROVENIÊNCIA | Canônica (D-22, D-23) |
| `04-handoff/prototipos/` | Brain Home v2 (versão oca) | SUPERADA (D-22) |
| `05-exemplos/` | Exemplo MDX do template | Sem autoridade |
| `06-operacao/` | Tutorial de personalização | Orientação |
| `07-validacao/` | Verificação, contraste, auditoria histórica | Evidência |

## Regras de precedência

1. As decisões D-01…D-24 em DECISIONS valem sobre qualquer arquivo de origem.
2. Fundamentos (`02-design-system/fundamentos`) valem globalmente.
3. Layout, componentes e contratos editoriais valem para a superfície que nomeiam.
4. Handoffs aplicam as regras acima a uma superfície. Valores estimados (`≈`) dos handoffs não são adotados.
5. Referências e exemplos não aprovam regras.
6. Em conflito, registre valores, fontes e decisão em DECISIONS. Nunca escolha em silêncio.

## Onde o kit vive no código

| Regra | Arquivo do site |
|---|---|
| Tokens de cor, estrutura e editorial | `src/app/globals.css`, `tailwind.config.ts` |
| Tipografia (D-03) | `src/app/layout.tsx` |
| Identidade, nome, navegação | `src/lib/site.ts`, `src/app/_components/wordmark.tsx` |
| Blocos editoriais (D-17) | `src/lib/remark-editorial-blocks.ts`, `src/app/_components/markdown-styles.module.css` |
| Conteúdo com status GAP (D-10) | `src/content/*.ts` |
| Home (D-12, D-24), `/mapas` (D-05), `/ferramentas` (D-06) | `src/app/page.tsx`, `src/app/mapas/`, `src/app/ferramentas/` |
| Cérebro 3D (D-22, D-23) | `src/lib/brain/brain-scene.ts`, `src/app/_components/brain/`, assets copiados por `scripts/sync-brain-assets.mjs` para `public/models/home-brain/` (não versionado; fonte = kit) |

## Pendências

Estão listadas em [DECISIONS → Pendências](00-governanca/DECISIONS.md#pendências): GAP-001, GAP-005 a GAP-007 e GAP-010 a GAP-018. Itens sem fonte aparecem no site como "Em preparação" e nunca como fato.

## Critérios de aceite

- [x] Os 33 arquivos originais preservados byte a byte (hash SHA-256 no índice).
- [x] Uma linha por arquivo no MASTER-INDEX, com cabeçalho `id,titulo,caminho,tipo,versao,status,depende_de,aplica_a,fonte,evidencia`.
- [x] IDs existentes preservados; a correspondência com nomes originais está no MAPPING.
- [x] Conflitos de token resolvidos com precedência registrada (GAP-002).
- [x] Todos os pares de texto com contraste ≥ 4,5:1 ([relatório](07-validacao/contrast-report.md)).
- [x] O site não exibe depoimentos, logos, pricing nem números sem fonte.
- [ ] Conteúdo RC-01…RC-09, evidências das funções e artigos da série (GAP-006, GAP-007, GAP-010).
- [x] Cérebro 3D da v1 na Home e em `/mapas`, com assets verificados por hash contra o `build-report.json`.
- [ ] Aprovação visual G2 do cérebro e medições G3 em aparelhos reais (GAP-015, GAP-016).
- [ ] Símbolo do logo aprovado (GAP-005).

Para regenerar o índice e a verificação: `python3 scripts/build-kit-index.py`. Para o contraste: `python3 scripts/contrast-report.py`.
