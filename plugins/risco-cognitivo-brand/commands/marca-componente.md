---
description: "Gerar componente de UI com os primitivos"
argument-hint: "<componente ou tela> [html|react]"
---

**CV-MARCA-010** · `/marca-componente` — gerar componente de UI em HTML ou React com os primitivos. Sinônimo: “Cria o componente”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Gerar componente de UI em HTML ou React com os primitivos.
**INPUT** — descrição da tela/componente e stack de destino. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-components` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-components/SKILL.md` e `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/components.md`.
2. Monte só com primitivos e tokens; nada de hex, px fora da escala ou fonte extra.
3. Passe ao auditor-marca (e revisor-acessibilidade em telas completas).

**OUTPUT CONTRACT** — arquivo HTML/TSX.
**VALIDATION (gate)** — audit_html sem bloqueantes.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
