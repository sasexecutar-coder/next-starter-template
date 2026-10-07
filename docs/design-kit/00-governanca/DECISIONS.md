# Decisões e pendências

Registro canônico do pacote **RC-DESIGN-KIT-001**. Cada decisão tem origem (`provenance`):

- `PROJECT_DECISION`: decisão nova do projeto;
- `EXISTING_PROJECT_TOKEN` / `EXISTING_PROJECT_CONTENT`: valor ou texto já existente no projeto, recuperado;
- `SOURCE_CONTROL_VALUE`: valor de controle de uma ferramenta, preservado como veio.

## Decisões de organização (v1.0.0, mantidas)

- Organização por função, com subpastas físicas dentro de uma única raiz.
- README e índice na raiz para acesso imediato.
- Nomes externos normalizados; conteúdo original integralmente preservado (hash SHA-256 no índice).
- Referência OpenAI classificada como referência externa; não é a identidade do projeto (ver D-15).
- Imagens mantidas como referências visuais, sem inferir seu conteúdo pelo nome.
- Não remover arquivos por semelhança de nome. Duplicidades exatas são registradas na verificação.
- Nenhuma regra ganha aprovação apenas por ter sido colocada em determinada pasta.

## Decisões canônicas de marca e produto

| ID | Decisão | Valor | Provenance | Aplicação no site |
|---|---|---|---|---|
| D-01 | Sistema semântico de cores | RISCO `#FF0000` (texto associado preto) · SOLUÇÃO `#00BF63` (texto preto) · ATENÇÃO surface `#FFE659` + ink `#8A5A00` · AÇÃO/MARCA `#2D5CE6` | `#FFE659`: PROJECT_DECISION (o valor original "FFE 59" estava incompleto). `#8A5A00`: EXISTING_PROJECT_TOKEN | `src/app/globals.css` (`--semantic-*`, `--attention-*`). `#FFE659` nunca é texto nem linha isolada sobre o creme |
| D-02 | FX-EDGE-01 `soft_black_outline` | glow/outline preto, offset 0, blur 0, opacidade 0,19; spread/size `100` | tipo: PROJECT_DECISION; `100`: SOURCE_CONTROL_VALUE (Canva) | Utilitário `.fx-edge-01`, só em recortes. Proibido: overlay de página, sombra pesada, sombra de card flutuante |
| D-03 | Tipografia | Display DM Sans (h1–h3, wordmark) · Body Inter (parágrafos, UI, botões, rótulos, navegação) · Mono DM Mono (rótulos técnicos, IDs, schemas, metadados) | PROJECT_DECISION | `next/font` em `src/app/layout.tsx` → `--font-display/--font-body/--font-mono` |
| D-04 | Logo | LOGO-V0 provisório; wordmark canônico "Risco Cognitivo" em DM Sans 600; símbolo = GAP | PROJECT_DECISION | Componente `Wordmark`. Favicon tipográfico "RC" (`public/brand/favicon.svg`) marcado como provisório; neste repositório não existe `/logo.svg` |
| D-05 | Rota `/mapas` | 8 seções: hero, orientação, mapa interativo, seletor, detalhe, riscos relacionados, relações, fontes/limites. Sequência do detalhe: função → demanda → dificuldade possível → estratégia → riscos relacionados → evidência | PROJECT_DECISION | `src/app/mapas/`. **Funções canônicas (atualizado, GAP-009): as 4 do Brain Home v1: Planejamento, Controle inibitório, Memória de trabalho, Flexibilidade** |
| D-06 | Rota `/ferramentas` | Hero, como funciona (Entenda/Preencha/Gere), catálogo (5 ferramentas), execução em 3 telas, privacidade/limites | PROJECT_DECISION | `src/app/ferramentas/`. Ferramentas com status GAP |
| D-07 | Depoimentos | `DISABLED` até existir fonte real, permissão e atribuição | PROJECT_DECISION | Bloco inexistente na Home |
| D-08 | Logos de prova social | `DISABLED` | PROJECT_DECISION | Bloco inexistente na Home |
| D-09 | Pricing | `DISABLED` (sem modelo de negócio nem preço validado) | PROJECT_DECISION | Bloco inexistente na Home |
| D-10 | Números | Números de marketing proibidos; aceitos só com valor, unidade, fonte, data e contexto | PROJECT_DECISION | Conteúdo em `src/content/*.ts` com `status: "PUBLISHED" \| "GAP"`; GAP aparece como "Em preparação" |
| D-11 | Ilustrações | Monocromático por padrão; acento semântico só com significado (azul = ação, verde = solução, vermelho = risco, amarelo = atenção). Fotos: fundo removido, elemento isolado, canvas `#FFFDFA` | PROJECT_DECISION | Ícones de linha monocromáticos; acentos só na cadeia de relações |
| D-12 | Home | 9 blocos: Hero, Problema, Mapa, Riscos cognitivos, Como funciona, Artigos, Ferramentas, FAQ, CTA final | PROJECT_DECISION | `src/app/page.tsx` + `src/app/_components/home/*` |

