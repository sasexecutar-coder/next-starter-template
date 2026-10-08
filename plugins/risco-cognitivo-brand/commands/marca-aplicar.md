---
description: "Aplicar a marca a um artefato existente"
argument-hint: "<arquivo> [map.json]"
---

**CV-MARCA-002** · `/marca-aplicar` — aplicar a camada de marca a um artefato existente e rodar o checklist bloqueante. Sinônimo: “Aplica a marca”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Aplicar a camada de marca a um artefato existente e rodar o checklist bloqueante.
**INPUT** — caminho do artefato (HTML/CSS/SVG, DOCX, PPTX); mapa de cores/nomes opcional. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-brand-layer` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand-layer/SKILL.md`.
2. HTML: `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-brand-layer/scripts/apply_brand.py <arquivo> -o <saida> [--map map.json] --report`; cores `unmapped` viram pergunta mínima ao usuário (qual token?).
3. Outros formatos: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand-layer/references/formats.md`.
4. Passe a saída ao auditor-marca.

**OUTPUT CONTRACT** — artefato com marca + relatório de cores/fontes/nomes + checklist 6/6.
**VALIDATION (gate)** — checklist 6/6 e audit_html sem bloqueantes.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
