Sim. A pesquisa permite transformar isso em um contrato determinístico de leitura e autoria MDX, sem tratar preferências nossas como se fossem regras oficiais.

A base mais sólida é combinar três níveis: WCAG 2.2 para requisitos verificáveis, W3C COGA para acessibilidade cognitiva e BDA/GOV.UK para redação e diagramação. O W3C recomenda estrutura clara, blocos curtos, headings descritivos, listas, whitespace e consistência; para conteúdos acima de 300 palavras, a orientação cognitiva recomenda considerar um resumo fácil de entender. 

Reading Flow Contract v1.0

Vou separar as regras em três classes:

|   |   |
|---|---|
|Classe|Significado|
|NORMATIVE|requisito WCAG verificável|
|GUIDANCE|recomendação W3C COGA/BDA/GOV.UK|
|PROJECT_RULE|limite determinístico que adotamos para o Risco Cognitivo|

Isso é importante porque, por exemplo, WCAG não diz “um parágrafo deve ter 50 palavras”. O W3C diz que o texto deve ser dividido em blocos curtos e tratar um tópico por parágrafo; o número exato abaixo será nossa regra operacional. 

1. Gramática canônica do artigo

O MDX deixa de ser “conteúdo livre” e passa a obedecer a uma gramática:

ARTICLE

│

├── Frontmatter

│

├── ArticleHeader

│   ├── Eyebrow?          opcional

│   ├── H1               gerado pelo template

│   └── Lead

│

├── QuickSummary?        obrigatório se > 300 palavras

│

├── Section H2

│   ├── Paragraph

│   ├── Paragraph?

│   ├── Paragraph?

│   └── SupportBlock?

│

├── Section H2

│   └── ...

│

├── References?

│

└── RelatedContent?

O H1 não deve ser escrito novamente dentro do MDX se o template já cria o título a partir do frontmatter. A estrutura semântica deve seguir níveis coerentes — H1 → H2 → H3, sem saltar de H2 diretamente para H4. Headings devem descrever o conteúdo que vem depois. 

  

2. Contrato de parágrafos e frases

A regra operacional passa a ser:

|   |   |   |   |
|---|---|---|---|
|Elemento|Target|Warning|Fail|
|Frase|8–20 palavras|21–25|>30|
|Parágrafo|20–60 palavras|61–80|>90|
|Frases/parágrafo|1–3|4|>4|
|Parágrafos por H2|1–4|—|≥5 sem subdivisão|
|Palavras por H2|80–300|301–400|>400 sem H3|

Esses limites são PROJECT_RULE, não WCAG.

A base é que W3C COGA recomenda frases curtas, um ponto por frase, parágrafos curtos, um tópico por parágrafo e colocar o propósito do bloco no início. GOV.UK também recomenda uma ideia por frase e textos concisos. 

A British Dyslexia Association também recomenda texto alinhado à esquerda, sem justificação, evitar colunas múltiplas, usar whitespace, seções regulares e listas em vez de prosa contínua quando apropriado. 

O lint editorial poderia portanto emitir:

PARAGRAPH_OK       47 palavras

PARAGRAPH_WARN     74 palavras

PARAGRAPH_FAIL     112 palavras

  

SENTENCE_OK        18 palavras

SENTENCE_WARN      24 palavras

SENTENCE_FAIL      38 palavras

  

3. Largura e fluxo de leitura

Para artigos:

reading_column:

  target: 68ch

  preferred_range: 60ch-72ch

  hard_max: 80ch

  

  text_align: left

  justify: false

  columns: 1

A BDA recomenda linhas curtas, aproximadamente 60–70 caracteres, enquanto WCAG 1.4.8 usa até 80 caracteres como limite de apresentação no nível AAA. 

Portanto 68ch vira nossa referência de projeto, não uma alegação de que WCAG exige 68.

No mobile:

mobile:

  reading_columns: 1

  horizontal_scroll_for_body: false

  minimum_reflow_width: 320px

WCAG 2.2 AA exige que o conteúdo comum possa refluir em uma largura equivalente a 320 CSS pixels sem exigir rolagem em duas dimensões; tabelas e alguns conteúdos essencialmente bidimensionais podem ser exceção. 

  

4. Headings

Contrato:

headings:

  h1:

    source: frontmatter.title

    count: 1

    align: center

  

  h2:

    purpose: major_section

    words:

      preferred: 3-8

      max: 10

  

  h3:

    purpose: subsection

  

  skip_levels: false

O H1 centralizado continua adequado ao sistema visual que você definiu. A exceção é importante: o título pode ser centralizado, mas o corpo de leitura continua alinhado à esquerda.

W3C recomenda headings curtos e descritivos, que formem um outline compreensível do documento. 

  

5. Regra para artigos acima de 300 palavras

Vou adotar a recomendação cognitiva do W3C como contrato do projeto:

if_article_words_gt_300:

  quick_summary:

    required: true

    items:

      min: 3

      max: 5

W3C COGA especificamente sugere, para conteúdo com mais de 300 palavras, disponibilizar um resumo fácil de compreender e usar headings semânticos para dividir a informação. 

