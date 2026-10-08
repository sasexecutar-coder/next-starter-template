#!/usr/bin/env python3
"""Gera os tokens portáveis da marca Risco Cognitivo a partir da fonte de verdade (globals.css do site).

Uso:
  python3 build_tokens.py --site <repo>/src/app/globals.css [--compiled <repo>/.next/static/chunks]

Saídas (em ../assets/):
  tokens/tokens.css           variáveis CSS idênticas às do site (:root + temas claro/noite + breakpoints)
  tokens/tokens.json          formato DTCG ($value/$type), um grupo por tema, valores resolvidos
  tokens/tailwind.preset.cjs  preset Tailwind que aponta para as variáveis
  tokens/tokens.py            dicionário Python + rgb() (python-pptx / python-docx / reportlab)
  components/components.css   (com --compiled) primitivos sem framework (.btn, .panel, .callout…)

Sem dependências externas. Determinístico: mesma entrada, mesma saída.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # skills/rc-brand
OUT = ROOT / "assets" / "tokens"
THEME_SELECTORS = {"claro": ':root[data-theme="claro"]', "noite": ':root[data-theme="noite"]'}
COMPONENT_CLASSES = [
    "container-page", "page-block", "stack-section", "stack-items", "btn", "btn-md", "btn-primary", "btn-secondary",
    "btn-icon", "meta", "eyebrow", "eyebrow-bars", "chip", "chip-gap", "chip-soon", "chip-tag", "panel", "panel-subtle",
    "panel-compact", "panel-interactive", "callout", "bracket", "highlight", "brand-strong", "segmented", "fx-edge-01",
]


def blocks(css: str):
    """Devolve [(seletor, corpo, media)] para blocos-folha que declaram variáveis --*."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, stack, start = [], [], 0
    for j, c in enumerate(css):
        if c == "{":
            # seletor = texto desde o último ; { ou } (ignora "@tailwind base;" e afins)
            sel = re.split(r"[;{}]", css[start:j])[-1].strip()
            stack.append((sel, j + 1))
            start = j + 1
        elif c == "}":
            sel, body_start = stack.pop()
            body = css[body_start:j]
            if "{" not in body and re.search(r"--[\w-]+\s*:", body):
                media = next((s for s, _ in stack if s.startswith("@media")), None)
                out.append((sel, body, media))
            start = j + 1
    return out


