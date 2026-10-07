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
CALLOUT = blend("#cbd4ff", CANVAS, 0.48); ATTN_SOFT = blend("#ffe659", CANVAS, 0.40)
PAIRS = [
    ("Texto primário sobre canvas", "#000000", CANVAS, "text"),
    ("Texto secundário #545454 sobre canvas", "#545454", CANVAS, "text"),
    ("Texto secundário sobre superfície sutil", "#545454", SUBTLE, "text"),
    ("Link/ação #2D5CE6 sobre canvas", "#2d5ce6", CANVAS, "text"),
    ("Link/ação #2D5CE6 sobre superfície sutil", "#2d5ce6", SUBTLE, "text"),
    ("Branco sobre botão #2D5CE6", "#ffffff", "#2d5ce6", "text"),
    ("Branco sobre hover #1F46BF", "#ffffff", "#1f46bf", "text"),
    ("Branco sobre eyebrow #545454", "#ffffff", "#545454", "text"),
    ("Branco sobre indigo #0E025D", "#ffffff", "#0e025d", "text"),
    ("Indigo sobre branco (botão do CTA final)", "#0e025d", "#ffffff", "text"),
    ("Preto sobre callout (#CBD4FF 48% no canvas)", "#000000", CALLOUT, "text"),
    ("Preto sobre chip de atenção #FFE659", "#000000", "#ffe659", "text"),
    ("Ink de atenção #8A5A00 sobre canvas", "#8a5a00", CANVAS, "text"),
    ("Preto sobre fundo de atenção 40% (/mapas)", "#000000", ATTN_SOFT, "text"),
    ("Amarelo #FFE659 sobre canvas (proibido como texto/linha)", "#ffe659", CANVAS, "non-text"),
    ("Vermelho risco #FF0000 sobre canvas (borda)", "#ff0000", CANVAS, "non-text"),
    ("Verde solução #00BF63 sobre canvas (borda)", "#00bf63", CANVAS, "non-text"),
    ("Borda #2D5CE6 do botão secundário sobre canvas", "#2d5ce6", CANVAS, "non-text"),
]

rows, fails = [], 0
for name, fg, bg, kind in PAIRS:
    r = ratio(fg, bg); need = 4.5 if kind == "text" else 3.0
    if r >= need: status = "PASS"
    elif kind == "text": status = "FAIL"; fails += 1
    else: status = "abaixo de 3:1 — só decorativo, nunca único portador de significado"
    rows.append(f"| {name} | `{fg}` | `{bg}` | {r:.2f}:1 | {kind} ≥ {need}:1 | {status} |")

md = f"""# Relatório de contraste — tokens aplicados no site

Gerado por `scripts/contrast-report.py` (Fase 1). Fórmula WCAG 2.x de luminância relativa: texto normal exige 4,5:1; elementos não textuais exigem 3:1.

| Par | Frente | Fundo | Razão | Requisito | Resultado |
|---|---|---|---|---|---|
{chr(10).join(rows)}

Pares de texto reprovados: **{fails}**.

Observações:
- `#FFE659` não é usado como texto nem como linha isolada sobre o creme (D-01); aparece só como fundo de chip, com texto preto.
- Vermelho e verde semânticos aparecem como borda na cadeia de relações, sempre com o rótulo em texto preto; a cor nunca é o único portador do significado.
- O fundo do callout é `#CBD4FF` a 48% composto sobre o canvas (`{CALLOUT}`).
"""
open("docs/design-kit/07-validacao/contrast-report.md", "w").write(md)
print("\n".join(rows)); print("FAILS", fails)
