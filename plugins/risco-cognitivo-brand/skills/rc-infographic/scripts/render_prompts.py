#!/usr/bin/env python3
"""Gera os prompts de infográfico/ilustração de uma campanha com a paleta Risco Cognitivo lida dos tokens.

Uso:
  python3 render_prompts.py campaign.json -o dist/CAMPANHA-01 [--only C01-S01]

- Paleta vem de rc-brand/assets/tokens/tokens.json (nunca hex digitado no template).
- Filtro `sentence` normaliza a pontuação final (corrige o ponto duplo "…diagnóstica.." da versão anterior).
- Valida: ids únicos, perfil em {isometric, editorial, flat}, campos obrigatórios, nenhum número/percentual na
  mensagem (imagens não carregam dado), output 16:9.
- Escreve prompts/<id>.txt e manifest.json (sha256 por arquivo). Status permanece PREPARED: gerar e inspecionar a
  imagem real é outra etapa (GENERATED → VERIFIED).
"""
import argparse
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE.parent / "rc-brand" / "scripts"))
from rc_render import load_json, write  # noqa: E402

PROFILES = {"isometric", "editorial", "flat"}


def palette():
    t = load_json(HERE.parent / "rc-brand" / "assets" / "tokens" / "tokens.json")["theme"]["atual"]
    v = lambda k: t[k]["$value"].upper()
    return {"canvas": v("brand-canvas"), "ink": v("text-primary"), "muted": v("brand-dark-gray"),
            "line": v("brand-light-gray"), "strong": v("border-strong"), "action": v("brand-action-blue"),
            "soft": v("brand-light-blue"), "risk": v("semantic-risk"), "solution": v("semantic-solution")}


def sentence(s):
    s = re.sub(r"\s+", " ", str(s)).strip()
    return re.sub(r"[.;:,\s]+$", "", s) + "."


def validate(c):
    errs = [f"campaign.{k} ausente" for k in ("id", "version", "brand", "title", "principle", "output", "slides") if not c.get(k)]
    out = c.get("output", {})
    if out and abs(out.get("width", 0) / max(out.get("height", 1), 1) - 16 / 9) > 0.01:
        errs.append("output deve ser 16:9")
    seen = set()
    for s in c.get("slides", []):
        sid = s.get("id", "?")
        errs += [f"{sid}: {k} ausente" for k in ("id", "slug", "type", "profile", "message", "scene") if not s.get(k)]
        if sid in seen:
            errs.append(f"{sid}: id duplicado")
        seen.add(sid)
        if s.get("profile") not in PROFILES:
            errs.append(f"{sid}: perfil deve ser um de {sorted(PROFILES)}")
        if re.search(r"\d+\s*%|\b\d{2,}\b", s.get("message", "")):
            errs.append(f"{sid}: mensagem com número — imagem não carrega dado (mova para o texto editorial)")
    return errs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("campaign")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--only")
    a = ap.parse_args()
    c = load_json(a.campaign)
    errs = validate(c)
    if errs:
        sys.exit("campaign.json inválido:\n  " + "\n  ".join(errs))
    from jinja2 import Environment, FileSystemLoader, StrictUndefined
    env = Environment(loader=FileSystemLoader(str(HERE / "templates")), undefined=StrictUndefined, keep_trailing_newline=True)
    env.filters["sentence"] = sentence
    tpl, p, out, files = env.get_template("prompt.jinja"), palette(), Path(a.out), {}
    for s in c["slides"]:
        if a.only and s["id"] != a.only:
            continue
        text = tpl.render(campaign=c, slide=s, p=p)
        assert ".." not in text.replace("...", ""), f"{s['id']}: pontuação duplicada"
        files[f"prompts/{s['id']}.txt"] = write(out / "prompts" / f"{s['id']}.txt", text)
    files["campaign.json"] = write(out / "campaign.json", json.dumps(c, ensure_ascii=False, indent=2) + "\n")
    write(out / "manifest.json", json.dumps({"id": c["id"], "version": c["version"], "status": "PREPARED",
                                             "palette": p, "files": files}, ensure_ascii=False, indent=2) + "\n")
    print(f"{len(files) - 1} prompt(s) → {out}/prompts · manifest.json")


if __name__ == "__main__":
    main()