Exemplo:

<KeyPoints>

- O risco existe antes do erro.

- A pessoa não é o risco.

- Contexto e demanda precisam ser avaliados juntos.

</KeyPoints>

Não é um segundo artigo. É orientação.

  

6. Bullets e listas

Regra determinística:

lists:

  unordered:

    use_when: order_does_not_matter

  

  ordered:

    use_when: sequence_or_priority_matters

  

  items:

    preferred: 3-7

    warning_above: 7

    max: 9

  

  item_words:

    preferred_max: 20

    warning_above: 30

W3C define <ul> para itens sem ordem e <ol> para sequências; COGA recomenda listas para quebrar conteúdo e reduzir carga. 

Evitar:

• parágrafo inteiro...

• outro parágrafo inteiro...

• outro parágrafo inteiro...

Se cada item virou um pequeno artigo, já não é uma lista adequada.

  

7. Callouts

Aqui entra o controle contra poluição.

Só existirão seis variantes:

callout_types:

  - key

  - definition

  - note

  - risk

  - attention

  - solution

Contrato:

callout:

  max_per_h2: 1

  minimum_distance:

    prose_blocks: 1

  

  title:

    max_words: 5

  

  body:

    preferred_words: 20-60

    hard_max_words: 80

  

  nesting:

    callout_inside_callout: false

  

  consecutive_callouts: false

W3C COGA reconhece callouts, background shading, bordas e whitespace como formas úteis de deixar a estrutura da página compreensível, mas também alerta que excesso de ícones, conteúdo e elementos aumenta a carga cognitiva. 

Então:

PROSA

↓

CALLOUT

↓

PROSA

é válido.

Isto não:

CALLOUT

CALLOUT

CARD

CALLOUT

TABLE

CARD

  

8. Troca de contraste

A troca de fundo passa a significar mudança de função, nunca simplesmente decoração.

#FFFDFA

conteúdo normal

  

#ECECEC

metadados / footnotes / informação auxiliar

  

Light Blue 48%

definição / destaque leve

  

#545454

callout escuro

  

#0E025D

callout institucional forte

  

VERDE

solução

  

VERMELHO

risco

  

AMARELO

atenção

Contrato:

contrast_surfaces:

  decorative_alternation: false

  max_colored_surface_per_h2: 1

  consecutive_colored_surfaces: false

WCAG AA exige contraste de pelo menos 4.5:1 para texto normal e 3:1 para texto grande; componentes e informação gráfica essencial também precisam atingir pelo menos 3:1. 

Com os tokens que você definiu, calculei:

|   |   |   |
|---|---|---|
|Combinação|Contraste|Uso|
|#000000 / #FFFDFA|20.68:1|PASS|
|#545454 / #FFFDFA|7.46:1|PASS|
|branco / #545454|7.57:1|PASS|
|branco / #0E025D|17.72:1|PASS|
|preto / #CBD4FF|14.40:1|PASS|
|branco / #2D5CE6|5.55:1|PASS|
|preto / #00BF63|8.63:1|PASS|
|branco / #00BF63|2.43:1|FAIL|
|preto / #FF0000|5.25:1|PASS|
|branco / #FF0000|4.00:1|FAIL para texto normal|

Logo uma regra importante muda:

VERDE #00BF63

→ texto preto

  

VERMELHO #FF0000

→ texto preto

  

AZUL #2D5CE6

→ texto branco

  

DARK GRAY #545454

→ texto branco

  

INDIGO #0E025D

→ texto branco

Isso fica determinístico.

  

9. Tabelas

Tabela só entra quando existir relação tabular real.

table:

  use_for_layout: false

  

  caption:

    required: true

  

  headers:

    th: required

    scope: required_when_ambiguous

  

  preferred:

    columns_max: 6

    rows_max: 15

  

  if_complex:

    action:

      - split_table

      - provide_summary

      - provide_alternative_view

  

  mobile:

    local_horizontal_scroll: allowed

    page_horizontal_scroll: prohibited

W3C exige markup semântico que associe cabeçalhos e células; captions ajudam a identificar a tabela, e tabelas complexas devem ser simplificadas ou divididas quando possível. 

Visualmente continuamos com seu padrão:

───────────────────────────────────────

Metric       Sol            Astra

───────────────────────────────────────

Score        41.6%          55.0%

───────────────────────────────────────

Time         37 min         19.2 min

───────────────────────────────────────

Sem grade vertical pesada.

  

10. Imagens e infográficos

Contrato:

figure:

  alt:

    required: true

  

  caption:

    required_when:

      - data_visualization

      - evidence

      - benchmark

      - research_figure

  

  source:

    required_when_external: true

  

  placement:

    max_heavy_visual_per_h2: 1

    adjacent_heavy_blocks: false

W3C observa que imagens podem ajudar pessoas com dificuldades de leitura, desde que tenham alternativas adequadas. 

Um infográfico, gráfico ou tabela não deve ficar colado em outro bloco pesado sem texto intermediário.

  

11. Blockquote

> deixa de ser um recurso genérico de destaque.

blockquote:

  purpose: external_quote_only

  attribution: required

  source: required

  use_for_callout: false

