# Comandos e IDs verbais (CV-MARCA)

Regra (padrão CMD-COP-001): o usuário opera por comando com barra **ou** por frase equivalente; o orquestrador resolve o
ID e carrega só o módulo necessário. Ordem de resolução: slash exato → sinônimo → alias.
Formato canônico (lido pelo validador): `CV-XXX-NNN — /comando — ação única`.

## Rotina mínima (o operador vive com estes 3)
CV-MARCA-001 — /marca-ativar — verificar fontes da marca e entregar o ONBOARDING.html de ativação.
CV-MARCA-002 — /marca-aplicar — aplicar a camada de marca a um artefato existente e rodar o checklist.
CV-MARCA-003 — /marca-auditar — auditar tokens, usos, formatos, diagramação, @page e vetores e emitir review.

## Revelação progressiva por função
CV-MARCA-004 — /marca-tokens — exportar tokens (CSS, JSON DTCG, Tailwind, Python) para outro projeto.
CV-MARCA-005 — /marca-formato — mostrar a spec técnica de um canal/peça e o que está A DEFINIR.
CV-MARCA-006 — /marca-card — converter conteúdo em card de prompt A4 (tutorial · mockup · prompt).
CV-MARCA-007 — /marca-ebook — gerar ebook, one-page ou onboarding standalone com a marca.
CV-MARCA-008 — /marca-carrossel — gerar carrossel 4:5 (HTML + PNG 1080×1350) ou post/story.
CV-MARCA-009 — /marca-infografico — gerar prompts de infográfico/vetor por perfil (isometric, editorial, flat).
CV-MARCA-010 — /marca-componente — gerar componente de UI em HTML ou React com os primitivos.
CV-MARCA-011 — /marca-editorial — formatar artigo/MDX/newsletter com blocos e regras de leitura.
CV-MARCA-012 — /marca-campanha — montar o pacote de assets de um ciclo (plan → execute → verify por asset).

## Sinônimos verbais
"Ativa minha marca" = /marca-ativar · "Aplica a marca" = /marca-aplicar · "Confere a marca" = /marca-auditar ·
"Me dá os tokens" = /marca-tokens · "Qual o formato do Reels?" = /marca-formato · "Transforma em card" = /marca-card ·
"Faz o ebook" = /marca-ebook · "Faz o carrossel" = /marca-carrossel · "Prompt de infográfico" = /marca-infografico ·
"Cria o componente" = /marca-componente · "Formata o artigo" = /marca-editorial · "Monta o pacote do ciclo" = /marca-campanha.

## Roteamento
| ID | Slash | Skill | Agente | Saída | Gate |
|---|---|---|---|---|---|
| CV-MARCA-001 | /marca-ativar | rc-brand | orquestrador-marca | ONBOARDING.html + relatório de fontes | fontes encontradas ou A DEFINIR listado |
| CV-MARCA-002 | /marca-aplicar | rc-brand-layer | produtor-assets | artefato com marca + checklist | checklist 100% |
| CV-MARCA-003 | /marca-auditar | rc-audit | auditor-marca + revisor-acessibilidade | review.md | 0 bloqueantes |
| CV-MARCA-004 | /marca-tokens | rc-brand | — | arquivos de tokens | validate_tokens OK |
| CV-MARCA-005 | /marca-formato | rc-formats | — | spec + gaps | A DEFINIR explícito |
| CV-MARCA-006 | /marca-card | rc-cards | produtor-assets | HTML A4 | audit_html OK |
| CV-MARCA-007 | /marca-ebook | rc-ebook | produtor-assets | HTML standalone + PDF | audit_html + preflight |
| CV-MARCA-008 | /marca-carrossel | rc-social | produtor-assets | HTML + PNG | dimensões conferidas |
| CV-MARCA-009 | /marca-infografico | rc-infographic | produtor-assets | prompts + manifest | sem texto/número inventado |
| CV-MARCA-010 | /marca-componente | rc-components | produtor-assets | HTML/TSX | rc-audit |
| CV-MARCA-011 | /marca-editorial | rc-editorial | produtor-assets | MD/MDX/HTML | orçamento de leitura |
| CV-MARCA-012 | /marca-campanha | rc-formats + skills de asset | orquestrador → produtor → auditor | pacote + review | todos os assets VERIFIED ou com GAP |

## Regras de interação
- Um comando produz **uma ação principal**, não um relatório geral.
- O usuário não precisa informar o módulo nem repetir IDs inequívocos no contexto.
- Ambiguidade material: pedir a decisão mínima, mostrando as opções e seus IDs.
- Respostas visíveis em português do Brasil.
- IDs nunca são removidos ou renomeados; antigos viram aliases.
