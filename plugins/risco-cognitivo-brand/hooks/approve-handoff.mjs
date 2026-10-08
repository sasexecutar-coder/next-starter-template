#!/usr/bin/env node
// PreToolUse: auto-aprova Write/Edit em arquivos de estado .handoff/<nome>.md do projeto (padrão agent-handoff).
// Segurança: resolve symlinks (realpath) do diretório .handoff e do arquivo; recusa symlink, travessia e qualquer
// caminho cujo destino real não esteja em realpath(cwd)/.handoff/. Fora disso: saída vazia → fluxo normal de permissão.
import fs from "node:fs";
import path from "node:path";
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  try {
    const p = JSON.parse(input);
    const fp = p?.tool_input?.file_path;
    if (typeof fp !== "string" || fp.includes("..")) return;
    const cwd = fs.realpathSync(p?.cwd || process.cwd());
    const handoff = path.join(cwd, ".handoff");
    const dirStat = fs.lstatSync(handoff, { throwIfNoEntry: false });
    if (!dirStat || !dirStat.isDirectory() || dirStat.isSymbolicLink()) return;
    const abs = path.resolve(cwd, fp);
    if (path.dirname(abs) !== handoff && fs.realpathSync(path.dirname(abs)) !== handoff) return;
    const name = path.basename(abs);
    if (!/^[\w.-]+\.md$/.test(name)) return;
    const target = path.join(handoff, name);
    const st = fs.lstatSync(target, { throwIfNoEntry: false });
    if (st && (st.isSymbolicLink() || !st.isFile())) return;
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow", permissionDecisionReason: "risco-cognitivo-brand: arquivo de estado .handoff" } }));
  } catch { /* qualquer erro: segue o fluxo normal */ }
});
