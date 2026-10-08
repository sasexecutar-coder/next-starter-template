---
description: "Gerar prompts de infográfico/ilustração por perfil"
argument-hint: "<campanha ou mensagem>"
---

**CV-MARCA-009** · `/marca-infografico` — gerar prompts de infográfico/vetor por perfil (isometric, editorial, flat). Sinônimo: “Prompt de infográfico”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Gerar prompts de infográfico/vetor por perfil (isometric, editorial, flat).
**INPUT** — mensagens/cenas da campanha ou um campaign.json. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-infographic` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-infographic/SKILL.md`; monte o campaign.json (mensagem sem número).
2. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-infographic/scripts/render_prompts.py campaign.json -o dist/<campanha>`.
3. Status fica PREPARED; geração e inspeção da imagem real são etapas seguintes.

**OUTPUT CONTRACT** — prompts/*.txt + manifest.json (sha256).
**VALIDATION (gate)** — render_prompts sem erro; nenhuma mensagem com número.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
