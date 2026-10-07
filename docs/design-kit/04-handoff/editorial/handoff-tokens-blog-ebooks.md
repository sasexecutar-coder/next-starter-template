# Handoff editorial: tokens para artigos de blog e ebooks

Referência: 3 fotos de *Storytelling com Dados* (contracapa, p. 17, p. 19) · 7 out 2026 · Rascunho para revisão de design e engenharia

## 0. Leia primeiro

**O que é isto.** Uma especificação do sistema editorial do livro (fontes, hierarquia, espaçamento, caixas de destaque, espaço branco, elementos visuais, diagramação) traduzida em tokens que servem a dois produtos: **artigos de blog** (web e mobile, no seu template Astro 5 + Tailwind 4) e **ebooks** (PDF e EPUB).

**Como trabalhei.** Só com três fotos de papel, tiradas com perspectiva e luz amarelada. Por isso:

- Valores marcados com `≈` são estimativas. Cores amostradas de foto mudam com a iluminação. Para valores exatos, peça o PDF original ou os arquivos de diagramação.
- Medidas de espaço estão em **linhas de texto (`lh`)** e em porcentagem da página, porque o tamanho físico do livro não aparece nas fotos.
- Não consegui identificar a fonte com certeza. Parece uma sans humanista de traço leve (na linha de Gill Sans ou Frutiger). Trate como hipótese.
- Estados e variantes que o livro não mostra estão marcados como **proposto**.

**Uso responsável.** O objetivo é adotar o *sistema* (hierarquia, ritmo, tipo de caixa), não copiar a identidade da obra. Troque cores, fonte e motivos pelos da sua marca (slots `{{BRAND_…}}`). Não reutilize textos, logotipos da editora ou o azul-marinho do livro como identidade.

## 1. O sistema em uma página

**Seis princípios observados**

1. **Uma família, vários pesos.** A hierarquia vem de peso, tamanho e cor, nunca de fontes diferentes.
2. **Azul-marinho estrutura, cinza escuro lê.** Títulos, nomes, número de página e faixa da caixa usam o azul; o texto corrido é quase preto.
3. **O espaço branco faz parte da estrutura.** A abertura de capítulo deixa cerca de 40% da altura da página quase vazia. Todo título tem mais espaço acima do que abaixo.
4. **Um único tipo de caixa.** Retângulo sem raio, sem sombra, com faixa de título escura e corpo lavanda.
5. **Títulos em minúsculas na abertura e sentence case nos demais.** Caixa-alta só no nome da autora.
6. **Texto justificado e hifenizado no impresso**, com medida de cerca de 70 caracteres por linha.

**Esquema das duas páginas-tipo (ilustrativo, fora de escala)**

```
ABERTURA DE CAPÍTULO (p. 17)         PÁGINA DE CONTEÚDO (p. 19)
┌────────────────────────────┐       ┌────────────────────────────┐
│                            │       │               Quem     19  │ cabeçalho corrido + folio
│              capítulo um   │ label │ Quem                       │ h1
│                            │       │                            │
│        a importância       │ título│ Seu público                │ h2
│            do contexto     │ à dir.│ texto justificado ......   │
│                            │       │ ...........................│
│ texto de abertura ........ │       │ Você                       │ h3
│ Análise exploratória...    │ h2    │ texto ......................│
│ texto ..................   │       │ ┌ Leitura recomendada ───┐ │ callout
│                        17  │ folio │ │ N texto ...............│ │
└────────────────────────────┘       └────────────────────────────┘
```

A contracapa usa outra composição: duas colunas (texto cerca de 65%, lateral cerca de 30%) separadas por um fio vertical fino, com o lockup do título no topo e o motivo de barras cinza na lateral.

## 2. Tokens de cor

Os valores "observado" vêm das fotos. Os "recomendado" já corrigem contraste para WCAG 2.2 AA. O slot da marca é o que você substitui.

