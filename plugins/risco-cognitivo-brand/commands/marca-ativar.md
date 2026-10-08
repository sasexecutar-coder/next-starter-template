---
description: "Ativar a marca: conferir fontes e entregar o ONBOARDING.html"
argument-hint: "[pasta do projeto]"
---

**CV-MARCA-001** · `/marca-ativar` — verificar as fontes da marca e entregar o ONBOARDING.html de ativação. Sinônimo: “Ativa minha marca”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Verificar as fontes da marca e entregar o ONBOARDING.html de ativação.
**INPUT** — pasta do projeto (opcional); nada mais é obrigatório. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-brand` · orquestrador-marca.

**EXECUTION**
1. Rode `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/scripts/validate_tokens.py` e registre o resultado (paridade, contraste, arquivos derivados).
2. Liste as fontes encontradas: tokens.json, components.css, 45 specs (`python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-formats/scripts/spec.py --list | wc -l`), 12 comandos.
3. Copie `${CLAUDE_PLUGIN_ROOT}/ONBOARDING.html` para a pasta do projeto (ou gere de novo: `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-ebook/scripts/onboarding_doc.py -o /tmp/onb.json && python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-ebook/scripts/render_ebook.py /tmp/onb.json -o ONBOARDING.html`).
4. Mostre a rotina mínima (001–003) e o próximo passo sugerido.

**OUTPUT CONTRACT** — relatório de fontes (✅/⚠️ por fonte) + caminho do ONBOARDING.html.
**VALIDATION (gate)** — validate_tokens OK e ONBOARDING.html presente; A DEFINIR listados.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
