#!/usr/bin/env python3
"""Auditoria de marca para HTML, CSS e SVG (tokens, usos, formatos, diagramação, @page, vetores, acessibilidade).

Uso:
  python3 audit_html.py <arquivo-ou-pasta> [...] [--print] [--json] [--strict]

Checagens (B = bloqueante, A = aviso):
  B hex-outside-root   cor HEX/rgb() fora de :root/[data-theme] ou de var(--…) (exceções: <svg> de marca com title, comentários)
  B font-family        família fora de DM Sans / Inter / DM Mono (+ fallbacks system-ui, Arial, sans-serif, monospace…)
  B lang               <html> sem lang
  B img-alt            <img> sem alt
  B svg-viewbox        <svg> sem viewBox
  A svg-fixed-size     <svg> com width/height fixos (sem viewBox responsivo)
  B svg-a11y           <svg> informativo sem <title> e sem aria-hidden
  B page-rule          (--print ou data-surface="print") sem @page com size
  A print-breaks       imprimível sem break-inside: avoid
  A focus              CSS sem :focus-visible
  A target-size        botões/links com altura declarada < 44px
  A off-scale-space    padding/margin/gap em px fora da escala 0/1/2/4/8/12/16/24/32/48/64/96
  A off-scale-radius   border-radius fora de 0/2/4/8/12/16/999px/50%
  B brand-name         nomes de outra marca ("Custo Cognitivo", "X-Ray", "EXECUTAR Copiloto")
  B placeholder        {{PLACEHOLDER}} remanescente
Saída: relatório por arquivo; exit 1 se houver bloqueante (ou aviso com --strict).
"""
import argparse
import json
import re
import sys
from pathlib import Path

ALLOWED_FONTS = {"dm sans", "inter", "dm mono", "system-ui", "-apple-system", "blinkmacsystemfont", "segoe ui",
                 "arial", "helvetica", "sans-serif", "monospace", "ui-monospace", "sfmono-regular", "menlo",
                 "consolas", "ui-sans-serif", "inherit", "var"}
SPACE = {0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96}
RADII = {0, 2, 4, 8, 12, 16, 999, 9999}
FOREIGN = ["Custo Cognitivo", "X-Ray", "EXECUTAR Copiloto", "Rogerinho"]


def strip_comments(s):
    s = re.sub(r"<!--.*?-->", "", s, flags=re.S)
    return re.sub(r"/\*.*?\*/", "", s, flags=re.S)


def css_blocks(css):
    """[(seletor, corpo)] de regras-folha."""
    out, stack, start = [], [], 0
    for j, c in enumerate(css):
        if c == "{":
            stack.append((re.split(r"[;{}]", css[start:j])[-1].strip(), j + 1))
            start = j + 1
        elif c == "}" and stack:
            sel, b = stack.pop()
            body = css[b:j]
            if "{" not in body:
                out.append((sel, body))
            start = j + 1
    return out


