---
name: rc-infographic
description: >-
  Direção visual e prompts de infográfico, ilustração e figura vetorial da marca Risco Cognitivo para geradores de
  imagem ou ilustradores: campaign.json (roteiro de cenas) + prompt.jinja com a paleta mono-first lida dos tokens, três
  perfis (isometric, editorial, flat), manifest com sha256 e estados PREPARED → GENERATED → VERIFIED. Use quando pedirem
  infográfico, ilustração, "cena ambiente" 16:9, imagem para artigo/campanha, prompt para Midjourney/DALL·E/Imagen/
  Firefly, figura conceitual ou briefing visual de uma campanha.
---

# Infográfico e ilustração (CV-MARCA-009 · /marca-infografico)

Imagem conceitual **não carrega texto nem dado**: título, números, fórmulas e definições ficam no conteúdo editorial
associado. A imagem mostra a relação; o texto prova. Isso evita número inventado virando "evidência" visual.

## Fluxo
1. **Roteiro** — uma cena por mensagem; até 10 por campanha. Escolha o perfil por função:
   | Perfil | Quando |
   |---|---|
   | isometric | magnitude, arquitetura, sistema, cadeia de dependências |
   | editorial | pessoas e situações (line art técnico arquitetônico) |
   | flat | sequência, funil, comparação simples |
   Gere primeiro 1 referência por perfil; depois do aceite, use-a como referência dos demais do mesmo perfil.
2. **campaign.json** — modelo em `examples/campaign.json` (RC-CAMPAIGN-001, 10 cenas). Campos por cena: `id, slug,
   type, profile, message, scene, source_fields, status, output_name, evidence`.
3. **Prompts**
   ```bash
   python3 scripts/render_prompts.py campaign.json -o dist/CAMPANHA-01
   ```
   Paleta injetada de `tokens.json` (canvas, tinta, cinzas, azul D-01 só no foco, vermelho/verde só com significado).
   Bloqueia mensagem com número, perfil desconhecido, id duplicado, saída fora de 16:9.
4. **Gerar e registrar** (fora do script): por imagem, guarde modelo/versão, prompt, referências, parâmetros, seed,
   arquivo, dimensões **medidas**, hash e revisão. Só então `GENERATED`; `VERIFIED` após inspeção humana + rc-audit.

## Regras visuais (resumo de `../rc-brand/references/vector.md`)
- 80–95% neutro; ≤ 3 cores semânticas; ≤ 7 elementos primários; sem gradiente, sombra pesada, foto, cartoon, 3D realista.
- Isométrico: 30°/150°/90°, sem fuga, faces claro/médio/escuro; sempre existe a versão 2D/tabela no texto.
- Ética da campanha: a pessoa não é o risco; nada de cérebro quebrado, diagnóstico, inferioridade, cura ou garantia.
- Nome final: `{campaign_id}__{asset_id}__{spec_id}__v{version}.png` (spec `SPEC-MASTER-VISUAL-INFOGRAPHIC-LANDSCAPE`).
- Figura vetorial determinística (SVG no código) em vez de imagem gerada: siga `vector.md` e audite com rc-audit.