Para destaque autoral usamos <Callout>, não blockquote.

Isso torna o MDX previsível.

  

12. Bold, italic e ênfase

Adotaria:

emphasis:

  bold:

    max_occurrences_per_paragraph: 2

    max_consecutive_words: 4

  

  italic_for_emphasis: false

  uppercase_for_emphasis: false

  underline_except_links: false

Uma orientação governamental de acessibilidade recomenda não usar itálico para ênfase, evitar blocos longos em bold e não usar caixa alta ou sublinhado como recurso decorativo. 

  

13. Budget de componentes MDX

Esse é o mecanismo principal para “expandir sem poluir”.

mdx_component_budget:

  

  per_h2:

    heavy_blocks:

      max: 1

  

    light_blocks:

      max: 1

  

  heavy_blocks:

    - DataTable

    - Figure

    - Infographic

    - InteractiveGraphic

  

  light_blocks:

    - Callout

    - KeyPoints

    - Definition

    - Blockquote

  

  adjacency:

    heavy_to_heavy: prohibited

    callout_to_callout: prohibited

  

  separator:

    minimum_prose_blocks: 1

Assim uma seção pode ser:

H2

  

parágrafo

  

parágrafo

  

Callout

  

parágrafo

ou:

H2

  

parágrafo

  

Table

  

parágrafo

Mas não:

H2

Callout

Table

Figure

Callout

Card

  

Gramática MDX final

Eu formalizaria o conteúdo permitido assim:

Article =

  Lead,

  [QuickSummary],

  Section,

  {Section},

  [References];

  

Section =

  H2,

  Paragraph,

  {Paragraph},

  [SupportBlock];

  

SupportBlock =

    List

  | Callout

  | DataTable

  | Figure

  | Blockquote

  | Definition

  | KeyPoints;

  

Subsection =

  H3,

  Paragraph,

  {Paragraph},

  [SupportBlock];

E os únicos componentes MDX autorizados inicialmente seriam:

<KeyPoints>

<Callout>

<Definition>

<Figure>

<DataTable>

Adicionar um novo componente passa a exigir:

1. caso de uso não coberto

2. schema

3. acessibilidade

4. regra de densidade

5. variante visual

6. aprovação

Isso impede que o diretório de artigos vire um conjunto arbitrário de JSX.

  

Validação do

MDX EXEMPLO.md

Analisei o arquivo enviado.

Resultado:

|   |   |   |
|---|---|---|
|Métrica|Encontrado|Contrato|
|Corpo|257 palavras|PASS|
|H2|4|PASS|
|H1 no MDX|0|PASS, se template gera H1|
|Parágrafos|7|PASS|
|Média por parágrafo|22,7 palavras|PASS|
|Maior parágrafo|41 palavras|PASS|
|Média por frase|13,2 palavras|PASS|
|Maior frase|25 palavras|WARNING|
|Bullets|5|PASS|
|Lista numerada|4|PASS|
|Imagens|1|PASS estrutural|
|Blockquotes|1|PASS estrutural|
|Tabelas|0|—|
|Callouts MDX|0|—|

Status geral:

PASS WITH WARNINGS

O exemplo está, na verdade, bastante próximo do padrão desejado.

Há quatro ajustes:

1. A imagem possui alt, o que é bom, mas no novo contrato imagens editoriais/evidenciais precisam de caption e, quando externas, source.
2. O blockquote possui atribuição textual, mas pelo novo contrato deverá ter uma fonte verificável.
3. Uma frase chega a 25 palavras: entra em WARNING, não falha.
4. Existe um --- no final do arquivo; em Markdown isso gera uma linha horizontal. Se não tiver função semântica, eu removeria.

Como o artigo tem 257 palavras, o <KeyPoints> ainda não seria obrigatório. A partir de 301, passa a ser.

  

Reading Flow visual final

O comportamento determinístico fica:

H1 CENTRALIZADO

      ↓

LEAD CENTRALIZADO

      ↓

────────────────────

      ↓

[KEY POINTS se >300 palavras]

      ↓

H2

      ↓

P

      ↓

P

      ↓

[1 apoio funcional]

      ↓

P

      ↓

H2

      ↓

P

      ↓

LISTA / TABLE / FIGURE

      ↓

P

      ↓

H2

...

O princípio é:

PROSA

→ ORIENTAÇÃO

→ PROSA

→ EVIDÊNCIA

→ PROSA

→ NOVA SEÇÃO

e não:

CARD

→ CALLOUT

→ TABELA

→ IMAGEM

→ CARD

→ INFOGRÁFICO

W3C reforça justamente que estrutura clara, whitespace, headings, agrupamento e quantidade manejável de conteúdo ajudam usuários com dificuldades de atenção, memória, leitura e processamento. 

Também manteria como requisito de build que a ordem do DOM seja a mesma ordem lógica de leitura; WCAG exige que uma sequência significativa possa ser determinada programaticamente. 

Esse READING-FLOW-CONTRACT v1.0 já é suficientemente determinístico para virar tanto um schema YAML quanto um linter automático dos arquivos .md/.mdx.