def decls(body: str):
    return {k: v.strip() for k, v in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", body)}


def resolve(name, table, seen=None):
    seen = set(seen or ())
    v = table.get(name)
    if v is None or name in seen:
        return v
    seen.add(name)
    return re.sub(r"var\((--[\w-]+)\)", lambda m: resolve(m.group(1), table, seen) or m.group(0), v)


def kind(name, value):
    if re.fullmatch(r"#[0-9a-fA-F]{3,8}", value) or value.startswith("rgb"):
        return "color"
    if name.startswith(("--space", "--block", "--stack", "--gutter", "--container", "--header", "--subnav", "--radius")):
        return "dimension"
    if name.startswith("--shadow"):
        return "shadow"
    if name.startswith("--ease"):
        return "cubicBezier"
    if name.startswith("--dur"):
        return "duration"
    if name.startswith("--ed-fs") or name.startswith("--ed-lh"):
        return "typography"
    return "string"


def parse_site(css_text):
    base, themes, breakpoints = {}, {"claro": {}, "noite": {}}, {}
    for sel, body, media in blocks(css_text):
        d = decls(body)
        if media:
            breakpoints.setdefault(media.replace("@media", "").strip(), {}).update(d)
        elif sel == ":root":
            base.update(d)
        elif 'data-theme="claro"' in sel:
            themes["claro"].update(d)
        elif 'data-theme="noite"' in sel:
            themes["noite"].update(d)
    return base, themes, breakpoints


def resolved_theme(base, themes, theme):
    table = dict(base)
    if theme != "atual":
        table.update(themes[theme])
    return {k[2:]: resolve(k, table) for k in table}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", required=True, help="caminho do globals.css do site")
    ap.add_argument("--compiled", help="pasta com o CSS compilado do site (.next/static/chunks)")
    a = ap.parse_args()
    base, themes, breakpoints = parse_site(Path(a.site).read_text(encoding="utf-8"))
    if not base:
        sys.exit("nenhum :root encontrado em " + a.site)
    OUT.mkdir(parents=True, exist_ok=True)

    # tokens.css — espelho fiel das declarações do site
    lines = ["/* Risco Cognitivo — tokens. Gerado por scripts/build_tokens.py a partir de src/app/globals.css (D-01…D-36). Não editar à mão. */",
             ":root {"]
    lines += [f"  {k}: {v};" for k, v in base.items()]
    lines.append("}")
    for t, sel in THEME_SELECTORS.items():
        lines.append(f"{sel} {{")
        lines += [f"  {k}: {v};" for k, v in themes[t].items()]
        lines.append("}")
    for mq, d in breakpoints.items():
        lines.append(f"@media {mq} {{")
        lines.append("  :root {")
        lines += [f"    {k}: {v};" for k, v in d.items()]
        lines.append("  }")
        lines.append("}")
    (OUT / "tokens.css").write_text("\n".join(lines) + "\n", encoding="utf-8")

    # tokens.json — DTCG, valores resolvidos por tema
    dtcg = {"$description": "Risco Cognitivo — design tokens. Fonte: src/app/globals.css (D-01…D-36).",
            "theme": {}, "breakpoints": {}}
    for t in ("atual", "claro", "noite"):
        vals = resolved_theme(base, themes, t)
        dtcg["theme"][t] = {k: {"$value": v, "$type": kind("--" + k, v)} for k, v in vals.items()}
    for mq, d in breakpoints.items():
        dtcg["breakpoints"][mq] = {k[2:]: {"$value": v} for k, v in d.items()}
    (OUT / "tokens.json").write_text(json.dumps(dtcg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # tailwind.preset.cjs
    colors = {
        "canvas": "--surface-page", "subtle": "--surface-subtle", "raised": "--surface-raised", "line": "--border-subtle",
        "control": "--border-control", "strong": "--border-strong", "ink": "--text-primary", "muted": "--text-secondary",
        "action": "--brand-action-blue", "action-strong": "--brand-action-blue-strong", "action-text": "--action-text",
        "on-dark": "--text-on-dark", "indigo": "--brand-dark-indigo", "light-blue": "--brand-light-blue",
        "risk": "--semantic-risk", "solution": "--semantic-solution", "attention": "--attention-surface",
        "attention-ink": "--attention-ink",
    }
    preset = {"theme": {"extend": {
        "colors": {k: f"var({v})" for k, v in colors.items()},
        "fontFamily": {"display": ["var(--font-display)", "DM Sans", "system-ui", "sans-serif"],
                       "body": ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
                       "mono": ["var(--font-mono)", "DM Mono", "ui-monospace", "monospace"]},
        "borderRadius": {r: f"var(--radius-{r})" for r in ("xs", "sm", "md", "lg", "xl")},
        "maxWidth": {"measure": "68ch", "page": "var(--container)"},
    }}}
    (OUT / "tailwind.preset.cjs").write_text(
        "/* Risco Cognitivo — preset Tailwind (gerado). Requer tokens.css carregado antes. */\nmodule.exports = "
        + json.dumps(preset, indent=2) + ";\n", encoding="utf-8")

    # tokens.py
    py = {t: {k: v["$value"] for k, v in g.items()} for t, g in dtcg["theme"].items()}
    (OUT / "tokens.py").write_text(
        '"""Risco Cognitivo — tokens para Python (gerado por build_tokens.py).\n\n'
        'Uso:\n    from tokens import TOKENS, rgb\n    rgb(TOKENS["atual"]["brand-action-blue"])  # (45, 92, 230)\n'
        '    # python-pptx: RGBColor(*rgb(...)) · python-docx: RGBColor(*rgb(...))\n"""\n'
        f"TOKENS = {json.dumps(py, ensure_ascii=False, indent=2)}\n\n\n"
        "def rgb(hex_value: str):\n"
        "    h = hex_value.strip().lstrip('#')\n"
        "    if len(h) == 3:\n        h = ''.join(c * 2 for c in h)\n"
        "    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))\n", encoding="utf-8")

    # components.css a partir do CSS compilado (fora de @media, só regras dos primitivos)
    if a.compiled:
        compiled = "\n".join(p.read_text(encoding="utf-8") for p in sorted(Path(a.compiled).glob("*.css")))
        compiled = re.sub(r"/\*.*?\*/", "", compiled, flags=re.S)
        pat = re.compile(r"\.(" + "|".join(map(re.escape, COMPONENT_CLASSES)) + r")(?![\w-])")
        keep, depth, start, top = [], 0, 0, []
        # varre blocos de topo e @layer/@media aninhados, guardando regras-folha
        stack = []
        for j, c in enumerate(compiled):
            if c == "{":
                sel = re.split(r"[;{}]", compiled[start:j])[-1].strip()
                stack.append((sel, j + 1))
                start = j + 1
            elif c == "}":
                sel, bs = stack.pop()
                body = compiled[bs:j]
                start = j + 1
                if "{" in body or sel.startswith("@"):
                    continue
                parents = [s for s, _ in stack]
                sels = [s.strip() for s in sel.split(",")]
                if sels and all(pat.search(s) and "\\" not in s for s in sels):
                    body = re.sub(r"#0000(?![0-9a-fA-F])", "transparent", body.strip())  # minificador → legível e sem hex solto
                    rule = f"{', '.join(sels)} {{ {body} }}"
                    media = [p for p in parents if p.startswith("@media")]
                    keep.append((media[-1] if media else None, rule))
        out, seen = [], set()
        for media, rule in keep:
            if (media, rule) in seen:
                continue
            seen.add((media, rule))
            out.append(f"{media} {{ {rule} }}" if media else rule)
        header = ("/* Risco Cognitivo — primitivos sem framework (extraídos do CSS compilado do site por build_tokens.py).\n"
                  "   Carregue tokens.css antes. Classes: " + ", ".join(COMPONENT_CLASSES) + " */\n")
        comp = ROOT / "assets" / "components"
        comp.mkdir(parents=True, exist_ok=True)
        (comp / "components.css").write_text(header + "\n".join(out) + "\n", encoding="utf-8")
        print(f"components.css: {len(out)} regras")
    print(f"tokens: base={len(base)} claro={len(themes['claro'])} noite={len(themes['noite'])} breakpoints={len(breakpoints)}")


if __name__ == "__main__":
    main()
