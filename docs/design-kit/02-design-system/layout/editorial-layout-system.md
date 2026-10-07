Formalização do segundo lote. Vou registrar como EDITORIAL-LAYOUT-SYSTEM v0.1, complementar ao BRAND-COLOR-SYSTEM v0.1.

|   |   |   |
|---|---|---|
|Elemento|Regra canônica|Status|
|H1|Centralizado, alta hierarquia, largura controlada|FACT visual|
|Subheading/lead|Centralizado abaixo do H1, largura maior que o título|FACT visual|
|Corpo do artigo|Alinhado à esquerda, coluna única, leitura contínua|FACT visual|
|Linhas divisórias|Horizontais, finas e neutras|FACT visual|
|Tabelas|Sem bordas verticais; separação apenas por linhas horizontais|FACT visual|
|Cabeçalho de tabela|Peso superior ao corpo; alinhamento por coluna|FACT visual|
|Superfície auxiliar|Cinza muito claro|FACT visual|
|Texto secundário|Cinza médio|FACT visual|
|Texto principal|Preto/quase preto|FACT visual|
|Contraste|Hierarquia por luminosidade/peso antes de usar cor de marca|DECISÃO|
|Bordas|Discretas; não usar caixas pesadas para separar conteúdo|FACT visual|

A arquitetura editorial fica:

ARTICLE

│

├── HEADER / NAV

│

├── HERO EDITORIAL

│   ├── H1 centralizado

│   └── Lead centralizado

│

├── DIVIDER

│

├── ARTICLE UTILITIES

│   ├── ouvir artigo

│   ├── duração

│   └── compartilhar

│

├── BODY

│   ├── parágrafos

│   ├── headings

│   ├── links

│   ├── tabelas

│   └── figuras

│

└── METADATA / FOOTNOTES

    └── superfície cinza clara

Para o H1, a regra não será “sempre centralizar qualquer H1 do site”. Ela será específica da superfície editorial:

[data-surface="article"] .article-header {

  text-align: center;

}

  

[data-surface="article"] .article-header h1 {

  margin-inline: auto;

  max-width: var(--article-title-width);

}

Isso impede que um H1 da Home, documento A4 ou formulário herde essa regra.

A hierarquia visual canônica será:

article_header:

  h1:

    alignment: center

    color: text-primary

    weight: regular_or_medium

    max_width: constrained

    purpose: primary_title

  

  lead:

    alignment: center

    color: text-primary

    max_width: wider_than_h1

    purpose: article_summary

  

  divider:

    type: horizontal_rule

    thickness: 1px

    color: line-subtle

Não estou fixando agora font-size, max-width ou pixels observados nas capturas como FACT. Esses valores devem vir da medição do layout ou do nosso sistema cognitivo de leitura.

Sistema de linhas

A linha deve funcionar como separador sem criar “caixas dentro de caixas”.

divider_system:

  default:

    width: 100%

    thickness: 1px

    color: neutral-subtle

    shadow: none

  

  uses:

    - section_boundary

    - table_row

    - metadata_boundary

    - utility_boundary

  

  prohibited:

    - heavy_black_rules

    - decorative_double_lines

    - vertical_table_grid_by_default

Visualmente:

CONTEÚDO

────────────────────────────────────

CONTEÚDO

e não:

┌──────────────────────────────────┐

│ CONTEÚDO                         │

├──────────────────────────────────┤

│ CONTEÚDO                         │

└──────────────────────────────────┘

A intenção é diminuir ruído visual.

Tabelas

O padrão das imagens é particularmente útil para seu sistema editorial. A tabela tem estrutura forte, mas aparência leve:

────────────────────────────────────────────────

Metric               Sol                 Astra

                     High reasoning      Max reasoning

────────────────────────────────────────────────

Mean rubric score     41.6%               55.0%

────────────────────────────────────────────────

Average time          37.0 minutes        19.2 minutes

────────────────────────────────────────────────

Contrato:

