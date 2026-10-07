  

id: OBRAND-STYLING-001 version: 1.0.0 area: Design / Brand Styling workflow: Coleta → extração → preenchimento → verificação owner: A DEFINIR status: PREPARED collected_at: 2026-10-07 automation_level: A4 para coleta e verificação documental; sem validação visual em navegador

OpenAI Brand Styling

Overview

Referência de implementação preenchida a partir do HTML e CSS da página indicada e do guia público de identidade OpenAI. Não é um manual oficial publicado pela marca nem uma nova skill instalada.

Keywords: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, OpenAI brand, visual formatting, visual design.

Contrato e evidências

● INPUT: página do artigo, folhas CSS vinculadas, guia público de marca e imagem enviada.

● OUTPUT: este template completo em Markdown, tokens e bloco YAML.

● DEPENDS_ON: acesso às fontes públicas, realizado.

● BLOCKS: reprodução exata do logotipo depende dos assets e métricas oficiais.

● Escopo: documentar identidade e implementação encontrada; nenhuma alteração de site, instalação de fonte ou publicação.

● Aceite: seções preenchidas, valores rastreados, lacunas explícitas e ausência de placeholders pendentes.

● HANDOFF: implementar com os tokens coletados; validar renderização e métricas do logo antes de declarar equivalência visual.

● Imagem anexada: capa de “Storytelling with Data”; não usada como fonte da identidade OpenAI.

Legenda: [C] coletado no HTML/CSS; [O] diretriz pública oficial; [P] proposta de aplicação, não regra oficial; [ND] não determinado nas fontes consultadas. Valores em pixels pressupõem raiz de 16px. Tokens disponíveis no CSS não demonstram, isoladamente, seu uso em cada componente.

Fontes:

● S1 — artigo e HTML: https://openai.com/pt-BR/index/introducing-gpt-6-sol-and-luna/

● S2 — CSS vinculado ao artigo: https://openai.com/_next/static/immutable/chunks/411n2iy624ij3.css

● S3 — diretrizes públicas: https://openai.com/brand/

● S4 — portal indicado por S3: https://brand.openai.com/ — conteúdo completo não auditado nesta coleta.

Brand Guidelines

Colors

Main Colors

|Papel     |HEX      |Uso e origem                                                |  
|----------|---------|------------------------------------------------------------|  
|Dark      |`#000000`|[C] Texto principal no tema claro; fundo do hero no HTML.   |  
|Light     |`#FFFFFF`|[C] Fundo do tema claro; título e subtítulo brancos no hero.|  
|Mid Gray  |`#666666`|[C] `--color-primary-solid-60`, apoio textual no tema claro.|  
|Light Gray|`#F5F5F5`|[C] `--color-primary-solid-4`, superfície neutra suave.     |

Accent Colors

|Papel neste template|Nome   |HEX      |Uso                                                     |  
|--------------------|-------|---------|--------------------------------------------------------|  
|Accent 01           |Blue   |`#29BDFD`|[C] `--color-hue-blue`; [P] destaque de informação.     |  
|Accent 02           |Magenta|`#EB56C5`|[C] `--color-hue-magenta`; [P] segunda categoria visual.|  
|Accent 03           |Lime   |`#9DCA1C`|[C] `--color-hue-lime`; [P] terceira categoria visual.  |  
|Optional            |Red    |`#F53255`|[C] `--color-hue-red`.                                  |  
|Optional            |Yellow |`#FFAF00`|[C] `--color-hue-yellow`.                               |

A ordem primário/secundário/terciário acima é um mapeamento proposto para preencher o template; o CSS não estabelece essa hierarquia de marca. Esses acentos não substituem automaticamente as cores dos gráficos ou do hero. A paleta específica da arte animada do hero permanece [ND].

Typography

Headings

Primary font: OpenAI Sans [C/O].  
Fallback: OpenAI Sans Variable Scripts, sans-serif [C].

Body Text

Primary font: OpenAI Sans [C/O].  
Fallback: OpenAI Sans Variable Scripts, sans-serif [C].

Optional Typography Roles

● Display / Hero: OpenAI Sans; token XL disponível, porém o H1 deste artigo usa text-h1, não XL [C].

● Subheading: OpenAI Sans; H2–H6 conforme hierarquia [C/P].

● Caption: OpenAI Sans, 14px, peso 400, linha 22,96px e tracking 0 [C].

● Monospace / Code: "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace [C].

● Note: família confirmada; sem fonte licenciada disponível, usar fallback. Não tratar a existência de um arquivo web como permissão de redistribuição [P].

Features

Smart Font Application

