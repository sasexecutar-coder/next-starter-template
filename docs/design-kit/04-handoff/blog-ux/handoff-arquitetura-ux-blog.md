# Handoff — Arquitetura de telas e UX flow do blog

Oct 7, 2026 · @L

Spec mobile-first (390 px) extraída de 13 capturas de referência: 8 telas e estados, 4 camadas de hierarquia e um fluxo único de descoberta até a leitura. Medidas em px CSS (±1 px), lidas dos pixels; tokens por função, sem logo, ilustrações ou fontes proprietárias da referência.

## Mapa de telas e fluxo UX

Tudo passa por um hub único: o menu global leva a Resources, e dali o leitor descobre (carrossel), filtra (drawer) e lê (artigo). O artigo é o destino tanto do carrossel quanto da lista.

&#91;embedded content: fluxo UX · 8 telas, 1 destino\]

Do menu ao hub o caminho é linear; dali, busca e filtros alimentam a lista, e o drawer devolve o resultado à mesma lista.

| # | Tela / estado | Capturas | Conteúdo | Papel no fluxo |
| --- | --- | --- | --- | --- |
| 1 | Página inicial | IMG\_1892 | Header, barra de breadcrumb, hero centrado, CTA de largura total, mídia | Entrada |
| 2 | Popover "Explorar aqui" | IMG\_1893 | Duas ações sobre a página: perguntar e copiar como markdown | Ação contextual |
| 3 | Menu global | IMG\_1894 | Tela cheia, 5 acordeões, Login, 2 botões no pé | Navegação L1 |
| 4 | Sub-nav do hub aberta | IMG\_1895 | Home, Articles, Guides, Webinars, Videos, Search | Navegação L2 |
| 5 | Seletor de categoria aberto | IMG\_1896 | Card-dropdown com 3 grupos (All, categorias, tipos) e 8 itens | Navegação L3 |
| 6 | Carrossel de destaques | IMG\_1897 a 1900 | Card de altura fixa, setas, 5 dots (4 capturados) | Descoberta |
| 7 | Drawer de filtro | IMG\_1901 | 3 grupos de filtro, Reset e Apply | Filtro |
| 8 | Lista de resultados | IMG\_1902, 1903 | Busca, botão de filtro, cards em coluna única | Descoberta |
| 9 | Artigo | IMG\_1904 | Header compacto, categoria, título, data, imagem 16:9, corpo | Leitura |

A ligação carrossel e lista até o artigo é inferida: o artigo da IMG\_1904 é o mesmo do 4º slide (IMG\_1900). Os dots indicam 5 slides, mas o 5º não foi capturado.

## Hierarquia de navegação e de conteúdo

São quatro camadas, da mais global à mais específica. Só as duas primeiras ficam fixas na rolagem e somam 125 px, cerca de 15% de uma viewport de 844 px, além dos 47 px da safe area.

| Camada | Elemento | Altura (px) | Comportamento |
| --- | --- | --- | --- |
| L1 | Header global: logo à esquerda, botão de menu à direita | 72 | Fixo. O menu abre em tela cheia e o ícone vira × |
| L2 | Sub-nav da seção: rótulo + chevron. Na página inicial é breadcrumb + "Explorar aqui" | 52 no hub, 44 no breadcrumb (borda incluída) | Fixo. Abre uma lista inline que cobre o conteúdo, sem scrim |
| L3 | Seletor de categoria (card-dropdown), no corpo, abaixo do texto de abertura | ≈ 42 fechado (não capturado), 417 aberto | Rola com a página |
| L4 | Busca + botão de filtro; o filtro abre um drawer | 44 | Rola com a página |

Regra de leitura dentro do card, do mais forte ao mais fraco:

1. Título em serif, cor `text-primary`, o maior corpo do card.
2. Descrição em sans 16 px, cor `text-secondary`, no máximo 3 linhas.
3. Meta (tipo e data) e tag de produto em sans 13 px, nas faixas de topo e rodapé.

