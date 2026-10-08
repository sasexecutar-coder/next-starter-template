#!/usr/bin/env python3
"""Renderiza a galeria standalone dos primitivos (tokens.css + components.css) para conferência visual e auditoria.

Uso: python3 render_gallery.py -o dist/primitivos.html
"""
import argparse
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE.parent / "rc-brand" / "scripts"))
from rc_render import brand_css, env_for, write  # noqa: E402

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    write(a.out, env_for(HERE / "templates").get_template("gallery.html.j2").render(brand_css=brand_css()))
    print(a.out)