● Aplicar OpenAI Sans aos títulos segundo a escala H1–H6 extraída [P].

● Aplicar OpenAI Sans ao corpo de texto [P].

● Fallback de títulos e corpo: OpenAI Sans Variable Scripts, depois sans-serif [C].

● Preservar pesos definidos por papel; não converter todos os títulos em bold [P].

● Preservar a escala fluida e a hierarquia semântica independentemente do tamanho visual [P].

● Verificar legibilidade e quebras ao exportar para outros formatos [P].

Text Styling

Headings

Font: OpenAI Sans. Fallback: OpenAI Sans Variable Scripts, sans-serif [C].

|Papel        |Tamanho fluido|Peso|Altura de linha|Letter spacing                              |  
|-------------|--------------|----|---------------|--------------------------------------------|  
|XL disponível|64–112px      |500 |64–112px       |-0.02em                                     |  
|H1 do artigo |32–64px       |500 |36,48–64px     |-0.03em                                     |  
|H2           |32–48px       |500 |36,48–55,68px  |-0.01em no menor limite até -0.03em no maior|  
|H3           |24–30px       |500 |31,68–39,60px  |-0.01em                                     |  
|H4           |20–22px       |500 |24–27,72px     |-0.01em                                     |  
|H5/H6        |16–18px       |500 |20–23,76px     |-0.01em                                     |

[C] A interpolação usa a faixa 375–1440px. Fora dela, clamp() limita os extremos. H1 exato:

font-size: clamp(2rem, calc(2rem + 2 * ((100vw - 23.4375rem) / 66.5625)), 4rem);

line-height: clamp(2.28rem, calc(2.28rem + 1.72 * ((100vw - 23.4375rem) / 66.5625)), 4rem);

font-weight: 500;

letter-spacing: -.03em;

Body Text

● Font: OpenAI Sans [C].

● Fallback: OpenAI Sans Variable Scripts, sans-serif [C].

● Default size: 1.0625rem / 17px, papel P1 [C].

● Weight: 400 [C].

● Line height: 1.74994rem / aproximadamente 28px [C].

● Letter spacing: -0.01em [C].

● P2: 14px, linha 22,96px, peso 400 e tracking -0.01em [C].

Text Color Rules

● Primary text: #000000 no tema claro [C].

● Secondary text: #666666, token sólido de 60% [C/P].

● Text on dark backgrounds: #FFFFFF [C].

● Text on light backgrounds: #000000 [C].

● Accent text: #000000 por padrão; acentos cromáticos apenas após verificar contraste [P].

● Seleção inteligente: resolver o tema e a superfície; não aplicar a paleta clara diretamente ao tema escuro [P].

● Preservar hierarquia e formatação, incluindo links identificáveis [P].

Shape and Accent Colors

● Usar cores coletadas quando o componente exigir cor [P].

● Primary shape accent: #29BDFD [C/P].

● Secondary shape accent: #EB56C5 [C/P].

● Tertiary shape accent: #9DCA1C [C/P].

● Accent cycling rule: sem ciclo automático; atribuição estável por categoria [P].

● Background usage rule: branco como superfície clara, preto no hero; cinza suave para áreas auxiliares [C/P].

● Border usage rule: #E0E0E0 sólido ou #0000001F com transparência no tema claro [C/P].

● Icon color rule: currentColor, presente nos SVG do HTML [C].

● Não usar cor como único meio de distinguir categorias; combinar rótulos e formas [P].

Visual Hierarchy

Primary

Hero com H1 branco sobre fundo preto, centralizado; conteúdo de título limitado a md:max-w-200.5 (802px com raiz 16px) [C].

Secondary

Subtítulo P1 branco, max-w-149 (596px), abaixo do título; seções do artigo organizadas por headings e sumário [C].

Supporting Elements

Metadados e legendas menores; conteúdo editorial ocupa faixas do grid, com sumário alterando a composição em telas amplas [C].

Emphasis

Usar escala, peso e espaçamento para estabelecer importância; manter cor funcional e parcimoniosa [P].

Layout Rules

● Default alignment: hero centralizado [C]; corpo alinhado ao início [P].

● Content width: token máximo desktop de 90rem (1440px); prosa em 6 colunas a partir da coluna 4 em condições @md; quando o sumário aparece, início na coluna 2 [C]. Não equivale a uma largura fixa universal de 720px.

● Outer margins: containers observados usam px-6 md:px-8, 24px/32px [C].

● Internal spacing: unidade 0.25rem (4px); parágrafos com margem inferior padrão de 6 unidades (24px); hero com gap de 20px/24px [C].

