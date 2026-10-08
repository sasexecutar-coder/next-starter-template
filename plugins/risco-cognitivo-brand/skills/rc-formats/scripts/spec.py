#!/usr/bin/env python3
"""Consulta as specs técnicas de canal (references/channel-specs.csv, de DESIGN-TECH-SCHEMA-001).

Uso:
  python3 spec.py reels                 # busca por termo (canal, placement, peça, formato, spec_id)
  python3 spec.py instagram carousel    # todos os termos precisam bater
  python3 spec.py --list                # lista spec_id
  python3 spec.py reels --json
Mostra só campos aplicáveis; separa VERIFICADO de A_DEFINIR. Nunca converta A_DEFINIR em número.
"""
import csv
import json
import sys
from pathlib import Path

CSV = Path(__file__).resolve().parents[1] / "references" / "channel-specs.csv"
SYN = {"reels": "REELS", "shorts": "SHORTS", "story": "STORIES", "stories": "STORIES", "carrossel": "CAROUSEL",
       "carousel": "CAROUSEL", "newsletter": "NEWSLETTER", "artigo": "ARTICLE", "blog": "BLOG", "thumb": "THUMBNAIL",
       "thumbnail": "THUMBNAIL", "tiktok": "TIKTOK", "linkedin": "LINKEDIN", "youtube": "YOUTUBE", "instagram": "INSTAGRAM",
       "ebook": "EBOOK", "infografico": "INFOGRAPHIC", "infographic": "INFOGRAPHIC", "x": "X-FEED", "threads": "THREADS",
       "onboarding": "ONBOARDING", "prompt": "PROMPT", "workbook": "WORKBOOK", "capa": "MACRO_COVER", "rc": "RISK_CARD"}


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    rows = list(csv.DictReader(CSV.open(encoding="utf-8")))
    if "--list" in sys.argv or not args:
        for r in rows:
            print(r["spec_id"])
        return
    terms = [SYN.get(a.lower(), a.upper()) for a in args]
    hits = [r for r in rows if all(t in " ".join([r["spec_id"], r["channel"], r["placement"], r["piece_type"], r["format"]]).upper() for t in terms)]
    if not hits:
        sys.exit(f"nenhuma spec para: {' '.join(args)} (use --list)")
    out = []
    for r in hits:
        verified = {k: v for k, v in r.items() if v not in ("A_DEFINIR", "NAO_APLICAVEL", "")}
        gaps = [k for k, v in r.items() if v == "A_DEFINIR"]
        out.append({"spec_id": r["spec_id"], "verificado": verified, "a_definir": gaps})
    if "--json" in sys.argv:
        print(json.dumps(out, ensure_ascii=False, indent=2))
        return
    for o in out:
        print(f"\n## {o['spec_id']}")
        for k, v in o["verificado"].items():
            if k != "spec_id":
                print(f"  {k}: {v}")
        print(f"  A_DEFINIR ({len(o['a_definir'])}): {', '.join(o['a_definir'])}")


if __name__ == "__main__":
    main()
