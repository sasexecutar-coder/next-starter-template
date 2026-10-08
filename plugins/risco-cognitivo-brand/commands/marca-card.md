---
description: "Converter conteúdo em card de prompt A4"
argument-hint: "<prompt|arquivo|print>"
---

**CV-MARCA-006** · `/marca-card` — converter conteúdo em card de prompt A4 (tutorial · mockup · prompt). Sinônimo: “Transforma em card”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Converter conteúdo em card de prompt A4 (tutorial · mockup · prompt).
**INPUT** — prompt, workflow ou print de instrução. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-cards` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-cards/SKILL.md`; monte o cards.json (prompt literal, evidência A/E).
2. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-cards/scripts/render_cards.py cards.json -o dist/cards`.
3. Passe ao auditor-marca com `--print`.

**OUTPUT CONTRACT** — dist/cards/*.html + manifest.json.
**VALIDATION (gate)** — render_cards sem erro e audit_html --print sem bloqueantes.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