● Grid: 12 colunas; variante com sumário em 10 colunas; gutters 8/16/24px conforme breakpoint [C].

● Corner radius: tokens pequenos 4px, médios 0.38rem (6,08px), grandes 16px; também 0 e 9999px [C]. Escolher por componente, não aplicar um raio único [P].

● Borders: proposta de 1px solid #E0E0E0 para divisórias [P]; a espessura não é uma regra global confirmada.

● Shadows: none como padrão editorial deste template [P]; não significa ausência de sombras em todos os componentes do site.

Image and Illustration Style

● Photography style: A DEFINIR [ND]; não extrapolar uma direção fotográfica global a partir deste artigo.

● Illustration style: hero possui componente visual próprio; direção detalhada de movimento, textura e paleta A DEFINIR sem inspeção renderizada [ND].

● Iconography style: SVG monocromático herdando currentColor [C]; proporções e traços devem ser preservados [P].

● Image treatment: containers de mídia no HTML incluem overflow hidden, imagens quadradas relacionadas e escala de hover de 102,5% [C].

● Image aspect ratios: hero desktop 1280:794; mobile 375:680; mídia relacionada 1:1 [C]. Não impor 16:9 a todas as imagens.

● Image background rule: fundo preto no container do hero [C]; outras mídias mantêm seu contexto, sem filtro universal [P].

Logo Usage

● Primary logo: wordmark OpenAI, asset oficial referenciado em https://openai.com/brand/ [O].

● Secondary logo: Blossom, símbolo complementar; não substituir o wordmark como assinatura principal [O].

● Minimum size: A DEFINIR — medida numérica não confirmada no texto público consultado [ND].

● Clear space: respeitar a área oficial; proporção exata A DEFINIR [O/ND].

● Allowed backgrounds: proposta de superfícies lisas com contraste adequado [P]; evitar imagem carregada atrás do Blossom [O].

● Forbidden treatments: deformação, corte, efeitos, uso como máscara, variantes não aprovadas ou junção do wordmark com Blossom [O].

Technical Details

Font Management

Usar OpenAI Sans quando disponível de forma autorizada. No ambiente web, uma fonte local por si só não garante equivalência ao arquivo e peso empregados no site [P].

Fallbacks:

● Headings: OpenAI Sans Variable Scripts, sans-serif [C].

● Body: OpenAI Sans Variable Scripts, sans-serif [C].

Não é necessário instalar fontes para usar o fallback. Para maior fidelidade, disponibilizar OpenAI Sans e, quando necessário, OpenAI Sans Variable Scripts sob as condições aplicáveis. SF Mono e Consolas são opções do stack de código; não há obrigação de instalar ambas [C/P].

Color Application

Color system: CSS HEX e HEX com alpha, com tokens semânticos por tema [C].

Example implementation [P, valores coletados]:

:root {

  --brand-dark: #000000;

  --brand-light: #ffffff;

  --brand-mid-gray: #666666;

  --brand-light-gray: #f5f5f5;

  --accent-primary: #29bdfd;

  --accent-secondary: #eb56c5;

  --accent-tertiary: #9dca1c;

  --text-primary: #000000;

  --text-secondary: #666666;

  --border-default: #e0e0e0;

  --font-brand: "OpenAI Sans", "OpenAI Sans Variable Scripts", sans-serif;

}

.article { color: var(--text-primary); background: var(--brand-light); font-family: var(--font-brand); }

.article-hero { color: var(--brand-light); background: var(--brand-dark); }

.article-divider { border: 0; border-top: 1px solid var(--border-default); }

Examples: texto #000000; superfície #FFFFFF; borda #E0E0E0.

Supported systems: web HTML/CSS; PDF, PNG e slides mediante verificação de fontes e conversão de cor [P]. Impressão não tem equivalência CMYK garantida por estes valores RGB.

Brand Tokens

Core

BRAND_NAME=OpenAI

COLOR_DARK=#000000

COLOR_LIGHT=#FFFFFF

COLOR_MID_GRAY=#666666

COLOR_LIGHT_GRAY=#F5F5F5

ACCENT_PRIMARY=#29BDFD

ACCENT_SECONDARY=#EB56C5

ACCENT_TERTIARY=#9DCA1C

FONT_HEADING=OpenAI Sans

FONT_HEADING_FALLBACK=OpenAI Sans Variable Scripts, sans-serif

FONT_BODY=OpenAI Sans

FONT_BODY_FALLBACK=OpenAI Sans Variable Scripts, sans-serif

Optional Design Tokens

Mapeamentos semânticos deste template [P], baseados nos valores coletados [C]; sombras são proposta.