A divisão de famílias é funcional: serif para o que se lê (títulos e corpo de artigo), sans para o que se opera (navegação, botões, meta). Três níveis de cinza bastam para toda a hierarquia de texto.

## Tokens de design

Valores lidos dos pixels das capturas. Tamanhos de fonte vêm da altura da capitular (±1 px); pesos e sombras não são mensuráveis em imagem estática e estão marcados como estimados.

**Cor**

| Token | Valor | Uso |
| --- | --- | --- |
| `color-bg-page` | #FAF9F5 | Fundo de página, barras, drawer |
| `color-surface-card` | #F5F4EE | Cards |
| `color-surface-raised` | #FFFFFF | Campo de busca, menu em tela cheia, dropdowns |
| `color-border-subtle` | #E8E6DD | Borda de card, divisores, preenchimento do botão Reset |
| color-border-input | #DDDCD2 | Borda do campo de busca, do seletor de categoria e do botão contorno |
| `color-divider-faint` | #F0EEE7 | Divisor das linhas do menu |
| `color-border-control` | #D0CFC6 | Borda de checkbox, botões de ícone, dot inativo |
| `color-text-primary` | #141413 | Títulos, corpo de artigo, item ativo, fundo do botão primário |
| `color-text-strong` | #30302E | Meta do card, breadcrumb, tag de produto |
| `color-text-secondary` | #5E5D59 | Descrições, datas, placeholders, itens inativos |
| `color-scrim` | rgba(20,20,19,0.20) | Fundo atrás do drawer |
| `color-media-*` | #CBCAD9, #C0D0CA, #CC7C5E, #DDDCD2 | Fundo da mídia, varia por artigo |
| `color-accent` | não definido | A referência só usa terracota no logo e nas ilustrações |

**Tipografia** (serif para ler, sans para operar)

| Token | Família | Tamanho / linha (px) | Onde |
| --- | --- | --- | --- |
| `type-display-xl` | Serif, peso médio (estimado) | 48 / 48 | H1 do hero, centrado |
| `type-display-l` | Serif | 24 / 25 | Título do card em destaque e do drawer |
| `type-display-m` | Serif | 18 / 19 | Título do card de lista |
| `type-article-title` | Sans, negrito (estimado) | 34 / 35 | H1 do artigo, centrado |
| `type-article-body` | Serif | 18 / 26 | Corpo do artigo |
| `type-lead` | Sans | 20 / 30 | Texto de abertura do hero |
| `type-btn-lg`, `type-menu` | Sans | 18 / 24 | Botão grande, itens do menu, eyebrow do hero |
| `type-body-ui` | Sans | 16 / 24 | Descrição de card, opção de filtro, placeholder, botão médio |
| `type-meta` | Sans | 13 / 18 | Tipo e data, breadcrumb, sub-nav, tag, rótulo de grupo |

**Espaçamento, raio, borda**

| Token | Valor (px) | Uso |
| --- | --- | --- |
| `space-2`, `-3`, `-4` | 8, 12, 16 | Dentro de grupos: ícone e rótulo, gap de botões, busca e filtro |
| `space-6` | 24 | Padding de card e de drawer, entre blocos do hero |
| `space-8` | 32 | Gutter lateral, entre cards |
| `space-12`, `-16`, `-24` | 48, 64, 96 | Entre grupos e entre seções de página |
| `radius-sm` | 4 | Checkbox |
| `radius-md` | 8 | Botões de texto |
| `radius-lg` | 12 | Botões de ícone (setas, filtro) |
| `radius-xl` | 16 | Cards, busca, dropdowns, imagem do artigo |
| `border-width` | 1 | Toda borda e divisor |
| `shadow-card-raised` | 0 4px 16px rgba(20,20,19,0.08), estimado | Card pressionado ou em foco (IMG\_1903). Repouso: sem sombra |

## Regras de espaçamento

Quanto mais alto na hierarquia, maior o espaço: 96 px entre blocos de página, 48 entre grupos relacionados, 32 entre itens repetidos, 24 dentro de um componente e 8 a 16 dentro de um grupo. Tudo é múltiplo de 8, com 12 como única exceção (checkbox e rótulo, botões do drawer).

