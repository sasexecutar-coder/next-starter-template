#!/usr/bin/env python3
"""Aplica a camada de marca Risco Cognitivo a um HTML existente (arquitetura X-Ray brand layer, adaptada).

Uso:
  python3 apply_brand.py entrada.html -o saida.html [--map map.json] [--brand-config brand_config.json] [--report]

O que faz (determinístico, sem inventar valor):
  1. injeta tokens.css + components.css + fontes no <head> (uma vez; idempotente via marcador);
  2. troca cada cor literal por var(--token) quando o valor é EXATAMENTE de um token ou está no mapa explícito (--map);
     cores sem correspondência ficam como estão e entram no relatório como pendência (decisão humana);
  3. troca font-family fora da marca por var(--font-display) em títulos e var(--font-body) no resto;
  4. substitui nomes de marca estrangeiros listados no mapa ("from" → "to"), nunca por suposição;
  5. garante <html lang>.
O checklist bloqueante (references/checklist.md) é verificado em seguida por rc-audit.
"""
import argparse
import json
import re
import sys
from pathlib import Path

SKILLS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SKILLS / "rc-brand" / "scripts"))
from rc_render import FONTS, brand_css, load_json  # noqa: E402

MARK = "<!-- rc-brand-layer -->"
HEX = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")


def token_index():
    t = load_json(SKILLS / "rc-brand" / "assets" / "tokens" / "tokens.json")["theme"]["atual"]
    # semânticos/temáticos primeiro: acompanham os temas claro/noite (brand-* são fixos)
    prio = ["surface-page", "text-primary", "action-text", "text-secondary", "brand-action-blue", "brand-action-blue-strong",
            "brand-canvas",
            "brand-dark-gray", "brand-light-gray", "brand-light-blue", "brand-dark-indigo", "semantic-risk",
            "semantic-solution", "attention-surface", "attention-ink", "surface-raised", "surface-subtle"]
    idx = {}
    for name in prio + sorted(t):
        v = str(t.get(name, {}).get("$value", "")).lower()
        if re.fullmatch(r"#[0-9a-f]{6}", v):
            idx.setdefault(v, name)
    return idx


def norm(h):
    h = h.lower()
    return "#" + "".join(c * 2 for c in h[1:]) if len(h) == 4 else h


def apply(html, cmap, overrides):
    report = {"replaced": {}, "unmapped": {}, "fonts": 0, "names": {}}
    idx = token_index()
    explicit = {norm(k): v for k, v in cmap.get("colors", {}).items()}

    def color(h):
        tok = explicit.get(norm(h)) or idx.get(norm(h))
        if tok:
            report["replaced"][h] = tok
            return f"var(--{tok})"
        report["unmapped"][h] = report["unmapped"].get(h, 0) + 1
        return h

    def leaf(m):
        sel, body = m.group(1), m.group(2)
        s = sel.strip().split("}")[-1].strip()
        if s.startswith(":root") or "data-theme" in s:
            # escopo de tokens: só o mapa explícito reescreve (ex.: --accent:#F56A1C → var(--brand-action-blue))
            body = HEX.sub(lambda h: f"var(--{explicit[norm(h.group(0))]})" if norm(h.group(0)) in explicit else h.group(0), body)
            return f"{sel}{{{body}}}"
        # texto branco sobre cor é "text-on-dark", não superfície
        body = re.sub(r"(?<![-\w])color\s*:\s*#(?:fff|ffffff)\b", "color:var(--text-on-dark)", body, flags=re.I)
        body = HEX.sub(lambda h: color(h.group(0)), body)

        def ff(f):
            report["fonts"] += 1
            head = re.search(r"(^|[\s,])h[1-6]\b|title|headline|display", s)
            return "font-family:" + ("var(--font-display)" if head else "var(--font-body)")
        body = re.sub(r"font-family\s*:\s*(?!var\()[^;}]+", ff, body)
        return f"{sel}{{{body}}}"

    def css_fix(css):
        return re.sub(r"([^{}]+)\{([^{}]*)\}", leaf, css)  # só blocos-folha; @media/@page preservados

    html = re.sub(r"(<style[^>]*>)(.*?)(</style>)", lambda m: m.group(1) + css_fix(m.group(2)) + m.group(3), html, flags=re.S)
    html = re.sub(r'style="([^"]*)"', lambda m: 'style="' + HEX.sub(lambda h: color(h.group(0)), m.group(1)) + '"', html)
    for old, new in cmap.get("names", {}).items():
        n = len(re.findall(re.escape(old), html))
        if n:
            html = html.replace(old, new)
            report["names"][old] = n
    if MARK not in html:
        inject = (f'{MARK}\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="{FONTS}" rel="stylesheet">\n'
                  f"<style>\n{brand_css()}\n</style>\n")
        if overrides:
            inject += "<style>:root{" + "".join(f"--{k}:{v};" for k, v in overrides.items()) + "}</style>\n"
        html = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + "\n" + inject, html, count=1) if "<head" in html else inject + html
    if not re.search(r"<html[^>]*\blang=", html):
        html = re.sub(r"<html", '<html lang="pt-BR"', html, count=1)
    return html, report


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--map", help='{"colors": {"#F56A1C": "brand-action-blue"}, "names": {"Outra Marca": "Risco Cognitivo"}}')
    ap.add_argument("--brand-config", help='{"brand": {"tokens": {"brand-action-blue": "#RRGGBB"}}} — só tokens declarados')
    ap.add_argument("--report", action="store_true")
    a = ap.parse_args()
    cmap = load_json(a.map) if a.map else {}
    overrides = {}
    if a.brand_config:
        overrides = {k: v for k, v in load_json(a.brand_config).get("brand", {}).get("tokens", {}).items() if v}
        bad = [k for k, v in overrides.items() if not re.fullmatch(r"#[0-9a-fA-F]{6}", v)]
        if bad:
            sys.exit(f"brand_config inválido: {bad}")
    raw = Path(a.src).read_bytes()
    try:
        src = raw.decode("utf-8")
    except UnicodeDecodeError:
        src = raw.decode("latin-1")  # material de terceiros; a saída é sempre UTF-8
        print("aviso: entrada não era UTF-8 (lida como Latin-1); saída gravada em UTF-8", file=sys.stderr)
    html, rep = apply(src, cmap, overrides)
    Path(a.out).write_text(html, encoding="utf-8")
    print(f"{a.out}: {len(rep['replaced'])} cores → token · {sum(rep['unmapped'].values())} sem mapa · "
          f"{rep['fonts']} fontes · nomes {rep['names'] or '—'}")
    if a.report or rep["unmapped"]:
        print(json.dumps(rep, ensure_ascii=False, indent=2))
    sys.exit(0)


if __name__ == "__main__":
    main()
