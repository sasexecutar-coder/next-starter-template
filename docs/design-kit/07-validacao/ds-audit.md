# Auditoria transversal do design system

Responde ao ponto 7 do feedback: as regras estavam registradas, mas não eram aplicadas da mesma forma em todas as páginas.

## 1. Auditoria estática (`npm run audit:ds`, `scripts/ds-audit.mjs`)

Ela reprova componentes que fogem dos primitivos de `src/app/_components/ui/`.

| Regra | O que reprova | Antes | Depois |
|---|---|---|---|
| spacing | Margem, padding ou gap fora da escala 4/8/12/16/24/32/48/64/96 | 21 | 0 |
| btn | Classe `btn-*` fora do `<Button>` | 17 | 0 |
| page-block | Ritmo de bloco fora do `<Section>` | 14 | 0 |
| card | `card-feature`/`card-micro` avulso, em vez do `<Panel>` | 8 | 0 |
| white | `bg-white`/`text-white` fora dos primitivos (quebra os temas) | 5 | 0 |
| hex | Cor fixa em TSX | 4 | 0 (3 exceções `ds-allow` justificadas: materiais da cena v1 e o fallback do fog) |
| eyebrow | Eyebrow fora do `<Eyebrow>` | 3 | 0 |
| radius | Raio arbitrário | 1 | 0 |
| select | `<select>` nativo | 1 | 0 |
| **Total** | | **74** | **0** |

Arquivos com mais desvios antes da padronização:

| Arquivo | Desvios |
|---|---|
| `mapas/page.tsx` | 9 |
| `ferramentas/page.tsx` | 9 |
| `home/hero.tsx` | 9 |
| `artigos/hub.tsx` | 7 |
| `home/final-cta.tsx` | 6 |

## 2. Auditoria no navegador (Playwright, servidor local do Worker)

- Rotas: `/`, `/artigos`, `/posts/chatgpt-sites-resumo`, `/mapas`, `/ferramentas` e `/storyboard`.
- Temas: Atual, Claro e Noite.
- Larguras: 390 e 1280.

| Medida | Regra | Resultado |
|---|---|---|
| Distância entre blocos | 64 (mobile) / 96 (≥ 768) | 64–66 / 96–98. O 1–2 px a mais é o fio divisor entre blocos |
| Cabeçalho de seção → conteúdo | 32 (< 640) / 48 | 32 / 48 em todas as rotas |
| Fundo de todo botão primário | `#2D5CE6` | `rgb(45,92,230)` em 100 % dos primários, nos 3 temas |
| Botão de contorno | Só ações utilitárias | "Limpar filtros", "Fale conosco" (Em breve) e exemplos do storyboard |
| Chip GAP | Não quebra linha | Altura máxima de 20 px |
| Rolagem horizontal | Nenhuma | `scrollWidth` igual à largura da tela |
| Cérebro | Sem pausa, reset ou switch | Ausentes. Marcadores circulares de 36 px, callout tracejado visível e nota presente |
| Menu mobile | Animado e sem anel de foco | Abre e fecha em ≈ 330 ms com linhas em cascata. O foco vai para o painel, sem contorno visível; Tab vai para "Blog"; Esc fecha e devolve o foco |
| Seletor de categoria | Abre para baixo | A lista abre 8 px abaixo do campo. End + Enter filtra (`?tipo=video`) e Esc fecha |
| Tema | Persiste sem flash | Noite persiste ao recarregar (`#0F172A` antes da hidratação) |
| Erros de página | Nenhum | 0 |

Durante a auditoria, dois defeitos foram encontrados e corrigidos:

- **Botão primário transparente.** O Tailwind removia `btn-primary` porque o nome da classe era montado dinamicamente. O `<Button>` e o `<Chip>` passaram a usar nomes literais.
- **Erro de hidratação no `/storyboard`.** O script de tema estava no `<head>`, onde o runtime insere scripts de chunk antes da hidratação. Ele passou para o início do `<body>`.

## 3. Regra → componente → páginas

| Regra (decisão) | Componente único | Onde é usada |
|---|---|---|
| CTA azul (D-31) | `ui/button.tsx` | Header, menu, todas as seções com CTA, hub, artigo, bloco final |
| Ritmo 96/64 e 48/32 (D-34) | `ui/section.tsx` (`.page-block`, `.stack-section`) | Todas as páginas |
| Painel v2 (D-32) | `ui/panel.tsx`, `blog/resource-card.tsx` | Home (problema, riscos, ferramentas), /ferramentas, /mapas, hub, fim do artigo |
| Callout v2 (D-32) | `ui/callout.tsx`, `.ed-callout` | "Como ler este mapa" (/mapas), callout editorial |
| Cor da marca nos destaques (D-35) | `ui/eyebrow.tsx`, `ui/highlight.tsx`, `strong`/`blockquote` do artigo | Todas as seções, artigo |
| Chips (D-10, D-35) | `ui/chip.tsx` | Riscos, ferramentas, série, menu, cérebro |
| Temas (D-33) | `theme-toggle.tsx` + tokens em `globals.css` | Rodapé e storyboard; a cena do cérebro segue o fundo do tema |
| Interface do cérebro v2, sem controles (D-32, D-36) | `brain/brain-stage.tsx` | Home e /mapas |

O storyboard vivo, em `/storyboard`, mostra cada componente com seus estados e as regras de uso.
