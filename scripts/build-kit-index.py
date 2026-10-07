"""Gera MASTER-INDEX.csv, 00-governanca/MAPPING.json e 07-validacao/verification.json do design kit.

Fonte de verdade dos 33 originais: o bloco "files" do MAPPING.json (v1.0.0), nunca reescrito.
Uso: python3 scripts/build-kit-index.py
"""
import csv, hashlib, json, os, re, sys

BASE = "docs/design-kit"
MAPPING = f"{BASE}/00-governanca/MAPPING.json"
SELF_REF = {"MASTER-INDEX.csv", "00-governanca/MAPPING.json", "07-validacao/verification.json"}
GENERATED = {"README.md", "00-governanca/DECISIONS.md", "07-validacao/contrast-report.md"}
ADDED_SOURCES = {
    "01-referencias/design-systems/nocturne/": ("Arquivo.zip/nocturne-02c4ffae-3abc-4626-b190-1a7caf3c77c7/", "D-13"),
    "04-handoff/prototipos/brain-home-v2.html": ("Arquivo.zip/Brain Home v2 2.html", "D-20; D-21"),
}

def sha(path):
    return hashlib.sha256(open(os.path.join(BASE, path), "rb").read()).hexdigest()

def version(title):
    m = re.search(r"v(\d+\.\d+(?:\.\d+)?)", title)
    return m.group(1) if m else "A DEFINIR"

def depends(title):
    m = re.search(r"complementar ao ([A-Z-]+)", title)
    return m.group(1) if m else ""

mapping = json.load(open(MAPPING, encoding="utf-8"))
originals = mapping["files"]
rows, id_map, problems = [], [], []

for f in originals:
    rid = f["id_existente"] if f["id_existente"] != "A DEFINIR" else f["registro_id"]
    h = sha(f["caminho"])
    if h != f["evidencia"]:
        problems.append(f"hash divergente: {f['caminho']}")
    rows.append({
        "id": rid, "titulo": f["titulo"], "caminho": f["caminho"], "tipo": f["tipo"],
        "versao": version(f["titulo"]), "status": "PRESERVADO", "depende_de": depends(f["titulo"]),
        "aplica_a": f["aplica_a"], "fonte": f["fonte"], "evidencia": h,
    })
    id_map.append({"registro_id": f["registro_id"], "id": rid, "nome_original": f["fonte"], "caminho": f["caminho"]})

known = {r["caminho"] for r in rows}
all_files = sorted(
    os.path.relpath(os.path.join(d, n), BASE).replace(os.sep, "/")
    for d, _, ns in os.walk(BASE) for n in ns
)
added, n_add, n_gen = [], 34, 1
for path in all_files:
    if path in known:
        continue
    tipo = path.rsplit(".", 1)[-1].lower()
    if path in SELF_REF or path in GENERATED:
        rid = f"RC-KIT-GOV-{n_gen:03d}"; n_gen += 1
        rows.append({
            "id": rid, "titulo": os.path.basename(path), "caminho": path, "tipo": tipo, "versao": "1.1.0",
            "status": "GERADO", "depende_de": "", "aplica_a": path.split("/")[0] if "/" in path else "raiz",
            "fonte": "gerado na aplicação da Fase 1",
            "evidencia": "AUTORREFERENTE" if path in SELF_REF else sha(path),
        })
        continue
    src = next(((s, dec) for k, (s, dec) in ADDED_SOURCES.items() if path.startswith(k)), None)
    if not src:
        problems.append(f"arquivo sem origem registrada: {path}")
        continue
    prefix, decision = src
    fonte = prefix + os.path.basename(path) if prefix.endswith("/") else prefix
    rid = f"RC-KIT-FILE-{n_add:03d}"; n_add += 1
    rows.append({
        "id": rid, "titulo": os.path.basename(path), "caminho": path, "tipo": tipo, "versao": "A DEFINIR",
        "status": "PRESERVADO", "depende_de": "", "aplica_a": path.split("/")[0],
        "fonte": fonte, "evidencia": sha(path),
    })
    added.append({"registro_id": rid, "id": rid, "nome_original": fonte, "caminho": path, "decisao": decision})

rows.sort(key=lambda r: r["caminho"])
ids = [r["id"] for r in rows]
paths = [r["caminho"] for r in rows]
if len(set(ids)) != len(ids): problems.append("IDs duplicados")
if len(set(paths)) != len(paths): problems.append("caminhos duplicados")

with open(f"{BASE}/MASTER-INDEX.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=["id", "titulo", "caminho", "tipo", "versao", "status", "depende_de", "aplica_a", "fonte", "evidencia"])
    w.writeheader(); w.writerows(rows)

mapping["id_map"] = id_map
mapping["files_added"] = added
json.dump(mapping, open(MAPPING, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

verification = {
    "status": "PASS" if not problems else "FAIL",
    "scope": "preservação de bytes dos originais, unicidade de IDs/caminhos, cobertura do índice",
    "source_files": len(originals),
    "preserved_files": sum(1 for r in rows if r["status"] == "PRESERVADO" and r["caminho"] in known),
    "added_files": len(added),
    "generated_files": n_gen - 1,
    "index_rows": len(rows),
    "files_on_disk": len(all_files),
    "all_source_hashes_match": not any(p.startswith("hash") for p in problems),
    "unique_ids": len(set(ids)) == len(ids),
    "unique_destination_paths": len(set(paths)) == len(paths),
    "historical_audit_revalidated": False,
    "missing_historical_audit_inputs": ["risco-cognitivo.mdx", "risco-cognitivo-reading-flow-v1.mdx"],
    "contrast_report": "07-validacao/contrast-report.md",
    "problems": problems,
}
json.dump(verification, open(f"{BASE}/07-validacao/verification.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(json.dumps(verification, ensure_ascii=False, indent=2))
sys.exit(1 if problems else 0)
