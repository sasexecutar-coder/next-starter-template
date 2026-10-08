---
description: "Gerar ebook, guia ou onboarding standalone"
argument-hint: "<fonte do conteúdo> [rota]"
---

**CV-MARCA-007** · `/marca-ebook` — gerar ebook, one-page ou onboarding standalone com a marca. Sinônimo: “Faz o ebook”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Gerar ebook, one-page ou onboarding standalone com a marca.
**INPUT** — conteúdo-fonte (artigo, roteiro, notas); rota entrega | onboarding | livre. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-ebook` · produtor-assets.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-ebook/SKILL.md`; escreva o JSON a partir da fonte (sem dado inventado).
2. `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-ebook/scripts/render_ebook.py doc.json -o dist/ebook.html`.
3. Passe ao auditor-marca e ao revisor-acessibilidade (PDF A4 incluso).

**OUTPUT CONTRACT** — dist/ebook.html + PDF A4.
**VALIDATION (gate)** — audit_html sem bloqueantes; render_check sem erro nos 3 temas.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
