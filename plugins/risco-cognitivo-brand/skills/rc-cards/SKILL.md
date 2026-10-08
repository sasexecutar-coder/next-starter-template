---
name: rc-cards
description: >-
  Conversor de cards de prompt da marca Risco Cognitivo: transforma um prompt, workflow ou print de instrução em card
  HTML A4 mobile-first com três áreas (tutorial humano em passos, mockup do entregável, prompt integral copiável), mais
  metadados OG, manifest com sha256 e textos de post. Use quando pedirem "transforma em card", "card de prompt",
  "FotoPrompt", "converter esse prompt/print em card", "coleção de cards" ou material imprimível de prompt para IA.
---

# Cards de prompt (CV-MARCA-006 · /marca-card)

Arquitetura aprovada: **fonte canônica (JSON) → template (Jinja) → dist (HTML) + manifest**. Conteúdo, layout e
artefato nunca se misturam; o prompt é transcrito literalmente e nunca "melhorado" pelo render.

## Fluxo
1. **Extrair** do material de origem: título, 2–4 passos, tipo de mockup e o prompt integral (literal). Registre a
   evidência: `A · Observado` (transcrito da fonte) ou `E · Inferido` (camada editorial: tutorial e mockup).
2. **Escrever o JSON** seguindo `examples/cards.json` (3 cards de referência). Campos: `id`, `slug`, `version`,
   `status`, `tags`, `source_evidence`, `meta` (title, description, og_*, lang, canonical — `null` enquanto o domínio
   público estiver A DEFINIR), `content` (number, eyebrow, headline, subheadline, steps[n,title,desc]), `mockup`
   (`calendar` | `report` | `callouts`, title, caption), `prompt_full`; opcionais `fotoprompt` e `post`.
3. **Render + validação**
   ```bash
   python3 scripts/render_cards.py meus-cards.json -o dist/      # ou sem argumento para os exemplos
   ```
   Bloqueia: campo ausente, slug duplicado, `steps[].n` fora de 1..N, mais de 4 passos, mockup desconhecido, nome de
   outra marca. Gera `dist/manifest.json` (id, arquivo, sha256).
4. **Verificar**: `python3 ../rc-audit/scripts/audit_html.py dist/` (0 bloqueantes) e
   `node ../rc-audit/scripts/render_check.mjs dist/<card>.html --pdf dist/<card>.pdf` (A4, sem rolagem horizontal).

## Regras de marca do card
- Cores só por token: azul de ação em número do passo, régua do prompt e mockup; nada de cor por card.
- Títulos DM Sans 800; passos e legendas Inter; prompt e metadados DM Mono.
- Sem emoji em título, passo ou post (a origem tinha; foram removidos na migração).
- Card de outra marca? Converta pelo JSON (renomeie, tire cores, corrija numeração) — não edite o HTML gerado.
