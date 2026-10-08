# Impressão e PDF — @page, A4, ebook

Status: **parcialmente canônico**. Única especificação concreta: `kit/06-operacao/tutorial.md` (orientação) + handoff
editorial §3–§10. Pontos em conflito estão marcados e NÃO devem ser escolhidos em silêncio.

## Base obrigatória (todo imprimível)
```css
@page { size: A4; margin: 12mm; }           /* A4 retrato; margem 12mm (tutorial) */
@media print {
  html, body { background: #fff; color: #000; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .no-print { display: none !important; }
  .page-break { break-before: page; }
  h1, h2, h3 { break-after: avoid; }
  .callout, figure, blockquote, table, .panel { break-inside: avoid; }
  p { orphans: 3; widows: 3; }
}
```
Separar `data-surface="print"` (o documento) de `@media print` (comportamento físico). Página de tela: `.page { width:210mm;
min-height:297mm }`. Fontes: embutir (Paged.js, WeasyPrint, Prince ou Chrome headless).

## Ebook (escala proposta no handoff editorial §4, em pt)
Corpo 10,5 pt lh ≈ 1,45 · title 34 · label 16 · h1 18 · h2 14,5 · h3 12 · quote 10 · callout 10 · cabeçalho corrido 9 ·
folio 10,5 (700). Pesos 300/400/500/700. Margens laterais 8% da largura; abertura de capítulo com quebra e ~40% de vazio.
EPUB: só em/rem/%, sem cabeçalho corrido nem folio.

## Conflitos abertos (registrar, não decidir)
- **Justificação:** handoff §7 propõe justificar+hifenizar no PDF; leitura-cognitiva e mdx-contract proíbem → padrão do
  pacote: **à esquerda** (regra mais restritiva e acessível) até decisão.
- **Tamanho:** A5 (pergunta aberta do handoff) × A4 (tutorial) → padrão do pacote: **A4**, marcado `A DEFINIR`.
- **Callout de faixa índigo** do handoff foi substituído pelo callout tracejado (D-32).
- **Sangria, marcas de corte, CMYK, DPI:** não definidos (GAP). `#FF0000` e `#00BF63` ficam fora do gamut CMYK.

## Checklist de preflight (rc-audit verifica)
`@page` com `size` e `margin`; fontes declaradas com fallback; nada cortado em A4; `break-inside: avoid` em blocos;
contraste em preto sobre branco; links impressos legíveis; sem elementos fixos/sticky no print.
