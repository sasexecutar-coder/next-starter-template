---
description: "Montar o pacote de assets de um ciclo editorial"
argument-hint: "<tema do ciclo> [cenário]"
---

**CV-MARCA-012** · `/marca-campanha` — montar o pacote de assets de um ciclo (plan → execute → verify por asset). Sinônimo: “Monta o pacote do ciclo”. Índice: `${CLAUDE_PLUGIN_ROOT}/skills/rc-brand/references/commands.md`.

**OBJECTIVE** — Montar o pacote de assets de um ciclo (plan → execute → verify por asset).
**INPUT** — tema/artigo mãe aprovado e cenário ativo (PD completo ou DOC-004 reduzido). Argumentos: `$ARGUMENTS`.
**CONSTRAINTS** — tokens só de `tokens.json`; specs só de `rc-formats`; `A_DEFINIR` continua A DEFINIR; nenhum número, cor ou fonte inventados; WIP = 1; quem produz não aprova.
**SKILL / AGENTE** — `rc-formats + skills de asset` · orquestrador → produtor → auditor.

**EXECUTION**
1. Leia `${CLAUDE_PLUGIN_ROOT}/skills/rc-formats/references/editorial-cycle.md`; confirme o cenário ativo com o usuário (não multiplique quantidades).
2. Escreva o plano: lista de assets com spec_id, skill e nome de arquivo.
3. Com aprovação do usuário para orquestração multiagente, rode o workflow `${CLAUDE_PLUGIN_ROOT}/workflows/marca-pacote-campanha.js` (args `{"pluginRoot": "${CLAUDE_PLUGIN_ROOT}", "tema": …, "fonte": …, "cenario": …, "campanha": …}`); sem aprovação, execute asset a asset com WIP = 1 (produtor-assets → auditor-marca).
4. Consolide: cada asset VERIFIED, REWORK ou com GAP explícito.

**OUTPUT CONTRACT** — pasta do ciclo + índice + review por asset.
**VALIDATION (gate)** — todos os assets VERIFIED ou com GAP registrado.
**STOP** — falta entrada obrigatória → `BLOCKED` (liste o que falta); claim sem fonte → `EVIDENCE REQUIRED`; decisão do usuário → `USER ACTION REQUIRED`. Responda em pt-BR e feche com `Entrada → Saída → Gate`.
