Exatamente. A pesquisa confirma a lógica que você quer adotar: o corpo de matéria do ecossistema G1 é estruturado como uma sequência de blocos/chunks identificáveis, e não como um único campo de rich text indiferenciado. Em cópias indexadas do markup aparecem parágrafos com data-block-id e data-block-type="unstyled"; intertítulos, listas e outros elementos entram como blocos separados, inclusive content-intertitle, listas e blockquote. 

Há também evidência de uma coluna editorial controlada: em markup recente reproduzido na web aparecem variáveis equivalentes a max-width: 42.5rem, largura relativa de 70% e espaçamento inferior de aproximadamente 32px entre blocos. Eu trataria esses números apenas como referência observada do G1, não como valores que precisamos copiar. 

Então formalizamos nosso MDX da mesma maneira:

ARTICLE

│

├── ARTICLE_HEADER

│   ├── Eyebrow?

│   ├── H1

│   ├── Lead

│   └── Meta

│

├── BLOCK-001  Paragraph

│

├── BLOCK-002  Paragraph

│

├── BLOCK-003  Intertitle / H2

│

├── BLOCK-004  Paragraph

│

├── BLOCK-005  BulletList

│

├── BLOCK-006  Callout

│

├── BLOCK-007  Paragraph

│

├── BLOCK-008  Figure

│

├── BLOCK-009  Paragraph

│

├── BLOCK-010  DataTable

│

└── REFERENCES

O ponto decisivo é: cada bloco tem uma função editorial única. Um bloco não vira uma “caixa onde cabe qualquer coisa”.

|   |   |   |
|---|---|---|
|Block|Função|Regra principal|
|Paragraph|explicar|20–60 palavras preferenciais|
|H2/H3|mudar nível da argumentação|título curto e descritivo|
|BulletList|decompor itens equivalentes|3–7 itens preferenciais|
|KeyPoints|orientar leitura|resumo curto|
|Callout|destacar uma informação funcional|1 por seção|
|Definition|definir termo|curto e objetivo|
|Quote|citação externa|fonte obrigatória|
|Figure|explicar visualmente|alt + caption|
|DataTable|comparação tabular|cabeçalhos semânticos|
|Infographic|síntese visual complexa|não adjacente a outro bloco pesado|
|Divider|transição forte|uso excepcional|

E isso nos permite criar uma regra muito melhor que “escrever MDX livremente”:

reading_flow:

  unit: block

  

  sequence:

    require_prose_between_heavy_blocks: true

    consecutive_callouts: false

    consecutive_figures: false

    table_next_to_infographic: false

  

  section:

    begins_with: heading

    preferred_paragraphs: 1-4

    support_blocks_max: 1

  

  paragraph:

    preferred_words: 20-60

    warning_words: 61-80

    fail_above_words: 90

  

  heavy_blocks:

    - table

    - figure

    - infographic

    - interactive

  

  light_blocks:

    - bullets

    - callout

    - definition

    - quote

    - key_points

A lógica de leitura então fica determinística:

TEXTO

  ↓

TEXTO

  ↓

MUDANÇA DE HIERARQUIA

  ↓

TEXTO

  ↓

APOIO VISUAL OU ESTRUTURAL

  ↓

TEXTO

  ↓

NOVA SEÇÃO

Nunca:

CALLOUT

  ↓

FIGURA

  ↓

TABELA

  ↓

INFOGRÁFICO

  ↓

CARD

Esse segundo caso até pode parecer sofisticado visualmente, mas destrói o fluxo porque o leitor precisa reaprender o modo de leitura a cada poucos centímetros.

Para o nosso projeto, eu definiria ainda um identificador para cada bloco, inspirado nessa lógica de CMS:

block:

  id: BLK-ART01-007

  type: callout

  role: risk

  section: SEC-03

  order: 7

  

  density:

    level: light

  

  content:

    word_count: 46

  

  validation:

    previous_block: paragraph

    next_block: paragraph

    contrast: AA

    status: pass

Isso é muito poderoso porque depois podemos auditar automaticamente um artigo:

BLK-001  paragraph     PASS

BLK-002  paragraph     PASS

BLK-003  h2            PASS

BLK-004  paragraph     PASS

BLK-005  callout       PASS

BLK-006  table         FAIL

                   ↑

        bloco pesado muito próximo

E o MDX continua simples para o autor:

## Como o risco se forma?

  

Um risco cognitivo não surge apenas de uma característica individual...

  

Outro fator é o contexto em que essa demanda precisa ser executada.

  

<Callout variant="risk">

A pessoa não é o risco. O risco emerge da relação entre demanda,

contexto, exposição e capacidade disponível.

</Callout>

  

Depois de identificar essa relação, podemos observar os controles...

Ou:

## O que muda entre os cenários?

  

A comparação abaixo organiza os três contextos observados.

  

<DataTable

  id="TAB-001"

  caption="Comparação entre demanda, risco e controle."

  source="Framework Risco Cognitivo"

/>

  

O dado mais importante da comparação não é apenas a intensidade...

Ou seja, a referência do G1 nos dá a decisão arquitetural que faltava:

ARTIGO ≠ documento contínuo

  

ARTIGO = SEQUÊNCIA ORDENADA DE BLOCOS

E nós vamos um passo além: cada bloco terá tipo + função + limite de densidade + regras de adjacência + acessibilidade + orçamento de palavras.

Isso cria um MDX expansível sem virar uma coleção descontrolada de componentes JSX.