&#91;embedded content: anatomia do card com cotas · 322 × 340, variante com ilustração\]

A cota vermelha marca um defeito da referência que a spec corrige: reserve a caixa da ilustração no grid do card em vez de sobrepô-la ao texto.

| Tela / bloco | Distância | Valor (px) |
| --- | --- | --- |
| Todas | Margem lateral da página (conteúdo de 326 em 390) | 32 |
| Hero | Sub-nav até eyebrow | 64 |
| Hero | Eyebrow até H1 / H1 até texto / texto até CTA | 16 / 24 / 24 |
| Hero | CTA (40 de altura, largura total) até a mídia | 64 |
| Carrossel | Card (altura fixa 395) até controles / controles (40) até busca | 24 / 96 |
| Lista | Busca (44) até 1º card / entre cards | 48 / 32 |
| Busca | Campo até botão de filtro | 16 |
| Card | Padding interno em x e y / faixa de topo / título até descrição | 24 / 44 / 8 |
| Card | Rodapé (tag): ícone 20, padding inferior | 24 |
| Card | Ilustração 108 × 108, ancorada à direita / embaixo | 32 / 36 |
| Artigo | Header até categoria | 40 |
| Artigo | Categoria até H1 / H1 até data / data até imagem | 24 / 24 / 24 |
| Artigo | Imagem 16:9 (326 × 183) até o corpo | 48 |
| Menu | Header até 1º item / altura da linha / divisor | 33 / 76 / 1 |
| Menu | Par de CTAs: altura 40, 50% cada, gap | 8 |
| Drawer | Largura 341, scrim visível à esquerda, padding lateral | 341 / 49 / 24 |
| Drawer | Linha de opção / cabeçalho de grupo / checkbox + gap até o rótulo | 36 / 52 / 20 + 12 |
| Drawer | Botões Reset e Apply: altura 36, gap | 12 |

## Componentes

