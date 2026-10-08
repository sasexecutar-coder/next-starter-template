#!/usr/bin/env node
// PreToolUse: auto-aprova Write/Edit em arquivos de estado .handoff/*.md do projeto (padrão agent-handoff).
// Qualquer outro caminho cai no fluxo normal de permissão (saída vazia, exit 0). Recusa travessia ("..") e
// caminhos fora do diretório do projeto.
import path from "node:path";
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  try {
    const p = JSON.parse(input);
    const fp = p?.tool_input?.file_path;
    const cwd = p?.cwd || process.cwd();
    if (typeof fp !== "string" || fp.includes("..")) return;
    const abs = path.resolve(cwd, fp);
    const rel = path.relative(cwd, abs).split(path.sep).join("/");
    if (/^\.handoff\/[\w.-]+\.md$/.test(rel)) {
      process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow", permissionDecisionReason: "risco-cognitivo-brand: arquivo de estado .handoff" } }));
    }
  } catch { /* entrada inválida: segue o fluxo normal */ }
});
