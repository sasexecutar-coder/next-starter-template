#!/usr/bin/env node
// PostToolUse: depois de Write/Edit em .html/.htm/.css/.svg, roda o audit rápido da marca e devolve os bloqueantes
// como contexto para o Claude corrigir. Nunca bloqueia (só avisa). Sem python3 ou fora desses tipos: silencioso.
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const audit = path.join(here, "..", "skills", "rc-audit", "scripts", "audit_html.py");
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  try {
    const p = JSON.parse(input);
    const fp = p?.tool_input?.file_path;
    if (typeof fp !== "string" || !/\.(html?|css|svg)$/i.test(fp)) return;
    if (/(^|\/)(node_modules|\.next|dist|build|\.open-next)\//.test(fp)) return;
    const abs = path.resolve(p?.cwd || process.cwd(), fp);
    const r = spawnSync("python3", ["-I", audit, abs, "--json"], { encoding: "utf8", timeout: 20000 });
    if (r.error || !r.stdout) return;
    const rep = JSON.parse(r.stdout);
    const issues = Object.values(rep.files).flat();
    const blocking = issues.filter((i) => i.sev === "B");
    if (!blocking.length) return;
    const lines = blocking.slice(0, 8).map((i) => `- [${i.code}] ${i.msg}`).join("\n");
    const more = blocking.length > 8 ? `\n- … +${blocking.length - 8}` : "";
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext:
      `Marca Risco Cognitivo — ${path.basename(fp)} tem ${blocking.length} bloqueante(s) do rc-audit (aviso, não bloqueio):\n${lines}${more}\nCorrija usando var(--token) de tokens.json e fontes DM Sans/Inter/DM Mono, ou explique a exceção.` } }));
  } catch { /* silencioso */ }
});
