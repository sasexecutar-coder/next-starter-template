#!/usr/bin/env python3
"""Linter de leitura cognitiva para artigos Markdown/MDX do Risco Cognitivo (orçamento do mdx-contract).

Uso:
  python3 lint_reading.py artigo.md [--json] [--strict]

Regras (A = aviso, F = falha):
  frase        8–20 palavras · A 21–25 · F > 30
  parágrafo    20–60 palavras · A 61–80 · F > 90 · F > 4 frases
  H2           3–8 palavras; seção > 400 palavras sem H3 = F; > 300 sem :::summary/:::keypoints = A
  H1           nenhum no corpo (vem do frontmatter) · F se houver; níveis não pulam (H2 → H4 = F)
  lista        3–7 itens (A até 9, F > 9) · item > 20 palavras = A
  negrito      > 2 por parágrafo ou > 4 palavras = A
  ênfase       itálico / CAIXA ALTA (≥ 3 palavras) = A
  claim        número/percentual sem link ou nota no mesmo parágrafo = A (EVIDENCE REQUIRED)
  artigo mãe   total fora de 1.800–2.400 palavras = A (só com --mother)
Exit 1 com falha (ou aviso em --strict).
"""
import argparse
import json
import re
import sys
from pathlib import Path


def words(s):
    return len(re.findall(r"[\wÀ-ÿ'’-]+", re.sub(r"`[^`]*`|\[([^\]]*)\]\([^)]*\)", r"\1", s)))


def sentences(p):
    return [x for x in re.split(r"(?<=[.!?])\s+(?=[A-ZÀ-Ý“\"(])", p.strip()) if words(x)]


def lint(text, mother=False):
    issues = []
    add = lambda sev, line, code, msg: issues.append({"sev": sev, "line": line, "code": code, "msg": msg})
    text = re.sub(r"^---\n.*?\n---\n", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)
    lines = text.split("\n")
    in_code, in_dir, para, para_start, lst, lst_start = False, False, [], 0, [], 0
    last_level, sec_words, sec_line, sec_has_h3, sec_has_summary, total = 1, 0, 0, False, False, 0

    def close_section():
        if sec_line and sec_words > 400 and not sec_has_h3:
            add("F", sec_line, "secao-longa", f"seção com {sec_words} palavras sem H3")
        elif sec_line and sec_words > 300 and not sec_has_summary:
            add("A", sec_line, "secao-sem-resumo", f"seção com {sec_words} palavras sem :::summary/:::keypoints")

    def flush_para():
        nonlocal para, total
        if not para:
            return
        p = " ".join(para)
        n, ss = words(p), sentences(p)
        total += n
        if n > 90:
            add("F", para_start, "paragrafo", f"{n} palavras (> 90)")
        elif n > 60:
            add("A", para_start, "paragrafo", f"{n} palavras (alvo 20–60)")
        if len(ss) > 4:
            add("F", para_start, "frases", f"{len(ss)} frases no parágrafo (máx. 4)")
        for s in ss:
            k = words(s)
            if k > 30:
                add("F", para_start, "frase", f"frase com {k} palavras: “{s[:60]}…”")
            elif k > 25:
                add("A", para_start, "frase", f"frase com {k} palavras: “{s[:60]}…”")
        bolds = re.findall(r"\*\*([^*]+)\*\*", p)
        if len(bolds) > 2 or any(words(b) > 4 for b in bolds):
            add("A", para_start, "negrito", f"{len(bolds)} negrito(s); máx. 2 por parágrafo, ≤ 4 palavras")
        if re.search(r"(?<![*\w])[*_](?![*_\s])[^*_]+(?<!\s)[*_](?![*\w])", p):
            add("A", para_start, "italico", "itálico como ênfase")
        if re.search(r"\b[A-ZÀ-Ý]{3,}(?:\s+[A-ZÀ-Ý]{3,}){2,}\b", p):
            add("A", para_start, "caixa-alta", "CAIXA ALTA como ênfase")
        if re.search(r"\d+(?:[.,]\d+)?\s*%|\b\d{2,}(?:[.,]\d+)?\b", p) and not re.search(r"\]\(https?://|\[\^", p):
            add("A", para_start, "claim", "número sem fonte no parágrafo (EVIDENCE REQUIRED)")
        para = []

    def flush_list():
        nonlocal lst
        if lst:
            if len(lst) > 9:
                add("F", lst_start, "lista", f"{len(lst)} itens (máx. 9)")
            elif len(lst) > 7 or len(lst) < 3:
                add("A", lst_start, "lista", f"{len(lst)} itens (alvo 3–7)")
            for it in lst:
                if words(it) > 20:
                    add("A", lst_start, "item", f"item com {words(it)} palavras")
        lst = []

    for i, raw in enumerate(lines, 1):
        line = raw.rstrip()
        if line.startswith("```"):
            in_code = not in_code
            flush_para(); flush_list()
            continue
        if in_code:
            continue
        if line.startswith(":::"):
            flush_para(); flush_list()
            if re.match(r":::(summary|keypoints)", line):
                sec_has_summary = True
            in_dir = line.strip() != ":::" and not in_dir
            continue
        m = re.match(r"^(#{1,6})\s+(.*)", line)
        if m:
            flush_para(); flush_list()
            lvl = len(m.group(1))
            if lvl == 1:
                add("F", i, "h1", "H1 no corpo (o título vem do frontmatter)")
            if lvl > last_level + 1:
                add("F", i, "nivel", f"H{last_level} → H{lvl} pula nível")
            if lvl == 2:
                close_section()
                sec_words, sec_line, sec_has_h3, sec_has_summary = 0, i, False, False
                k = words(m.group(2))
                if not 3 <= k <= 8:
                    add("A", i, "h2", f"H2 com {k} palavras (alvo 3–8)")
            if lvl == 3:
                sec_has_h3 = True
            last_level = lvl
            continue
        li = re.match(r"^\s*(?:[-*+]|\d+[.)])\s+(.*)", line)
        if li:
            flush_para()
            if not lst:
                lst_start = i
            lst.append(li.group(1))
            sec_words += words(li.group(1))
            continue
        if not line.strip():
            flush_para(); flush_list()
            continue
        if line.startswith(">") or line.startswith("|") or line.startswith("<"):
            continue
        if not para:
            para_start = i
        para.append(line.strip())
        sec_words += words(line)
    flush_para(); flush_list(); close_section()
    if mother and not 1800 <= total <= 2400:
        add("A", 1, "artigo-mae", f"{total} palavras (artigo mãe: 1.800–2.400)")
    return issues, total


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--strict", action="store_true")
    ap.add_argument("--mother", action="store_true", help="aplica o orçamento do artigo mãe (1.800–2.400 palavras)")
    a = ap.parse_args()
    issues, total = lint(Path(a.file).read_text(encoding="utf-8"), a.mother)
    fails = sum(i["sev"] == "F" for i in issues)
    warns = len(issues) - fails
    if a.json:
        print(json.dumps({"file": a.file, "words": total, "fail": fails, "warn": warns, "issues": issues}, ensure_ascii=False, indent=2))
    else:
        for i in issues:
            print(f"  [{i['sev']}] L{i['line']} {i['code']}: {i['msg']}")
        print(f"{a.file}: {total} palavras · {fails} falha(s) · {warns} aviso(s)")
    sys.exit(1 if fails or (a.strict and warns) else 0)


if __name__ == "__main__":
    main()