| Token | Observado ≈ | Recomendado | Slot da marca | Uso |
| --- | --- | --- | --- | --- |
| `color.paper` | creme `#F6F1E4` (efeito do papel e da luz) | `#FBF9F3` no ebook; no blog use o fundo do site | `{{BRAND_BACKGROUND}}` | Fundo da página |
| `color.ink` | `#2B2B2B` | `#262626` | `{{BRAND_TEXT}}` | Texto corrido |
| `color.heading` | `#3B4570` | `#34406F` | `{{BRAND_PRIMARY}}` | Títulos, nomes, links, folio |
| `color.heading-strong` | `#1F2D5A` | `#1E2B5C` | `{{BRAND_PRIMARY_DARK}}` | Faixa do callout, número da página |
| `color.label` | `#7A82A8` (3,5:1, falha para texto pequeno) | `#5A6490` (≈5,4:1 sobre o papel) | `{{BRAND_MUTED}}` | "capítulo um", cabeçalho corrido, "elogios a" |
| `color.callout-bg` | `#A9AECB` a `#B9BDD9` | `#B9BDD9` | `{{BRAND_TINT}}` | Corpo da caixa |
| `color.callout-head` | `#1F2D5A` | `#1E2B5C` | `{{BRAND_PRIMARY_DARK}}` | Faixa de título da caixa |
| `color.callout-head-text` | branco | `#FFFFFF` | — | Título da caixa |
| `color.callout-text` | `#2B2B2B` | `#262626` (≈8,2:1 sobre `callout-bg`) | `{{BRAND_TEXT}}` | Texto da caixa |
| `color.rule` | preto, 1px | `#2B2B2B` no impresso, `#C9CCD8` na web | — | Fio vertical, divisores |
| `color.motif-1` | `#C9CBD6` | igual | `{{BRAND_MOTIF_LIGHT}}` | Barras e quadrados decorativos |
| `color.motif-2` | `#A9ACB9` | igual | `{{BRAND_MOTIF_MID}}` | Barras e quadrados decorativos |

Contraste conferido por cálculo sobre os valores recomendados: `heading` sobre `paper` ≈9,4:1; `callout-head-text` sobre `callout-head` acima de 12:1; `ink` sobre `callout-bg` ≈8,2:1. Reverifique com as cores reais da sua marca.

**Tema escuro (proposto, o livro não tem).** `paper` `#12141C`, `ink` `#E6E8F0`, `heading` `#AEB6E0`, `label` `#9AA3CC`, `callout-head` `#2A3566` com texto branco, `callout-bg` `#232A48` com texto `#E6E8F0`. Não inverta o claro: suba a luminosidade dos azuis para manter 4,5:1.

## 3. Tokens de tipografia

### 3.1 Famílias e pesos

| Token | Valor | Observação |
| --- | --- | --- |
| `font.editorial` | `"{{BRAND_FONT}}", "DM Sans", "Source Sans 3", ui-sans-serif, system-ui, sans-serif` | DM Sans já vem no template. Para o traço humanista do livro, teste lado a lado: Source Sans 3, Cabin (inspirada em Gill) ou Figtree. Hipótese, não identificação |
| `weight.light` | 300 | "elogios a", "capítulo um", cabeçalho corrido |
| `weight.regular` | 400 | Texto corrido, título de capítulo (traço regular a médio) |
| `weight.medium` | 500 | h1 de seção ("Quem") |
| `weight.bold` | 700 | h2, h3, termo-chave, nomes de atribuição, "storytelling com dados", título da caixa |
| `style.italic` | itálico | Termos conceituais e títulos de obras no meio do texto |

Use fonte variável WOFF2 com no máximo 3 a 4 pesos carregados, `font-display: swap` e pré-carregamento do peso 400.

### 3.2 Escala e hierarquia

A razão é relativa ao corpo. Base de impressão **proposta**: corpo 10,5 pt com entrelinha ≈ 1,45 (a entrelinha de ≈1,4 a 1,5 foi medida nas fotos; o tamanho absoluto não). Na web a entrelinha sobe para 1,65, porque tela pede mais ar.

