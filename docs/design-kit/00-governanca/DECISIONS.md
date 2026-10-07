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
| D-25 | **Estrutura global = handoff de arquitetura UX** (`04-handoff/blog-ux/`), com cores e fontes do kit. Espaçamento em múltiplos de 8 (12 como exceção): 96 entre blocos, 48 entre grupos, 32 entre itens, 24 dentro de componentes, 8–16 dentro de grupos. Raios 4/8/12/16. Gutter 32 (mobile) / 48 (≥ 640), container 1120. Header 72, sub-nav 52. Botões 40/18 e 36/16 com área de toque ≥ 44; botão de ícone 40×40. **Substitui a escala, os raios e a densidade do Nocturne (D-13 revista)**. A serif da referência não é adotada (D-03 mantida) | PROJECT_DECISION |
| D-26 | **Menu L1 completo**: Blog (Início, Artigos, Guias, Vídeos), Mapas, Ferramentas, e Assets (Loja/Oficina), Programa Executar, Comunidade e Entrar como "Em breve" (visíveis, não clicáveis, `aria-disabled`). Mobile: menu em tela cheia; desktop: itens ativos em linha e os "Em breve" agrupados em "Mais" para a barra não quebrar. O header recolhe ao rolar para baixo e volta ao rolar para cima. Sub-nav L2 só no Blog | PROJECT_DECISION |
| D-27 | **Taxonomia do blog** (`src/content/taxonomy.ts`): Tipo (Artigo, Guia, Asset, Vídeo); Pilar editorial (3 vagas, nomes GAP); Frente do Programa (Executar App, Consultoria e serviços, Marketplace, Comunidade, Schola.ai — proposta a validar); Situação do leitor (GAP). Filtros e valores sem post ficam ocultos | PROJECT_DECISION |
| D-28 | **Correções do handoff aplicadas**: borda de controle `#85847F` (≥ 3:1), texto meta em 14 px, busca e botão de filtro com a mesma altura (44), ilustração do card em célula própria do grid | PROJECT_DECISION |
| D-29 | **CTA primário único**: "Começar agora" (`/mapas`, da v1) no header desktop e no pé do menu mobile, ao lado do contorno "Fale conosco" (Em breve) | PROJECT_DECISION |
| D-30 | **Carrossel**: setas desabilitadas nas pontas (sem loop), sem avanço automático; 1 item sem controles; > 7 itens com contador | PROJECT_DECISION |

## Decisões de aplicação (padronização transversal)

Origem: feedback com 13 capturas (`Arquivo.zip`). Diagnóstico: as regras D-01…D-30 estavam registradas, mas cada página as aplicava com classes próprias (74 desvios na primeira auditoria, `07-validacao/ds-audit.md`). A partir daqui, cada regra vive num único componente em `src/app/_components/ui/`, e o storyboard `/storyboard` mostra esse componente vivo.

| ID | Decisão | Origem |
|---|---|---|
| D-31 | **CTA único em azul**: toda ação de navegação ou conversão usa o `<Button variant="primary">` (`#2D5CE6`), inclusive no bloco final índigo. O contorno fica só para ações utilitárias (limpar, "Em breve", ação secundária ao lado de um primário). Revoga os botões brancos e de contorno usados como CTA | PROJECT_DECISION |
| D-32 | **Cards e cérebro com os tokens do Brain Home v2** (`04-handoff/prototipos/brain-home-v2.html`): painel com borda 1 e raio 2 (`<Panel>`, card de recurso); callout com linha tracejada e colchetes de 12 × 2 (`<Callout>`, callout editorial, "Como ler este mapa"); no cérebro, marcador em círculo de 36 com ícone (alvo 44), callout automático por orientação e painel com linhas `pick`. A **cena** continua a da v1 (D-22 mantida). Acento: índigo no cérebro (D-23), azul da marca no resto do site. Raio do card passa de 16 para 2 (`--radius-xs`). **Revisão (feedback em produção):** as 4 marcas de canto poluíam os cards pequenos (RC-01…09, ferramentas); elas ficam **só no painel do cérebro**, e todos os outros cards usam apenas a borda fina, que acende na cor da marca no hover/foco (`npm run audit:ds` reprova marcas fora do cérebro) | PROJECT_DECISION |
| D-33 | **Três temas para teste** (`data-theme` em `<html>`, salvo em `localStorage` `rc-theme`, sem flash): **Atual** = marca (padrão, intermediária); **Claro** = tokens do blog-starter (`#FFFFFF`, accent-1 `#FAFAFA`, accent-2 `#EAEAEA`, accent-7 `#333`, texto `#171717`); **Noite** = tokens do blog-starter (`slate-900` `#0F172A`, `slate-800` `#1E293B`, `slate-400` `#94A3B8`, foreground `#EDEDED`). Só os neutros mudam; o azul da marca fica, com tom claro `#8FA9FF` para texto no Noite. Seletor no rodapé e no storyboard | PROJECT_DECISION + EXISTING_PROJECT_TOKEN |
| D-34 | **Ritmo como distância entre blocos** (corrige a leitura de D-25): 96 entre blocos no desktop (≥ 768) e 64 no mobile, aplicado como metade em cima e metade embaixo de cada `<Section>` (`--block-y` 48/32), para que blocos vizinhos somem exatamente a regra (antes somavam 192). Cabeçalho → conteúdo 48 (32 abaixo de 640); itens 32; dentro de componentes 24; grupos 8–16. Espaçamentos fora da escala são reprovados por `npm run audit:ds` | PROJECT_DECISION |
| D-35 | **Cor da marca nos destaques**: eyebrow mono em azul (sem fundo cinza); negrito do artigo em azul; citação com fio fino em cima e embaixo e segmento azul de 48 × 4 centrado; estados ativos (menu, sub-nav, seletor, pontos do carrossel, checkbox) em azul. O amarelo de atenção fica restrito ao chip GAP, que não quebra linha | PROJECT_DECISION |
| D-36 | **Cérebro sem pausa, reset nem switch de movimento**: o movimento segue só `prefers-reduced-motion`; ficam as dicas e os pontos. Menu mobile com transição de 320 ms (fade + 12 px, linhas em cascata) e foco no painel ao abrir, sem anel visível; seletor de categoria próprio que abre sempre para baixo | PROJECT_DECISION |