| Componente | Medidas e anatomia | Observações |
| --- | --- | --- |
| Botão primário grande | 40 de altura, `radius-md`, fundo `text-primary`, rótulo branco `type-btn-lg`. Largura total no hero, 50% no par do menu | Um único CTA por tela |
| Botão contorno | Mesma geometria, fundo branco, borda 1 `border-input`, rótulo `text-strong` | Par com o primário ("Contact sales" + "Try Claude") |
| Botões médios do drawer | 36 de altura, `radius-md`, rótulo `type-body-ui`. Reset: fundo `border-subtle`, borda 1 `border-control`. Apply: fundo `text-primary` | Reset à esquerda, Apply à direita, metade da largura cada |
| Botão de ícone | 40 × 40, `radius-lg`, borda 1 `border-control`, fundo transparente, ícone 20 | Setas do carrossel nas pontas (alinhadas à margem), botão de filtro |
| Header | 72 de altura, logo à esquerda (≈ 26 de altura), botão de menu à direita com ícone de 3 linhas | Na tela de artigo usa o mesmo molde com outro logo |
| Barra de breadcrumb | 44, bordas 1 em cima e embaixo, "Produto / Página" à esquerda, gatilho "Explorar aqui" + chevron à direita | Só na página inicial de produto |
| Popover "Explorar aqui" | 276 de largura, alinhado à direita da margem, `radius-xl`, fundo branco. 2 linhas de ≈ 38, ícone 20 + gap 12 + texto 16 | Encosta na barra, sobrepondo a borda inferior em ≈ 3 |
| Menu em tela cheia | Fundo branco. Linhas de 76 com divisor 1 `divider-faint`, rótulo 18, ícone "+" 20 à direita. Login sem ícone nem divisor. CTAs presos ao pé | Cobre o header (logo e × na mesma posição) |
| Sub-nav do hub | Barra de 52: rótulo `type-meta` em `text-primary` + chevron 24. Aberta: lista de itens de 40, ativo em `text-primary`, demais em `text-secondary`, "Search" com ícone, padding 8 em cima e 16 embaixo | A lista abre inline e sobrepõe o conteúdo, sem empurrá-lo |
| Seletor de categoria | Card 322 de largura, `radius-xl`, borda 1 `border-input`, fundo branco. Linha-título de ≈ 42 com ícone do tipo 20, rótulo 16 e chevron. Itens com pitch de 40, recuados 38. Divisores entre "All resources", grupo de artigos e grupo de mídias | Chevron gira 180° quando aberto |
| Card de carrossel | 322 × 395 fixo (igual em todos os slides), `radius-xl`, fundo `surface-card`, borda 1. Faixa de topo 44 (ícone 20, tipo, data à direita) + divisor. Título `type-display-l` até 5 linhas, descrição 3 linhas com reticências, tag opcional no rodapé, ilustração 108 × 108 | Altura fixa evita salto de layout ao trocar de slide |
| Controles do carrossel | Setas 40 × 40 nas pontas, 5 dots de 6 de diâmetro com 25 de pitch, centrados. Ativo `text-primary`, inativo `border-control` | Alinhados verticalmente ao centro das setas |
| Campo de busca | 261 × 44 (flex), `radius-xl`, fundo branco, borda 1 em border-input. Ícone 20 a 16 da borda, placeholder `type-body-ui` em `text-secondary` a 8 do ícone | Botão de filtro à direita, 16 de gap |
| Card de lista | 322 × auto. Mesma anatomia, título `type-display-m`. Altura ≈ 230 sem tag e ≈ 254 com tag. Ilustração só no primeiro card | Variante com título grande e ilustração: ≈ 340 |
| Drawer de filtro | 341 de largura, entra pela direita, fundo `bg-page`, scrim `color-scrim` nos 49 à esquerda. Ícone de fechar no topo, título `type-display-l`, divisor. Grupos em acordeão (Produto aberto: 10 opções), rodapé com Reset e Apply | Padding lateral 24 |
| Checkbox | 20 × 20, `radius-sm`, borda 1 `border-control`, 12 de gap até o rótulo `type-body-ui` | Linha de 36 de altura |
| Cabeçalho de artigo | Categoria (sans 16, semibold), H1 `type-article-title`, data 16, tudo centrado. Imagem 16:9 de largura total, `radius-xl`, fundo `color-media-*` com ilustração centrada | Corpo em `type-article-body`, alinhado à esquerda |

## Estados e interações

A coluna Origem separa o que aparece nas capturas do que é proposta para completar a spec (hover, foco, desabilitado e carregamento não existem em imagem estática).

| Elemento | Estado | Comportamento | Origem |
| --- | --- | --- | --- |
| Botão do menu | Aberto | Ícone de 3 linhas vira ×, overlay branco em tela cheia | Capturado |
| Chevrons (breadcrumb, sub-nav, seletor, grupos do drawer) | Aberto / fechado | Aberto aponta para cima, fechado para baixo | Capturado |
| Item de sub-nav | Ativo / inativo | Ativo em `text-primary`, demais em `text-secondary` | Capturado |
| Dot do carrossel | Ativo / inativo | `text-primary` / `border-control` | Capturado |
| Card | Repouso / pressionado | Sem sombra / `shadow-card-raised` | Capturado (IMG\_1903) |
| Drawer | Aberto | Scrim 20% à esquerda, painel pela direita. Fecha pelo ícone, toque no scrim ou Esc | Capturado, fechamento proposto |
| Checkbox | Vazio | Borda `border-control`, fundo transparente | Capturado |
| Checkbox | Marcado | Fundo `text-primary`, check branco | Proposto |
| Botão primário | Hover | Fundo `color-text-strong` | Proposto |
| Botão primário | Pressionado | `scale(0.98)` | Proposto |
| Botão primário | Desabilitado | Opacidade 0.4, sem hover | Proposto |
| Botão primário | Carregando | Spinner 16 antes do rótulo, `aria-busy="true"`, cliques ignorados | Proposto |
| Botão contorno e botão de ícone | Hover | Fundo `surface-card` | Proposto |
| Qualquer controle | Foco por teclado | Anel de 2 px `text-primary`, offset 2, nunca removido | Proposto |
| Reset | Sem filtro marcado | Desabilitado | Proposto |
| Apply | Com filtros | Rótulo com contagem, ex. "Aplicar (3)" | Proposto |
| Campo de busca | Foco / com texto | Borda 1 em `text-primary` / botão × de 20 para limpar | Proposto |
| Setas do carrossel | Primeiro e último slide | Decidir: loop contínuo ou seta desabilitada nas pontas | Em aberto |