| Nível | Onde aparece | Razão ≈ | Impresso (base 10,5 pt) | Web desktop | Web mobile | Peso | Entrelinha | Cor | Alinhamento |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `title` (título do capítulo ou do artigo) | "a importância do contexto" | 3,2× | 34 pt | `clamp(2.25rem, 1.2rem + 4.5vw, 3.75rem)` | 2,25 rem | 400 | 1,05 | heading | Direita no livro; ver 8.1 |
| `label` | "capítulo um", "elogios a" | 1,5× | 16 pt | 1,5 rem | 1,125 rem | 300 | 1,2 | label | Igual ao título |
| `h1` (seção) | "Quem" | 1,75× | 18 pt | `clamp(1.75rem, 1.2rem + 2vw, 2.25rem)` | 1,75 rem | 500 | 1,15 | heading | Esquerda |
| `h2` (subseção) | "Seu público", "Análise exploratória versus explanatória" | 1,4× | 14,5 pt | `clamp(1.4rem, 1.1rem + 1.2vw, 1.75rem)` | 1,4 rem | 700 | 1,25 | heading | Esquerda |
| `h3` | "Você" | 1,15× | 12 pt | 1,25 rem | 1,2 rem | 700 | 1,3 | heading | Esquerda |
| `body` | Parágrafos | 1× | 10,5 pt / 15 pt | 1,125 rem / 1,65 | 1,0625 rem / 1,6 | 400 | 1,45 imp., 1,65 web | ink | Justificado no impresso; esquerda na web |
| `strong` | "**contexto**" | 1× | — | — | — | 700 | herda | ink | Um termo-chave por parágrafo, no máximo |
| `emphasis` | *exploratória*, *explanatória* | 1× | — | — | — | 400 itálico | herda | ink | — |
| `quote` | Elogios da contracapa | 0,95× | 10 pt | 1,0625 rem | 1 rem | 400 | 1,45 | ink | Esquerda, aspas pendentes |
| `attribution-name` | "—Mark R. Hillis," | 1× | 10,5 pt | 1 rem | 1 rem | 700 | 1,4 | heading | Esquerda |
| `attribution-role` | cargo e empresa | 0,95× | 10 pt | 0,95 rem | 0,9 rem | 400 | 1,4 | ink | Esquerda |
| `callout-title` | "Leitura recomendada" | 0,95× | 10 pt | 1 rem | 0,95 rem | 700 | 1,2 | branco | Esquerda |
| `callout-body` | Texto da caixa | 0,95× | 10 pt | 1 rem | 0,95 rem | 400 | 1,45 | callout-text | Esquerda |
| `dropcap` | "N" no início da caixa | 2,6× | 27 pt | 2,6 em, 2 linhas | 2,2 em | 700 | 0,8 | heading-strong | — |
| `running-header` | "Quem" no topo | 0,85× | 9 pt | n/a | n/a | 400 | 1,2 | heading | Direita |
| `folio` | "19", "17" | 1× | 10,5 pt | n/a | n/a | 700 | 1 | heading-strong | Direita |
| `category` | "Administração/Negócios" | 0,95× | 10 pt | 0,95 rem | 0,9 rem | 700 | 1,2 | heading | Direita |
| `author-name` | "COLE NUSSBAUMER KNAFLIC" | 0,95× | 10 pt | 0,95 rem | 0,9 rem | 700, caixa-alta | 1,3 | heading | Esquerda, título corrido (run-in) com a bio |

**Microtipografia observada.** Aspas curvas “ ”. Travessão com espaços no meio do texto (" — "). Atribuição com travessão colado ao nome ("—Nome,"). Aspas de abertura penduradas na margem, com o bloco recuado. Hifenização em português ("pes-soas", "eficiente-mente"). Títulos nunca hifenizados.

## 4. Espaçamento e espaço branco

Unidade: **`lh` = uma linha de corpo**. Na web, `1 lh` = `var(--ed-fs-body) × var(--ed-lh-body)` ≈ 1,86 rem. Medidas tiradas das distâncias entre linhas de base nas fotos.

