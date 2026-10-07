Vou formalizar este lote como VECTOR-FIGURE-CONTRACT v1.0, integrado ao Brand, Editorial, Card e Infographic Systems já definidos.

VECTOR-FIGURE-CONTRACT v1.0

Objetivo: garantir que diagramas, figuras, esquemas, ícones e ilustrações vetoriais tenham uma linguagem visual única, predominantemente monocromática, usando cor apenas quando ela acrescentar significado.

Princípio central:

FORMA E ESTRUTURA

        ↓

cinza / preto / branco

  

SIGNIFICADO

        ↓

acento semântico de cor

Ou seja, a cor não existe apenas para decorar.

1. Linguagem visual

O padrão será MONO-FIRST + SEMANTIC ACCENT.

visual_language:

  mode: mono_first

  

  base:

    background: "#FFFDFA"

    primary_ink: "#000000"

    secondary_ink: "#545454"

    neutral_line: "#ECECEC"

  

  accent:

    usage: semantic_only

    decorative_only: false

Como regra operacional do projeto:

80–95% da figura

→ neutro / monocromático

  

5–20%

→ cor semântica quando necessária

Esses percentuais são um PROJECT_RULE, não um padrão externo.

  

2. Paleta vetorial

|   |   |   |
|---|---|---|
|Papel|Token|Valor|
|Canvas|figure-bg|#FFFDFA|
|Traço principal|figure-ink|#000000|
|Traço secundário|figure-ink-muted|#545454|
|Linha auxiliar|figure-line-subtle|#ECECEC|
|Marca/ação|figure-accent-brand|#2D5CE6|
|Marca suave|figure-accent-soft|#CBD4FF|
|Solução|figure-accent-solution|#00BF63|
|Risco|figure-accent-risk|#FF0000|
|Atenção|figure-accent-attention|GAP|
|Institucional forte|figure-accent-indigo|#0E025D|

O amarelo continua bloqueado até recebermos o HEX completo.

  

3. Regra semântica de cor

semantic_color:

  brand:

    token: figure-accent-brand

    meaning:

      - navigation

      - selected_state

      - primary_path

      - active_process

  

  solution:

    token: figure-accent-solution

    meaning:

      - intervention

      - control

      - resolved_state

      - improvement

  

  risk:

    token: figure-accent-risk

    meaning:

      - risk

      - failure_point

      - exposure

      - critical_condition

  

  attention:

    token: figure-accent-attention

    meaning:

      - attention_required

      - warning

      - review_point

Exemplo:

ENTRADA ─────────────── PROCESSO ─────────────── SAÍDA

                       │

                       │

                    RISCO

                     RED

                       │

                       ▼

                    CONTROLE

                     GREEN

Todo o restante permanece preto/cinza.

  

4. Uso correto de acentos

Cor permitida:

● nó importante

● caminho selecionado

● área de risco

● controle

● solução

● aviso

● estado atual

● valor destacado

Cor não deve ser usada para:

× preencher todo o fundo

× colorir todos os ícones

× dar uma cor diferente a cada elemento

× criar variedade estética

× separar elementos que poderiam ser separados por espaço/hierarquia

A regra é:

Primeiro diferenciar por forma, posição, título e linha. Depois, se houver significado semântico, aplicar cor.

  

5. Estilo de linha

Os exemplos enviados mostram uma linguagem que funciona melhor com linhas simples, estruturais e pouco decorativas.

stroke:

  primary:

    weight: medium

    color: figure-ink

  

  secondary:

    weight: thin

    color: figure-ink-muted

  

  guide:

    weight: hairline

    color: figure-line-subtle

  

  characteristics:

    rounded_caps: preferred

    decorative_texture: false

    heavy_outline: false

Escala recomendada:

linha guia       1x

linha estrutural 1.5x

linha ativa      2x

Evitar criar dezenas de espessuras.

  

6. Formas

Primitivas preferenciais:

● circle

○ ring

■ square

□ rectangle

▭ card

→ arrow

— connector

└ branch

┬ fork

A geometria deve permanecer simples.

geometry:

  preferred:

    - line

    - circle

    - rectangle

    - rounded_rectangle

    - arrow

    - bracket

    - simple_polygon

  

  avoid:

    - ornamental_shapes

    - random_blobs

    - complex_3d_without_data_meaning

    - excessive_gradients

  

7. Hierarquia gráfica

Cada figura deve ter no máximo quatro níveis principais:

LEVEL 1

TÍTULO / IDEIA CENTRAL

  

LEVEL 2

MACROBLOCOS

  

LEVEL 3

RELAÇÕES / FLUXO

  

LEVEL 4

DETALHES / ANOTAÇÕES

Exemplo:

RISCO COGNITIVO

===============

  

DEMANDA

   │

   ▼

VULNERABILIDADE

   │

   ▼

[RISCO]

   │

   ├──────────► EVENTO

   │

   ▼

[CONTROLE]

Aqui:

preto

= estrutura

  

vermelho

= risco

  

verde

= controle

  

