---
name: rc-brand-layer
description: >-
  Aplica a marca Risco Cognitivo a um artefato que já existe (HTML, landing, card, DOCX, PPTX, PDF, SVG) ou converte
  material de outra marca/ template genérico para a identidade Risco Cognitivo — trocando cores por tokens, fontes,
  nomes e checando o checklist bloqueante. Também cobre co-branding (outra identidade sobre a estrutura da marca).
  Use quando disserem "aplica a marca", "deixa isso com a cara do Risco Cognitivo", "converte para a nossa identidade",
  "white-label", "troca as cores/fontes", ou entregarem um arquivo pronto para padronizar.
---

# Camada de marca (CV-MARCA-002 · /marca-aplicar)

A marca é aplicada **por cima** do artefato: estrutura e conteúdo ficam, identidade muda. Redesenho (novas seções,
novo layout) não é desta skill → use a skill do tipo de asset (rc-ebook, rc-social, rc-cards…).

## Fluxo
1. **Ler a fonte da identidade** — `../rc-brand/assets/tokens/tokens.json` (ou `brand_config.json` declarado para
   co-branding). Sem fonte → BLOCKED. Nunca deduza cor de um print, logo ou conversa anterior.
2. **Aplicar**
   ```bash
   python3 scripts/apply_brand.py entrada.html -o saida.html --map map.json --report
   ```
   - cor idêntica a um token → `var(--token)`; texto branco sobre cor → `--text-on-dark`;
   - cor sem correspondência → fica e vai para `unmapped` (decida o token no `map.json`, ex. `examples/map.json`);
   - fontes → `var(--font-display)` em títulos, `var(--font-body)` no resto;
   - nomes estrangeiros só pelo mapa explícito (`"names"`), nunca por suposição;
   - idempotente: rodar duas vezes não duplica a injeção.
   Para DOCX/PPTX/PDF/SVG: `references/formats.md`.
3. **Checklist bloqueante** — `references/checklist.md` (6 itens). Falhou um → REWORK.
4. **Auditar** — `python3 ../rc-audit/scripts/audit_html.py saida.html` (0 bloqueantes) e, se for imprimível, `--print`.

## Conflitos conhecidos (já decididos)
Laranja `#F56A1C` (schema/CMD-REACT), azul `#2563EB` (CAMPANHA-01) e o nome "Custo Cognitivo" (cards) são de fontes
anteriores: remapeie para `brand-action-blue` (D-01) e "Risco Cognitivo". Registro em
`../rc-brand/references/evidence/conflicts.md`.

## Relatório de saída
```
Arquivo: saida.html · fonte: tokens.json (atual)
Cores → token: N · sem mapa: lista · fontes trocadas: N · nomes: {…}
Checklist: 6/6 · audit_html: 0 bloqueantes, K avisos
```