| Token | Valor ≈ | Onde | Fonte |
| --- | --- | --- | --- |
| `space.page-side` | 8% da largura em cada lado (bloco de texto ≈ 84%) | Margens laterais | p. 19 |
| `space.chapter-top` | ≈ 9% da altura da página até o rótulo | Abertura de capítulo | p. 17 |
| `space.label-to-title` | ≈ 5,5 lh | Entre "capítulo um" e o título | p. 17 |
| `space.title-to-body` | ≈ 4,8 lh | Entre o título e o primeiro parágrafo | p. 17 |
| `space.header-to-h1` | ≈ 2,3 lh | Cabeçalho corrido até o h1 | p. 19 |
| `space.h1-to-h2` | ≈ 2,9 lh | "Quem" até "Seu público" | p. 19 |
| `space.h2-after` | ≈ 1,5 lh | Entre h2 e o primeiro parágrafo | p. 19 |
| `space.h-before` | ≈ 2,6 lh | Antes de h2 e h3 que seguem um parágrafo | p. 19 |
| `space.h3-after` | ≈ 1 lh | Entre h3 e o parágrafo | p. 19 |
| `space.callout-before` | ≈ 1 lh | Do parágrafo até a caixa | p. 19 |
| `space.callout-after` | 1,5 lh (proposto) | Depois da caixa | — |
| `space.paragraph` | 0,75 lh (proposto) | Entre parágrafos consecutivos na web | Não aparece nas fotos |
| `space.quote-gap` | ≈ 1,2 lh | Entre elogios da contracapa | Contracapa |
| `space.callout-pad-head` | 0,5 lh vertical, 1 em horizontal | Faixa de título | p. 19 |
| `space.callout-pad-body` | 0,75 lh vertical, 1 em horizontal | Corpo da caixa | p. 19 |
| `measure.body` | 68 ch na web (≈70 caracteres no livro) | Largura do texto | p. 17 e 19 |

**Regra de proximidade.** Um título sempre fica mais perto do que introduz do que do que veio antes (≈ 2,6 lh acima, ≈ 1 a 1,5 lh abaixo). Se você só lembrar de uma regra, lembre desta.

**Espaço branco.** A abertura de capítulo é a única página em que ele é protagonista: rótulo e título no terço superior, vazio até quase a metade, corpo só então. Não preencha esse vazio com imagem ou resumo. No blog, o equivalente é o cabeçalho do artigo com `space.title-to-body` reduzido a 2,5 lh no mobile (ver seção 8).

## 5. Callouts (caixas)

**Anatomia do que aparece na p. 19 ("Leitura recomendada").**

```
┌──────────────────────────────────────────┐
│ Leitura recomendada                      │  faixa: callout-head, texto branco bold
├──────────────────────────────────────────┤
│ N  texto da caixa começa com capitular   │  corpo: callout-bg, texto callout-text
│    de duas linhas e segue ao redor...    │
│ ...                                      │
└──────────────────────────────────────────┘
```

| Propriedade | Valor |
| --- | --- |
| Largura | A da coluna de texto (100% de `measure.body`) |
| Raio, borda, sombra | 0, nenhuma, nenhuma. O contraste entre faixa e corpo já delimita |
| Faixa | `callout-head`, altura ≈ 1,8 lh, texto `callout-title` |
| Corpo | `callout-bg`, padding conforme `space.callout-pad-body` |
| Capitular | Primeira letra do corpo, `dropcap`, 2 linhas |
| Tamanho típico | 4 a 6 linhas no livro |
| Posição | Depois de um parágrafo, nunca entre título e primeiro parágrafo |
| Aninhamento | Proibido |

**Variantes.** Só "Leitura recomendada" foi observada. O sistema acima suporta outras mudando apenas o título e, se quiser, o par de cores. Propostas: `tip` (Dica), `warn` (Atenção), `example` (Exemplo). Se usar cores distintas, o ícone ou o título deve carregar o significado, nunca só a cor.

