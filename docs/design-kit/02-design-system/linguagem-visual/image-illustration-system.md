O efeito da referência não é simplesmente “imagem em cinza com filtro de caneta”. Pesquisando a terminologia técnica, a descrição mais adequada para documentarmos é uma combinação de architectural line art / technical pen-and-ink illustration, com grayscale tonal reduction, linhas finas de contorno e uma cor de acento seletiva.

A Adobe define line art como ilustração baseada principalmente em linhas de diferentes pesos, normalmente monocromática. O efeito Ink Outlines redesenha os detalhes da imagem com linhas finas e estreitas, simulando caneta e tinta; crosshatching e stippling podem ser usados para construir textura e sombra. 

Na sua referência, eu formalizaria como:

IMAGE-ILLUSTRATION-SYSTEM v0.1 — Architectural Technical Line Art

FOTOGRAFIA / ARQUITETURA

          ↓

REDUÇÃO PARA CINZA

          ↓

EXTRAÇÃO DE CONTORNOS

          ↓

TRAÇO FINO TIPO CANETA TÉCNICA

          ↓

DETALHES / HACHURA LEVE

          ↓

COR DE ACENTO SELETIVA

          ↓

FUNDO COM GRID/PONTILHADO TÉCNICO

O resultado fica entre desenho arquitetônico técnico e ilustração editorial. Desenhos arquitetônicos historicamente funcionam justamente como representações bidimensionais destinadas a comunicar forma e detalhes de uma construção, o que explica por que essa estética transmite estrutura, análise e engenharia. 

1. Nome canônico

Eu não chamaria simplesmente de sketch.

Usaria:

style:

  id: IMG-STYLE-ARCH-LINE-01

  name: Architectural Technical Line Art

  aliases:

    - architectural line drawing

    - technical pen illustration

    - pen-and-ink architectural rendering

    - grayscale line-art

E evitaria usar blueprint como nome principal. A estética lembra documentação arquitetônica, mas seu exemplo não é um blueprint tradicional: ele usa fundo claro, linhas cinza e azul apenas como acento.

2. Construção visual

architectural_line_art:

  source:

    preferred:

      - architecture_photo

      - object_photo

      - environment_photo

  

  base:

    mode: grayscale

    saturation: low_or_zero

    contrast: moderate

    photographic_realism: reduced

  

  linework:

    style: technical_pen

    color: neutral_gray

    weight: fine

    density: medium

    preserve:

      - contours

      - structural_edges

      - architectural_details

  

  shading:

    dominant: line_based

    allowed:

      - fine_hatching

      - crosshatching

      - stippling

    heavy_black_fills: false

  

  accent:

    mode: selective

    quantity: restrained

A Adobe descreve stippling especificamente como a utilização de pontos para construir forma, densidade e textura; portanto ele pode ser usado como técnica auxiliar, mas não precisa aparecer em toda imagem. 

3. Cinza como base

A imagem deve permanecer predominantemente neutra:

70–90% da percepção

→ cinza / preto suave / branco

  

10–30%

→ acento da marca ou significado

Não estou transformando essas proporções em requisito científico; são uma regra visual do seu sistema.

O cinza cumpre três funções:

GRAY DARK

contornos principais

  

GRAY MID

detalhes estruturais

  

GRAY LIGHT

informação de fundo / textura

Isso combina com seu sistema anterior:

--illustration-line-primary: #545454;

--illustration-line-secondary: /* cinza derivado */;

--illustration-line-light: #ececec;

--illustration-background: #fffdfa;

4. Cor seletiva

A parte azul observada na construção é uma camada de ênfase, e não uma recoloração completa da fotografia.

Tecnicamente, existe relação com tratamentos duotone: a Adobe descreve duotone como uso de uma imagem em tons de cinza combinada com tintas adicionais, inclusive uma cor especial para acento. 

Para o seu projeto, porém, eu chamaria a técnica de:

selective semantic accent