TEXT_PRIMARY=#000000

TEXT_SECONDARY=#666666

TEXT_INVERSE=#FFFFFF

BACKGROUND_PRIMARY=#FFFFFF

BACKGROUND_SECONDARY=#F5F5F5

BACKGROUND_ACCENT=#000000

BORDER_DEFAULT=#E0E0E0

RADIUS_SMALL=0.25rem

RADIUS_MEDIUM=0.38rem

RADIUS_LARGE=1rem

SPACE_XS=0.25rem

SPACE_SM=0.5rem

SPACE_MD=1rem

SPACE_LG=1.5rem

SPACE_XL=2rem

SHADOW_SMALL=none

SHADOW_MEDIUM=none

SHADOW_LARGE=none

Brand Behavior Rules

DO

1. Usar tokens semânticos por superfície e tema [P].

2. Preservar hierarquia fluida e espaçamento coletados [P].

3. Manter o hero e a prosa como contextos distintos [P].

4. Preservar assets oficiais de logo sem alterações [O].

5. Validar contraste, responsividade e fallback no resultado final [P].

DO NOT

1. Tratar acentos disponíveis como cores obrigatórias em todo componente [P].

2. Misturar os azuis da capa do livro com os tokens OpenAI sem decisão explícita [P].

3. Apresentar medidas sugeridas como regras oficiais [P].

4. Alterar o logo ou criar uma assinatura combinada não autorizada [O].

5. Declarar reprodução visual exata sem validar renderização [P].

Output Requirements

All generated visual artifacts should:

1. Aplicar a paleta OpenAI coletada no escopo definido.

2. Usar a hierarquia tipográfica documentada.

3. Preservar contraste e legibilidade.

4. Aplicar acentos de maneira consistente e funcional.

5. Respeitar espaçamentos e composição responsiva.

6. Seguir requisitos de logo e imagem.

7. Usar fallback quando a fonte principal não estiver disponível.

8. Verificar consistência entre formatos de saída.

9. Distinguir tokens coletados de decisões propostas.

10. Manter fonte, versão e pendências associadas à entrega.

Custom Variables

brand:

  name: "OpenAI"

  description: "Referência de styling extraída do artigo indicado e do guia público da marca."

  personality: "Proposta interpretativa: clara, precisa e acessível."

  

colors:

  dark: "#000000"

  light: "#FFFFFF"

  mid_gray: "#666666"

  light_gray: "#F5F5F5"

  accents:

    primary:

      name: "Blue — mapeamento proposto"

      value: "#29BDFD"

    secondary:

      name: "Magenta — mapeamento proposto"

      value: "#EB56C5"

    tertiary:

      name: "Lime — mapeamento proposto"

      value: "#9DCA1C"

  

typography:

  headings:

    primary: "OpenAI Sans"

    fallback: "OpenAI Sans Variable Scripts, sans-serif"

  body:

    primary: "OpenAI Sans"

    fallback: "OpenAI Sans Variable Scripts, sans-serif"

  

layout:

  grid: "12 colunas; variante com sumário em 10; gutters 8/16/24px"

  spacing: "Base de 4px; escala semântica proposta 4/8/16/24/32px"

  radius: "Tokens 4px / 6.08px / 16px; seleção por componente"

  shadow: "none como proposta editorial"

  

visual_language:

  photography: "A DEFINIR — não inferida como padrão global"

  illustration: "Hero próprio; arte e animação ainda não auditadas visualmente"

  iconography: "SVG monocromático com currentColor"

  

implementation:

  color_system: "CSS HEX / HEX alpha; tokens por tema"

  target_environment: "Web responsiva; demais formatos com adaptação verificada"

  supported_outputs: "HTML/CSS, Markdown/YAML; PDF/PNG/slides sujeitos a validação"

  

verification:

  html_and_css: "VERIFIED — coleta e correspondência documental"

  visual_equivalence: "NOT_VERIFIED"

  official_brand_approval: "NOT_REQUESTED"

  pending:

    - "Mínimo e clear space numéricos do logo"

    - "Inspeção renderizada da arte do hero"

    - "Validação do layout no ambiente de destino"

Registro de verificação

HTML acessado com HTTP 200. Valores de cores, famílias, tipografia, espaçamento e raios conferidos na folha vinculada. Proporções do hero, classes H1/P1, grid e margens conferidos no HTML. Fontes oficiais de identidade consultadas. Nenhum valor de logo não encontrado foi inventado. Sem teste de equivalência visual em navegador. Status PREPARED refere-se ao uso futuro deste guia, enquanto a extração documental foi verificada.