# Editorial — artigo, blocos e leitura cognitiva

Fontes: `kit/03-editorial/leitura/leitura-cognitiva.md`, `kit/03-editorial/contratos/{mdx-contract,blocks-contract}.md`,
`kit/02-design-system/layout/editorial-layout-system.md`, `kit/04-handoff/editorial/handoff-tokens-blog-ebooks.md` (§11),
D-16, D-17, D-35. Implementação: `src/lib/remark-editorial-blocks.ts`, `markdown-styles.module.css`.

## Medida e alinhamento
Coluna única, 68ch (faixa 60–72, teto 80); mobile 45–55 caracteres; texto à esquerda, **nunca justificado**; H1 e lead
centrados só na superfície artigo (`data-surface="article"`). Reflow a 320px, zoom 200/400%.

## Ritmo (em lh = `--ed-fs-body × --ed-lh-body`)
| Token | Mobile | ≥640 | ≥1024 |
|---|---|---|---|
| título → corpo | 2.5 lh | 3.5 lh | 4.8 lh |
| antes de heading | 2 lh | 2.4 lh | 2.6 lh |
Depois de H2 0.75 lh · H3 0.5 lh · parágrafo 0.75 lh · callout 1 lh antes / 1.5 lh depois. O título fica mais perto do que
introduz do que do que veio antes.

## Orçamento (mdx-contract, PROJECT_RULE)
| Elemento | Alvo | Aviso | Falha |
|---|---|---|---|
| Frase | 8–20 palavras | 21–25 | > 30 |
| Parágrafo | 20–60 palavras | 61–80 | > 90 |
| Frases por parágrafo | 1–3 | 4 | > 4 |
| Palavras por H2 | 80–300 | 301–400 | > 400 sem H3 |
Um H1 (do frontmatter), sem pular níveis; H2 3–8 palavras; > 300 palavras exige `:::summary` ou KeyPoints (3–5 itens);
listas 3–7 itens (máx. 9, ≤ 20 palavras/item); por H2: 1 bloco pesado + 1 leve, nunca pesado ao lado de pesado.
Negrito ≤ 2 por parágrafo, ≤ 4 palavras; sem itálico/CAIXA ALTA/sublinhado como ênfase.

## Blocos (diretivas Markdown, D-17)
```md
:::callout{title="Como ler este mapa"}
O mapa mostra relações. Não é diagnóstico.
:::
:::summary
- Ponto 1 …
:::
:::definition{term="Função executiva"}
Capacidade que sustenta a execução…
:::
:::keypoints
- …
:::
> Citação externa com fonte (vira régua de marca).
```
Render: `.ed-callout` = callout tracejado + colchetes; `.ed-summary`/`.ed-keypoints` = fundo sutil raio 8;
`.ed-definition` = fio azul 3px à esquerda; `strong` azul 700; `blockquote` com régua da marca.
Lacunas (GAP): variantes `risk/attention/solution/note` do callout, `<Figure>`, `<DataTable>`, linter de reading-flow.

## Tabelas
Sem caixa e sem bordas verticais; fio no topo, sob o cabeçalho e entre linhas; caption obrigatório; ≤ 6 colunas, ≤ 15 linhas;
rolagem horizontal só no bloco.

## Diretrizes de texto (PD-CLB §13)
Didático (termo definido na 1ª menção) · Prático (cada bloco fecha com ação ou pergunta) · Evidência (fonte por claim) ·
**Zero coach** (tom de repórter, sem frase motivacional nem promessa) · Jornalístico (lide com gancho + dado).
GEO/SEO: perguntas com resposta direta logo abaixo, dados em destaque, hierarquia de títulos, fontes citadas.