## Precedência de tokens (resolve GAP-002)

1. **Global:** BRAND-COLOR-SYSTEM + D-01…D-04. Tokens `--brand-*`, `--semantic-*`, `--attention-*`, `--text-*`, `--surface-*` em `src/app/globals.css`.
2. **Estrutura:** handoff de arquitetura UX (D-25, ritmo D-34) e tokens v2 de card (D-32). Tokens `--space-*`, `--block-y`, `--stack-*`, `--radius-*`, `--shadow-*` e estados. Temas: D-33.
3. **Superfície "artigo":** handoff editorial §11 (`--ed-*`) para escala, ritmo e medida. Os slots `{{BRAND_…}}` são preenchidos assim:

| Slot editorial | Valor aplicado | Fonte |
|---|---|---|
| paper | `#FFFDFA` | BRAND-COLOR-SYSTEM (canvas) |
| ink / heading | `#000000` | text-primary |
| label | `#545454` | text-secondary |
| link / strong | `#2D5CE6` (`#8FA9FF` no Noite) | ação (D-01, D-35) |
| callout | callout v2: tracejado + colchetes na cor da marca | D-32 (substitui a faixa índigo) |
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
| GAP-012 | PARCIAL | Paleta escura: tema "Noite" em teste com os tokens do blog-starter (D-33) | Escolher o tema definitivo após o teste | Tema aprovado e seletor de teste removido ou mantido |
| GAP-013 | ABERTO | Nocturne veio sem `theme.json`, `components/`, `foundations/` e `templates/` citados no readme | Enviar se forem necessários | Referência completa |
| GAP-014 | ABERTO | Depoimentos e métricas próprias (D-07, D-10) | Coletar com fonte, permissão e data | Bloco reativado |
| GAP-015 | ABERTO | Aprovação visual G2 do cérebro: índigo `#6E72F0` e textos dos cards (rascunho) | Revisar e aprovar | D-21/D-23 marcadas como aprovadas; `draft: false` |
| GAP-016 | ABERTO | Medições G3 em aparelhos reais (FPS em 375/768/1440). Em 375px o cérebro fica pequeno e rótulos podem se sobrepor (comportamento da v1) | Medir e ajustar a composição mobile | Registro de FPS por aparelho e layout mobile aprovado |
| GAP-017 | ABERTO | Peso do modelo: GLB 9,47 MB sem compressão (o parser próprio não lê meshopt/Draco) | Gerar malha mais leve (grade 1,6 mm) ou trocar o parser | Download do cérebro ≤ 3 MB |
| GAP-018 | PARCIAL | Busca do header (mockup da v1). O hub `/artigos` tem busca no cliente; não há busca global no header | Decidir se a busca global entra | Busca global ou decisão de mantê-la só no hub |
| GAP-019 | ABERTO | Nomes dos 3 pilares editoriais (D-27) | Definir nomes | `PILLARS` com label; filtro e seletor ativos |
| GAP-020 | ABERTO | Valores de "Situação do leitor" (público: autônomos com dificuldade de autogestão) | Definir com o público | `USE_CASES` preenchido |
| GAP-021 | ABERTO | Destinos de Assets (Loja/Oficina), Programa Executar, Comunidade, Entrar e "Fale conosco" | Fornecer URLs ou criar páginas | Itens com `status: "LIVE"` em `src/lib/site.ts` |
| GAP-022 | ABERTO | Ilustrações dos cards (handoff: só no primeiro ou em todos) | Decidir e produzir (D-11) | Campo `illustration` preenchido |
| GAP-024 | ABERTO | Tema padrão definitivo entre Atual, Claro e Noite (D-33) e se o seletor fica visível para o público | Testar e decidir | D-33 atualizada |
| GAP-023 | ABERTO | Confirmar no navegador os tamanhos e pesos estimados do handoff e o header que recolhe ao rolar | Revisão visual | Aprovação registrada |

## Condição de retomada

Fase 1, cérebro 3D (D-22), arquitetura UX global (D-25…D-30) e padronização transversal (D-31…D-36, storyboard em `/storyboard`, `npm run audit:ds` sem violações) aplicados no site. A próxima rodada começa por GAP-024 (tema definitivo), GAP-015 (aprovação G2), GAP-019/GAP-020 (taxonomia), GAP-021 (destinos do menu) e o conteúdo (GAP-006, GAP-007, GAP-010).