**Implementação da capitular.** Use `initial-letter: 2` onde houver suporte e, em `@supports not (initial-letter: 2)`, `float: left; font-size: 2.6em; line-height: .8; margin: .05em .1em 0 0`.

## 6. Elementos visuais

| Elemento | Onde | Especificação | Token | Acessibilidade |
| --- | --- | --- | --- | --- |
| Motivo de barras | Lateral da contracapa | Retângulos horizontais cinza-azulados de comprimentos variados, alinhados à direita, lembram um gráfico de barras | `motif-1`, `motif-2` | Decorativo: `aria-hidden="true"`, não carrega dado |
| Grade de quadrados | Topo da lateral da contracapa | 3 a 4 quadrados em tons claros, justapostos | `motif-1` | Decorativo |
| Foto da autora | Contracapa | Retângulo sem raio, proporção ≈ 5:4, recorte de rosto e ombros, fundo desfocado em tom frio | `radius.photo: 0` | `alt` descreve a pessoa; bio ao lado |
| Fio vertical | Entre texto e lateral da contracapa | 1px, altura da coluna | `color.rule` | Decorativo |
| Capitular | Dentro do callout | Ver seção 5 | `dropcap` | Não afeta leitor de tela |
| Cabeçalho corrido e folio | Páginas internas | Seção + número no canto superior direito; na abertura de capítulo, só o folio embaixo à direita | `running-header`, `folio` | Só no PDF e na paginação; omitir no EPUB reflowável |
| Rótulo de categoria | Contracapa, canto superior direito | Texto bold em `heading` | `category` | Na web vira link para a categoria |
| Aspas pendentes e travessão | Elogios | Ver 3.2 | — | — |

**Regra.** Elementos decorativos usam só as duas cores de motivo, nunca a cor primária, para não competirem com títulos e links. Em dados reais, use as regras de gráficos da sua marca; o motivo de barras é ilustração.

## 7. Diagramação: ebook (PDF e EPUB)

| Decisão | PDF (página fixa) | EPUB (reflowável) |
| --- | --- | --- |
| Tamanho da página | **Aberto**: o livro não informa. Opções comuns: 6×9 pol ou A5. Decida antes de fixar margens | Não se aplica |
| Margens | Laterais 8% da largura. Superior e inferior a definir pelo tamanho; cabeçalho a ≈ 2,3 lh do h1 | Padding mínimo do leitor; não force margens |
| Unidades | pt e mm | `em`/`rem` e `%` apenas. Sem `px` fixo nem alturas fixas |
| Alinhamento | Justificado, `hyphens: auto`, `lang="pt-BR"` | `text-align: start`; justificar só se o leitor respeitar |
| Cabeçalho corrido e folio | Sim (margin boxes) | Não |
| Abertura de capítulo | Quebra de página, `title` à direita, ≈ 40% de vazio | Mesma hierarquia, vazio reduzido a `space.title-to-body` de 2,5 lh |
| Quebras | `orphans: 3; widows: 3`; `break-after: avoid` em h1 a h3; `break-inside: avoid` em callout, figura e elogio | Idem onde o leitor suportar |
| Fontes | Embutidas no PDF | Embutir e respeitar a fonte escolhida pelo leitor |
| Geração | Paged.js, WeasyPrint ou Prince para cabeçalho corrido e numeração (`@page` com margin boxes) | Gerar do mesmo MDX, com o mesmo arquivo de tokens |

O ebook e o blog **compartilham o mesmo CSS de tokens**. Só mudam as unidades de página (pt e `@page`) e o alinhamento do texto.

## 8. Diagramação: web (blog) e mobile

### 8.1 Layout do artigo

