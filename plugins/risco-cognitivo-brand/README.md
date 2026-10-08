# risco-cognitivo-brand

Plugin full stack da marca **Risco Cognitivo**: leva o design system do site (tokens D-01…D-36, componentes, regras
editoriais) para outros projetos e sistemas de IA, produz assets com a marca e audita o resultado.

## Instalação
```text
/plugin marketplace add sasexecutar-coder/next-starter-template
/plugin install risco-cognitivo-brand@risco-cognitivo
/marca-ativar
```
Só a skill núcleo no claude.ai: envie `rc-brand.skill` (gerado pelo build) em Configurações → Capabilities → Skills.
Requisitos: Python 3.9+ e Jinja2 (`pip install jinja2`) para os renders; Node 18+ e Playwright para PNG/PDF.

## O que vem dentro
| Camada | Itens |
|---|---|
| Skills | `rc-brand` (núcleo: guidelines, tokens, componentes, regras) · `rc-brand-layer` · `rc-audit` · `rc-formats` · `rc-ebook` · `rc-cards` · `rc-social` · `rc-infographic` · `rc-components` · `rc-editorial` |
| Agentes | `orquestrador-marca` (resolve ID, pré-voo, WIP = 1) · `produtor-assets` · `auditor-marca` (verify em contexto limpo) · `revisor-acessibilidade` (WCAG 2.1 AA) |
| Comandos | `/marca-ativar` `/marca-aplicar` `/marca-auditar` (rotina mínima) · `/marca-tokens` `/marca-formato` `/marca-card` `/marca-ebook` `/marca-carrossel` `/marca-infografico` `/marca-componente` `/marca-editorial` `/marca-campanha` — IDs CV-MARCA-001…012 |
| Workflows | `marca-auditoria` (6 dimensões + verificação adversarial) · `marca-pacote-campanha` (plano → produtor → auditor por asset) |
| Hooks | SessionStart (resumo da marca) · PreToolUse (auto-aprova só `.handoff/*.md`) · PostToolUse (aviso de marca em HTML/CSS/SVG salvos) |
| MCP | `rc-brand` (stdio): `get_tokens`, `get_spec`, `check_contrast`, `audit_html`, `list_commands` |
| Ativação | `ONBOARDING.html` — painel de controle entregue por `/marca-ativar` |

## Fonte de verdade e build
Os tokens vêm de `src/app/globals.css` do site. Depois de mudar o site:
```bash
npm run build                                   # gera o CSS compilado (components.css)
python3 scripts/build-brand-plugin.py           # sincroniza, renderiza, valida e empacota
```
Saídas em `plugins/risco-cognitivo-brand/dist/`: `risco-cognitivo-brand.plugin`, `rc-brand.skill`, renders de exemplo e
`build-report.json`. O build falha se a paridade de tokens, o contraste AA, a auditoria dos renders, o frontmatter de
skills/agentes/comandos, o MCP ou os hooks falharem.

## Regras que o plugin não quebra
Valores só de `tokens.json` · `A_DEFINIR` continua A DEFINIR · número sem fonte não entra · quem produz não aprova ·
nada é publicado sem aprovação. Conflitos de fontes anteriores (laranja `#F56A1C`, azul `#2563EB`, nome "Custo
Cognitivo") estão em `skills/rc-brand/references/evidence/conflicts.md` e foram remapeados para o azul D-01.
