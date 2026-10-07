
Formalização do lote recebida. Vou registrar este primeiro conjunto como BRAND-COLOR-SYSTEM v0.1, separando valor confirmado, uso semântico e pontos ainda ambíguos.

|   |   |   |   |   |
|---|---|---|---|---|
|Token canônico|Valor|Uso|Texto/contraste|Status|
|--brand-bg-light-orange|#FFFDFA|background principal/canvas|texto escuro|FACT|
|--brand-dark-gray|#545454|eyebrow, callout, texto secundário|branco bold quando usado como fundo|FACT|
|--brand-light-blue|#CBD4FF|cor principal da marca|variável conforme aplicação|FACT|
|--brand-light-blue-soft|rgba(203,212,255,.48)|fundo de callout/headline|preto ou azul|FACT|
|--brand-dark-indigo|#0E025D|eyebrow/callout alternativo|branco|FACT|
|--brand-light-gray|#ECECEC|superfície neutra/apoio|texto escuro|FACT|
|--brand-action-blue|#2D5CE6|botões, links, texto de ação|branco quando fundo sólido|FACT|
|--solution-green|#00BF63|elementos ligados a soluções/store|a validar contraste|FACT|
|--risk-red|#FF0000|risco cognitivo|a validar contraste|FACT|
|--attention-yellow|GAP|atenção|a validar|HEX incompleto|
|--text-primary|#000000 ou derivado escuro|headlines/body|—|FACT parcial|
|--text-secondary|#545454|texto auxiliar|—|FACT|

A hierarquia semântica fica assim:

BRAND FOUNDATION

│

├── CANVAS

│   └── #FFFDFA

│

├── BRAND

│   ├── Primary Light Blue #CBD4FF

│   ├── Neutral Light Gray #ECECEC

│   └── Dark Gray #545454

│

├── ACTION

│   └── Blue #2D5CE6

│

├── CALLOUT / EYEBROW

│   ├── Dark Gray #545454 + white bold

│   ├── Dark Indigo #0E025D + white

│   └── Light Blue 48% + black/blue

│

└── SEMANTIC COLORS

    ├── Solution → #00BF63

    ├── Risk → #FF0000

    └── Attention → GAP

Para implementação, eu já transformaria isso em tokens:

:root {

  --brand-bg-light-orange: #fffdfa;

  

  --brand-dark-gray: #545454;

  --brand-light-gray: #ececec;

  

  --brand-light-blue: #cbd4ff;

  --brand-light-blue-soft: rgb(203 212 255 / 48%);

  

  --brand-dark-indigo: #0e025d;

  

  --brand-action-blue: #2d5ce6;

  

  --semantic-solution: #00bf63;

  --semantic-risk: #ff0000;

  

  --text-primary: #000000;

  --text-secondary: #545454;

  --text-on-dark: #ffffff;

}

Também registraria os padrões de uso:

usage_rules:

  

  page_background:

    token: brand-bg-light-orange

  

  eyebrow:

    variants:

      dark_gray:

        background: brand-dark-gray

        text: text-on-dark

        weight: bold

  

      dark_indigo:

        background: brand-dark-indigo

        text: text-on-dark

        weight: bold

  

  callout:

    variants:

      soft_blue:

        background: brand-light-blue-soft

        text:

          allowed:

            - text-primary

            - brand-action-blue

  

  button:

    primary:

      background: brand-action-blue

      text: text-on-dark

  

  semantics:

    solution:

      color: semantic-solution

  

    cognitive_risk:

      color: semantic-risk

  

    attention:

      color: GAP

Há dois pontos que não vou fechar sem confirmação.

O primeiro é o amarelo. Você falou algo como FFE 59, mas isso não forma um HEX completo de seis dígitos. Vou registrar por enquanto:

attention_yellow:

  hex: null

  status: GAP

  note: "valor verbal recebido incompleto; confirmar HEX de 6 dígitos"

O segundo é a regra que você descreveu como “Round Zero, spread 100, transparência 19, preto”. Isso parece ser uma configuração de efeito visual, overlay ou sombra, mas ainda não está claro qual propriedade representa cada valor. Vou registrar assim:

headline_effect:

  round: 0

  spread: 100

  opacity: 19

  color: "#000000"

  status: NEEDS_CONFIRMATION

  note: "precisa identificar se é shadow, overlay, glow, background ou outro efeito"

Quanto à imagem de referência, ela confirma visualmente quatro famílias: fundo creme muito claro, superfícies cinza, azul-claro institucional e acentos semânticos azul/verde/vermelho/amarelo. O próximo lote pode entrar sobre esta base sem redefinir esses tokens.