- **Cabeçalho:** `category` (link), `title` com `text-wrap: balance`, linha de metadados (autor, data, tempo de leitura) em `small`, imagem de capa opcional sem raio.
- **Corpo:** coluna única de `measure.body`, alinhada à esquerda do grid. Em ≥1280px, sumário fixo à direita. O vazio ao redor da coluna é intencional.
- **Fim:** `AuthorBio` com foto, nome em caixa-alta e bio em texto corrido; depois artigos relacionados.
- **Decisão sobre o título à direita:** o livro alinha título e rótulo à direita. Em linhas curtas isso funciona; em títulos de 3 ou 4 linhas no mobile, a borda esquerda irregular cansa. **Padrão proposto:** alinhado à esquerda abaixo de 768px e à direita de 768px para cima, só em páginas de abertura (ebook web e capítulos). Artigos de blog usam sempre esquerda.

### 8.2 Breakpoints

Tailwind 4: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

| Token | Mobile (<640) | Tablet (640 a 1023) | Desktop (≥1024) |
| --- | --- | --- | --- |
| `gutter` | 1,25 rem (20px) | 2 rem | Centraliza a coluna, `measure.body` |
| `body` | 1,0625 rem, entrelinha 1,6 | 1,125 rem, 1,65 | 1,125 rem, 1,65 |
| `title` | 2,25 rem, entrelinha 1,1 | 2,9 rem | até 3,75 rem |
| `space.title-to-body` | 2,5 lh | 3,5 lh | 4,8 lh |
| `space.h-before` | 2 lh | 2,4 lh | 2,6 lh |
| Callout | Largura total do container, faixa e corpo com padding horizontal 1 em, capitular 2,2 em | Igual ao desktop | Conforme seção 5 |
| Elogios (`Praise`) | Aspas pendentes só se houver 20px livres; senão sem recuo | Pendentes | Pendentes |
| Alinhamento do corpo | Esquerda | Esquerda | Esquerda (justificado só no leitor de ebook, ≥ 768px) |
| Sumário | `<details>` recolhido no topo | `<details>` | Fixo à direita em ≥1280px |
| Imagens e figuras | Largura do container, proporção fixa | Idem | Idem, legenda em `small` |
| Tabelas e código | Rolagem horizontal no próprio bloco | Idem | Idem |

**Por que o corpo sobe para 1,125 rem na web:** a leitura longa em tela pede corpo mais próximo de 18px do que dos 16px comuns de interface. No mobile baixamos meio passo para manter ≈45 a 55 caracteres por linha.

## 9. Componentes

| Componente | Props | Notas |
| --- | --- | --- |
| `ChapterOpener` | `label: string`, `title: string`, `align?: "start" \| "end"` (padrão `end` ≥ 768px), `children` (parágrafo de abertura) | Gera um único `h1`. O rótulo é um `<p>` antes do `h1` |
| `Callout` | `title: string`, `variant?: "read" \| "tip" \| "warn" \| "example"` (só `read` observada), `dropcap?: boolean` (padrão `true`), `children` | `<aside aria-labelledby>`. O título é `<p>`, não heading, para não poluir o índice |
| `Praise` | `quote: string`, `author: string`, `role?: string`, `href?: string` | `<figure><blockquote>` + `<figcaption>`. Aspas pendentes via `text-indent` negativo |
| `AuthorBio` | `name`, `photo`, `photoAlt`, `bio`, `url?` | Nome em caixa-alta no início do parágrafo da bio (run-in) |
| `Motif` | `variant: "bars" \| "grid"` | SVG inline, `aria-hidden="true"`, usa só `motif-1` e `motif-2` |
| `CategoryLabel` | `label`, `href` | Estilo `category` |
| `RunningHeader`, `Folio` | `section: string` | Só no CSS de página do PDF |

No MDX, mapeie `h1` a `h3`, `p`, `strong`, `em`, `blockquote`, `a` para os estilos de 3.2 e exponha `Callout`, `Praise` e `ChapterOpener` como componentes.

## 10. Estados, acessibilidade e casos-limite