def audit_text(path, text, force_print=False):
    issues = []
    add = lambda sev, code, msg: issues.append({"sev": sev, "code": code, "msg": msg})
    raw = text
    text = strip_comments(text)
    is_html = path.suffix in (".html", ".htm", ".j2", ".jinja")
    styles = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", text, flags=re.S)) if is_html else (text if path.suffix == ".css" else "")
    if "{{" in raw and re.search(r"\{\{\s*[A-Z][A-Z0-9_]+\s*\}\}", raw):
        add("B", "placeholder", "placeholder {{…}} remanescente")
    for name in FOREIGN:
        if re.search(re.escape(name), re.sub(r"<!--.*?-->", "", raw, flags=re.S), flags=re.I):
            add("B", "brand-name", f"nome de outra marca encontrado: {name}")

    # CSS
    if styles:
        blocks_ = css_blocks(styles)
        # alvo compensado: existe regra "<sel>:before/::before" (área de toque ampliada por pseudo-elemento)
        compensated = {re.sub(r"::?before.*$", "", s.strip()) for sel_, _ in blocks_ for s in sel_.split(",") if re.search(r"::?before", s)}
        for sel, body in blocks_:
            token_scope = sel.startswith(":root") or "data-theme" in sel
            for m in re.finditer(r"(?<![\w-])(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\))", body):
                if not token_scope:
                    add("B", "hex-outside-root", f"{sel[:60]} → {m.group(1)} (use var(--token))")
            for fam in re.findall(r"font-family\s*:\s*([^;]+)", body):
                for f in fam.split(","):
                    f = f.strip().strip("'\"").lower()
                    if f and not f.startswith("var(") and f not in ALLOWED_FONTS:
                        add("B", "font-family", f"{sel[:60]} → fonte fora da marca: {f}")
            for prop, val in re.findall(r"(padding|margin|gap|row-gap|column-gap)(?:-[a-z-]+)?\s*:\s*([^;]+)", body):
                for px in re.findall(r"(?<![\w.])(\d+(?:\.\d+)?)px", val):
                    if float(px) not in SPACE:
                        add("A", "off-scale-space", f"{sel[:60]} → {prop}: {px}px fora da escala")
            for val in re.findall(r"border-radius\s*:\s*([^;]+)", body):
                for px in re.findall(r"(\d+(?:\.\d+)?)px", val):
                    if float(px) not in RADII:
                        add("A", "off-scale-radius", f"{sel[:60]} → radius {px}px")
            if re.search(r"(^|[\s,])(button|\.btn|a\b)", sel):
                h = re.search(r"(?<![-\w])(?:min-)?height\s*:\s*(\d+)px", body)
                if h and int(h.group(1)) < 44 and ":before" not in sel and sel.split(",")[0].strip() not in compensated:
                    add("A", "target-size", f"{sel[:60]} → altura {h.group(1)}px (< 44; compense com ::before)")
        if is_html and ":focus-visible" not in styles and "<button" in text:
            add("A", "focus", "sem regra :focus-visible")

    if is_html:
        if path.suffix in (".html", ".htm") and not re.search(r"<html[^>]*\blang=", text):
            add("B", "lang", "<html> sem lang")
        for img in re.findall(r"<img\b[^>]*>", text):
            if not re.search(r"\balt=", img):
                add("B", "img-alt", f"img sem alt: {img[:80]}")
        printable = force_print or 'data-surface="print"' in text or "@page" in styles
        if printable:
            if not re.search(r"@page\s*\{[^}]*size\s*:", styles):
                add("B", "page-rule", "imprimível sem @page { size: … }")
            if "break-inside" not in styles:
                add("A", "print-breaks", "imprimível sem break-inside: avoid")

    # SVG (inline ou arquivo)
    svgs = re.findall(r"<svg\b.*?</svg>", text, flags=re.S) if (is_html or path.suffix == ".svg") else []
    for s in svgs:
        tag = re.match(r"<svg\b[^>]*>", s).group(0)
        if "viewBox" not in tag:
            add("B", "svg-viewbox", f"svg sem viewBox: {tag[:80]}")
        if re.search(r'\s(width|height)="\d+(px)?"', tag) and path.suffix == ".svg":
            add("A", "svg-fixed-size", "svg com width/height fixos")
        decorative = 'aria-hidden="true"' in tag
        if not decorative and "<title" not in s and 'aria-label' not in tag and 'role="presentation"' not in tag:
            add("B", "svg-a11y", f"svg informativo sem <title>/aria-label (ou marque aria-hidden): {tag[:70]}")
    return issues


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--print", action="store_true", help="tratar todos como imprimíveis (exige @page)")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--strict", action="store_true", help="avisos também reprovam")
    a = ap.parse_args()
    files = []
    missing = [p for p in a.paths if not Path(p).exists()]
    if missing:
        sys.exit(f"caminho não encontrado: {', '.join(missing)}")
    for p in map(Path, a.paths):
        files += sorted(x for x in (p.rglob("*") if p.is_dir() else [p]) if x.suffix in (".html", ".htm", ".css", ".svg", ".j2", ".jinja"))
    report, blocking, warnings = {}, 0, 0
    for f in files:
        iss = audit_text(f, f.read_text(encoding="utf-8", errors="replace"), a.print)
        report[str(f)] = iss
        blocking += sum(i["sev"] == "B" for i in iss)
        warnings += sum(i["sev"] == "A" for i in iss)
    if a.json:
        print(json.dumps({"files": report, "blocking": blocking, "warnings": warnings}, ensure_ascii=False, indent=2))
    else:
        for f, iss in report.items():
            mark = "✗" if any(i["sev"] == "B" for i in iss) else ("!" if iss else "✓")
            print(f"{mark} {f}")
            for i in iss:
                print(f"    [{i['sev']}] {i['code']}: {i['msg']}")
        print(f"\n{len(files)} arquivo(s) · {blocking} bloqueante(s) · {warnings} aviso(s)")
    sys.exit(1 if blocking or (a.strict and warnings) else 0)


if __name__ == "__main__":
    main()
