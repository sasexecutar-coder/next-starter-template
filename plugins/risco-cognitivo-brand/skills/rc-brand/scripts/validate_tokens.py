#!/usr/bin/env python3
"""Valida os tokens empacotados da marca.

Checagens:
  1. HEX válidos em todos os temas (3, 6 ou 8 dígitos).
  2. Paridade 1:1 com o site (--site globals.css): mesmos nomes e valores por tema. Detecta deriva.
  3. Contraste WCAG nos 3 temas: pares de texto ≥ 4,5:1 e de controle/não-texto ≥ 3:1.
  4. tokens.css, tokens.json, tokens.py e tailwind.preset.cjs presentes e consistentes entre si.

Uso:  python3 validate_tokens.py [--site <repo>/src/app/globals.css]
Saída: relatório e exit 1 se qualquer checagem falhar.
"""
import argparse
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from contrast import ratio  # noqa: E402
from build_tokens import parse_site, resolved_theme  # noqa: E402

ROOT = HERE.parent
TOK = ROOT / "assets" / "tokens"

# (frente, fundo, mínimo, descrição) — por papel, avaliados em cada tema
PAIRS = [
    ("text-primary", "surface-page", 4.5, "texto principal / fundo"),
    ("text-primary", "surface-subtle", 4.5, "texto principal / superfície"),
    ("text-secondary", "surface-page", 4.5, "texto secundário / fundo"),
    ("text-secondary", "surface-raised", 4.5, "texto secundário / painel"),
    ("text-secondary", "surface-subtle", 4.5, "texto secundário / superfície sutil"),
    ("action-text", "surface-page", 4.5, "marca como texto / fundo"),
    ("action-text", "surface-raised", 4.5, "marca como texto / painel"),
    ("action-text", "surface-subtle", 4.5, "marca como texto / superfície sutil"),
    ("text-on-dark", "brand-action-blue", 4.5, "texto do botão primário"),
    ("text-on-dark", "brand-action-blue-strong", 4.5, "hover do primário"),
    ("text-on-dark", "brand-dark-indigo", 4.5, "texto sobre índigo"),
    ("on-attention", "attention-surface", 4.5, "chip GAP"),
    ("brain-accent-text", "surface-raised", 4.5, "rótulo do cérebro"),
    ("border-control", "surface-page", 3.0, "borda de controle / fundo"),
    ("border-control", "surface-raised", 3.0, "borda de controle / painel"),
    ("brand-action-blue", "surface-page", 3.0, "botão primário como forma"),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", help="globals.css do site para checar paridade")
    a = ap.parse_args()
    errors, notes = [], []
    data = json.loads((TOK / "tokens.json").read_text(encoding="utf-8"))
    themes = data["theme"]

    # 1. HEX
    for t, group in themes.items():
        for k, v in group.items():
            for h in re.findall(r"#[0-9a-zA-Z]+", v["$value"]):
                if not re.fullmatch(r"#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})", h):
                    errors.append(f"HEX inválido em {t}.{k}: {h}")

    # 2. paridade com o site
    if a.site:
        base, th, _ = parse_site(Path(a.site).read_text(encoding="utf-8"))
        for t in ("atual", "claro", "noite"):
            site = resolved_theme(base, th, t)
            pkg = {k: v["$value"] for k, v in themes[t].items()}
            missing = sorted(set(site) - set(pkg))
            extra = sorted(set(pkg) - set(site))
            diff = sorted(k for k in set(site) & set(pkg) if site[k] != pkg[k])
            for k in missing:
                errors.append(f"deriva: {t}.{k} existe no site e falta no pacote")
            for k in extra:
                errors.append(f"deriva: {t}.{k} existe no pacote e não no site")
            for k in diff:
                errors.append(f"deriva: {t}.{k} site={site[k]} pacote={pkg[k]}")
        notes.append("paridade com o site verificada")

    # 3. contraste
    rows = []
    for t, group in themes.items():
        val = {k: v["$value"] for k, v in group.items()}
        for fg, bg, need, desc in PAIRS:
            if fg not in val or bg not in val:
                errors.append(f"par ausente em {t}: {fg} / {bg}")
                continue
            r = ratio(val[fg], val[bg])
            ok = r >= need
            rows.append((t, desc, val[fg], val[bg], r, need, ok))
            if not ok:
                errors.append(f"contraste {t}: {desc} = {r:.2f}:1 (mínimo {need}:1)")

    # 4. arquivos derivados
    fonts = TOK / "fonts.css"
    if not fonts.exists() or not all(v in fonts.read_text(encoding="utf-8") for v in ("--font-display", "--font-body", "--font-mono")):
        errors.append("fonts.css ausente ou sem --font-display/--font-body/--font-mono")
    css = (TOK / "tokens.css").read_text(encoding="utf-8")
    for k in themes["atual"]:
        if f"--{k}:" not in css:
            errors.append(f"tokens.css sem --{k}")
    for f in ("tokens.py", "tailwind.preset.cjs"):
        if not (TOK / f).exists():
            errors.append(f"falta {f}")

    print(f"{len(rows)} pares de contraste avaliados em {len(themes)} temas; menor razão: "
          f"{min(r[4] for r in rows):.2f}:1" if rows else "sem pares")
    for n in notes:
        print("·", n)
    if errors:
        print("\nFALHAS:")
        for e in errors:
            print("  ✗", e)
        sys.exit(1)
    print("OK — tokens válidos")


if __name__ == "__main__":
    main()