- **Links:** cor `heading`, sublinhado, hover escurece para `heading-strong`; foco com anel de 2px e 2px de afastamento; visitado sem mudança de cor (leitura longa).
- **Contraste:** todos os pares da seção 2 ≥ 4,5:1, exceto `label` observado (3,5:1), que só serve para texto grande (≥ 24px). Use o `label` recomendado em texto pequeno.
- **Zoom:** layout reflui a 200% e a 400% sem rolagem horizontal; tudo em `rem` e `ch`.
- **Idioma:** `lang="pt-BR"` no `<html>` e em trechos em inglês; sem isso a hifenização erra.
- **Títulos longos:** `title` pode ter até 4 linhas; acima disso, reescrever. `text-wrap: balance` em títulos, `text-wrap: pretty` no corpo.
- **Callout longo:** acima de ≈ 8 linhas, vire seção com h2. Título da faixa com mais de uma linha faz a faixa crescer, sem cortar.
- **Sem foto da autora:** `AuthorBio` mostra iniciais em `motif-1`; nunca um espaço vazio.
- **Sem JavaScript:** nada neste sistema depende dele, exceto o sumário fixo.
- **Impressão do blog:** `@media print` com texto preto, sem motivos, `break-inside: avoid` nos callouts.
- **Movimento:** nenhum. O sistema é estático; se animar o sumário, respeite `prefers-reduced-motion`.

## 11. Arquivo de tokens

### 11.1 CSS (fonte única para blog e ebook)

```css
:root {
  /* cor */
  --ed-paper: #fbf9f3;          /* {{BRAND_BACKGROUND}} */
  --ed-ink: #262626;            /* {{BRAND_TEXT}} */
  --ed-heading: #34406f;        /* {{BRAND_PRIMARY}} */
  --ed-heading-strong: #1e2b5c; /* {{BRAND_PRIMARY_DARK}} */
  --ed-label: #5a6490;          /* {{BRAND_MUTED}} */
  --ed-callout-bg: #b9bdd9;     /* {{BRAND_TINT}} */
  --ed-callout-head: #1e2b5c;
  --ed-callout-head-text: #fff;
  --ed-callout-text: #262626;
  --ed-rule: #c9ccd8;
  --ed-motif-1: #c9cbd6;
  --ed-motif-2: #a9acb9;

  /* tipografia */
  --ed-font: "{{BRAND_FONT}}", "DM Sans", "Source Sans 3", ui-sans-serif, system-ui, sans-serif;
  --ed-w-light: 300; --ed-w-regular: 400; --ed-w-medium: 500; --ed-w-bold: 700;
  --ed-fs-body: 1.0625rem;  --ed-lh-body: 1.6;
  --ed-fs-small: 0.9rem;    --ed-fs-quote: 1rem;
  --ed-fs-h3: 1.2rem;
  --ed-fs-h2: clamp(1.4rem, 1.1rem + 1.2vw, 1.75rem);
  --ed-fs-h1: clamp(1.75rem, 1.2rem + 2vw, 2.25rem);
  --ed-fs-title: clamp(2.25rem, 1.2rem + 4.5vw, 3.75rem);
  --ed-fs-label: clamp(1.125rem, 1rem + 0.6vw, 1.5rem);

  /* espaço (1 lh = uma linha de corpo) */
  --ed-lh: calc(var(--ed-fs-body) * var(--ed-lh-body));
  --ed-measure: 68ch;
  --ed-gutter: 1.25rem;
  --ed-sp-title-to-body: calc(var(--ed-lh) * 2.5);
  --ed-sp-h-before: calc(var(--ed-lh) * 2);
  --ed-sp-h2-after: calc(var(--ed-lh) * 1.5);
  --ed-sp-h3-after: var(--ed-lh);
  --ed-sp-paragraph: calc(var(--ed-lh) * 0.75);
  --ed-sp-callout-before: var(--ed-lh);
  --ed-sp-callout-after: calc(var(--ed-lh) * 1.5);

  /* forma */
  --ed-radius: 0;
}
@media (min-width: 640px)  { :root { --ed-gutter: 2rem; --ed-fs-body: 1.125rem; --ed-lh-body: 1.65;
  --ed-sp-title-to-body: calc(var(--ed-lh) * 3.5); --ed-sp-h-before: calc(var(--ed-lh) * 2.4); } }
@media (min-width: 1024px) { :root { --ed-sp-title-to-body: calc(var(--ed-lh) * 4.8);
  --ed-sp-h-before: calc(var(--ed-lh) * 2.6); } }

:root[data-theme="dark"] {
  --ed-paper: #12141c; --ed-ink: #e6e8f0; --ed-heading: #aeb6e0; --ed-heading-strong: #c9cff0;
  --ed-label: #9aa3cc; --ed-callout-head: #2a3566; --ed-callout-bg: #232a48; --ed-callout-text: #e6e8f0;
  --ed-rule: #2e3550;
}

/* Tailwind 4: expor como utilitários */
@theme inline {
  --color-ed-ink: var(--ed-ink);
  --color-ed-heading: var(--ed-heading);
  --color-ed-label: var(--ed-label);
  --color-ed-callout: var(--ed-callout-bg);
  --font-editorial: var(--ed-font);
}
```