## Comportamento responsivo

Só existe captura em 390 px de largura. Os dois breakpoints maiores abaixo são recomendação, não medição.

| Breakpoint | Layout | Origem |
| --- | --- | --- |
| Mobile, abaixo de 640 px | Coluna única, margem 32, tudo como descrito neste documento. Header + sub-nav fixos | Capturado |
| Tablet, 640 a 1023 px | Margem 48, lista em 2 colunas com gap 32, carrossel mostrando o card seguinte parcialmente, drawer de filtro fixo em 400 de largura, H1 do hero em 56 | Recomendado |
| Desktop, 1024 px ou mais | Container de até 1120. Sub-nav com itens visíveis (sem dropdown), lista em 3 colunas, filtros numa barra lateral fixa de 280, artigo em coluna de leitura de ≈ 680 (65 a 75 caracteres por linha) | Recomendado |

Por que uma coluna só no mobile: cada card ocupa a largura inteira, então há um único alvo de toque por linha e menos decisões por tela. Por que recolher o header ao rolar para baixo: as duas camadas fixas tomam 15% da tela.

## Casos de borda

| Caso | Regra |
| --- | --- |
| Título longo | A referência chega a 5 linhas no card em destaque (título de ≈ 95 caracteres). Use `line-clamp: 5` no destaque e 4 na lista. Textos em português costumam sair 15 a 25% mais longos que em inglês: planeje a margem |
| Descrição longa | `line-clamp: 3` com reticências, ≈ 100 caracteres visíveis. Nunca quebre palavra no meio |
| Ilustração sobre o texto | Colide com a 3ª linha da descrição em IMG\_1897 e IMG\_1902. Reserve a área 108 × 108 como célula do grid do card, ou reduza a descrição para 2 linhas quando houver ilustração |
| Card sem tag | Fica ≈ 24 mais baixo na lista. No carrossel a altura é fixa, então o rodapé fica vazio |
| Carrossel com 1 item | Esconde setas e dots |
| Carrossel com mais de 7 itens | Troca os dots por contador "3 de 9" |
| Lista vazia | Mensagem "Nenhum resultado para esses filtros" + botão contorno "Limpar filtros" |
| Carregando | 3 skeletons de card com a altura da variante de lista (≈ 230), sem animação se `prefers-reduced-motion` |
| Erro de carga | Aviso inline no lugar da lista, com botão "Tentar de novo" |
| Imagem ausente | Fundo `color-media` neutro (#DDDCD2) e ícone do tipo de conteúdo |
| Data | Renderizar em pt-BR ("6 out 2026") dentro de `<time datetime>` |
| iOS | CTAs presos ao pé (menu, drawer) usam `padding-bottom: env(safe-area-inset-bottom)` mais 24 |

## Movimento

Todos os valores são propostos, porque as capturas são estáticas. Com `prefers-reduced-motion: reduce`, troque translações e escalas por fade de 100 ms e desligue qualquer rolagem suave.

| Elemento | Gatilho | Animação | Duração (ms) | Easing |
| --- | --- | --- | --- | --- |
| Menu em tela cheia | Toque no ícone | Fade + translateY de -8 a 0 | 200 | cubic-bezier(0.2, 0, 0, 1) |
| Acordeão (menu, grupos do drawer) | Toque | Altura de 0 a auto, chevron ou "+" gira | 200 | ease-in-out |
| Lista da sub-nav | Toque no rótulo | Altura de 0 a auto, chevron gira 180° | 200 | ease-in-out |
| Popover | Toque no gatilho | Fade + scale de 0.98 a 1, origem no canto superior direito | 150 | ease-out |
| Drawer | Abrir | translateX de 100% a 0, scrim de 0 a 0.20 | 280 | cubic-bezier(0.2, 0, 0, 1) |
| Drawer | Fechar | Inverso | 200 | ease-in |
| Carrossel | Seta ou deslize | `scroll-snap-type: x mandatory`, uma altura só | 300 | Nativo |
| Dot | Troca de slide | Cor | 150 | ease-out |
| Card | Pressionar | Sombra aparece, translateY de -2 | 150 | ease-out |

O carrossel não avança sozinho: movimento automático não aparece nas capturas e deve ficar de fora.

## Acessibilidade e defeitos a não replicar

O texto passa em AA com folga; os controles não. Bordas de checkbox, botões de ícone e dot inativo ficam abaixo de 3:1 (WCAG 1.4.11). Campo de busca, seletor e botão contorno usam #DDDCD2 sobre branco (≈ 1,4:1) e falham do mesmo jeito; a correção #85847F vale para os dois.

| Par (primeiro plano / fundo) | Contraste | Resultado |
| --- | --- | --- |
| `text-secondary` / `bg-page` | 6,26:1 | Passa AA |
| `text-secondary` / `surface-card` | 5,98:1 | Passa AA |
| `text-primary` / `surface-card` | 16,7:1 | Passa AAA |
| Branco / botão `text-primary` | 18,4:1 | Passa AAA |
| `border-control` #D0CFC6 / `bg-page`, card, branco | 1,49 / 1,42 / 1,56:1 | Falha 3:1 |
| Correção proposta: #85847F para `border-control` e dot inativo | 3,4 a 3,75:1 | Passa 3:1 |

**Alvos de toque.** Setas do carrossel medem 40 × 41, o botão de filtro 46 × 37, a linha de checkbox 36, os dots 6 e o ícone do menu ≈ 24. O mínimo da Apple HIG é 44 × 44 pt. Mantenha o visual e amplie a área clicável com padding ou `::before`.

**Foco e ordem.**

1. Link de pular para o conteúdo, depois logo e botão de menu.
2. Gatilho da sub-nav e, se aberta, seus itens.
3. Seletor de categoria, carrossel (anterior, slide, próximo, dots), busca, botão de filtro, cards.
4. No drawer: foco preso dentro dele, Esc fecha, o foco volta ao botão de filtro.

**ARIA e semântica.**

- Botão de menu, gatilho da sub-nav e grupos do drawer: `aria-expanded` e `aria-controls`.
- Seletor de categoria: `<select>` nativo ou `role="listbox"` com `aria-activedescendant`.
- Carrossel: `<section aria-roledescription="carrossel" aria-label="Destaques">`, cada slide `role="group"` com `aria-label="2 de 5"`, setas com rótulos "Destaque anterior" e "Próximo destaque".
- Drawer: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para o título; grupos como `<fieldset>` + `<legend>`.
- Após aplicar filtro, anunciar "12 resultados" em `aria-live="polite"`.
- Card com um único link (o título, estendido por `::after`) para não duplicar paradas de Tab.
- Hierarquia de títulos: H1 da página, H2 por bloco ("Destaques", "Todos os recursos"), H3 no título de cada card.

**Defeitos observados nas capturas, que não devem ir para o blog.**

- Ilustração por cima do texto da descrição (IMG\_1897, IMG\_1902).
- Campo de busca com 44 de altura ao lado de botão de filtro com 37.
- Botões em 40 e 36 sem regra: definido aqui como grande 40 / 18 e médio 36 / 16.
- H1 em sans negrito no artigo e em serif no hub: escolha uma família só para títulos.
- Margem de 32 na página de artigo e de 34 nos cards: padronize em 32.
- Texto meta em 13 px: suba para 14 se o público incluir leitores com baixa visão.

## Adaptação ao blog

A estrutura da referência mapeia quase um para um no Blog Risco Cognitivo. Os nomes abaixo são proposta em pt-BR para validar; os itens marcados "a definir" dependem de decisões editoriais que as capturas não respondem.

| Na referência | No blog (proposta) |
| --- | --- |
| Menu L1: Product, Developers, Enterprise, Resources, Pricing, Login | Blog, Assets (Loja/Oficina), Programa Executar, Comunidade, Entrar |
| Par de CTAs no pé do menu | Contorno "Fale conosco" + primário "Baixar assets" |
| Sub-nav Resources: Home, Articles, Guides, Webinars, Videos, Search | Início, Artigos, Guias, Assets, Vídeos, Buscar |
| Seletor L3: All resources + 4 categorias + tipos | Todos os recursos + os 3 pilares editoriais (nomes a definir) + tipos |
| Filtro Product (10 opções) | Frente do Programa: Executar App, Consultoria e serviços, Marketplace, Comunidade, Schola.ai |
| Filtro Category | Pilar editorial |
| Filtro Use case | Situação do leitor (valores a definir com o público: autônomos com dificuldade de autogestão) |
| Tipo no card ("Article") | Artigo, Guia, Asset ou Vídeo |
| Tag de rodapé do card (produto) | Frente do Programa relacionada |
| Fim do artigo | Bloco novo: asset do artigo com botão de download e compartilhar, já que downloads e compartilhamentos são as métricas do blog |

Para um público que lida com sobrecarga de decisão: nada se move sozinho, uma coluna só, um único CTA primário por tela, e linha de leitura de 45 a 75 caracteres no artigo.

**Notas de implementação em Astro**

- Componentes `.astro`: Header, SubNav, CategorySelect, FeaturedCarousel, SearchFilterBar, FilterDrawer, ResourceCard, ArticleHeader, Prose.
- JavaScript só nas ilhas que precisam (`client:visible` ou `client:idle`): menu, sub-nav, seletor, carrossel e drawer. O resto é HTML estático.
- Tokens como variáveis CSS em `src/styles/tokens.css`. Onde o tema Obsidian Minimal tiver variável equivalente (ADR-001), mapeie para ela; o resto vira `--blog-*`.
- Content collection com os campos `title`, `description`, `date`, `type`, `pillar`, `program`, `useCase[]`, `cover`, `draft`.
- Filtros no estado da URL (`?frente=...&pilar=...`): link compartilhável e botão Voltar funcionando. Filtragem no cliente enquanto o índice couber em um JSON pequeno.
- Busca estática no build (Pagefind) combina com hospedagem na Cloudflare, sem servidor.
- Ícones de 20 px com traço de 1,5 (por exemplo Lucide). Fontes auto-hospedadas em woff2 com `font-display: swap`; sugestão de par aberto: Source Serif 4 + Inter.

## Lacunas e decisões em aberto

O que as capturas não mostram: desktop e tablet, hover e foco, o 5º slide do carrossel, os grupos Category e Use case abertos no drawer, os acordeões do menu expandidos, o rodapé e qualquer transição. Tamanhos de fonte são estimados pela capitular; pesos e sombras não foram medidos. Logo, ilustrações e fontes da referência não fazem parte deste handoff: use a identidade do blog.

- [ ] Cor de acento do blog (a referência só usa terracota em logo e ilustrações)
- [ ] Família dos títulos: serif em tudo ou sans negrito nos artigos
- [ ] Margem lateral: padronizar em 32 (proposto)
- [ ] Header fixo ou recolhido ao rolar para baixo (proposto: recolher)
- [ ] Setas do carrossel: loop ou desabilitar nas pontas
- [ ] Nomes dos 3 pilares editoriais e valores do filtro "Situação do leitor"
- [ ] Ilustração em todos os cards da lista ou só no primeiro
- [ ] Confirmar tamanhos e pesos no navegador (DevTools) assim que existir um protótipo
