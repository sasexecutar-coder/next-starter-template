#!/usr/bin/env python3
"""Build do plugin risco-cognitivo-brand: sincroniza tokens do site, renderiza exemplos, valida e empacota.

Uso (na raiz do repositório):
  python3 scripts/build-brand-plugin.py [--no-sync] [--no-render-png] [--skill-creator <dir>]

Etapas (falha em qualquer uma → exit 1, relatório em dist/build-report.json):
  1 sync     build_tokens.py a partir de src/app/globals.css (+ .next/static/chunks se existir) e tokens.md
  2 tokens   validate_tokens.py (HEX, paridade 1:1 nos 3 temas, contraste AA, derivados)
  3 render   ONBOARDING.html, ebook, cards, carrossel (PNG 1080×1350 se houver Node+Playwright), prompts, galeria
  4 audit    audit_html.py em todos os renders (0 bloqueantes)
  5 struct   frontmatter de skills/agentes/comandos, comandos ↔ commands.md, placeholders {{…}}, JSONs válidos
  6 mcp      initialize, tools/list e 5 tools/call via stdio
  7 hooks    payloads reais nos 3 hooks
  8 package  dist/risco-cognitivo-brand.plugin (zip) e dist/rc-brand.skill (zip)
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
PLUGIN = REPO / "plugins" / "risco-cognitivo-brand"
SK = PLUGIN / "skills"
DIST = PLUGIN / "dist"
PY = sys.executable
EXCLUDE = re.compile(r"(^|/)(dist|__pycache__|node_modules|\.DS_Store)(/|$)|\.pyc$")
report = {"steps": {}, "ok": True}


def step(name, ok, detail=""):
    report["steps"][name] = {"ok": bool(ok), "detail": detail}
    report["ok"] &= bool(ok)
    print(f"{'✓' if ok else '✗'} {name}: {detail}")


def sh(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    return r.returncode, (r.stdout + r.stderr).strip()


def frontmatter(path):
    m = re.match(r"^---\n(.*?)\n---\n", path.read_text(encoding="utf-8"), re.S)
    return m.group(1) if m else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-sync", action="store_true")
    ap.add_argument("--no-render-png", action="store_true")
    ap.add_argument("--skill-creator", default=os.environ.get("SKILL_CREATOR_DIR", ""))
    a = ap.parse_args()
    if DIST.exists():
        shutil.rmtree(DIST)
    out = DIST / "renders"
    out.mkdir(parents=True)

    # 1 sync
    if not a.no_sync:
        cmd = [PY, str(SK / "rc-brand/scripts/build_tokens.py"), "--site", str(REPO / "src/app/globals.css")]
        chunks = REPO / ".next/static/chunks"
        if chunks.exists():
            cmd += ["--compiled", str(chunks)]
        rc, o = sh(cmd)
        rc2, o2 = sh([PY, str(SK / "rc-brand/scripts/tokens_doc.py")])
        step("sync", rc == 0 and rc2 == 0, o.splitlines()[-1] if o else o2)

    # 2 tokens
    rc, o = sh([PY, str(SK / "rc-brand/scripts/validate_tokens.py")])
    step("tokens", rc == 0, o.splitlines()[-1] if o else "")

    # 3 render
    renders, errs = [], []
    onb_json = DIST / "onboarding.json"
    for cmd, target in [
        ([PY, str(SK / "rc-ebook/scripts/onboarding_doc.py"), "-o", str(onb_json)], None),
        ([PY, str(SK / "rc-ebook/scripts/render_ebook.py"), str(onb_json), "-o", str(PLUGIN / "ONBOARDING.html")], PLUGIN / "ONBOARDING.html"),
        ([PY, str(SK / "rc-ebook/scripts/render_ebook.py"), str(SK / "rc-ebook/examples/ebook-entrega.json"), "-o", str(out / "ebook-entrega.html")], out / "ebook-entrega.html"),
        ([PY, str(SK / "rc-cards/scripts/render_cards.py"), "-o", str(out / "cards")], out / "cards"),
        ([PY, str(SK / "rc-components/scripts/render_gallery.py"), "-o", str(out / "primitivos.html")], out / "primitivos.html"),
        ([PY, str(SK / "rc-infographic/scripts/render_prompts.py"), str(SK / "rc-infographic/examples/campaign.json"), "-o", str(out / "CAMPANHA-01")], None),
    ]:
        rc, o = sh(cmd)
        (errs.append(o) if rc else None)
        if target:
            renders.append(target)
    social = [PY, str(SK / "rc-social/scripts/render_carousel.py"), str(SK / "rc-social/examples/carrossel-vies.json"), "-o", str(out / "social")]
    png = not a.no_render_png and shutil.which("node")
    rc, o = sh(social + (["--png", "--pdf"] if png else []))
    if rc:
        errs.append(o)
    renders.append(out / "social")
    pngs = sorted((out / "social").rglob("*.png"))
    step("render", not errs, f"{len(renders)} alvos · {len(pngs)} PNG" + (" · " + " | ".join(e[:200] for e in errs) if errs else ""))

    # 4 audit
    rc, o = sh([PY, str(SK / "rc-audit/scripts/audit_html.py"), *map(str, renders), "--json"])
    try:
        rep = json.loads(o)
        step("audit", rep["blocking"] == 0, f"{len(rep['files'])} arquivos · {rep['blocking']} bloqueantes · {rep['warnings']} avisos")
    except json.JSONDecodeError:
        step("audit", False, o[:300])

    # 5 struct
    problems = []
    for s in sorted(SK.iterdir()):
        fm = frontmatter(s / "SKILL.md") if (s / "SKILL.md").exists() else None
        if not fm or f"name: {s.name}" not in fm or "description:" not in fm:
            problems.append(f"skill {s.name}: frontmatter")
        if a.skill_creator:
            rc, o = sh([PY, str(Path(a.skill_creator) / "scripts/quick_validate.py"), str(s)])
            if rc:
                problems.append(f"quick_validate {s.name}: {o}")
        if len((s / "SKILL.md").read_text(encoding="utf-8").splitlines()) > 500:
            problems.append(f"skill {s.name}: > 500 linhas")
    for ag in (PLUGIN / "agents").glob("*.md"):
        fm = frontmatter(ag) or ""
        if not re.search(rf"^name: {re.escape(ag.stem)}$", fm, re.M) or "<example>" not in fm or "model: inherit" not in fm:
            problems.append(f"agente {ag.stem}: frontmatter")
    ids = re.findall(r"^CV-MARCA-(\d{3}) — /([a-z-]+) — ", (SK / "rc-brand/references/commands.md").read_text(encoding="utf-8"), re.M)
    for n, slug in ids:
        f = PLUGIN / "commands" / f"{slug}.md"
        if not f.exists() or f"CV-MARCA-{n}" not in f.read_text(encoding="utf-8") or "description:" not in (frontmatter(f) or ""):
            problems.append(f"comando /{slug}: ausente ou sem ID/frontmatter")
    if len(ids) != len(list((PLUGIN / "commands").glob("*.md"))):
        problems.append("commands/ e commands.md divergem")
    for f in PLUGIN.rglob("*"):
        rel = f.relative_to(PLUGIN).as_posix()
        if f.is_file() and not EXCLUDE.search(rel):
            if f.suffix in (".md", ".html", ".json") and re.search(r"\{\{\s*[A-Z][A-Z0-9_]+\s*\}\}", f.read_text(encoding="utf-8", errors="ignore")):
                problems.append(f"placeholder em {rel}")
            if f.suffix == ".json":
                try:
                    json.loads(f.read_text(encoding="utf-8"))
                except json.JSONDecodeError as e:
                    problems.append(f"JSON inválido {rel}: {e}")
    step("struct", not problems, f"{len(list(SK.iterdir()))} skills · {len(list((PLUGIN / 'agents').glob('*.md')))} agentes · {len(ids)} comandos" + ("; " + "; ".join(problems) if problems else ""))

    # 6 mcp
    calls = [{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2025-06-18"}},
             {"jsonrpc": "2.0", "id": 2, "method": "tools/list"}]
    for i, (n, args) in enumerate([("get_tokens", {"format": "summary"}), ("get_spec", {"query": "reels"}),
                                   ("check_contrast", {"fg": "#2D5CE6", "bg": "#FFFDFA"}),
                                   ("audit_html", {"path": str(PLUGIN / "ONBOARDING.html")}), ("list_commands", {})], 3):
        calls.append({"jsonrpc": "2.0", "id": i, "method": "tools/call", "params": {"name": n, "arguments": args}})
    r = subprocess.run([PY, str(PLUGIN / "mcp/rc_brand_mcp.py")], input="\n".join(map(json.dumps, calls)) + "\n", capture_output=True, text=True)
    res = [json.loads(l) for l in r.stdout.splitlines() if l.strip()]
    bad = [x["id"] for x in res if "error" in x or x.get("result", {}).get("isError")]
    tools = next((len(x["result"]["tools"]) for x in res if x["id"] == 2), 0)
    step("mcp", len(res) == len(calls) and not bad and tools == 5, f"{len(res)} respostas · {tools} tools · erros {bad or '—'}")

    # 7 hooks
    node = shutil.which("node")
    if node:
        def hook(name, payload):
            return subprocess.run([node, str(PLUGIN / "hooks" / name)], input=json.dumps(payload), capture_output=True, text=True).stdout
        ok = all([
            "SessionStart" in hook("session-start.mjs", {"hook_event_name": "SessionStart"}),
            '"allow"' in hook("approve-handoff.mjs", {"cwd": str(REPO), "tool_input": {"file_path": ".handoff/plan.md"}}),
            hook("approve-handoff.mjs", {"cwd": str(REPO), "tool_input": {"file_path": ".handoff/../x.md"}}) == "",
            hook("approve-handoff.mjs", {"cwd": str(REPO), "tool_input": {"file_path": "src/app/page.tsx"}}) == "",
            "bloqueante" in hook("brand-guard.mjs", {"cwd": str(REPO), "tool_input": {"file_path": str(SK / "rc-brand-layer/examples/foreign.html")}}),
            hook("brand-guard.mjs", {"cwd": str(REPO), "tool_input": {"file_path": str(PLUGIN / "ONBOARDING.html")}}) == "",
        ])
        step("hooks", ok, "6 payloads")
    else:
        step("hooks", True, "node ausente — pulado")

    # 8 package
    def zipdir(src, dest, prefix):
        with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(src.rglob("*")):
                rel = f.relative_to(src).as_posix()
                if f.is_file() and not EXCLUDE.search(rel):
                    z.write(f, f"{prefix}{rel}")
        return dest.stat().st_size
    n1 = zipdir(PLUGIN, DIST / "risco-cognitivo-brand.plugin", "")
    n2 = zipdir(SK / "rc-brand", DIST / "rc-brand.skill", "rc-brand/")
    shutil.copy(PLUGIN / "ONBOARDING.html", DIST / "ONBOARDING.html")
    step("package", n1 > 0 and n2 > 0, f".plugin {n1 // 1024} KB · .skill {n2 // 1024} KB")

    (DIST / "build-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("BUILD", "OK" if report["ok"] else "FALHOU")
    sys.exit(0 if report["ok"] else 1)


if __name__ == "__main__":
    main()
