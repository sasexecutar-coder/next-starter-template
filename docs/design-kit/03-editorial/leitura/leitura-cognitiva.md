Sim. Para esse caso eu criaria uma referência específica de “leitura cognitiva”, separada do branding. Não existe um único padrão oficial chamado “layout para TDAH/dislexia”; o melhor fundamento público é combinar WCAG 2.2, orientação cognitiva W3C/COGA e recomendações específicas de dislexia da British Dyslexia Association. 

Eu separaria assim no seu sistema:

BRANDING

cores + logo + identidade

        ↓

DESIGN SYSTEM

botões + cards + inputs + estados

        ↓

COGNITIVE READING SYSTEM

diagramação + densidade + espaçamento + largura de leitura

        ↓

SURFACES

article / blog / home / print

Para a leitura, há alguns valores públicos especialmente úteis.

|   |   |   |
|---|---|---|
|Regra|Baseline recomendado|Base|
|Fonte do corpo|16–19px|BDA|
|Line-height|≥ 1.5|BDA / WCAG AAA|
|Largura máxima de texto|≤ 80 caracteres|WCAG AAA|
|Alinhamento|esquerda; não justificar|WCAG|
|Reflow mobile|funcionar em 320 CSS px sem scroll horizontal|WCAG AA|
|Resize|até 200%|WCAG|
|Target interativo mínimo|24×24 CSS px|WCAG 2.2 AA|
|Espaço entre blocos|claramente perceptível|W3C COGA|
|Estrutura|seções lógicas + headings claros|W3C COGA|
|Consistência|controles e regiões no mesmo lugar|W3C COGA|

Para dislexia especificamente, a BDA recomenda fontes sans-serif, corpo aproximadamente 16–19px, espaçamento de linha de cerca de 150%, evitar grandes blocos em itálico, sublinhado e CAIXA ALTA, e não comprimir excessivamente caracteres e palavras. 

Para TDAH e outras diferenças cognitivas, eu daria ainda mais importância à arquitetura. O W3C COGA recomenda reduzir conteúdo desnecessário, dividir conteúdo em blocos menores, criar espaço branco perceptível, estabelecer uma hierarquia visual evidente e manter posições e padrões consistentes entre páginas. 

No seu projeto eu transformaria isso num contrato, por exemplo:

cognitive_reading:

  sources:

    - WCAG_2_2

    - W3C_COGA

    - BDA_DYSLEXIA_STYLE_GUIDE

  

  typography:

    body_min: 16px

    body_preferred: 18px

    line_height: 1.5

    text_align: left

    justified_text: false

  

  reading_column:

    max_line_length: 72ch

    hard_ceiling: 80ch

  

  mobile:

    min_viewport: 320px

    horizontal_scroll_text: false

    columns: 1

  

  interaction:

    wcag_target_min: 24px

  

  hierarchy:

    clear_headings: true

    logical_sections: true

    consistent_regions: true

  

  cognitive_load:

    whitespace_between_groups: true

    avoid_dense_text: true

    prioritize_primary_content: true

    predictable_navigation: true

Observe uma coisa importante: eu colocaria 72ch como seu padrão operacional, embora o teto público do WCAG AAA seja 80 caracteres. Ou seja:

WCAG:

≤ 80 caracteres

  

SEU DESIGN SYSTEM:

60–72ch preferencial

80ch máximo

Os 60–72ch seriam uma decisão de projeto conservadora, não algo que eu rotularia como requisito WCAG.

Para mobile, eu usaria uma coluna única para leitura:

┌──────────────────────────┐

│ Navbar                   │

├──────────────────────────┤

│ Categoria                │

│                          │

│ H1                       │

│                          │

│ Resumo                   │

├──────────────────────────┤

│                          │

│ Texto                    │

│                          │

│ H2                       │

│                          │

│ Texto                    │

│                          │

│ ┌──────────────────────┐ │

│ │ destaque             │ │

│ └──────────────────────┘ │

│                          │

│ H2                       │

│ ...                      │

└──────────────────────────┘

Não colocaria o corpo principal de um artigo em duas colunas no mobile.

No desktop:

┌─────────────────────────────────────────────┐

│ NAV                                         │

├─────────────────────────────────────────────┤

│                                             │

│          categoria                          │

│          H1                                 │

│          resumo                             │

│                                             │

├───────────────┬─────────────────────────────┤

│ TOC opcional  │                             │

│               │  COLUNA DE LEITURA          │

│               │  max 60–72ch                │

│               │                             │

│               │  H2                         │

│               │  texto                      │

│               │                             │

│               │  H2                         │

│               │  texto                      │

│               │                             │

├───────────────┴─────────────────────────────┤

│ Conteúdo relacionado                       │

└─────────────────────────────────────────────┘

Ou seja, uma tela de 1440px não significa que o texto deve ocupar 1200px. O container da página pode ter aproximadamente 1220px, mas a coluna de leitura permanece estreita. O WCAG explica justamente que linhas menores facilitam acompanhar a passagem de uma linha para outra. 

Para espaçamento, existe uma distinção importante. Alguns valores são normativos, mas coisas como 32px entre heading e texto ou 96px entre seções não são valores universais validados para TDAH. O W3C diz para usar espaço suficiente para separar claramente os grupos, mas não determina “use exatamente 64px”. 

Então eu faria seu próprio scale:

:root {

  --space-1: 4px;

  --space-2: 8px;

  --space-3: 12px;

  --space-4: 16px;

  --space-6: 24px;

  --space-8: 32px;

  --space-12: 48px;

  --space-16: 64px;

  --space-24: 96px;

  

  --reading-width: 72ch;

  --reading-width-max: 80ch;

  

  --body-size: 1.125rem;      /* 18px */

  --body-leading: 1.6;

}

Aqui 18px, 1.6 e 72ch são o baseline do seu produto, escolhidos dentro de uma faixa conservadora suportada pelas referências — não uma alegação de que “18px é o número científico para dislexia”.

E eu criaria uma referência única no repositório:

docs/design-system/

├── brand.yaml

├── tokens.yaml

├── components.yaml

├── accessibility.yaml

└── cognitive-reading.yaml   ← ESTA

Depois as superfícies consomem isso:

cognitive-reading.yaml

          │

          ├── article.css

          ├── blog.css

          ├── print.css

          └── reading-mode.css

Isso resolve exatamente o problema que você está levantando: você não precisa pedir para cada agente “criar uma boa diagramação para neurodivergentes”. Ele recebe um contrato fixo, baseado em referências públicas, e aplica o mesmo padrão em mobile, desktop e impressão.

E há um princípio importante do W3C para esse público: consistência também é acessibilidade. Headings equivalentes, botões equivalentes, posição da navegação, organização dos blocos e comportamentos semelhantes devem permanecer previsíveis entre as telas.