# Ciclo editorial multiplataforma (PD-CLB-20260922-F01-DOC-V02)

Ciclos de 15 dias; peça-mãe profunda e citável → derivados nativos por canal. Fase 1 = produção de texto, roteiros e
briefings; imagens/vídeos finais são Fase 2; revisão de marca e conformidade é Fase 3; publicação e análise (Fases 4–5)
estão **fora** deste plugin. Owner editorial: **A DEFINIR** → toda "aprovação explícita" fica USER_ACTION_REQUIRED.

## Estados (§6)
| Estado | Significado | Evidência mínima |
|---|---|---|
| 0% PLANNED | ciclo definido | tema, objetivo e owner registrados |
| 33% STRUCTURED | Topic Pack, fontes, outline e dependências | briefing e plano do ciclo |
| 66% IMPLEMENTED | peça-mãe funcional, derivados em produção | arquivos versionados |
| 99% PRODUCED | pacote pronto aguardando revisão/handoff | checklist quase concluído |
| 100% VERIFIED | revisado, evidenciado, aceito pela etapa seguinte | handoff confirmado |
Nada recebe 100% sem comprovação objetiva. O handoff (step 22) só dispara em 99%.

## Entry Gate de 4 dias (§8)
Dia 1 selecionar o ciclo (pacote de entrada) · Dia 2 validar tema, lacunas, evidências, CTA e dependências (plano) ·
Dia 3 sprint + outline, iniciar sem quebrar WIP · Dia 4 testar, corrigir, retestar, registrar (fecha só com evidência).

## Steps (§7) → função → entregável
| Step | Função | Entregável | Responsável |
|---|---|---|---|
| 1 | validar dor/tema/nicho | registro da dor | Estrategista editorial |
| 2 | pesquisar evidências | fontes e claims | Pesquisador |
| 3 | Topic Pack (título, claim, CTA, ferramenta) | Topic Pack | Estrategista |
| 4 | outline em blocos Claim/Evidência/Exemplo/Interpretação | outline | Produtor editorial |
| 5 | redigir artigo mãe 1.800–2.400 palavras + tutorial | artigo | Produtor editorial |
| 6 | revisão de estilo (5 diretrizes) | checklist | Revisor editorial |
| 7 | GEO/SEO | checklist | Pesquisador (RACI diz Revisor — conflito) |
| 8 | roteiro do vídeo mãe 8–12 min | roteiro | Produtor editorial |
| 9 | marcar trechos-fonte/timestamps → derivados | mapa de marcação | Produtor editorial |
| 10 | textos curtos e legendas (IG, LinkedIn, TikTok, Shorts) | banco de textos | Produtor editorial |
| 11 | roteiro de 4 verticais com gancho próprio | 4 roteiros | Produtor de vídeo |
| 12 | carrosséis (1 ideia por slide) | roteiros/copy | Produtor editorial |
| 13 | copy de imagens estáticas | copy | Produtor editorial |
| 14 | briefing de infográficos "cena ambiente" | briefings 16:9 | Direção criativa |
| 15 | sequência de stories (4 portas) | roteiro 10–12 | Produtor editorial |
| 16 | newsletters | 3 e-mails | Produtor editorial |
| 17 | outline e redação de ebooks | 3 ebooks | Produtor editorial |
| 18 | mapear 6 CTAs por peça | mapa de CTAs | Estrategista |
| 19 | conferir arco temático e CTA | checklist | Revisor |
| 20 | nomear, indexar e versionar | índice | Operador de governança |
| 21 | conformidade pré-handoff | checklist | Revisor editorial |
| 22 | handoff Fase 2 (briefing técnico por asset com specs) | pacote de handoff | Owner editorial |

## Pacote de ativos por ciclo (§13) — e o cenário alternativo (DOC-004)
| Asset | PD (por ciclo) | DOC-004 | Spec (rc-formats) |
|---|---|---|---|
| Artigo mãe | 1 (1.800–2.400 palavras, 9–11 blocos) | 1 | SPEC-BLOG-ARTICLE-ARTICLE-HTML |
| Vídeo mãe | 1 (8–12 min) | 1 (≤ 7 min) — **conflito** | SPEC-YOUTUBE-LONG-FORM-VIDEO-LANDSCAPE |
| Infográfico "cena ambiente" | 3 (16:9) | — | SPEC-MASTER-VISUAL-INFOGRAPHIC-LANDSCAPE |
| Imagens estáticas | 6 | — | **sem spec (GAP)** |
| Carrosséis | 6 | 2 (+1 PDF LinkedIn) — **conflito** | SPEC-INSTAGRAM-FEED-*-CAROUSEL-STATIC-4X5, SPEC-LINKEDIN-FEED-DOCUMENT-API-CAROUSEL-PDF-4X5 |
| Vídeos verticais | 4 | 4 | REELS / TIKTOK / SHORTS |
| Stories | 10–12 | — | SPEC-INSTAGRAM-STORIES-* |
| CTAs de ferramenta | 6 | 1 — **conflito** | **sem spec (GAP)** |
| Newsletters | 3 | 1 — **conflito** | SPEC-NEWSLETTER-… (provedor GAP) |
| Ebooks | 3 | — (DOC-006: máx. 3 páginas — **conflito**) | SPEC-WEB-STORE-EBOOK-PDF |
Escolha um **cenário ativo** antes de produzir; não multiplique quantidades automaticamente (RISK-DTS-010).

## Matriz de distribuição (técnicas 2026, §13)
Blog: citabilidade (dados, fontes, títulos claros, resposta direta após pergunta) · Instagram feed: autenticidade, nada de
"genérico de feed" · Reels: gancho nos 2 primeiros s · TikTok: nativo obrigatório · Shorts: porta para o vídeo mãe ·
YouTube longo: tutorial real · LinkedIn: vídeo nativo, sem link externo no corpo · Stories: 4 portas (descoberta,
prova, urgência, retenção) · Newsletter: canal de venda, nicho claro, cadência regular.

## Exceções (§9)
| Cenário | Ação | Status |
|---|---|---|
| tema sem sinal real | volta ao backlog | BLOCKED |
| claim sem fonte | reformular ou remover | EVIDENCE REQUIRED |
| peça-mãe fora do padrão | revisar antes dos derivados | REWORK |
| derivado não nativo | adaptar formato, gancho, duração, legenda, CTA | REWORK |
| CTA fora do Topic Pack | bloquear e corrigir | BLOCKED |
| arquivo sem nome/índice | manter em 99% | VERIFY REQUIRED |
| sem aprovação editorial | não liberar | USER ACTION REQUIRED |
| automação falha parcialmente | registrar efeitos, fallback, sem duplicar | PARTIAL RECOVERY |
| ideia nova durante WIP | fila do próximo ciclo | QUEUED |

## Nomenclatura
`{campaign_id}__{asset_id}__{spec_id}__v{version}.{ext}` — chave idempotente: campaign + asset + spec + version + hash.
Não substituir IDs de domínio pelo spec_id.
