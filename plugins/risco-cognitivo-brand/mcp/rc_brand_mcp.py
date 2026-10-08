#!/usr/bin/env python3
"""Servidor MCP (stdio, JSON-RPC 2.0, Python puro) da marca Risco Cognitivo.

Ferramentas:
  get_tokens(theme="atual", format="json"|"css"|"summary")   tokens resolvidos ou o tokens.css
  get_spec(query)                                            specs de canal (verificado × A_DEFINIR)
  check_contrast(fg, bg)                                     razão WCAG e status AA
  audit_html(path, print=false)                              auditoria de marca de um arquivo/pasta
  list_commands()                                            IDs CV-MARCA, slashes e sinônimos
Uso em outro cliente MCP: {"command": "python3", "args": ["<plugin>/mcp/rc_brand_mcp.py"]}
"""
import json
import re
import subprocess
import sys
from pathlib import Path

PLUGIN = Path(__file__).resolve().parents[1]
SK = PLUGIN / "skills"
sys.path.insert(0, str(SK / "rc-brand" / "scripts"))
from contrast import ratio  # noqa: E402

VERSION = "1.0.0"
TOOLS = [
    {"name": "get_tokens", "description": "Tokens da marca Risco Cognitivo por tema (atual, claro, noite). format: json (padrão), css ou summary.",
     "inputSchema": {"type": "object", "properties": {"theme": {"type": "string", "enum": ["atual", "claro", "noite"]},
                                                       "format": {"type": "string", "enum": ["json", "css", "summary"]}}}},
    {"name": "get_spec", "description": "Spec técnica de canal/peça (45 specs). Separa verificado de A_DEFINIR; nunca preencha A_DEFINIR.",
     "inputSchema": {"type": "object", "properties": {"query": {"type": "string", "description": "ex.: 'instagram carousel', 'reels', 'newsletter'"}}, "required": ["query"]}},
    {"name": "check_contrast", "description": "Razão de contraste WCAG entre duas cores (HEX ou rgb) e status AA para texto (4.5) e controles/texto grande (3.0).",
     "inputSchema": {"type": "object", "properties": {"fg": {"type": "string"}, "bg": {"type": "string"}}, "required": ["fg", "bg"]}},
    {"name": "audit_html", "description": "Auditoria de marca (tokens, fontes, @page, SVG, acessibilidade básica, nomes de outras marcas) em arquivo ou pasta local.",
     "inputSchema": {"type": "object", "properties": {"path": {"type": "string"}, "print": {"type": "boolean"}}, "required": ["path"]}},
    {"name": "list_commands", "description": "Comandos do plugin (CV-MARCA-001…012) com slash, ação e sinônimo verbal.",
     "inputSchema": {"type": "object", "properties": {}}},
]


def tokens(theme="atual", fmt="json"):
    if fmt == "css":
        return (SK / "rc-brand" / "assets" / "tokens" / "tokens.css").read_text(encoding="utf-8")
    t = json.loads((SK / "rc-brand" / "assets" / "tokens" / "tokens.json").read_text(encoding="utf-8"))["theme"][theme]
    vals = {k: v["$value"] for k, v in t.items()}
    if fmt == "summary":
        keys = ["brand-action-blue", "brand-action-blue-strong", "brand-canvas", "text-primary", "text-secondary",
                "brand-dark-indigo", "brand-light-blue", "semantic-risk", "semantic-solution", "attention-surface",
                "surface-page", "action-text"]
        return json.dumps({k: vals[k] for k in keys if k in vals} | {"fonts": "DM Sans / Inter / DM Mono",
                          "space": "4 8 12 16 24 32 48 64 96", "radius": "2 4 8 12 16"}, ensure_ascii=False, indent=2)
    return json.dumps(vals, ensure_ascii=False, indent=2)


def run(args):
    r = subprocess.run([sys.executable, "-I", *args], capture_output=True, text=True, timeout=60)
    return (r.stdout or r.stderr).strip()


def commands():
    text = (SK / "rc-brand" / "references" / "commands.md").read_text(encoding="utf-8")
    syn = {s: q for q, s in re.findall(r'"([^"]+)" = (/[a-z-]+)', text)}
    rows = [dict(zip(("id", "slash", "action"), m)) for m in re.findall(r"^(CV-MARCA-\d{3}) — (/[a-z-]+) — (.+)$", text, re.M)]
    for r in rows:
        r["say"] = syn.get(r["slash"], "")
    return json.dumps(rows, ensure_ascii=False, indent=2)


def call(name, a):
    if name == "get_tokens":
        return tokens(a.get("theme", "atual"), a.get("format", "json"))
    if name == "get_spec":
        return run([str(SK / "rc-formats" / "scripts" / "spec.py"), *str(a["query"]).split()]) or "nenhuma spec encontrada"
    if name == "check_contrast":
        r = ratio(a["fg"], a["bg"])
        return json.dumps({"fg": a["fg"], "bg": a["bg"], "ratio": round(r, 2), "aa_text": r >= 4.5, "aa_large_or_ui": r >= 3.0})
    if name == "audit_html":
        p = Path(a["path"]).expanduser()
        if not p.exists():
            raise ValueError(f"caminho não encontrado: {p}")
        return run([str(SK / "rc-audit" / "scripts" / "audit_html.py"), "--json"] + (["--print"] if a.get("print") else []) + ["--", str(p)])
    if name == "list_commands":
        return commands()
    raise ValueError(f"ferramenta desconhecida: {name}")


def handle(msg):
    if not isinstance(msg, dict):
        return {"jsonrpc": "2.0", "id": None, "error": {"code": -32600, "message": "requisição inválida"}}
    m, mid = msg.get("method"), msg.get("id")
    if m == "initialize":
        res = {"protocolVersion": (msg.get("params") or {}).get("protocolVersion", "2025-06-18"),
               "capabilities": {"tools": {}}, "serverInfo": {"name": "rc-brand", "version": VERSION}}
    elif m == "tools/list":
        res = {"tools": TOOLS}
    elif m == "tools/call":
        p = msg.get("params") or {}
        try:
            res = {"content": [{"type": "text", "text": call(p.get("name"), p.get("arguments") or {})}]}
        except Exception as e:  # erro de ferramenta vai para o modelo, não derruba o servidor
            res = {"content": [{"type": "text", "text": f"erro: {e}"}], "isError": True}
    elif m == "ping":
        res = {}
    elif mid is None:
        return None  # notificações (initialized, cancelled)
    else:
        return {"jsonrpc": "2.0", "id": mid, "error": {"code": -32601, "message": f"método não suportado: {m}"}}
    return {"jsonrpc": "2.0", "id": mid, "result": res}


def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            out = handle(json.loads(line))
        except (json.JSONDecodeError, RecursionError):
            out = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "JSON inválido"}}
        if out is not None:
            sys.stdout.write(json.dumps(out, ensure_ascii=False) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
