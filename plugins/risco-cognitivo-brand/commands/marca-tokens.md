---
description: "Exportar tokens da marca para outro projeto"
argument-hint: "[css|json|tailwind|python|todos] [destino]"
---

**CV-MARCA-004** · `/marca-tokens` — exportar os tokens (CSS, JSON DTCG, Tailwind, Python) para outro projeto. Sinônimo: “Me dá os tokens”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Exportar os tokens (CSS, JSON DTCG, Tailwind, Python) para outro projeto.
**INPUT** — formato desejado (padrão: todos) e pasta de destino. Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-brand` · —.

**EXECUTION**
1. Copie de `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/assets/tokens/` o(s) arquivo(s) pedido(s) (+ `../components/components.css` para HTML puro).
2. Mostre o trecho de instalação do formato (link de fontes, `presets: [require('./tailwind.preset.cjs')]`, `from tokens import TOKENS, rgb`).
3. Se o projeto for o próprio site, regenere antes: `python3 ${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/scripts/build_tokens.py --site src/app/globals.css --compiled .next/static/chunks`.

**OUTPUT CONTRACT** — arquivos copiados + snippet de uso.
**VALIDATION (gate)** — validate_tokens OK.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
