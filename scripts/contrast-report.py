"""Gera docs/design-kit/07-validacao/contrast-report.md a partir dos pares de token usados no site."""

def lum(h):
    h = h.lstrip("#"); r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def blend(fg, bg, a):
    fg, bg = fg.lstrip("#"), bg.lstrip("#")
    return "#" + "".join(f"{round(int(fg[i:i+2],16)*a + int(bg[i:i+2],16)*(1-a)):02x}" for i in (0, 2, 4))

def ratio(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)

CANVAS = "#fffdfa"; SUBTLE = "#f4f3f0"

# Temas (D-33): só os neutros mudam; a marca fica.
THEMES = {
    "Atual (marca)": dict(page=CANVAS, subtle=SUBTLE, raised="#ffffff", text="#000000", muted="#545454", action="#2d5ce6", control="#85847f", strong="#cbcbcb", brain_text="#4f53d9"),
    "Claro (blog-starter)": dict(page="#ffffff", subtle="#fafafa", raised="#ffffff", text="#171717", muted="#333333", action="#2d5ce6", control="#85847f", strong="#cccccc", brain_text="#4f53d9"),
    "Noite (blog-starter)": dict(page="#0f172a", subtle="#1e293b", raised="#1e293b", text="#ededed", muted="#94a3b8", action="#8fa9ff", control="#94a3b8", strong="#475569", brain_text="#a3a8f5"),
}

def theme_pairs(t):
    return [
        ("Texto primário sobre fundo", t["text"], t["page"], "text"),
        ("Texto primário sobre superfície", t["text"], t["subtle"], "text"),
        ("Texto secundário sobre fundo", t["muted"], t["page"], "text"),
        ("Texto secundário sobre superfície/painel", t["muted"], t["raised"], "text"),
        ("Texto secundário sobre superfície sutil", t["muted"], t["subtle"], "text"),
        ("Marca como texto (eyebrow, link, negrito, ativo) sobre fundo", t["action"], t["page"], "text"),
        ("Marca como texto sobre painel", t["action"], t["raised"], "text"),
        ("Marca como texto sobre superfície sutil", t["action"], t["subtle"], "text"),
        ("Branco sobre botão primário #2D5CE6", "#ffffff", "#2d5ce6", "text"),
        ("Branco sobre hover #1F46BF", "#ffffff", "#1f46bf", "text"),
        ("Branco sobre índigo #0E025D (bloco final)", "#ffffff", "#0e025d", "text"),
        ("Preto sobre chip GAP #FFE659", "#000000", "#ffe659", "text"),
        ("Rótulo do cérebro sobre painel", t["brain_text"], t["raised"], "text"),
        ("Borda de controle sobre fundo", t["control"], t["page"], "non-text"),
        ("Borda de controle sobre painel", t["control"], t["raised"], "non-text"),
        ("Colchete/segmento da marca sobre fundo", t["action"], t["page"], "non-text"),
        ("Botão primário #2D5CE6 sobre fundo", "#2d5ce6", t["page"], "non-text"),
        ("Marcador #6E72F0 sobre fundo", "#6e72f0", t["page"], "non-text"),
        ("Vermelho risco #FF0000 sobre painel (borda)", "#ff0000", t["raised"], "non-text"),
        ("Verde solução #00BF63 sobre painel (borda)", "#00bf63", t["raised"], "non-text"),
    ]

sections, fails = [], 0
for tname, t in THEMES.items():
    rows = []
    for name, fg, bg, kind in theme_pairs(t):
        r = ratio(fg, bg); need = 4.5 if kind == "text" else 3.0
        if r >= need: status = "PASS"
        elif kind == "text": status = "FAIL"; fails += 1
        else: status = "abaixo de 3:1 — só decorativo, com rótulo em texto ao lado"
        rows.append(f"| {name} | `{fg}` | `{bg}` | {r:.2f}:1 | {kind} ≥ {need}:1 | {status} |")
    sections.append(f"## {tname}\n\n| Par | Frente | Fundo | Razão | Requisito | Resultado |\n|---|---|---|---|---|---|\n" + "\n".join(rows))

md = f"""# Relatório de contraste — tokens aplicados no site

Gerado por `scripts/contrast-report.py`. Fórmula WCAG 2.x de luminância relativa: texto normal exige 4,5:1; elementos não textuais exigem 3:1. Um bloco por tema (D-33).

{chr(10).join(s + chr(10) for s in sections)}
Pares de texto reprovados: **{fails}**.

Observações:
- `#FFE659` só aparece como fundo do chip GAP, com texto preto (D-35); nunca como texto ou linha.
- Vermelho e verde semânticos aparecem como borda na cadeia de relações, sempre com o rótulo em texto; a cor nunca é o único portador do significado.
- `#6E72F0` (índigo do cérebro, D-23) aparece só como marcador, borda e traço; texto no índigo usa `#4F53D9` (`#A3A8F5` no Noite).
- No Noite, a marca como texto usa `#8FA9FF` (tom claro de `#2D5CE6`); o botão continua `#2D5CE6` com texto branco.
"""
open("docs/design-kit/07-validacao/contrast-report.md", "w").write(md)
print(md[-1500:]); print("FAILS", fails)
