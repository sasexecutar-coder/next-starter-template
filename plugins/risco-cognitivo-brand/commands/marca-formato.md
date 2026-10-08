---
description: "Spec técnica de um canal/peça e o que está A DEFINIR"
argument-hint: "<canal> [peça]"
---

**CV-MARCA-005** · `/marca-formato` — mostrar a spec técnica de um canal/peça e o que está A DEFINIR. Sinônimo: “Qual o formato do Reels?”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Mostrar a spec técnica de um canal/peça e o que está A DEFINIR.
**INPUT** — canal e/ou peça (ex.: reels, instagram carousel, newsletter). Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-formats` · —.

**EXECUTION**
1. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-formats/scripts/spec.py $ARGUMENTS`.
2. Responda no formato da skill: verificado (com fonte) × A DEFINIR × qual skill produz.

**OUTPUT CONTRACT** — spec verificada + lista A DEFINIR.
**VALIDATION (gate)** — nenhum A DEFINIR convertido em número.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
