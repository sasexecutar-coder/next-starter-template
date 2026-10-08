---
description: "Gerar carrossel 4:5, post ou story"
argument-hint: "<tema ou texto-fonte> [formato]"
---

**CV-MARCA-008** · `/marca-carrossel` — gerar carrossel 4:5 (HTML + PNG 1080×1350) ou post/story. Sinônimo: “Faz o carrossel”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Gerar carrossel 4:5 (HTML + PNG 1080×1350) ou post/story.
**INPUT** — tema ou texto-fonte; formato carousel-4x5 (padrão) | post-4x5 | story-9x16 (exige tamanho). Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-social` · produtor-assets.

**EXECUTION**
1. Confirme a spec: `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-formats/scripts/spec.py instagram carousel`.
2. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-social/SKILL.md`; escreva deck.json (1 ideia por slide).
3. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-social/scripts/render_carousel.py deck.json -o dist/ --png --pdf`.
4. Passe ao auditor-marca.

**OUTPUT CONTRACT** — HTML + PNGs com dimensão conferida + PDF.
**VALIDATION (gate)** — todas as PNGs no tamanho da spec, sem overflow.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
