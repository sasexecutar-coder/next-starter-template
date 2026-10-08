# Aplicação por formato

## HTML / ebook / landing
`scripts/apply_brand.py entrada.html -o saida.html --map map.json` → depois `rc-audit`. Cores sem correspondência exata
ficam no relatório (`unmapped`): decida o token para cada uma no `map.json` e rode de novo. Nunca aproxime "no olho".

## DOCX (python-docx)
```python
import sys; sys.path.insert(0, "<plugin>/skills/rc-brand/assets/tokens")
from tokens import TOKENS, rgb
from docx.shared import RGBColor, Pt
T = TOKENS["claro"]                        # documento impresso: tema claro
h.font.color.rgb = RGBColor(*rgb(T["text-primary"]))   # títulos: preto/ink, não azul
link.font.color.rgb = RGBColor(*rgb(T["action-text"])) # azul só em link/ação
style.font.name = "Inter"; heading.font.name = "DM Sans"  # instale as fontes ou declare fallback Arial
```
Cabeçalho: wordmark tipográfico; rodapé: "Risco Cognitivo · página N". Margens 20mm (A4).

## PPTX (python-pptx)
Fundo `brand-canvas`, títulos DM Sans 700 `text-primary`, corpo Inter `text-secondary`, destaque `brand-action-blue`
(máx. 1 elemento azul por slide), 16:9, grade de 8px (0,0833in). Nunca texto sobre imagem sem scrim.

## PDF
Gere a partir do HTML com marca (`render_check.mjs --pdf`), não pinte o PDF depois. @page A4 em `../rc-brand/references/print.md`.

## SVG
`currentColor` + `var(--token)` via CSS; `viewBox` obrigatório; `<title>`. Regras em `../rc-brand/references/vector.md`.
