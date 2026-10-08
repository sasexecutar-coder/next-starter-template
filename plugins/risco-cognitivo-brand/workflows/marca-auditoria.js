export const meta = {
  name: 'marca-auditoria',
  description: 'Auditoria da marca Risco Cognitivo por dimensão (tokens, uso, layout/print, vetores, acessibilidade, editorial) com verificação adversarial de cada achado',
  phases: [{ title: 'Auditar', detail: 'uma dimensão por agente, só leitura + scripts' }, { title: 'Verificar', detail: 'cada achado bloqueante é reconferido em contexto limpo' }, { title: 'Review' }],
}

// args: { paths: ["dist/"], print: false, pluginRoot: "<caminho do plugin>" } — o comando /marca-auditar passa ${CLAUDE_PLUGIN_ROOT} já expandido
const PATHS = (args && args.paths && args.paths.length ? args.paths : ['.']).join(' ')
const PRINT = args && args.print ? ' --print' : ''
const ROOT = ((args && args.pluginRoot) || 'plugins/risco-cognitivo-brand') + '/skills'

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { enum: ['B', 'A'] }, code: { type: 'string' }, file: { type: 'string' },
          evidence: { type: 'string' }, fix: { type: 'string' },
        },
        required: ['severity', 'code', 'file', 'evidence'],
      },
    },
  },
  required: ['findings'],
}
const VERDICT = {
  type: 'object',
  properties: { isReal: { type: 'boolean' }, reason: { type: 'string' } },
  required: ['isReal', 'reason'],
}

const DIMENSIONS = [
  { key: 'tokens', prompt: `Dimensão TOKENS. Rode python3 ${ROOT}/rc-brand/scripts/validate_tokens.py e python3 ${ROOT}/rc-audit/scripts/audit_html.py ${PATHS} --json. Reporte só os códigos hex-outside-root e font-family, e qualquer cor de outra marca (#F56A1C, #2563EB).` },
  { key: 'uso-formato', prompt: `Dimensão USO E FORMATO. Leia ${ROOT}/rc-brand/references/components.md e deliverable-rules.md. Em ${PATHS}, confira: todo CTA é btn-primary, Panel sem marcas de canto, cor semântica só com rótulo, nomes de outra marca (código brand-name do audit_html --json).` },
  { key: 'layout-print', prompt: `Dimensão DIAGRAMAÇÃO E @PAGE. Rode python3 ${ROOT}/rc-audit/scripts/audit_html.py ${PATHS} --json${PRINT}. Reporte off-scale-space, off-scale-radius, page-rule, print-breaks; confira a regra de ritmo 64/96 e medida 68ch em ${ROOT}/rc-brand/references/editorial.md.` },
  { key: 'vetores', prompt: `Dimensão VETORES. Em ${PATHS}, examine cada <svg> e arquivo .svg contra ${ROOT}/rc-brand/references/vector.md: viewBox, title/aria-hidden, sem width/height fixos, orçamento de complexidade (≤ 7 nós primários, ≤ 3 cores semânticas).` },
  { key: 'acessibilidade', prompt: `Dimensão ACESSIBILIDADE (WCAG 2.1 AA). Para cada HTML em ${PATHS}: node ${ROOT}/rc-audit/scripts/render_check.mjs <arquivo> --themes (erros e rolagem horizontal), lang, alt, foco, alvos ≥ 44px; contraste com python3 ${ROOT}/rc-brand/scripts/contrast.py <fg> <bg> para os pares usados.` },
  { key: 'editorial', prompt: `Dimensão EDITORIAL. Para cada .md/.mdx em ${PATHS}: python3 ${ROOT}/rc-editorial/scripts/lint_reading.py <arquivo> --json. Reporte falhas (F → B) e avisos de claim sem fonte.` },
]

const common = 'Você é um auditor da marca Risco Cognitivo. Só leia e rode comandos; não edite arquivos. Cada achado precisa de evidência concreta (saída de comando ou arquivo:linha). Se a dimensão não se aplica aos caminhos, devolva findings vazio.'

const results = await pipeline(
  DIMENSIONS,
  (d) => agent(`${common}\n\n${d.prompt}`, { label: `auditar:${d.key}`, phase: 'Auditar', schema: FINDINGS }).then((r) => ({ ...r, d })),
  (review) => { const d = review.d; return parallel((review.findings || []).filter((f) => f.severity === 'B').map((f) => () =>
    agent(`Verifique adversarialmente, em contexto limpo, se este achado bloqueante da marca Risco Cognitivo é real. Reabra o arquivo e rode o comando você mesmo. Achado: ${JSON.stringify(f)}`,
      { label: `verificar:${d.key}:${f.code}`, phase: 'Verificar', schema: VERDICT }).then((v) => ({ ...f, dimension: d.key, verdict: v }))
  )).then((verified) => ({ dimension: d.key, warnings: (review.findings || []).filter((f) => f.severity === 'A'), blocking: verified })) }
)

phase('Review')
const blocking = results.flatMap((r) => r.blocking).filter((f) => f.verdict && f.verdict.isReal)
const dismissed = results.flatMap((r) => r.blocking).filter((f) => f.verdict && !f.verdict.isReal)
const warnings = results.flatMap((r) => r.warnings.map((w) => ({ ...w, dimension: r.dimension })))
const status = blocking.length ? '❌ REWORK' : warnings.length ? '⚠️ VERIFIED com avisos' : '✅ VERIFIED'
return { status, blocking, warnings, dismissed, paths: PATHS }
