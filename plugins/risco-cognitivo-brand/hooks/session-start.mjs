#!/usr/bin/env node
// SessionStart: injeta um resumo curto da marca (cores-chave, fontes, rotina mínima de comandos) lido das fontes.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "skills", "rc-brand");
try {
  const t = JSON.parse(readFileSync(path.join(root, "assets", "tokens", "tokens.json"), "utf8")).theme.atual;
  const v = (k) => t[k]?.$value ?? "?";
  const cmds = readFileSync(path.join(root, "references", "commands.md"), "utf8").split("\n").filter((l) => /^CV-MARCA-\d{3} — /.test(l));
  const ctx = [
    "Plugin risco-cognitivo-brand ativo (marca Risco Cognitivo).",
    `Cores: ação ${v("brand-action-blue")} · canvas ${v("brand-canvas")} · texto ${v("text-primary")} · índigo ${v("brand-dark-indigo")} · risco ${v("semantic-risk")} · solução ${v("semantic-solution")}. Fontes: DM Sans (títulos), Inter (texto), DM Mono (IDs).`,
    "Regras: valores só de skills/rc-brand/assets/tokens/tokens.json; A_DEFINIR continua A DEFINIR; quem produz não aprova (auditor-marca verifica).",
    `Comandos (${cmds.length}): ${cmds.map((l) => l.split(" — ")[1]).join(" ")} — rotina mínima: /marca-ativar /marca-aplicar /marca-auditar.`,
  ].join("\n");
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: ctx } }));
} catch { /* sem fontes: silencioso */ }
