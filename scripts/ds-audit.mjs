#!/usr/bin/env node
// Auditoria transversal do design system (D-34/D-37): falha quando um componente
// foge das regras do kit em vez de usar os primitivos de src/app/_components/ui/.
// Exceção pontual: comentário "ds-allow" na mesma linha (ou na anterior), com o motivo.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const UI = "src/app/_components/ui/";

// Escala do kit (D-25/D-34): 4, 8, 12, 16, 24, 32, 48, 64, 96 → passos Tailwind
const SCALE = new Set(["0", "px", "0.5", "1", "2", "3", "4", "6", "8", "12", "16", "24", "auto"]);
const SPACING = /(?<![\w-])-?(space-x|space-y|gap-x|gap-y|gap|mx|my|mt|mb|ml|mr|ms|me|m|px|py|pt|pb|pl|pr|ps|pe|p)-([\w.[\]%()+-]+)/g;
const RADIUS = /(?<![\w-])rounded(?:-[trbl]{1,2})?-\[([^\]]+)\]/g;

const RULES = [
  {
    id: "hex",
    why: "cor fixa: use um token (globals.css / tailwind.config.ts)",
    test: (line) => /#[0-9a-fA-F]{3,8}\b/.test(line) && !/^\s*(\/\/|\*|\{\/\*)/.test(line),
  },
  {
    id: "white",
    why: "bg-white/text-white fora dos primitivos: use raised / on-dark",
    test: (line, file) => !file.startsWith(UI) && /(?<![\w-])(bg|text|border)-white\b/.test(line),
  },
  {
    id: "btn",
    why: "classe btn-* fora do <Button>: use o primitivo",
    test: (line, file) => !file.startsWith(UI) && /className=[^>]*\bbtn(-primary|-secondary|-md|-icon)?\b/.test(line),
  },
  {
    id: "eyebrow",
    why: "eyebrow fora do <Eyebrow>",
    test: (line, file) => !file.startsWith(UI) && /className=[^>]*\beyebrow\b/.test(line),
  },
  {
    id: "card",
    why: "card-feature/card-micro avulso: use <Panel>",
    test: (line, file) => !file.startsWith(UI) && /\bcard-(feature|micro)\b/.test(line),
  },
  {
    id: "select",
    why: "<select> nativo: use CategorySelect (abre para baixo)",
    test: (line) => /<select\b/.test(line),
  },
  {
    id: "page-block",
    why: "ritmo de bloco fora do <Section>",
    test: (line, file) => !file.startsWith(UI) && /\bpage-block\b/.test(line),
  },
];

function* walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith(".tsx")) yield p;
  }
}

const out = [];
for (const abs of walk(SRC)) {
  const file = relative(ROOT, abs);
  const lines = readFileSync(abs, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/ds-allow/.test(line) || /ds-allow/.test(lines[i - 1] ?? "")) return;
    if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line)) return; // comentários
    for (const r of RULES) if (r.test(line, file)) out.push({ file, line: i + 1, rule: r.id, why: r.why, text: line.trim() });
    const cls = /^\s*(import\b|\/\/|\*|\{\/\*)/.test(line) ? "" : line;
    for (const m of cls.matchAll(SPACING)) {
      const v = m[2];
      if (!SCALE.has(v) && !/^\[var\(--[\w-]+\)\]$/.test(v)) out.push({ file, line: i + 1, rule: "spacing", why: `espaçamento fora da escala: ${m[0]}`, text: line.trim() });
    }
    for (const m of line.matchAll(RADIUS)) out.push({ file, line: i + 1, rule: "radius", why: `raio arbitrário: ${m[0]} (use sm/md/lg/xl)`, text: line.trim() });
  });
}

if (process.argv.includes("--json")) console.log(JSON.stringify(out, null, 2));
else {
  for (const o of out) console.log(`${o.file}:${o.line}  [${o.rule}] ${o.why}`);
  const by = out.reduce((a, o) => ((a[o.rule] = (a[o.rule] ?? 0) + 1), a), {});
  console.log(`\n${out.length} violação(ões)`, JSON.stringify(by));
}
process.exit(out.length ? 1 : 0);
