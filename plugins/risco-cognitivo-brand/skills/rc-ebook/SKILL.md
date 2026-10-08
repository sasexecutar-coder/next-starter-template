---
name: rc-ebook
description: >-
  Gera ebooks, guias, one-pages e onboardings interativos em HTML standalone com a marca Risco Cognitivo (arquitetura
  "X-Ray" aprovada: sidebar 280px, seções numeradas, 3 temas, checklist persistente, copiar comando, impressão A4 com
  @page). Use sempre que pedirem ebook, guia, material rico, lead magnet, onboarding, manual de ativação, entregável
  HTML interativo ou "transforma isso em um ebook/PDF bonito" — inclusive o ONBOARDING.html de /marca-ativar.
---

# Ebook e onboarding (CV-MARCA-007 · /marca-ebook)

Um JSON de conteúdo → um HTML único, offline, que também vira PDF A4 pelo botão "Baixar PDF". Layout, tokens e
comportamento são fixos; você só escreve conteúdo. Isso garante que todo ebook sai igual em marca e acessibilidade.

## Fluxo
1. **Entrada.** Reúna o conteúdo real (artigo, roteiro, decisões). Falta fonte → pare e liste o que falta (BLOCKED);
   não escreva estatística, depoimento ou promessa que não esteja no material.
2. **Rota.** Escolha a arquitetura:
   | Rota | Seções | Quando |
   |---|---|---|
   | entrega (X-Ray /cliente) | 01 Diagnóstico · 02 Plano · 03 Progresso · 04 Próximos passos | material para o leitor final |
   | onboarding (X-Ray /operador + Copiloto) | o que é · primeiro acesso · primeiro teste · rotina · comandos · marca · limites · outros sistemas · FAQ · checklist | ativação de ferramenta/processo |
   | livre | 3–9 seções | guia, one-page, manual |
   Exemplos prontos: `examples/ebook-entrega.json`, `examples/onboarding.json` (este é gerado por `scripts/onboarding_doc.py`).
3. **JSON.** Estrutura em `doc` (id, version, title, description, brand_name, eyebrow, headline, lead, footer,
   sections[]). Blocos disponíveis: `p, h3, list, callout, grid, steps, commands, code, table, checklist, rules, faq,
   timeline, swatches, form` (contrato em `templates/blocks.html.j2`).
4. **Render.**
   ```bash
   python3 scripts/render_ebook.py meu-ebook.json -o dist/meu-ebook.html [--theme claro] [--brand-config brand_config.json]
   ```
   Campo ausente ou bloco desconhecido = erro (nada é preenchido por suposição).
5. **Verificar** (não pule — é o gate do comando):
   ```bash
   python3 ../rc-audit/scripts/audit_html.py dist/meu-ebook.html            # 0 bloqueantes
   node ../rc-audit/scripts/render_check.mjs dist/meu-ebook.html --themes --pdf dist/meu-ebook.pdf
   ```

## Regras de conteúdo (leitura cognitiva)
- Uma ideia por seção; título que afirma, não que anuncia ("Onde a IA aumenta o risco", não "Introdução").
- Parágrafos de até 4 linhas, medida 68ch; listas com no máximo 7 itens; tabela quando houver comparação.
- Callout só para a frase que o leitor deve lembrar (1 por seção no máximo).
- Orçamento de leitura e diretrizes editoriais: `../rc-brand/references/editorial.md`.
- Impressão: `../rc-brand/references/print.md` (A4, margem 12mm, alinhamento à esquerda, sem sangria).

## Regras de marca que o template já garante
Tokens do site (3 temas), DM Sans/Inter/DM Mono, alvos ≥ 44px, foco visível, `prefers-reduced-motion`, sem
`position: fixed` (pode ser embarcado em iframe), sem telemetria, sem credenciais, sem dependências além das fontes.
Personalização para outra identidade: `../rc-brand-layer` (só troca tokens declarados; estrutura é inviolável).
