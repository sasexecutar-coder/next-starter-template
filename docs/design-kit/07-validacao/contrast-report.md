# Relatório de contraste — tokens aplicados no site

Gerado por `scripts/contrast-report.py` (Fase 1). Fórmula WCAG 2.x de luminância relativa: texto normal exige 4,5:1; elementos não textuais exigem 3:1.

| Par | Frente | Fundo | Razão | Requisito | Resultado |
|---|---|---|---|---|---|
| Texto primário sobre canvas | `#000000` | `#fffdfa` | 20.68:1 | text ≥ 4.5:1 | PASS |
| Texto secundário #545454 sobre canvas | `#545454` | `#fffdfa` | 7.46:1 | text ≥ 4.5:1 | PASS |
| Texto secundário sobre superfície sutil | `#545454` | `#f4f3f0` | 6.82:1 | text ≥ 4.5:1 | PASS |
| Link/ação #2D5CE6 sobre canvas | `#2d5ce6` | `#fffdfa` | 5.46:1 | text ≥ 4.5:1 | PASS |
| Link/ação #2D5CE6 sobre superfície sutil | `#2d5ce6` | `#f4f3f0` | 5.00:1 | text ≥ 4.5:1 | PASS |
| Branco sobre botão #2D5CE6 | `#ffffff` | `#2d5ce6` | 5.55:1 | text ≥ 4.5:1 | PASS |
| Branco sobre hover #1F46BF | `#ffffff` | `#1f46bf` | 7.82:1 | text ≥ 4.5:1 | PASS |
| Branco sobre eyebrow #545454 | `#ffffff` | `#545454` | 7.57:1 | text ≥ 4.5:1 | PASS |
| Branco sobre indigo #0E025D | `#ffffff` | `#0e025d` | 17.72:1 | text ≥ 4.5:1 | PASS |
| Indigo sobre branco (botão do CTA final) | `#0e025d` | `#ffffff` | 17.72:1 | text ≥ 4.5:1 | PASS |
| Preto sobre callout (#CBD4FF 48% no canvas) | `#000000` | `#e6e9fc` | 17.43:1 | text ≥ 4.5:1 | PASS |
| Preto sobre chip de atenção #FFE659 | `#000000` | `#ffe659` | 16.71:1 | text ≥ 4.5:1 | PASS |
| Ink de atenção #8A5A00 sobre canvas | `#8a5a00` | `#fffdfa` | 5.84:1 | text ≥ 4.5:1 | PASS |
| Preto sobre fundo de atenção 40% (/mapas) | `#000000` | `#fff4ba` | 18.90:1 | text ≥ 4.5:1 | PASS |
| Amarelo #FFE659 sobre canvas (proibido como texto/linha) | `#ffe659` | `#fffdfa` | 1.24:1 | non-text ≥ 3.0:1 | abaixo de 3:1 — só decorativo, nunca único portador de significado |
| Vermelho risco #FF0000 sobre canvas (borda) | `#ff0000` | `#fffdfa` | 3.94:1 | non-text ≥ 3.0:1 | PASS |
| Verde solução #00BF63 sobre canvas (borda) | `#00bf63` | `#fffdfa` | 2.40:1 | non-text ≥ 3.0:1 | abaixo de 3:1 — só decorativo, nunca único portador de significado |
| Borda #2D5CE6 do botão secundário sobre canvas | `#2d5ce6` | `#fffdfa` | 5.46:1 | non-text ≥ 3.0:1 | PASS |
| Texto da pílula selecionada #4F53D9 sobre branco | `#4f53d9` | `#ffffff` | 5.88:1 | text ≥ 4.5:1 | PASS |
| Texto da pílula #000 sobre branco 94% | `#000000` | `#ffffff` | 21.00:1 | text ≥ 4.5:1 | PASS |
| Marcador #6E72F0 sobre canvas (não textual) | `#6e72f0` | `#fffdfa` | 3.88:1 | non-text ≥ 3.0:1 | PASS |
| Borda do card selecionado #6E72F0 sobre branco | `#6e72f0` | `#ffffff` | 3.94:1 | non-text ≥ 3.0:1 | PASS |
| Índigo #6E72F0 como texto (proibido; só marcador) | `#6e72f0` | `#ffffff` | 3.94:1 | text-proibido ≥ 4.5:1 | não usar como texto (registrado em D-23) |

Pares de texto reprovados: **0**.

Observações:
- `#FFE659` não é usado como texto nem como linha isolada sobre o creme (D-01); aparece só como fundo de chip, com texto preto.
- Vermelho e verde semânticos aparecem como borda na cadeia de relações, sempre com o rótulo em texto preto; a cor nunca é o único portador do significado.
- `#6E72F0` (índigo do cérebro, D-23) aparece só como marcador, borda e traço; texto no índigo usa `#4F53D9`.
- O fundo do callout é `#CBD4FF` a 48% composto sobre o canvas (`#e6e9fc`).
