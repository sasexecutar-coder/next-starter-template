# Regras por entregável

Use a linha do seu entregável; ela diz quais tokens, componentes e regras valem, qual skill produz e o que está em aberto.
Specs técnicas de canal (px, duração, limites): skill `rc-formats`. "Herda" = sem regra própria no kit; valem as globais.

| Entregável | Base visual | Regras-chave | Skill | Em aberto |
|---|---|---|---|---|
| Página/seção web | tokens 3 temas, `.page-block`, container 1120 | 1 CTA azul por bloco; ritmo 96/64; alvos ≥ 44; sem depoimento/pricing | rc-components | tema definitivo (GAP-024) |
| Componente de UI | `components.css` / `react/*.tsx` | ver components.md; foco visível; estados completos | rc-components | — |
| Artigo de blog (MDX) | `--ed-*`, 68ch | editorial.md; blocos D-17; negrito/citação em azul | rc-editorial | variantes de callout, Figure |
| Ebook / lead magnet | print.md (A4, 10,5 pt) | aberturas de capítulo; break-inside; fontes embutidas | rc-ebook | justificação, A5×A4, sangria |
| Documento PDF A4 / one-page | `@page A4 12mm` | preflight de print.md | rc-ebook | margens canônicas |
| Onboarding de ativação | tokens + `.panel`/`.callout`/`.btn` | progresso local, copiar comando, checklist = promessa, "pode/não pode" | rc-ebook (template onboarding) | — |
| Card de prompt A4 | A4 + Panel + DM Mono no prompt | 3 zonas: tutorial · mockup · prompt literal; `steps[].n` sequencial | rc-cards | símbolo do logo |
| Carrossel 4:5 (IG/LinkedIn) | herda: canvas, DM Sans/Inter/DM Mono, eyebrow azul | 1 ideia por slide; capa + slides + CTA final; texto ≥ 4,5:1; corpo ≥ 34px e rodapé ≥ 30px a 1080 (DOC-010); alt "Slide N de M — …" | rc-social | safe area, nº de slides |
| Post estático / imagem de feed | herda | D-11 fotos isoladas; texto mínimo na arte | rc-social | spec inexistente no schema |
| Story 9:16 | herda | 1 ideia por tela; texto à esquerda; "4 portas" (descoberta, prova, urgência, retenção) | rc-social | duração, safe zones |
| Infográfico 16:9 (iso/editorial/flat) | vector.md | mono-first; sem texto embutido quando for prompt de imagem; caption | rc-infographic | rampas risco/marca |
| Figura vetorial / ilustração | vector.md | viewBox; orçamento de complexidade | rc-infographic | espessuras em px |
| Card de risco RC-01…09 | Panel compact neutro | vermelho só como acento com rótulo; sem marcas de canto; conteúdo só com fonte (GAP-006) | rc-components / rc-social | títulos e descrições |
| Capa macro / capa de série | ChapterOpener: label + h1, ~40% vazio | índigo como divisor institucional; wordmark tipográfico | rc-social / rc-ebook | layout de capa |
| Hero / mapa do cérebro | componente cérebro (D-22/23/32/36) | nota "redes distribuídas"; índigo restrito; sem controles de movimento | rc-components | GAP-015/016/017 |
| Thumbnail | herda; capa 16:9 raio 16 | texto curto; contraste | rc-social | dimensões OG/vídeo |
| Newsletter / e-mail HTML | herda | tabelas + CSS inline; fallback Arial; CTA "à prova de bala" azul; largura 600 | rc-editorial | provedor (GAP), modo escuro do cliente |
| Slide / PPTX | `tokens.py` + python-pptx | divisor índigo com texto branco; corpo `#FFFDFA`; tipografia D-03 (fallback Arial) | rc-brand-layer | master, grid |
| DOCX | `tokens.py` + python-docx | títulos DM Sans (fallback Arial), corpo Inter; links `#2D5CE6`; tabela sem bordas verticais | rc-brand-layer | estilos completos |

Contraste já calculado (Atual): preto/canvas 20,68 · `#545454`/canvas 7,46 · azul/canvas 5,46 · branco/azul 5,55 ·
branco/índigo 17,72 · preto/amarelo 16,71 · preto/verde 8,63 · preto/vermelho 5,25. **Falham:** branco/verde 2,43 e
branco/vermelho 4,00 (texto normal) — use texto preto.
