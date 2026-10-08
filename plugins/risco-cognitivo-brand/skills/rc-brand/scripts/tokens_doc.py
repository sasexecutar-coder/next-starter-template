#!/usr/bin/env python3
"""Gera references/tokens.md a partir de assets/tokens/tokens.json (tabela por tema). Rodar após build_tokens.py."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
d = json.loads((ROOT / "assets/tokens/tokens.json").read_text(encoding="utf-8"))
t = d["theme"]
groups = [
    ("Marca e semântica (iguais nos 3 temas)", lambda k: k.startswith(("brand-", "semantic-", "attention-", "on-attention"))),
    ("Cérebro 3D (D-23)", lambda k: k.startswith("brain-")),
    ("Texto, superfícies e bordas", lambda k: k.startswith(("text-", "surface-", "line-", "border-", "action-", "dot-", "selection"))),
    ("Espaço e ritmo (D-25, D-34)", lambda k: k.startswith(("space-", "block-", "stack-", "gutter", "container", "header-", "subnav-"))),
    ("Raios, sombras, movimento", lambda k: k.startswith(("radius-", "shadow-", "scrim", "ease-", "dur-"))),
    ("Editorial (superfície artigo, --ed-*)", lambda k: k.startswith("ed-")),
]
lines = ["# Tokens — referência completa", "",
         "Gerado por `scripts/tokens_doc.py` a partir de `assets/tokens/tokens.json` (que vem de `src/app/globals.css`).",
         "Valores resolvidos (sem `var()`). Temas: **Atual** (padrão, marca) · **Claro** e **Noite** (tokens do blog-starter, D-33).",
         "Aplicar o tema com `data-theme=\"claro|noite\"` em `<html>`; sem atributo = Atual.", ""]
seen = set()
for title, pred in groups:
    keys = [k for k in t["atual"] if pred(k) and k not in seen]
    if not keys:
        continue
    seen.update(keys)
    lines += [f"## {title}", "", "| Token | Atual | Claro | Noite |", "|---|---|---|---|"]
    for k in keys:
        lines.append(f"| `--{k}` | `{t['atual'][k]['$value']}` | `{t['claro'][k]['$value']}` | `{t['noite'][k]['$value']}` |")
    lines.append("")
rest = [k for k in t["atual"] if k not in seen]
if rest:
    lines += ["## Outros", "", "| Token | Atual |", "|---|---|"] + [f"| `--{k}` | `{t['atual'][k]['$value']}` |" for k in rest] + [""]
lines += ["## Breakpoints", ""]
for mq, vals in d["breakpoints"].items():
    lines.append(f"- `{mq}`: " + ", ".join(f"`--{k}: {v['$value']}`" for k, v in vals.items()))
lines += ["", "## Tipografia (D-03)", "",
          "| Papel | Família | Tamanho / altura / peso |", "|---|---|---|",
          "| H1 de seção | DM Sans | 40px → 60px (≥640), lh 1.05, 600, `text-wrap: balance` |",
          "| H2 de seção | DM Sans | 30px → 36px, 600 |",
          "| Lead | Inter | 18px, `--text-secondary` |",
          "| H1 de artigo | DM Sans | `clamp(34px, 1.2rem + 3.6vw, 56px)`, lh 1.05, máx. 22ch |",
          "| Corpo do artigo | Inter | `--ed-fs-body` 17px/1.6 → 18px/1.65 (≥640), medida 68ch |",
          "| H2/H3 de artigo | DM Sans | `--ed-fs-h2` clamp(1.4rem…1.75rem) / `--ed-fs-h3` 1.2rem, 600 |",
          "| Meta | Inter | 14/20 (D-28) |",
          "| Eyebrow | DM Mono | 12px, 500, caixa alta, tracking largo, cor `--action-text` (D-35) |",
          "| Botão | Inter | grande 40px alt./18px · médio 36/16, 500 |",
          "| Destaque (Highlight) | DM Sans | 700, clamp(1.25rem, 1rem + 1vw, 1.625rem), lh 1.3 |",
          "", "Fontes OFL via Google Fonts: `DM+Sans:wght@400;500;600;700`, `Inter:wght@400;500;600;700`, `DM+Mono:wght@400;500`.", ""]
(ROOT / "references/tokens.md").write_text("\n".join(lines), encoding="utf-8")
print("tokens.md:", len(lines), "linhas")
