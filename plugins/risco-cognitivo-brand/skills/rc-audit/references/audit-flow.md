# Método de auditoria e integração com Design / Engineering / agent-handoff

## Papéis (agent-handoff)
- **plan** (produtor ou orquestrador): define o que será entregue e o "Verification plan" (comandos exatos).
- **execute** (produtor-assets): gera o artefato; roda só checagens de compilação/geração.
- **verify** (auditor-marca, contexto limpo): roda o Verification plan, compara plano × arquivos (`git diff` quando houver),
  escreve `review.md`. Não edita o artefato. Arquivo planejado sem mudança = ❌; mudança fora do plano = ⚠️ scope drift.
- Ciclo: ✅ fecha; ⚠️ fecha e manda avisos ao `backlog.md`; ❌ mantém plan/task para nova rodada (máx. 2 ciclos por gate,
  depois BLOCKED — padrão do workflow de pilar).

## Correspondência com skills de outros plugins (usar se instaladas)
| Dimensão | Plugin/skill | Uso |
|---|---|---|
| Cobertura de tokens, nomenclatura, hardcode | `design:design-system` (audit) | score e tabela de cobertura |
| WCAG 2.1 AA completo | `design:accessibility-review` | 1.4.3, 1.4.11, 2.4.7, 2.5.5, teclado e leitor de tela |
| Hierarquia e consistência visual | `design:design-critique` | severidade por achado |
| Microcopy, CTA, empty states | `design:ux-copy` | texto + alternativas |
| Specs para dev | `design:design-handoff` | tokens (não valores), estados, breakpoints |
| Scripts e templates | `engineering:code-review` | correção, segurança, manutenção |
| Plano de testes | `engineering:testing-strategy` | unidade (scripts), integração (render), visual (Playwright) |
| Antes de publicar | `engineering:deploy-checklist` | pré/durante/pós, rollback |

## Critérios numéricos
Texto normal ≥ 4,5:1; texto grande (≥ 24px ou 18,66px bold) ≥ 3:1; não-texto/controles ≥ 3:1; alvos ≥ 44×44
(WCAG mínimo 24); medida 60–72ch; escala de espaço 4/8/12/16/24/32/48/64/96; raios 2/4/8/12/16.

## Falsos positivos conhecidos do audit_html
- Cores dentro de `<svg>` de marca com `<title>` (ex.: favicon) são permitidas no arquivo SVG, não no CSS de página.
- `rgb(…)` dentro de `:root`/`[data-theme]` é token, não violação.
- Espaçamentos em `em`/`rem`/`%` não são medidos (só `px`).
