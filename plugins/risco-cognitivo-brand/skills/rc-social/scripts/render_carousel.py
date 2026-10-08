#!/usr/bin/env python3
"""Gera carrossel/post/story da marca Risco Cognitivo: JSON → HTML (1 .slide por página) → PNGs com dimensão exata.

Uso:
  python3 render_carousel.py deck.json -o dist/ [--png] [--pdf]

Formatos (deck.format):
  carousel-4x5   1080×1350  Instagram feed carrossel / LinkedIn documento (spec verificada; até 20 slides IG)
  post-4x5       1080×1350  post estático único
  story-9x16     9:16 — px A DEFINIR na spec: exige deck.size {"w":…, "h":…} informado pelo usuário (sem chute)
Tipos de slide: cover, idea, list, stat (exige source), cta. Um slide = uma ideia.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE.parent / "rc-brand" / "scripts"))
from rc_render import brand_css, env_for, load_json, write  # noqa: E402

FORMATS = {"carousel-4x5": (1080, 1350, 20), "post-4x5": (1080, 1350, 1), "story-9x16": (None, None, 12)}
KINDS = {"cover", "idea", "list", "stat", "cta"}
LIMITS = {"title": 60, "text": 160, "item": 60}


def validate(deck):
    errs = [f"deck.{k} ausente" for k in ("title", "format", "kicker", "handle", "slides") if not deck.get(k)]
    fmt = FORMATS.get(deck.get("format"))
    if not fmt:
        return errs + [f"format deve ser um de {list(FORMATS)}"]
    w, h, max_slides = fmt
    if w is None:
        size = deck.get("size") or {}
        if not (size.get("w") and size.get("h")) or abs(size["w"] / size["h"] - 9 / 16) > 0.01:
            errs.append("story-9x16: largura/altura A DEFINIR na spec — informe deck.size 9:16 explicitamente")
    slides = deck.get("slides", [])
    if not 1 <= len(slides) <= max_slides:
        errs.append(f"{deck['format']}: 1 a {max_slides} slides (recebido {len(slides)})")
    if deck.get("format") == "carousel-4x5" and slides and slides[0].get("kind") != "cover":
        errs.append("carrossel começa com slide cover (gancho)")
    for i, s in enumerate(slides, 1):
        if s.get("kind") not in KINDS:
            errs.append(f"slide {i}: kind deve ser um de {sorted(KINDS)}")
        if not s.get("title"):
            errs.append(f"slide {i}: title ausente")
        if len(s.get("title", "")) > LIMITS["title"]:
            errs.append(f"slide {i}: título com {len(s['title'])} caracteres (máx. {LIMITS['title']}: 1 ideia por slide)")
        if len(s.get("text", "")) > LIMITS["text"]:
            errs.append(f"slide {i}: texto com {len(s['text'])} caracteres (máx. {LIMITS['text']})")
        for it in s.get("items", []):
            if len(it) > LIMITS["item"]:
                errs.append(f"slide {i}: item longo demais ({len(it)} > {LIMITS['item']})")
        if s.get("kind") == "stat" and not (s.get("stat") and s.get("source")):
            errs.append(f"slide {i}: stat exige stat e source (número sem fonte = EVIDENCE REQUIRED)")
        if s.get("kind") == "cta" and not s.get("action"):
            errs.append(f"slide {i}: cta exige action")
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("deck")
    ap.add_argument("-o", "--out", default="dist")
    ap.add_argument("--png", action="store_true", help="exporta PNG por slide (Playwright)")
    ap.add_argument("--pdf", action="store_true", help="exporta PDF 1 slide/página (LinkedIn documento)")
    a = ap.parse_args()
    data = load_json(a.deck)
    if not isinstance(data, dict) or not isinstance(data.get("deck"), dict):
        sys.exit("deck inválido: o JSON precisa de um objeto \"deck\" no topo (veja examples/)")
    deck = data["deck"]
    errs = validate(deck)
    if errs:
        sys.exit("deck inválido:\n  " + "\n  ".join(errs))
    w, h, _ = FORMATS[deck["format"]]
    size = {"w": w, "h": h} if w else deck["size"]
    out = Path(a.out)
    slug = deck.get("slug") or Path(a.deck).stem
    html_path = out / f"{slug}.html"
    write(html_path, env_for(HERE / "templates").get_template("carousel.html.j2").render(deck=deck, size=size, brand_css=brand_css()))
    print(html_path)
    if a.png or a.pdf:
        node = shutil.which("node")
        if not node:
            sys.exit("node não encontrado: instale Node 18+ e Playwright para exportar PNG/PDF")
        cmd = [node, str(HERE / "scripts" / "export_slides.mjs"), str(html_path), str(out / slug), f"{size['w']}x{size['h']}", "--prefix", slug]
        if a.pdf:
            cmd += ["--pdf", str(out / f"{slug}.pdf")]
        r = subprocess.run(cmd, capture_output=True, text=True, env=os.environ)
        print(r.stdout.strip() or r.stderr.strip())
        sys.exit(r.returncode)


if __name__ == "__main__":
    main()
