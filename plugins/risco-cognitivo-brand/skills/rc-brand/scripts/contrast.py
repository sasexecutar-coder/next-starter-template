#!/usr/bin/env python3
"""Contraste WCAG 2.x entre duas cores (HEX ou rgb(r g b / a%) composto sobre um fundo).

Uso:  python3 contrast.py "#2D5CE6" "#FFFDFA"        → 5.46 (AA texto: PASS)
Também importável: ratio(fg, bg), parse(color, over="#ffffff").
"""
import re
import sys


def _hex(h):
    h = h.strip().lstrip("#")
    if len(h) in (3, 4):
        h = "".join(c * 2 for c in h[:3])
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def parse(color, over="#ffffff"):
    """Converte HEX ou rgb()/rgba() (com alfa) em RGB opaco, compondo sobre `over`."""
    c = color.strip().lower()
    if c.startswith("#"):
        return _hex(c)
    m = re.match(r"rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[/,]\s*([\d.]+)(%?))?\s*\)", c)
    if not m:
        raise ValueError(f"cor não suportada: {color}")
    r, g, b = (float(m.group(i)) for i in (1, 2, 3))
    a = 1.0 if m.group(4) is None else float(m.group(4)) / (100 if m.group(5) else 1)
    br, bg_, bb = parse(over) if isinstance(over, str) else over
    return tuple(round(v * a + w * (1 - a)) for v, w in ((r, br), (g, bg_), (b, bb)))


def lum(rgb):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ratio(fg, bg):
    bgc = parse(bg)
    fgc = parse(fg, over=bgc)
    a, b = sorted([lum(fgc), lum(bgc)], reverse=True)
    return (a + 0.05) / (b + 0.05)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    r = ratio(sys.argv[1], sys.argv[2])
    print(f"{r:.2f}:1  texto AA {'PASS' if r >= 4.5 else 'FAIL'} · não-texto {'PASS' if r >= 3 else 'FAIL'}")
