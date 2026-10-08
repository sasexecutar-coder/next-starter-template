---
description: "Auditar tokens, usos, formatos, diagramação, @page e vetores"
argument-hint: "<arquivo|pasta> [--print]"
---

**CV-MARCA-003** · `/marca-auditar` — auditar a marca em arquivos e emitir review com bloqueantes e avisos. Sinônimo: “Confere a marca”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Auditar a marca em arquivos e emitir review com bloqueantes e avisos.
**INPUT** — arquivo ou pasta (HTML, CSS, SVG, MD); `--print` para peças imprimíveis. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-audit` · auditor-marca + revisor-acessibilidade.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-audit/SKILL.md` (7 dimensões).
2. Delegue ao subagente auditor-marca em contexto limpo; para HTML de leitura, também ao revisor-acessibilidade.
3. Para pasta grande ou auditoria completa, prefira o workflow `marca-auditoria` (`${CLAUDE_PLUGIN_ROOT}/workflows/marca-auditoria.js`, args `{"paths": [...], "print": false, "pluginRoot": "${CLAUDE_PLUGIN_ROOT}"}`) — só se o usuário pedir orquestração multiagente.

**OUTPUT CONTRACT** — review.md (✅/⚠️/❌, bloqueantes com arquivo:linha, evidência).
**VALIDATION (gate)** — 0 bloqueantes para VERIFIED.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
