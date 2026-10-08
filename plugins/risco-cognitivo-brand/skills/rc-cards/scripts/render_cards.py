#!/usr/bin/env python3
"""Converte cards.json em cards HTML A4 com a marca Risco Cognitivo (tutorial · mockup · prompt integral).

Uso:
  python3 render_cards.py [cards.json] [-o dist/] [--only CARD-001]

Valida antes de renderizar (falha = nada é escrito): campos obrigatórios, slug único, steps[].n sequencial 1..N,
mockup.type conhecido, prompt_full não vazio, sem nome de outra marca. Gera também manifest.json com sha256.
O prompt_full é transcrição literal da fonte: o script nunca o reescreve.
"""
import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE.parent / "rc-brand" / "scripts"))
from rc_render import brand_css, env_for, load_json, write  # noqa: E402

MOCKUPS = {"calendar", "report", "callouts"}
FOREIGN = ("Custo Cognitivo", "X-Ray", "EXECUTAR Copiloto")


def validate(data):
    errs, slugs = [], set()
    for k in ("name", "brand", "version"):
        if not data.get("project", {}).get(k):
            errs.append(f"project.{k} ausente")
    for c in data.get("cards", []):
        cid = c.get("id", "?")
        for path in ("slug", "version", "status", "meta.title", "meta.lang", "meta.description", "content.headline",
                     "content.steps", "mockup.type", "prompt_full", "source_evidence.class"):
            cur = c
            for part in path.split("."):
                cur = cur.get(part) if isinstance(cur, dict) else None
            if cur in (None, "", []):
                errs.append(f"{cid}: {path} ausente")
        if c.get("slug") in slugs:
            errs.append(f"{cid}: slug duplicado {c['slug']}")
        slugs.add(c.get("slug"))
        ns = [s.get("n") for s in c.get("content", {}).get("steps", [])]
        if ns != list(range(1, len(ns) + 1)):
            errs.append(f"{cid}: steps[].n deve ser 1..{len(ns)} (recebido {ns})")
        if not 2 <= len(ns) <= 4:
            errs.append(f"{cid}: use 2 a 4 passos (recebido {len(ns)})")
        if c.get("mockup", {}).get("type") not in MOCKUPS:
            errs.append(f"{cid}: mockup.type deve ser um de {sorted(MOCKUPS)}")
        visible = json.dumps({k: c.get(k) for k in ("meta", "content", "mockup", "prompt_full")}, ensure_ascii=False).lower()
        errs += [f"{cid}: nome de outra marca: {n}" for n in FOREIGN if n.lower() in visible]
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("data", nargs="?", default=str(HERE / "examples" / "cards.json"))
    ap.add_argument("-o", "--out", default="dist")
    ap.add_argument("--only")
    a = ap.parse_args()
    data = load_json(a.data)
    errs = validate(data)
    if errs:
        sys.exit("cards.json inválido:\n  " + "\n  ".join(errs))
    tpl = env_for(HERE / "templates").get_template("card.html.j2")
    css, out, manifest = brand_css(), Path(a.out), []
    for card in data["cards"]:
        if card["status"] != "active" or (a.only and card["id"] != a.only):
            continue
        target = out / f"{card['slug']}.html"
        digest = write(target, tpl.render(project=data["project"], card=card, brand_css=css))
        manifest.append({"id": card["id"], "file": target.name, "sha256": digest})
        print(target)
    write(out / "manifest.json", json.dumps({"project": data["project"]["name"], "version": data["project"]["version"],
                                             "date": date.today().isoformat(), "files": manifest}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