porque você poderá trocar a cor conforme o significado:

semantic_accent:

  brand:

    color: "#2D5CE6"

  

  solution:

    color: "#00BF63"

  

  cognitive_risk:

    color: "#FF0000"

  

  attention:

    color: GAP

Assim:

imagem arquitetônica

         ↓

cinza predominante

         ↓

elemento importante

         ↓

AZUL = marca/ação

VERDE = solução

VERMELHO = risco

AMARELO = atenção

5. O azul não deve colorir tudo

Na referência, o acento funciona porque é localizado.

Regra:

accent_usage:

  full_image_tint: false

  

  apply_to:

    - selected_region

    - structural_edge

    - highlighted_layer

    - focal_object

    - causal_path

  

  avoid:

    - entire_background

    - every_outline

    - large_saturated_blocks

Isso preserva a aparência editorial/técnica.

6. Grid pontilhado

A referência também utiliza uma camada quase imperceptível de pontos no fundo.

Eu documentaria separadamente:

technical_grid:

  type: dot_grid

  role: construction_reference

  prominence: very_low

  contrast: very_low

  color: neutral_light

  decorative_only: true

Função visual:

não é conteúdo

não é gráfico

não é textura pesada

  

é uma referência de:

→ projeto

→ sistema

→ construção

→ precisão

7. Relação imagem/texto

O desenho não deve competir com a copy.

Na referência:

HERO

                H1

          descrição

             CTA

  

ARQUITETURA

entra pelas bordas

e ocupa área secundária

Formalização:

composition:

  text:

    priority: primary

    contrast: high

  

  illustration:

    priority: secondary

    contrast: low_to_medium

  

  overlap:

    text_legibility_must_win: true

  

  negative_space:

    required_around_headline: true

Essa é uma distinção importante para seu público de leitura: a imagem fornece contexto, mas não vira ruído atrás do texto.

8. Estilo de traço

O padrão não deve parecer desenho infantil nem sketch muito solto.

Preferir:

FINO

PRECISO

ARQUITETÔNICO

MONOCROMÁTICO

BAIXA SATURAÇÃO

DETALHE CONTROLADO

Evitar:

carvão

pincel grosso

aquarela

grafite muito sombreado

cartoon

3D hiper-realista

A própria Adobe diferencia Ink Outlines, que usa linhas finas para redesenhar detalhes, de efeitos mais pictóricos, como pincel seco ou traços angulares. 

9. Prompt visual canônico

Quando futuramente você solicitar uma imagem nesse padrão, o contrato pode usar algo como:

generation_style:

  medium: architectural technical pen illustration

  

  rendering:

    - fine line art

    - precise architectural contours

    - grayscale

    - low visual noise

    - restrained hatching

    - subtle stippling where needed

    - white/off-white background

    - faint technical dot grid

  

  accent:

    strategy: selective

    color_token: semantic

    saturation: controlled

  

  aesthetic:

    - editorial

    - technical

    - minimal

    - schematic

    - precise

  

  prohibited:

    - photorealistic_full_color

    - watercolor

    - cartoon

    - heavy_sketch

    - dense_texture

    - excessive_color

10. Sistema acumulado

Agora a documentação visual fica organizada assim:

DESIGN SYSTEM

│

├── 01 BRAND-COLOR-SYSTEM

│

├── 02 EDITORIAL-LAYOUT-SYSTEM

│

├── 03 CARD-HIERARCHY-SYSTEM

│

└── 04 IMAGE-ILLUSTRATION-SYSTEM

    │

    ├── grayscale foundation

    ├── architectural line art

    ├── technical pen

    ├── selective semantic accent

    ├── subtle hatching/stippling

    └── technical dot grid

O nome que eu usaria daqui para frente para você pedir esse efeito é: “Architectural Technical Line Art, grayscale + selective semantic accent”. Isso é bem mais preciso e reproduzível do que apenas “efeito de caneta”.