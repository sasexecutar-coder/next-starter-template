---
name: rc-social
description: >-
  Cria carrosséis 4:5 (Instagram e LinkedIn documento), posts estáticos e stories com a marca Risco Cognitivo:
  JSON de slides → HTML → PNG por slide em 1080×1350 com dimensão conferida, e PDF 1 slide/página para LinkedIn. Use
  sempre que pedirem carrossel, post para Instagram/LinkedIn, slides de rede social, story, "transforma esse artigo em
  carrossel" ou peças estáticas para o ciclo editorial.
---

# Carrossel, post e story (CV-MARCA-008 · /marca-carrossel)

## Fluxo
1. **Spec** — confirme o formato com `../rc-formats/scripts/spec.py <canal> <peça>`. Verificado: carrossel 4:5
   1080×1350 (IG nativo) e LinkedIn documento 4:5 em PDF. Story: só 9:16 é verificado; largura/altura A DEFINIR →
   peça o tamanho ao usuário (o script bloqueia sem `deck.size`).
2. **Roteiro** — 1 ideia por slide (técnica 2026 da matriz de distribuição: autenticidade, nada de "genérico de feed").
   Estrutura padrão de 5–7 slides: `cover` (gancho que afirma) → `idea`/`list` (2–4) → `stat` (só com fonte) → `cta`.
   Limites que o validador aplica: título ≤ 60, texto ≤ 160, item ≤ 60 caracteres; carrossel começa em `cover`.
3. **JSON** — modelo em `examples/carrossel-vies.json` (`deck.title, slug, format, kicker, handle, slides[]`; slide
   `kind, title, text?, items?, stat+source?, action?, dark?`).
4. **Render**
   ```bash
   python3 scripts/render_carousel.py deck.json -o dist/ --png --pdf
   ```
   Gera `dist/<slug>.html`, `dist/<slug>/<slug>-NN.png` e `dist/<slug>.pdf`. O export falha se algum slide não tiver
   exatamente o tamanho da spec ou tiver texto vazando.
5. **Verificar** — `python3 ../rc-audit/scripts/audit_html.py dist/<slug>.html` e contraste do slide escuro
   (`text-on-dark` sobre `brand-dark-indigo` = 18,9:1).

## Regras visuais
- Fundo canvas; no máximo 1 slide escuro (índigo) por carrossel, para a virada de ideia.
- Azul de ação só na régua, numeração e kicker; vermelho apenas para marcar risco real (`.mark-risk`).
- Headline DM Sans 800 (104–120px), texto Inter 44px, metadados DM Mono 28px; margem de 96px (escala).
- Rodapé fixo: wordmark "Risco Cognitivo" + handle. Sem emoji, sem foto de banco, sem gradiente.
- Nome do arquivo final para publicação: `{campaign_id}__{asset_id}__{spec_id}__v{version}.png` (`../rc-formats`).
