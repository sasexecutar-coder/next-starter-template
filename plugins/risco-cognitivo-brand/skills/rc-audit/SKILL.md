---
name: rc-audit
description: >-
  Auditoria de marca do Risco Cognitivo: confere tokens (paridade, HEX, contraste nos 3 temas), uso das cores e fontes,
  formatos, diagramação, @page/impressão, vetores SVG e acessibilidade WCAG 2.1 AA, e emite um review com bloqueantes e
  avisos. Use antes de entregar qualquer asset da marca, quando alguém perguntar "está na marca?", "confere o contraste",
  "audita esse HTML/PDF/SVG", "valida os tokens", ou ao fechar o /verify de um ciclo — mesmo que não diga "auditoria".
---

# Auditoria de marca (CV-MARCA-003 · /marca-auditar)

Objetivo: dizer, com evidência, se um artefato segue a marca — e onde não segue. A auditoria só lê e mede; quem corrige
é o produtor (separação de papéis do agent-handoff: quem produz não se aprova).

## Fluxo (7 dimensões, nesta ordem)

1. **Tokens** — `python3 ../rc-brand/scripts/validate_tokens.py [--site <repo>/src/app/globals.css]`
   (HEX válidos, paridade com a fonte de verdade, 48 pares de contraste nos 3 temas).
2. **Usos e formatos** — `python3 scripts/audit_html.py <arquivos|pasta> [--print]`: cor fora de token, fonte fora da
   marca, espaçamento/raio fora da escala, nomes de outra marca, placeholders.
3. **Diagramação** — compare com `../rc-brand/references/deliverable-rules.md` e `components.md`: 1 CTA azul por bloco,
   ritmo 96/64, hierarquia eyebrow → título → lead, cards sem marcas de canto, chip GAP sem quebra.
4. **Impressão** — imprimíveis com `--print`: `@page` com `size`, `break-inside`, fontes declaradas (`../rc-brand/references/print.md`).
5. **Vetores** — `<svg>` com `viewBox`, `<title>` ou `aria-hidden`, orçamento de complexidade (`../rc-brand/references/vector.md`).
6. **Acessibilidade** — contraste medido (`../rc-brand/scripts/contrast.py fg bg`), foco visível, alvos ≥ 44, `lang`, `alt`,
   ordem de leitura, nada só por cor. Para revisão completa, siga o fluxo `design:accessibility-review` se disponível.
7. **Render real (quando houver browser)** — `node scripts/render_check.mjs <html> [--themes] [--pdf out.pdf] [--png out.png --size 1080x1350 --selector .slide]`:
   abre no Chromium (Playwright), confere ausência de erros, rolagem horizontal, dimensões de PNG e gera PDF A4.

## Saída (sempre neste formato)

```markdown
# Review de marca — <artefato>
Outcome: ✅ aprovado | ⚠️ aprovado com avisos | ❌ bloqueado
| Dimensão | Resultado | Evidência |
|---|---|---|
| Tokens | ✅ | validate_tokens: OK, menor contraste 3.22:1 (controle) |
…
## Bloqueantes (arquivo:linha → correção)
## Avisos (vão para o backlog)
## Fora do escopo / A DEFINIR
```

Regras: cite o comando e o número medido em cada linha (sem "parece ok"); bloqueante = qualquer [B] do audit_html,
contraste abaixo do mínimo, token divergente, `@page` ausente em imprimível. Avisos não bloqueiam, mas são listados.
Não corrija o artefato aqui. Detalhes do método e correspondência com os plugins Design/Engineering: `references/audit-flow.md`.
