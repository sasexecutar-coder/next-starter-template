Sim. A terminologia técnica mais adequada para essa referência é visualização isométrica/axonômétrica 2.5D com extrusão de células. Ela parte de uma matriz 2D — no exemplo, o calendário de contribuições do GitHub — e transforma cada célula em um prisma cuja altura representa magnitude. O GitHub documenta a base como um calendário visual de contribuições; a camada superior da sua referência é uma interpretação tridimensional dessa matriz. 

Eu registraria este lote como INFOGRAPHIC-ISOMETRIC-SYSTEM v0.1.

|   |   |
|---|---|
|Propriedade|Padrão|
|Projeção|Isométrica/axonômétrica|
|Natureza|2.5D: desenho 2D simulando volume|
|Perspectiva|Ortográfica; sem ponto de fuga|
|Eixos|aproximadamente 30°, 90°, 150°|
|Unidade|célula quadrada → prisma/cuboide|
|Valor principal|altura da extrusão|
|Valor secundário|intensidade da cor|
|Faces|topo claro, lateral média, lateral escura|
|Sombra|mínima ou ausente|
|Base|grid regular|
|Labels|planos, fora da projeção 3D|

A Autodesk define o desenho isométrico exatamente como uma representação 2D que simula tridimensionalidade usando três eixos principais; no padrão isométrico, esses eixos ficam em 30°, 90° e 150°. 

A geometria canônica fica:

                    Z

                    │ 90°

                    │

                   ███

                ██████

             █████████

          ╱

     150°╱

        ╱

       ●──────────────

            30°

Ou, vista como sistema de eixos:

                 Z

                 │

                 │

            150° │ 30°

               \ │ /

                \│/

                 ●

A regra técnica:

projection:

  type: isometric

  dimensionality: 2.5D

  

  axes:

    x: 30deg

    y: 150deg

    z: 90deg

  

  perspective:

    vanishing_point: false

    perspective_distortion: false

  

  parallel_edges:

    remain_parallel: true

Isso é importante: eu não classificaria o efeito como “perspectiva 3D”. Em uma perspectiva tradicional, linhas paralelas podem convergir para pontos de fuga. Aqui, elas permanecem paralelas. É justamente a característica da representação isométrica usada em desenho técnico. 

Construção dos blocos

Cada dado começa como uma célula:

2D

  

□ □ □ □ □

□ □ □ □ □

□ □ □ □ □

e passa a ser extrudido:

2.5D

  

      ┌──┐

      │  │

   ┌──┤  │

   │  │  │

┌──┤  │  │

│  │  │  │

└──┴──┴──┘

Contrato:

data_block:

  primitive: rectangular_prism

  

  base:

    width: 1_unit

    depth: 1_unit

  

  height:

    source: quantitative_value

    baseline: 0

    scale: linear_preferred

  

  rotation:

    individual_rotation: false

  

  spacing:

    grid_gap: small

    consistent: true

No exemplo, a altura é a variável visual dominante. Isso é uma espécie de extruded bar encoding sobre grid.

Dupla codificação

A referência usa duas maneiras de expressar intensidade:

VALOR

 │

 ├── altura

 │

 └── cor

Formalmente:

encoding:

  primary:

    channel: height

    meaning: magnitude

  

  secondary:

    channel: color_lightness

    meaning: magnitude

  

  strategy: redundant_encoding

Quanto maior a contribuição:

baixo

▁  verde claro

  

médio

▃  verde médio

  

alto

▇  verde escuro

Essa redundância ajuda a perceber padrões gerais, embora o 3D não deva ser a única forma disponível para quem precisa comparar valores exatos.

Tratamento das faces

O volume pode ser criado sem sombras pesadas. Use variações tonais nas três faces:

          TOP

       ┌────────┐

      /        /|

     /────────/ |

     │        │ │  RIGHT

LEFT │        │ /

     │        │/

     └────────┘

Schema:

faces:

  top:

    lightness: high

  

  left:

    lightness: medium

  

  right:

    lightness: low

  

shadow:

  cast_shadow: none_or_minimal

  blur: minimal

Isso produz profundidade através de face shading, não através de efeitos de sombra decorativa.

Uso com seu branding

Eu manteria a geometria sempre neutra e mudaria apenas a escala semântica.

Exemplo solution:

#E7F8EE

#B8EBCB

#73D99A

#00BF63

#007A3E

risk:

rosa muito claro

↓

vermelho claro

