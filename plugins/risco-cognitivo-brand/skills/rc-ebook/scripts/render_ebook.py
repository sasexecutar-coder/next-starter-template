#!/usr/bin/env python3
"""Renderiza um ebook/onboarding standalone do Risco Cognitivo a partir de um JSON de conteúdo.

Uso:
  python3 render_ebook.py <doc.json> -o <saida.html> [--brand-config brand_config.json] [--theme atual|claro|noite]

O JSON define doc.{id, version, title, description, brand_name, eyebrow, headline, lead, footer, sections[]}; cada seção
tem id, title e blocks[] (tipos em templates/blocks.html.j2). Campo ausente = erro (StrictUndefined), nunca texto inventado.
"""
import argparse
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE.parent / "rc-brand" / "scripts"))
from rc_render import brand_css, env_for, load_json, write  # noqa: E402

REQUIRED = ("id", "version", "title", "description", "brand_name", "eyebrow", "headline", "lead", "footer", "sections")
BLOCKS = {"p", "h3", "list", "callout", "grid", "steps", "commands", "code", "table", "checklist", "rules", "faq",
          "timeline", "swatches", "form"}


def validate(doc):
    errs = [f"doc.{k} ausente" for k in REQUIRED if k not in doc]
    ids = [s.get("id") for s in doc.get("sections", [])]
    if len(ids) != len(set(ids)):
        errs.append("ids de seção duplicados")
    for s in doc.get("sections", []):
        if not re.fullmatch(r"[a-z0-9-]+", s.get("id", "")):
            errs.append(f"id de seção inválido: {s.get('id')!r}")
        for b in s.get("blocks", []):
            if b.get("type") not in BLOCKS:
                errs.append(f"{s.get('id')}: bloco desconhecido {b.get('type')!r}")
    return errs


def brand_override(cfg_path):
    """Só tokens declarados no brand_config; valor vazio mantém o token da marca (nunca inventa)."""
    cfg = load_json(cfg_path).get("brand", {})
    tokens = cfg.get("tokens", {})
    bad = [k for k, v in tokens.items() if not re.fullmatch(r"#[0-9a-fA-F]{6}|var\(--[\w-]+\)", str(v))]
    if bad:
        sys.exit(f"brand_config: valores inválidos em {bad} (use #RRGGBB ou var(--token))")
    return {k: v for k, v in tokens.items() if v}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("doc")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--brand-config")
    ap.add_argument("--theme", choices=("atual", "claro", "noite"))
    a = ap.parse_args()
    data = load_json(a.doc)
    if not isinstance(data, dict) or not isinstance(data.get("doc"), dict):
        sys.exit("conteúdo inválido: o JSON precisa de um objeto \"doc\" no topo (veja examples/)")
    doc = data["doc"]
    errs = validate(doc)
    if errs:
        sys.exit("conteúdo inválido:\n  " + "\n  ".join(errs))
    if a.theme:
        doc["theme"] = a.theme
    if a.brand_config:
        doc["brand_override"] = brand_override(a.brand_config)
    html = env_for(HERE / "templates").get_template("ebook.html.j2").render(doc=doc, brand_css=brand_css())
    digest = write(a.out, html)
    print(f"{a.out} · {len(doc['sections'])} seções · sha256 {digest[:12]}")


if __name__ == "__main__":
    main()