## Decisões de aplicação (Fase 1)

| ID | Decisão | Provenance |
|---|---|---|
| D-13 | **Nocturne**: adota-se a estrutura (componentes, estados, foco 2px, raio 8px, densidade 0,7×, layout assimétrico à esquerda, elevação discreta); **não** se adota a paleta escura nem o "Inter only". Paleta = D-01 + BRAND-COLOR-SYSTEM; tipografia = D-03. Botão primário fica **sólido** em `#2D5CE6` (regra de uso da marca); o contorno do Nocturne fica no botão secundário | PROJECT_DECISION |
| D-14 | **Repositório e stack** (resolve GAP-004): o kit é aplicado em `next-starter-template` (Next.js 16, App Router, Tailwind 3, OpenNext, Cloudflare Workers). O handoff Astro (`04-handoff/site`) vale como padrão de componentes e rotas, não como stack nem como valores | PROJECT_DECISION |
| D-15 | **Identidade** (resolve GAP-003): a referência OpenAI (`01-referencias/marca`) não é adotada como identidade. A identidade é o BRAND-COLOR-SYSTEM + D-01…D-04 | PROJECT_DECISION |
| D-16 | **Cabeçalho do artigo**: H1 e lead centralizados, corpo à esquerda em 68ch (EDITORIAL-LAYOUT-SYSTEM prevalece sobre o handoff editorial §8.1, que propunha título à esquerda) | PROJECT_DECISION |
| D-17 | **Blocos do MDX contract** escritos em Markdown com diretivas (`:::callout{title}`, `:::summary`, `:::definition{term}`, `:::keypoints`), convertidos no build. Sem MDX executável em tempo de execução | PROJECT_DECISION |
| D-18 | **Resíduos do template removidos**: 3 posts lorem ipsum com autores reais, fotos desses autores, favicons do Next.js, banner de preview, rodapé da Vercel, alternador de tema | PROJECT_DECISION |
| D-19 | **Modo escuro desligado** até existir paleta escura aprovada (a do handoff editorial é proposta e a do Nocturne foi recusada em D-13) | PROJECT_DECISION |
| D-20 | ~~`/mapas` usa mapa de rede (SVG)~~ **Substituída pela D-22**: os arquivos do cérebro chegaram em `Arquivo_2.zip` | PROJECT_DECISION |
| D-21 | **Textos das funções** vêm do Brain Home v1 (`short`, `lead`, demanda, dificuldade, estratégia). Pelo HANDOFF, os textos de Planejamento, Controle inibitório e Flexibilidade são rascunho de conteúdo (`draft: true`) pendente de G2; Memória de trabalho é do mockup | EXISTING_PROJECT_CONTENT |
| D-22 | **Cérebro 3D HOME-BRAIN-001: a fonte de verdade é a v1** (`04-handoff/brain-home/brain-home-v1.html`): superfície anatômica + partículas, anéis orbitais, marcadores clicáveis, card de detalhe, pontos, pausa/reset, movimento reduzido. A v2 oca (`prototipos/brain-home-v2.html`, `brain-hollow.js`) fica SUPERADA. Anatomia: OpenNeuro ds006128 (CC0), procedência em `brain-home/PROVENIENCIA.md`. Implementação: `src/lib/brain/brain-scene.ts` (porte 1:1) + `src/app/_components/brain/brain-stage.tsx`; os assets servidos são copiados do kit com hash conferido (`scripts/sync-brain-assets.mjs`) | PROJECT_DECISION |
| D-23 | **Acento do cérebro**: índigo da v1 `#6E72F0` (forte `#4F53D9`, suave `#E4E6FF`), restrito ao componente do cérebro e ao Hero que o contém (tokens `--brain-*`). `#6E72F0` só como marcador, borda ou traço (3,9:1); texto em índigo usa `#4F53D9` (5,9:1). Aprovação visual G2 pendente | PROJECT_DECISION |
| D-24 | **Home**: o bloco 03 (Mapa) passa a fazer parte do Hero, como na composição da v1 (eyebrow, título, cérebro + card, controles, passos Entenda/Estruture/Execute). O header ganha o CTA "Começar agora" da v1; a busca da v1 não entra (GAP-018) | PROJECT_DECISION |

## Precedência de tokens (resolve GAP-002)

1. **Global:** BRAND-COLOR-SYSTEM + D-01…D-04. Tokens `--brand-*`, `--semantic-*`, `--attention-*`, `--text-*`, `--surface-*` em `src/app/globals.css`.
2. **Estrutura:** Nocturne (D-13). Tokens `--space-*`, `--radius-*`, `--shadow-*` e estados.
3. **Superfície "artigo":** handoff editorial §11 (`--ed-*`) para escala, ritmo e medida. Os slots `{{BRAND_…}}` são preenchidos assim:

| Slot editorial | Valor aplicado | Fonte |
|---|---|---|
| paper | `#FFFDFA` | BRAND-COLOR-SYSTEM (canvas) |
| ink / heading | `#000000` | text-primary |
| label | `#545454` | text-secondary |
| link | `#2D5CE6` | ação (D-01) |
| callout-head | `#0E025D` + texto branco | eyebrow/callout alternativo |
| callout-bg | `#CBD4FF` a 48% | brand-light-blue-soft |
| rule | `#ECECEC` | brand-light-gray |

4. **Handoff do site (Astro):** padrões de componente e rota; nenhum valor `≈` estimado dele é usado.

Em conflito: registrar valores, fontes e decisão aqui; nunca escolher silenciosamente. Contraste conferido em [`07-validacao/contrast-report.md`](../07-validacao/contrast-report.md). Limitação conhecida: `#00BF63` sobre o creme tem 2,40:1. Por isso é usado só como marcação ao lado de um rótulo em texto preto, nunca como texto nem como único portador de significado.

## Pendências

| ID | Estado | Evidência / problema | Ação elegível | Aceite |
|---|---|---|---|---|
| GAP-001 | BLOCKED | A auditoria YAML cita `risco-cognitivo.mdx` e `risco-cognitivo-reading-flow-v1.mdx`, ausentes do pacote | Localizar os dois arquivos | Auditoria revalidada contra ambos |
| GAP-002 | RESOLVIDO | Ver "Precedência de tokens" | — | Uma regra por token/superfície |
| GAP-003 | RESOLVIDO | Ver D-15 | — | Decisão explícita de identidade |
| GAP-004 | RESOLVIDO | Ver D-14 | — | Stack confirmada |
| GAP-005 | ABERTO | Símbolo gráfico do logo (D-04) | Aprovar símbolo | `public/brand/symbol.svg` + atualização de D-04 |
| GAP-006 | ABERTO | Títulos e descrições de RC-01…RC-09 sem fonte | Fornecer conteúdo com fonte | `src/content/risks.ts` com `status: "PUBLISHED"` |
| GAP-007 | ABERTO | Riscos relacionados e evidências de cada função | Fornecer referências | `relatedRisks`/`evidence` preenchidos em `src/content/functions.ts` |
| GAP-008 | RESOLVIDO | Arquivos recebidos em `Arquivo_2.zip`; ver D-22 | — | Cérebro 3D na Home e em `/mapas` |
| GAP-009 | RESOLVIDO | Lista canônica = 4 funções da v1 (D-05 atualizada) | — | D-05 atualizado |
| GAP-010 | ABERTO | Artigos da série (00–04) não escritos | Publicar em `_posts/` | `slug` preenchido em `src/content/series.ts` |
| GAP-011 | ABERTO | Ferramentas funcionais (Fase 2) e texto de privacidade definitivo | Especificar fluxo e tratamento de dados | Ferramenta com as 3 telas + exportação PDF |
| GAP-012 | ABERTO | Paleta do modo escuro (D-19) | Aprovar paleta | Tokens `.dark` com contraste verificado |
| GAP-013 | ABERTO | Nocturne veio sem `theme.json`, `components/`, `foundations/` e `templates/` citados no readme | Enviar se forem necessários | Referência completa |
| GAP-014 | ABERTO | Depoimentos e métricas próprias (D-07, D-10) | Coletar com fonte, permissão e data | Bloco reativado |
| GAP-015 | ABERTO | Aprovação visual G2 do cérebro: índigo `#6E72F0` e textos dos cards (rascunho) | Revisar e aprovar | D-21/D-23 marcadas como aprovadas; `draft: false` |
| GAP-016 | ABERTO | Medições G3 em aparelhos reais (FPS em 375/768/1440). Em 375px o cérebro fica pequeno e rótulos podem se sobrepor (comportamento da v1) | Medir e ajustar a composição mobile | Registro de FPS por aparelho e layout mobile aprovado |
| GAP-017 | ABERTO | Peso do modelo: GLB 9,47 MB sem compressão (o parser próprio não lê meshopt/Draco) | Gerar malha mais leve (grade 1,6 mm) ou trocar o parser | Download do cérebro ≤ 3 MB |
| GAP-018 | ABERTO | Busca do header (presente no mockup da v1) | Definir busca (ex.: índice estático) | Busca funcional |

## Condição de retomada

Fase 1 e cérebro 3D (D-22) aplicados no site. A próxima rodada começa por GAP-015 (aprovação G2), GAP-006, GAP-007 e GAP-010 (conteúdo) e GAP-011 (ferramentas).
