---
description: "Formatar artigo/MDX/newsletter com as regras de leitura"
argument-hint: "<arquivo.md>"
---

**CV-MARCA-011** · `/marca-editorial` — formatar artigo/MDX/newsletter com blocos e regras de leitura. Sinônimo: “Formata o artigo”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Formatar artigo/MDX/newsletter com blocos e regras de leitura.
**INPUT** — texto ou arquivo Markdown/MDX. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-editorial` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-editorial/SKILL.md` (voz e blocos).
2. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-editorial/scripts/lint_reading.py <arquivo> [--mother]` e corrija as falhas.
3. Números sem fonte ficam marcados EVIDENCE REQUIRED, nunca reescritos como fato.

**OUTPUT CONTRACT** — Markdown/MDX revisado + relatório do linter.
**VALIDATION (gate)** — lint_reading sem falhas.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