editorial_table:

  outer_box: false

  vertical_borders: false

  

  horizontal_rules:

    header_top: true

    header_bottom: true

    row_separator: true

  

  header:

    weight: semibold

    background: transparent

    alignment: left

  

  cells:

    alignment: left

    vertical_alignment: top

  

  numeric_data:

    tabular_alignment: preferred

  

  mobile:

    overflow_x: auto

    preserve_columns: true

    truncate_values: false

Para acessibilidade e leitura, é importante não tentar “esmagar” uma tabela larga no mobile. Se não couber, ela deve permitir rolagem horizontal controlada em seu próprio container.

Uso do cinza

O cinza passa a ter três funções diferentes. Não deve ser tratado como uma cor genérica.

GRAY-1 — linha/divisor

↓

quase imperceptível

  

GRAY-2 — superfície auxiliar

↓

footnotes, metadados, blocos informativos

  

GRAY-3 — texto secundário

↓

labels, captions, metadados

Integrando com os tokens que você já forneceu:

:root {

  --surface-page: #fffdfa;

  

  --surface-subtle: #ececec;

  

  --text-primary: #000000;

  --text-secondary: #545454;

  

  --line-subtle: var(--brand-light-gray);

}

Porém, para --line-subtle, podemos eventualmente criar uma versão ainda mais clara que #ECECEC se a medição visual indicar isso.

O bloco de metadados/footnotes seguirá esta lógica:

metadata_panel:

  background: surface-subtle

  border: none

  radius: subtle

  text_primary: text-primary

  text_secondary: text-secondary

  

  hierarchy:

    year:

      presentation: badge_or_pill

  

    label:

      color: text-secondary

  

    value:

      color: text-primary

  

    footnotes:

      index:

        color: text-secondary

      body:

        color: text-primary

Contraste

A regra central será:

A hierarquia editorial deve ser obtida primeiro por tamanho, peso, espaçamento e luminosidade. A cor de marca entra como reforço, não como única forma de distinguir informação.

Portanto:

contrast_policy:

  primary_content:

    foreground: text-primary

    background: surface-page

  

  secondary_content:

    foreground: text-secondary

    background: surface-page

  

  subdued_surface:

    foreground: text-primary

    background: surface-subtle

  

  action:

    foreground: brand-action-blue

  

  requirements:

    body_text: WCAG_AA

    controls: WCAG_AA

    information_by_color_only: prohibited

Isso é particularmente apropriado para seu projeto porque evita transformar artigos longos em páginas excessivamente coloridas.

Relação com as cores semânticas

As cores verde, vermelho e amarelo não devem dominar o artigo.

PRETO / CINZA

= leitura e estrutura

  

AZUL

= ação, links e marca

  

VERDE

= solução

  

VERMELHO

= risco

  

AMARELO

= atenção

Então uma tabela normal continua neutra. Só uma célula que realmente represente risco, atenção ou solução recebe o token semântico correspondente.

Especificação consolidada

editorial_layout:

  version: "0.1"

  

  surface: article

  

  hero:

    h1:

      align: center

      color: text-primary

      width: constrained

  

    lead:

      align: center

      color: text-primary

      width: constrained-wide

  

  body:

    align: left

    columns: 1

    color: text-primary

  

  dividers:

    direction: horizontal

    weight: thin

    color: line-subtle

    decorative: false

  

  tables:

    outer_border: false

    vertical_lines: false

    horizontal_lines: true

    header_weight: semibold

    background: transparent

  

  neutral_surface:

    token: surface-subtle

    use:

      - metadata

      - footnotes

      - secondary_information

  

  contrast:

    primary: text-primary

    secondary: text-secondary

    brand_color_as_only_signal: false

  

  semantic_color:

    solution: semantic-solution

    risk: semantic-risk

    attention: semantic-attention

    action: brand-action-blue

Com esse lote, já temos duas partes formais do futuro sistema:

01 BRAND-COLOR-SYSTEM

   cores + funções semânticas

  

02 EDITORIAL-LAYOUT-SYSTEM

   H1 + linhas + tabelas + cinza + contraste

Os próximos dados que você passar podem ser anexados a essa mesma especificação, sem reiniciar o design system.