O tema escuro segue o padrão de `prefers-color-scheme` do template: duplique o bloco dentro de `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }`.

### 11.2 JSON (formato W3C Design Tokens, para Style Dictionary)

```json
{
  "color": {
    "ink":     { "$type": "color", "$value": "#262626" },
    "heading": { "$type": "color", "$value": "#34406f" },
    "label":   { "$type": "color", "$value": "#5a6490" },
    "callout": {
      "bg":   { "$type": "color", "$value": "#b9bdd9" },
      "head": { "$type": "color", "$value": "#1e2b5c" }
    }
  },
  "font": {
    "editorial": { "$type": "fontFamily", "$value": ["DM Sans", "Source Sans 3", "sans-serif"] },
    "weight": {
      "light":   { "$type": "fontWeight", "$value": 300 },
      "regular": { "$type": "fontWeight", "$value": 400 },
      "bold":    { "$type": "fontWeight", "$value": 700 }
    }
  },
  "measure": { "body": { "$type": "dimension", "$value": "68ch" } },
  "space": {
    "callout-pad-head": { "$type": "dimension", "$value": "0.5lh" },
    "paragraph":        { "$type": "dimension", "$value": "0.75lh" }
  }
}
```

O formato aceita unidades como `lh` apenas se o seu pipeline as preservar; se não, exporte o CSS da seção 11.1 como fonte de verdade.

## 12. Checklist e perguntas em aberto

### 12.1 Aceite

- Texto, títulos e caixas usam só tokens; nenhuma cor, tamanho ou espaço fixo no componente.
- Hierarquia legível sem cor: títulos distinguem-se por tamanho e peso.
- Callout idêntico em blog, PDF e EPUB, com a faixa e o corpo contrastando em ambos os temas.
- Entrelinha e medida conferidas no mobile (45 a 55 caracteres) e no desktop (≤ 68).
- Hifenização funcionando em português; títulos sem hifenização.
- Contraste ≥ 4,5:1 em todos os pares, nos dois temas.
- Fonte e cores da marca substituídas; nada da identidade da obra de referência permanece.

### 12.2 Perguntas em aberto

| # | Pergunta | Padrão se não houver resposta |
| --- | --- | --- |
| 1 | Qual é a fonte e a paleta da sua marca? | DM Sans e as cores recomendadas acima |
| 2 | Formato do ebook: PDF (6×9 ou A5), EPUB ou os dois? | Os dois, PDF em A5 |
| 3 | Título à direita só nas aberturas, ou em todo artigo? | Só nas aberturas de capítulo, ≥ 768px |
| 4 | O web deve justificar o texto no leitor de ebook? | Não; esquerda em todas as telas |
| 5 | Quais variantes de callout além de "Leitura recomendada"? | Dica, Atenção e Exemplo, mesma estrutura |
| 6 | Você tem o PDF ou os arquivos originais para conferir as medidas? | Mantém as estimativas ≈ |
