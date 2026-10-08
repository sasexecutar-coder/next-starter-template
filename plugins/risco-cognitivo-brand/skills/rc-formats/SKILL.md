---
name: rc-formats
description: >-
  Especificações técnicas de canal e de peça para assets do Risco Cognitivo (45 specs: YouTube, Shorts, Reels, TikTok,
  carrossel 4:5 Instagram/LinkedIn, stories, posts X/Threads/LinkedIn, blog, newsletter, ebook, store, infográficos,
  capas, cards RC) e o ciclo editorial multiplataforma (estados 0–100%, 22 steps, pacote de ativos por ciclo, exceções,
  nomenclatura). Use quando perguntarem tamanho, proporção, duração, limite de caracteres ou formato de qualquer peça,
  ao planejar o pacote de um ciclo, ao nomear/indexar assets ou ao preparar um handoff para a produção visual.
---

# Formatos e ciclo editorial (CV-MARCA-005 · /marca-formato)

Objetivo: responder "qual é a spec desta peça?" sem inventar nada, e organizar a produção do ciclo.

## Consultar uma spec
```bash
python3 scripts/spec.py reels              # termos: canal, placement, peça, formato ou spec_id
python3 scripts/spec.py instagram carousel
python3 scripts/spec.py --list
```
A saída separa **verificado** (com fonte e data) de **A_DEFINIR**. Regras:
- Nunca converta `A_DEFINIR` em número, nem use "valor típico" de memória. Responda o verificado e liste o que falta.
- Safe areas estão A_DEFINIR em 45/45 specs: não desenhe safe zone de anúncio como se fosse regra.
- Specs Meta (Reels, Stories, carrossel via API) estão parcialmente não verificadas: trate só proporção como certa.
- Exemplo nunca vira limite (RISK-DTS-003). Quantidades não se multiplicam automaticamente.

## Ciclo editorial
`references/editorial-cycle.md`: estados 0/33/66/99/100, Entry Gate de 4 dias, 22 steps com responsável, pacote de ativos
por ciclo (cenário PD × DOC-004 — escolha um cenário ativo antes de produzir), matriz de distribuição, exceções e
nomenclatura `{campaign_id}__{asset_id}__{spec_id}__v{version}.{ext}`.

## Como responder (formato)
```
<peça> · <spec_id>
Verificado: proporção, px, duração/páginas, limites, formato, contraste mínimo (com fonte)
A DEFINIR: lista
Marca: qual skill produz (rc-social / rc-ebook / rc-editorial / rc-infographic) e regras visuais de deliverable-rules.md
```
Para a parte visual de cada peça, combine com `../rc-brand/references/deliverable-rules.md`.