↓

#FF0000

↓

vermelho escuro

attention:

amarelo muito claro

↓

amarelo médio

↓

attention-yellow

Ou seja:

isometric_palette:

  geometry: constant

  

  semantic_scale:

    solution:

      anchor: "#00BF63"

  

    risk:

      anchor: "#FF0000"

  

    attention:

      anchor: GAP

  

    brand:

      anchor: "#2D5CE6"

Composição do infográfico

A imagem também estabelece uma hierarquia muito útil:

┌─────────────────────────────────────┐

│ TÍTULO / CONTEXTO                   │

│                                     │

│       VISUAL ISOMÉTRICO             │

│       █                             │

│    ██ ███                           │

│ ███████████                         │

│                                     │

│ MÉTRICA             MÉTRICA         │

│ 1.516               53              │

│                                     │

│ ─────────────────────────────────   │

│                                     │

│ VISUAL 2D COMPLEMENTAR              │

│ □ □ □ ■ □ □ ■ ...                   │

│                                     │

│ legenda            menos → mais     │

└─────────────────────────────────────┘

Isso gera três níveis:

1. OVERVIEW

   forma 3D → reconhecer padrão

  

2. KPI

   números → compreender magnitude

  

3. DETAIL

   matriz 2D → consultar dados

Essa combinação é melhor do que depender exclusivamente do 3D.

Pesquisas em visualização apontam que posição em um eixo comum costuma permitir comparações quantitativas mais precisas; portanto, para o seu sistema, eu classificaria o isométrico como camada de overview/padrão, mantendo números, labels ou uma representação 2D para precisão. 

Regra de acessibilidade do seu sistema

Para o projeto voltado também a neurodivergência, eu adotaria:

accessibility:

  three_d:

    may_be_primary_visual: true

    may_be_only_data_representation: false

  

  exact_values:

    provide:

      - label

      - tooltip

      - table

      - kpi

      - accessible_text

  

  color:

    color_only_encoding: false

  

  fallback:

    two_d_view: recommended

Portanto:

3D

= padrão / tendência / orientação

  

2D + números

= precisão / consulta

Mobile

No desktop pode existir uma faixa isométrica longa.

No mobile, não recomendo simplesmente reduzir tudo até ficar minúsculo.

Desktop:

██████████████████████████████████

Mobile:

┌────────────────────────┐

│ KPI                    │

│ 1.516                  │

│                        │

│      ███               │

│   ███████              │

│ ██████████             │

│                        │

│ ver detalhe →          │

└────────────────────────┘

Ou permitir scroll horizontal interno somente no gráfico:

responsive:

  desktop:

    full_isometric_timeline: true

  

  mobile:

    strategy:

      - crop_to_relevant_range

      - horizontal_chart_scroll

      - summarized_isometric_view

  

    shrink_until_unreadable: false

Prompt visual canônico

Para futuras gerações:

generation_style:

  id: INFO-ISO-01

  

  name: isometric_extruded_data_grid

  

  projection:

    type: orthographic_isometric

    axes: [30deg, 90deg, 150deg]

  

  geometry:

    primitive: rectangular_prism

    repeated_grid: true

    uniform_base_size: true

    variable_height: true

  

  rendering:

    perspective: false

    parallel_edges: true

    shadows: minimal

    face_shading: true

    background: clean

  

  data_encoding:

    primary: height

    secondary: color_intensity

  

  aesthetic:

    - technical

    - editorial

    - analytical

    - geometric

    - restrained

  

  avoid:

    - perspective_camera

    - dramatic_lighting

    - glossy_3d

    - bevels

    - gradients_without_data_meaning

    - excessive_shadows

    - decorative_rotation

Agora seu sistema visual acumulado fica:

DESIGN SYSTEM

│

├── 01 BRAND-COLOR-SYSTEM

├── 02 EDITORIAL-LAYOUT-SYSTEM

├── 03 CARD-HIERARCHY-SYSTEM

├── 04 IMAGE-ILLUSTRATION-SYSTEM

└── 05 INFOGRAPHIC-ISOMETRIC-SYSTEM

    ├── 30° / 90° / 150°

    ├── orthographic projection

    ├── 2.5D extrusion

    ├── cuboid grid

    ├── height encoding

    ├── semantic color scale

    └── 2D precision fallback

Essa passa a ser a especificação para os seus infográficos com aparência de “blocos 3D”, sem confundi-los com renderização 3D em perspectiva.