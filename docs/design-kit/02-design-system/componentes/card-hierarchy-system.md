Vou registrar este lote como CARD-HIERARCHY-SYSTEM v0.1, complementar aos sistemas anteriores. A referência define bem uma lógica de cards grandes como contêineres de contexto e cards menores como unidades de evidência, status ou detalhe — sem competir com o conteúdo principal.

|   |   |   |   |
|---|---|---|---|
|Nível|Elemento|Função|Hierarquia|
|H0|Seção|organiza o conjunto|máxima estrutural|
|H1|Eyebrow|contextualiza a seção|baixa, antes do título|
|H2|Título da seção|comunica a ideia principal|alta|
|H3|Lead|explica o título|média|
|H4|Feature Card|representa uma função/tema|alta local|
|H5|Micro Card|dado, status, indicador, evidência|subordinada|
|H6|Badge/Icon|classificação ou sinal rápido|mínima|

A composição observada pode ser formalizada assim:

SECTION

│

├── EYEBROW

│

├── HEADER

│   ├── H2

│   └── LEAD

│

└── FEATURE GRID

    │

    ├── FEATURE CARD

    │   ├── ICON

    │   ├── H3

    │   ├── DESCRIPTION

    │   ├── MAIN VISUAL

    │   │

    │   └── MICRO CARD

    │       ├── LABEL

    │       └── VALUE

    │

    └── FEATURE CARD

        └── ...

A primeira regra importante é: o card pequeno não deve virar outro “card principal”.

Ele existe para responder uma pergunta curta:

qual é o valor?

qual é o status?

qual é a categoria?

qual é o progresso?

qual é a evidência?

Exemplos adequados:

┌──────────────────────┐

│ Engagement           │

│ 99%                  │

└──────────────────────┘

  

┌─────────────┐

│ RISCO ALTO  │

└─────────────┘

  

┌──────────────────────┐

│ Próxima ação         │

│ Revisar relatório    │

└──────────────────────┘

Não é adequado transformar o micro-card em:

┌──────────────────────────────────────┐

│ título                               │

│ dois parágrafos                      │

│ três botões                          │

│ imagem                               │

│ tabela                               │

└──────────────────────────────────────┘

Nesse caso ele já deveria ser outro componente de nível superior.

Regra canônica dos Feature Cards

O card principal possui quatro zonas:

┌───────────────────────────────────────┐

│ ① ÍCONE                               │

│                                       │

│ ② TÍTULO                              │

│ ③ DESCRIÇÃO                           │

│                                       │

│                                       │

│ ④ VISUAL / DEMONSTRAÇÃO               │

│                          ┌───────────┐ │

│                          │ MICROCARD │ │

│                          └───────────┘ │

└───────────────────────────────────────┘

Isso gera uma leitura progressiva:

IDENTIFICAR

   ↓

ENTENDER

   ↓

VISUALIZAR

   ↓

CONFIRMAR / MEDIR

Para o seu projeto Risco Cognitivo, isso pode virar:

┌──────────────────────────────────────────┐

│ ○                                        │

│ Memória de Trabalho                      │

│ Mantém informações ativas durante        │

│ uma atividade.                           │

│                                          │

│       [visual do processo]               │

│                                          │

│                        ┌───────────────┐  │

│                        │ CARGA         │  │

│                        │ ALTA          │  │

│                        └───────────────┘  │

└──────────────────────────────────────────┘

Cards menores

Formalização:

micro_card:

  role:

    - metric

    - status

    - evidence

    - progress

    - classification

    - annotation

  

  hierarchy:

    level: subordinate

    may_compete_with_feature_title: false

  

  content:

    preferred_elements:

      - label

      - value

      - optional_icon

  

    max_information_groups: 2

  

  visual:

    background: surface-elevated

    border: subtle_or_none

    shadow: subtle

    radius: inherited

Um micro-card preferencialmente contém:

LABEL

VALUE

ou:

ICON + VALUE

e não uma nova estrutura editorial completa.

Regra de contraste

O card principal usa superfície neutra e pouco contraste.

O micro-card pode ter contraste um pouco maior para aparecer como informação sobreposta:

PAGE

#FFFDFA

    ↓

FEATURE CARD

neutral/subtle gray

    ↓

MICRO CARD

white / elevated surface

    ↓

VALUE

black / semantic color

Ou seja, a hierarquia não depende de bordas fortes.

Ela depende de:

diferença de superfície

+

posição

+

tamanho

+

espaçamento

+

tipografia

Hierarquia tipográfica

Não vou fixar pixels neste lote; registro a relação entre níveis:

card_typography:

  feature_title:

    role: h3

    emphasis: high

  

  feature_description:

    role: body

    emphasis: medium

    color: text-secondary

  

  micro_label:

    role: caption

    emphasis: low

    color: text-secondary

  

  micro_value:

    role: metric

    emphasis: high

    weight: semibold_or_bold

Portanto:

Smart Digital Wallet        ← H3 / forte

Store funds securely...     ← body / secundário

  

  

Engagement                  ← caption

99%                         ← métrica / forte

Espaçamento interno

A referência também mostra uma regra importante: não preencher todo o card.

Existe bastante espaço negativo entre:

ícone

↓

título

↓

descrição

  

        GRANDE ÁREA DE RESPIRO

  

visual

Vou registrar isso como:

card_spacing:

  principle: progressive_density

  

  top_region:

    density: medium

  

  content_to_visual:

    density: low

    whitespace: generous

  

  visual_region:

    density: medium

  

  micro_card:

    density: compact

Isso é especialmente útil para seu público porque permite identificar cada bloco antes de processar os detalhes.

Grid

A referência utiliza dois cards principais lado a lado no desktop.

Então o padrão pode ser:

DESKTOP

  

┌──────────────────┐ ┌──────────────────┐

│ Feature 01       │ │ Feature 02       │

│                  │ │                  │

│                  │ │                  │

└──────────────────┘ └──────────────────┘

  

┌───────────────────────────────────────┐

│ Feature 03                            │

│                                       │

└───────────────────────────────────────┘

Não significa que todo grid deve ser 2 colunas. Significa que podemos utilizar uma hierarquia de span.

feature_grid:

  desktop:

    columns: 2

  

  card:

    default_span: 1

  

  card_emphasis:

    allowed:

      - span_1

      - span_2

No mobile:

MOBILE

  

┌───────────────────────┐

│ Feature 01            │

└───────────────────────┘

  

┌───────────────────────┐

│ Feature 02            │

└───────────────────────┘

  

┌───────────────────────┐

│ Feature 03            │

└───────────────────────┘

Contrato:

responsive:

  mobile:

    columns: 1

    preserve_internal_hierarchy: true

  

  desktop:

    columns: 2

  

  prohibition:

    - shrink_two_desktop_cards_to_fit_mobile

A responsividade deve reorganizar, não apenas diminuir.

Regra de aninhamento

Para evitar uma interface cheia de caixas:

nesting:

  feature_card:

    may_contain_micro_cards: true

  

  micro_card:

    may_contain_another_card: false

  

  maximum_visual_depth: 2

Visualmente:

Card

└── Micro Card

é aceitável.

Isto:

Card

└── Card

    └── Card

        └── Card

não será padrão.

Uso das cores semânticas

Os cards principais devem continuar predominantemente neutros.

As cores de risco, atenção e solução entram em elementos menores:

Feature Card

   ↓

neutro

  

Micro Card

   ↓

RISCO       #FF0000

ATENÇÃO     yellow

SOLUÇÃO     #00BF63

AÇÃO        #2D5CE6

Isso preserva a hierarquia.

Não queremos:

card inteiro vermelho

card inteiro amarelo

card inteiro verde

como padrão, porque isso aumenta drasticamente o peso visual.

Schema consolidado

card_hierarchy_system:

  version: "0.1"

  

  levels:

    section:

      level: 0

  

    section_title:

      level: 1

  

    feature_card:

      level: 2

  

    micro_card:

      level: 3

  

    badge:

      level: 4

  

  feature_card:

    structure:

      - icon

      - title

      - description

      - visual

      - optional_micro_card

  

    surface:

      role: neutral

  

    content_density:

      top: medium

      middle: low

      visual: medium

  

  micro_card:

    purposes:

      - metric

      - status

      - progress

      - evidence

      - annotation

  

    content:

      max_groups: 2

  

    hierarchy:

      subordinate: true

  

  grid:

    mobile:

      columns: 1

  

    desktop:

      columns: 2

  

    wide_card:

      desktop_span: 2

  

  nesting:

    max_depth: 2

  

  semantic_colors:

    solution: semantic-solution

    risk: semantic-risk

    attention: semantic-attention

    action: brand-action-blue

Com esse lote, a documentação acumulada passa a ter três sistemas bem separados:

01 BRAND-COLOR-SYSTEM

   identidade e semântica de cor

  

02 EDITORIAL-LAYOUT-SYSTEM

   artigos, H1, linhas, tabelas e contraste

  

03 CARD-HIERARCHY-SYSTEM

   cards, micro-cards, grid, densidade e hierarquia

Isso já começa a formar um Design System reutilizável, em vez de apenas um conjunto de referências visuais.