8. Figuras explicativas

Uma figura deve explicar uma ideia, não simplesmente ocupar espaço.

Tipos canônicos:

figure_types:

  - process_flow

  - causal_map

  - hierarchy

  - comparison

  - anatomy

  - timeline

  - matrix

  - system_map

  - annotated_illustration

  - infographic

Cada uma precisa ter um propósito declarado.

Exemplo:

figure:

  id: FIG-RC-001

  type: causal_map

  

  purpose:

    show: "como uma demanda pode evoluir até impacto"

  

  semantic_accents:

    risk: true

    solution: true

  

9. Diagramas de processo

Padrão:

INPUT

  │

  ▼

PROCESS

  │

  ▼

DECISION

 ├── SIM ──► RESULT

 └── NÃO ──► CONTROL

Regras:

flow_diagram:

  reading_direction:

    primary: top_to_bottom

    alternative: left_to_right

  

  crossing_lines:

    allowed: false

  

  connector_labels:

    short: true

  

  nodes:

    max_primary_per_view: 7

Mais de sete nós principais devem ser agrupados em subfluxos.

  

10. Diagramas causais

Para o projeto Risco Cognitivo, este será um tipo prioritário.

CONTEXTO

   │

   ▼

DEMANDA

   │

   ▼

VULNERABILIDADE

   │

   ▼

RISCO

   │

   ▼

EVENTO

   │

   ▼

IMPACTO

Com controles:

             ┌── CONTROLE ──┐

             │              │

DEMANDA → RISCO → EVENTO → IMPACTO

             │

             └── MITIGAÇÃO

Contrato:

causal_map:

  neutral_nodes: monochrome

  

  risk_node:

    accent: risk

  

  mitigation_node:

    accent: solution

  

  active_path:

    accent: brand

  

  non_active_paths:

    neutral: true

  

11. Ícones

Os ícones também seguem mono-first.

icons:

  style:

    type: outline

    fill: minimal

    stroke: consistent

  

  default:

    color: figure-ink

  

  semantic:

    risk: figure-accent-risk

    solution: figure-accent-solution

    attention: figure-accent-attention

    selected: figure-accent-brand

Evitar:

🟥 ícone vermelho

🟩 ícone verde

🟦 ícone azul

🟨 ícone amarelo

todos ao mesmo tempo sem necessidade.

  

12. Figuras com pessoas/cérebro/objetos

Quando a figura for ilustrativa:

estrutura principal

→ cinza/preto

  

área relevante

→ acento

  

labels

→ neutros

  

elementos secundários

→ baixa opacidade

Por exemplo, cérebro:

CÉREBRO

linhas → #545454

  

rede selecionada

→ #2D5CE6

  

ponto de risco

→ #FF0000

  

estratégia/controle

→ #00BF63

Não usar:

uma cor diferente para cada região cerebral

se essas cores não tiverem significado consistente.

  

13. Opacidade

O sistema terá níveis limitados:

opacity:

  primary: 1.0

  secondary: 0.72

  tertiary: 0.48

  guide: 0.19

Isso combina com os valores que você já vinha utilizando.

Uso:

100%

conteúdo principal

  

72%

secundário

  

48%

contexto

  

19%

grid / guide / construção

  

14. Background técnico

Quando necessário:

technical_background:

  allowed:

    - plain

    - dot_grid

    - fine_grid

  

  default:

    background: figure-bg

  

  grid:

    color: figure-line-subtle

    opacity: low

    role: decorative_support

O grid nunca pode competir com o diagrama.

  

15. Profundidade

A regra default é flat 2D.

depth:

  default: flat

  

  allowed:

    isometric:

      only_when:

        - data_magnitude

        - architecture

        - system_structure

  

  shadow:

    default: none

O sistema isométrico já documentado é uma exceção específica, não o padrão para todos os gráficos.

  

16. Labels

labels:

  preferred_words: 1-4

  warning_above: 6

  

  alignment:

    default: left

  

  multiline:

    max_lines: 2

  

  font:

    weight: regular_or_medium

Evitar:

┌───────────────────────────────┐

│ Este elemento representa uma │

│ vulnerabilidade que pode...   │

└───────────────────────────────┘

Nesse caso a explicação deve ficar fora da figura ou em caption.

  

17. Caption

Toda figura editorial relevante recebe legenda.

caption:

  required_for:

    - data_figure

    - research_figure

    - causal_diagram

    - infographic

  

  structure:

    - figure_number

    - short_description

    - optional_source

Exemplo:

Figura 3 — Relação entre demanda, vulnerabilidade,

risco e impacto.

  

18. Uso dentro do MDX

O MDX não deve conter SVG arbitrário espalhado pelo conteúdo.

Padronizar componentes:

<Figure

  id="FIG-RC-001"

  type="causal-map"

  src="/figures/risco-cognitivo/fig-001.svg"

  alt="Fluxo entre demanda, vulnerabilidade, risco, evento e impacto."

  caption="Relação operacional usada pelo framework."

/>

Para uma figura semântica:

<VectorFigure

  id="FIG-RC-002"

  variant="risk"

  src="/figures/risco-cognitivo/fig-002.svg"

  alt="Ponto de risco destacado em vermelho."

/>

  

19. Contrato SVG

SVG será o formato principal para essas figuras quando não houver necessidade de fotografia.

svg:

  preferred: true

  

  requirements:

    viewBox: required

    fixed_width: prohibited

    fixed_height: prohibited

  

    accessibility:

      decorative:

        aria_hidden: true

  

      informative:

        alt_external: required

  

    styling:

      inline_hex: discouraged

      semantic_tokens: preferred

Exemplo:

<svg viewBox="0 0 1200 675">

e não:

<svg width="1200" height="675">

como única definição de tamanho.

  

20. Responsividade

Desktop:

FIGURA + labels completos

Mobile:

FIGURA reorganizada

↓

labels curtos

↓

caption

Não:

desktop 1200px

↓

reduzir tudo proporcionalmente para 320px

Contrato:

responsive_vector:

  strategy:

    mobile:

      - reflow

      - simplify

      - stack

  

    desktop:

      - expanded

  

  minimum_label_size:

    preserve_readability: true

  

  excessive_shrink:

    prohibited: true

  

21. Redução de complexidade

O principal mecanismo de controle de poluição será:

complexity_budget:

  primary_nodes:

    max: 7

  

  semantic_colors:

    max_simultaneous: 3

  

  font_sizes:

    max: 3

  

  line_weights:

    max: 3

  

  nested_containers:

    max_depth: 2

Se ultrapassar, a figura deve ser dividida.

  

22. Contrato de destaque

A prioridade visual será:

1. posição

2. escala

3. peso

4. contraste

5. cor

Cor é o último recurso, não o primeiro.

Isso evita transformar toda a página em um painel multicolorido.

  

23. Exemplo — risco cognitivo

COMO O RISCO SE FORMA

=====================

  

  

      CONTEXTO

          │

          ▼

       DEMANDA

          │

          ▼

   VULNERABILIDADE

          │

          ▼

     ┌─────────┐

     │  RISCO  │  ← vermelho

     └─────────┘

          │

          ▼

        EVENTO

          │

          ▼

       IMPACTO

  

  

          │

          │

          ▼

     ┌─────────┐

     │CONTROLE │  ← verde

     └─────────┘

O desenho inteiro continua monocromático, exceto os dois estados semanticamente relevantes.

  

24. Exemplo — solução

ANTES

─────

  

DEMANDA ─────► SOBRECARGA ─────► ERRO

                  ↑

               vermelho

  

  

DEPOIS

──────

  

DEMANDA ─────► CONTROLE ─────► EXECUÇÃO

                  ↑

                verde

  

25. DO / DON’T

DO

✓ preto e cinza como linguagem dominante

✓ cor com significado

✓ linhas simples

✓ poucos níveis

✓ bastante espaço negativo

✓ SVG para diagramas

✓ labels curtos

✓ caption

✓ hierarquia previsível

DON’T

× rainbow charts

× uma cor por categoria sem necessidade

× gradientes puramente decorativos

× sombras pesadas

× 3D apenas estético

× vários estilos de ícone

× muitos containers aninhados

× texto longo dentro de figuras

× legenda que depende somente de cor

  

26. Schema consolidado

vector_figure_contract:

  version: "1.0"

  

  philosophy:

    mode: mono_first

    accent: semantic_only

  

  neutral:

    background: "#FFFDFA"

    ink: "#000000"

    muted: "#545454"

    line: "#ECECEC"

  

  semantic:

    brand: "#2D5CE6"

    solution: "#00BF63"

    risk: "#FF0000"

    attention: GAP

    institutional: "#0E025D"

  

  geometry:

    default: flat_2d

    primitives:

      - line

      - circle

      - rectangle

      - arrow

      - bracket

  

  hierarchy:

    max_levels: 4

  

  complexity:

    primary_nodes_max: 7

    simultaneous_accent_colors_max: 3

    line_weights_max: 3

    nested_depth_max: 2

  

  typography:

    label_words_preferred: "1-4"

    label_lines_max: 2

  

  svg:

    preferred: true

    viewbox_required: true

    responsive: true

  

  accessibility:

    color_only_meaning: false

    text_alternative_required: true

    caption_required_for_editorial_figures: true

  

  mdx:

    arbitrary_inline_svg: false

    approved_components:

      - Figure

      - VectorFigure

      - Diagram

      - Infographic

Com isso, o sistema visual já fica dividido em seis contratos:

01 BRAND-COLOR-SYSTEM

02 EDITORIAL-LAYOUT-SYSTEM

03 CARD-HIERARCHY-SYSTEM

04 IMAGE-ILLUSTRATION-SYSTEM

05 INFOGRAPHIC-ISOMETRIC-SYSTEM

06 VECTOR-FIGURE-CONTRACT

A regra transversal passa a ser simples: conteúdo e estrutura são monocromáticos; cor representa significado.