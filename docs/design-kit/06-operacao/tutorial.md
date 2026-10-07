Se você quer manter a UI, os componentes, a estrutura e o comportamento, e alterar apenas o branding, então você deve mexer em poucas camadas.

No seu repositório atual, eu separaria assim:

|   |   |   |
|---|---|---|
|Objetivo|Arquivo/pasta|Alterar?|
|Cores, tipografia, radius, sombras, tokens|src/styles/global.css|Sim|
|Fontes carregadas e metatags globais|src/components/BaseHead.astro|Sim, se necessário|
|Nome da marca, descrição, SEO, metadados|src/consts.ts|Sim|
|Logo, favicon, imagens e assets|public/|Sim|
|Texto da Home|componentes em src/components/blocks/|Sim, somente conteúdo|
|Navbar e Footer|navbar.tsx / footer.tsx|Sim, somente branding/copy|
|Conteúdo do blog|src/content/blog/|Sim|
|Estrutura das rotas|src/pages/*.astro|Idealmente não|
|Estrutura dos componentes|.tsx|Idealmente não|
|Dependências|package.json|Não|

Na prática, o núcleo da personalização de marca seria:

BRANDING

│

├── src/styles/global.css

│   ├── cores

│   ├── fontes

│   ├── radius

│   ├── shadows

│   └── tokens

│

├── src/consts.ts

│   ├── nome

│   ├── descrição

│   ├── SEO

│   ├── Open Graph

│   └── dados institucionais

│

├── public/

│   ├── logo

│   ├── favicon

│   ├── imagens

│   └── assets

│

└── src/components/blocks/

    ├── navbar.tsx

    ├── footer.tsx

    ├── hero.tsx

    └── demais blocos

        apenas copy/imagens

O arquivo mais importante é src/styles/global.css.

É nele que você deveria transformar, por exemplo:

:root {

  --background: ...;

  --foreground: ...;

  --primary: ...;

  --secondary: ...;

  --muted: ...;

  --border: ...;

  

  --radius: 8px;

  

  --font-sans: ...;

  --font-mono: ...;

}

Assim, quando você muda um token global, dezenas de componentes mudam juntos sem precisar editar cada botão, card ou seção.

Esse é exatamente o benefício de preservar o Design System.

Imagine:

ANTES

  

Button.tsx ─────┐

Card.tsx ───────┤

Navbar.tsx ─────┤

BlogPost.tsx ───┼── usa --primary

Hero.tsx ───────┤

Footer.tsx ─────┘

Você altera:

--primary: nova-cor-da-marca;

e todos os componentes que usam primary acompanham automaticamente.

Para fontes, hoje seu projeto usa principalmente DM Sans + Inter. Se você decidir manter essas fontes, não precisa tocar na infraestrutura. Se quiser trocar a família, normalmente você mexeria em dois pontos:

src/components/BaseHead.astro

        ↓

carregamento da fonte

  

src/styles/global.css

        ↓

--font-sans

--font-display

--font-text

Já para identidade institucional, o arquivo importante é:

src/consts.ts

Ali devem ficar coisas como:

SITE_TITLE

SITE_DESCRIPTION

SEO

Open Graph

autor

publisher

favicon

site URL

Os assets deveriam ficar centralizados em public/.

Por exemplo:

public/

├── brand/

│   ├── logo.svg

│   ├── logo-dark.svg

│   ├── symbol.svg

│   └── wordmark.svg

│

├── images/

│   ├── home/

│   ├── blog/

│   └── articles/

│

└── favicon/

A regra mais importante para o seu caso seria:

NÃO PERSONALIZAR A MARCA

editando estrutura.

  

PERSONALIZAR A MARCA

editando tokens + copy + assets.

Então, por exemplo, você deveria evitar alterar:

src/pages/index.astro

de:

<Hero />

<Features />

<Testimonials />

<Pricing />

para outra composição somente para colocar sua marca.

Se você gosta da arquitetura do template, ela continua igual.

Você apenas transforma:

Hero original

↓

mesmo Hero

↓

sua copy

sua imagem

seus tokens

sua marca

Isso também vale para componentes. Em vez de reescrever um card:

<Card className="...">

você mantém o card e troca o que ele consome:

tokens

imagem

texto

ícone

No seu Mainline, eu trataria os arquivos em três níveis:

NÍVEL 1 — BRAND SYSTEM

src/styles/global.css

src/components/BaseHead.astro

src/consts.ts

public/

  

NÍVEL 2 — BRAND CONTENT

navbar.tsx

footer.tsx

hero.tsx

demais blocks

src/content/blog/

  

NÍVEL 3 — PRESERVAR

src/pages/

estrutura dos componentes

lógica React

responsividade

grid

breakpoints

interações

Isso combina diretamente com o ADR que acabamos de criar: preservar a arquitetura do Mainline e aplicar sua identidade por uma camada global de branding.

Se você quiser levar isso para um modelo mais profissional, eu ainda separaria global.css em termos conceituais, mesmo que continue sendo um único arquivo físico:

global.css

  

1. FONTES

2. BRAND TOKENS

3. SEMANTIC TOKENS

4. DARK MODE

5. TYPOGRAPHY

6. COMPONENT TOKENS

7. HOME

8. BLOG

9. ARTICLE

10. ACCESSIBILITY

Assim você consegue trocar toda a identidade da aplicação sem desmontar a aplicação.




Exatamente aí entra a separação por “superfícies”. Você não deve colocar tudo em um único CSS sem escopo, porque uma regra de artigo pode acabar afetando um documento A4, e uma regra de impressão pode afetar a Home.

Para o seu projeto, eu usaria esta arquitetura:

src/

├── styles/

│   ├── global.css

│   │

│   ├── surfaces/

│   │   ├── home.css

│   │   ├── blog.css

│   │   ├── article.css

│   │   └── print.css

│   │

│   └── components/

│       ├── buttons.css

│       ├── cards.css

│       └── tables.css

│

├── layouts/

│   ├── DefaultLayout.astro

│   ├── ArticleLayout.astro

│   └── PrintLayout.astro

│

└── pages/

    ├── index.astro

    ├── blog/

    └── documentos/

A lógica é esta:

GLOBAL

cores

fontes

tokens

focus

reset

       ↓

SUPERFÍCIE

Home / Blog / Artigo / Print

       ↓

COMPONENTE

card / tabela / botão / etc.

O global.css contém apenas o que realmente pode existir em qualquer lugar:

:root {

  --color-background: #ffffff;

  --color-text: #17181c;

  --color-border: #e9eaee;

  

  --font-body: "Inter", sans-serif;

  

  --radius-sm: 6px;

  --radius-md: 10px;

}

Evite colocar nele coisas como:

article h2 {

  margin-top: 80px;

}

porque isso poderia atingir páginas que você não queria.

Para o Blog, você escopa:

[data-surface="blog"] {

  background: var(--color-background);

}

  

[data-surface="blog"] .blog-card {

  border: 1px solid var(--color-border);

}

Para artigo:

[data-surface="article"] .prose {

  max-width: 48rem;

  margin-inline: auto;

}

  

[data-surface="article"] .prose h2 {

  margin-top: 3rem;

}

  

[data-surface="article"] .prose p {

  line-height: 1.7;

}

Essas regras não interferem no Blog ou na Home porque só existem quando:

data-surface="article"

Para documentos destinados à impressão, eu faria uma separação ainda mais forte.

Por exemplo:

src/layouts/PrintLayout.astro

com:

<html>

  <body data-surface="print">

    <slot />

  </body>

</html>

E:

src/styles/surfaces/print.css

com:

[data-surface="print"] {

  background: white;

  color: black;

  font-family: var(--font-body);

}

  

[data-surface="print"] .page {

  width: 210mm;

  min-height: 297mm;

  margin: 0 auto;

}

Aí entram também as regras exclusivas de impressão:

@media print {

  @page {

    size: A4;

    margin: 12mm;

  }

  

  [data-surface="print"] {

    print-color-adjust: exact;

    -webkit-print-color-adjust: exact;

  }

  

  [data-surface="print"] .no-print {

    display: none;

  }

  

  [data-surface="print"] .page-break {

    break-before: page;

  }

}

Aqui você está combinando duas coisas diferentes:

data-surface="print"

        ↓

define que é um documento

  

@media print

        ↓

define o que acontece quando imprimir/PDF

Isso é importante porque o documento também pode precisar ficar bonito na tela antes de a pessoa apertar “Imprimir”.

Por exemplo:

TELA

/documentos/plano-semanal

  

        ↓

  

PrintLayout

data-surface="print"

  

        ↓

  

preview visual A4

  

        ↓

  

@media print

  

        ↓

  

PDF / Impressora

Eu separaria seus layouts assim:

|   |   |   |
|---|---|---|
|Tipo|Layout|CSS|
|Home|DefaultLayout.astro|home.css|
|Blog|DefaultLayout.astro|blog.css|
|Artigo|ArticleLayout.astro|article.css|
|Documento/PDF|PrintLayout.astro|print.css|

E todos continuam consumindo:

global.css

para os mesmos tokens de marca.

Ou seja, você mantém a identidade:

Risco Cognitivo

├── mesma paleta

├── mesma tipografia

├── mesmos tokens

└── mesma identidade

mas cada contexto ganha regras próprias:

                    global.css

                        │

        ┌───────────────┼────────────────┐

        ↓               ↓                ↓

      HOME            BLOG            PRINT

        │               │                │

   home.css         article.css       print.css

        │               │                │

   Web landing      leitura longa      A4/PDF

Um erro comum seria fazer:

h1 { ... }

h2 { ... }

table { ... }

img { ... }

para tudo.

Isso pode causar:

mudança no artigo

      ↓

quebra documento A4

  

mudança no documento

      ↓

quebra Blog

Prefira:

[data-surface="article"] h2 { ... }

  

[data-surface="print"] h2 { ... }

  

[data-surface="home"] h2 { ... }

Mesmo que os três usem um h2, eles podem ter tratamentos diferentes sem colisão.

No seu caso, eu adotaria quatro superfícies canônicas desde já:

data-surface="home"

data-surface="blog-index"

data-surface="article"

data-surface="print"

E uma regra de governança simples:

global.css

= identidade compartilhada

  

surface/*.css

= comportamento visual daquela rota

  

component/*.css

= componente reutilizável

  

@media print

= somente comportamento físico/PDF

Isso evita que o sistema vá ficando cheio de exceções conforme você adiciona Blog, Mapas, PWA, formulários e documentos A4.


Sim, mas há uma distinção importante no seu projeto: o @theme que você está vendo não é “tema do Astro”. Ele vem do Tailwind CSS 4. O Astro apenas monta a aplicação. No seu repositório existem duas coisas diferentes:

Astro

├── estrutura das páginas e rotas

├── layouts

├── componentes

└── renderização

  

Tailwind 4

└── @theme

    ├── cores

    ├── fontes

    ├── spacing

    ├── radius

    ├── breakpoints

    └── outros tokens

Então isto:

@theme inline {

  --color-background: var(--background);

  --color-foreground: var(--foreground);

  

  --radius-lg: var(--radius);

  

  --breakpoint-md: 768px;

  --breakpoint-lg: 1024px;

}

é o Tailwind transformando seus tokens em utilitários utilizáveis nos componentes.

Por exemplo:

<div className="bg-background text-foreground rounded-lg">

Isso consome o design system, mas não cria sozinho a arquitetura da tela.

O ponto central da sua dúvida é separar 5 coisas.

|   |   |   |
|---|---|---|
|Camada|Define|Exemplo|
|Branding|identidade da marca|logo, cores, fontes, tom|
|Design System|regras reutilizáveis|tokens, buttons, cards, inputs|
|UI Components|peças implementadas|Button.tsx, Card.tsx|
|Layout System|composição espacial|grid, containers, gaps, hierarchy|
|Template/Page Pattern|organização da tela|Hero → Conteúdo → CTA|

A hierarquia, os espaçamentos e as regras de composição ficam principalmente entre o Design System e o Layout System.

Eu organizaria mentalmente assim:

BRANDING

"como a marca parece"

        ↓

DESIGN TOKENS

"quais valores posso usar"

        ↓

DESIGN SYSTEM

"como os componentes devem funcionar"

        ↓

LAYOUT SYSTEM

"como esses componentes são organizados"

        ↓

PAGE PATTERNS

"como uma Home, Blog ou Artigo é composto"

        ↓

UI FINAL

Por exemplo, seu Branding poderia definir:

brand:

  color_primary: "#..."

  color_text: "#..."

  font_display: "DM Sans"

  font_body: "Inter"

O Design System transforma isso em tokens:

:root {

  --brand-primary: ...;

  --text-primary: ...;

  

  --space-1: 4px;

  --space-2: 8px;

  --space-3: 12px;

  --space-4: 16px;

  --space-6: 24px;

  --space-8: 32px;

  --space-12: 48px;

  

  --radius-sm: 6px;

  --radius-md: 10px;

  --radius-lg: 16px;

}

Depois os componentes usam esses valores:

<Button />

<Card />

<Badge />

<Input />

<Dialog />

O botão não deveria decidir sozinho que tem 17px de padding porque alguém achou bonito.

Ele deveria consumir o sistema:

Button

├── padding: spacing token

├── radius: radius token

├── color: semantic token

├── typography: type token

└── states:

    ├── hover

    ├── focus

    ├── disabled

    └── active

Agora entra a parte que você perguntou sobre hierarquia e espaçamento.

Isso deveria existir como uma camada explícita de Layout System.

Exemplo:

layout:

  container:

    max_width: 1220px

    padding_mobile: 24px

  

  section:

    gap_mobile: 64px

    gap_desktop: 96px

  

  grid:

    desktop: 12

    tablet: 8

    mobile: 4

  

  content_width:

    reading: 768px

    wide: 1024px

  

  hierarchy:

    hero_to_section: 96px

    heading_to_body: 24px

    body_to_action: 32px

Isso é diferente de branding.

A marca pode mudar de:

azul → laranja

Inter → outra fonte

radius 8 → 12

sem você precisar mudar:

12-column grid

largura máxima

ordem dos elementos

hierarquia H1/H2

distância entre seções

responsividade

Esse é exatamente o benefício de separar essas camadas.

No código do seu Mainline, eu pensaria assim:

src/styles/global.css

│

├── BRAND TOKENS

│   cores

│   fontes

│

├── DESIGN SYSTEM TOKENS

│   spacing

│   radius

│   shadows

│   borders

│

├── LAYOUT TOKENS

│   container

│   grid

│   breakpoints

│   section spacing

│

└── SEMANTIC TOKENS

    background

    foreground

    muted

    primary

    border

Depois:

src/components/ui/

é sua camada de primitives/componentes.

Por exemplo:

button

badge

avatar

separator

dialog

accordion

input

card

E:

src/components/blocks/

já está um nível acima.

São composições:

Hero

BlogPosts

BlogPost

Navbar

Footer

Features

Pricing

Veja a diferença:

Button

= primitive

  

Hero

= pattern / block

  

Home

= page/template

Essa distinção é muito importante.

Sobre reutilizar Design Systems prontos: sim, você pode.

Por exemplo, você pode partir de um sistema que já tenha:

buttons

inputs

dialog

tabs

accordion

cards

navigation

spacing

states

accessibility

e não reconstruir tudo.

Mas importar o pacote não significa que ele vai saber automaticamente:

qual deve ser o seu Hero

qual é sua hierarquia editorial

quanto espaço existe entre Hero e Feature

qual largura seu artigo deve ter

qual grid sua Home deve usar

Essas decisões são outra camada.

É por isso que eu separaria:

DESIGN SYSTEM

       │

       │ fornece peças

       ↓

LAYOUT SYSTEM

       │

       │ define composição

       ↓

PAGE TEMPLATE

       │

       │ organiza a tela

       ↓

CONTENT

No seu projeto atual isso poderia virar uma arquitetura muito limpa:

src/

├── styles/

│   ├── global.css

│   ├── surfaces/

│   │   ├── home.css

│   │   ├── blog.css

│   │   ├── article.css

│   │   └── print.css

│   └── patterns/

│       ├── editorial.css

│       └── grid.css

│

├── components/

│   ├── ui/             ← Design System primitives

│   ├── blocks/         ← padrões compostos

│   └── brand/          ← logo, marca etc.

│

├── layouts/

│   ├── DefaultLayout.astro

│   ├── ArticleLayout.astro

│   └── PrintLayout.astro

│

└── pages/

E eu ainda criaria uma especificação documental:

docs/design-system/

├── tokens.yaml

├── components.yaml

├── layout.yaml

├── typography.yaml

├── responsive.yaml

└── accessibility.yaml

O layout.yaml, por exemplo, seria justamente onde você documentaria as regras que está perguntando:

grid:

  desktop_columns: 12

  tablet_columns: 8

  mobile_columns: 4

  

container:

  max_width: 1220

  

spacing:

  base: 4

  scale:

    - 4

    - 8

    - 12

    - 16

    - 24

    - 32

    - 48

    - 64

    - 96

  

hierarchy:

  page:

    hero_to_next_section: 96

  section:

    heading_to_body: 24

    body_to_cta: 32

  

reading:

  article_max_width: 768

Então o agente recebe uma regra objetiva em vez de tomar decisões visuais toda vez.

A arquitetura completa que eu recomendo para você é:

01 BRAND

quem somos visualmente

  

02 TOKENS

valores permitidos

  

03 DESIGN SYSTEM

componentes e estados

  

04 LAYOUT SYSTEM

grid + spacing + hierarchy + responsive

  

05 PAGE PATTERNS

Home / Blog / Article / Print

  

06 CONTENT

copy + imagens + MDX

  

07 ROUTE

Astro monta e entrega

E aí sim você consegue trocar um Design System ou um tema sem destruir o resto.

Por exemplo:

Risco Cognitivo

        │

        ├── Branding próprio

        │

        ├── Design System reutilizado

        │

        ├── Layout System próprio

        │

        └── Templates próprios

Essa é provavelmente a separação mais importante para o seu workflow: não confundir “Design System” com “design da página”. O Design System fornece o vocabulário; o Layout System e os Page Patterns definem a gramática.