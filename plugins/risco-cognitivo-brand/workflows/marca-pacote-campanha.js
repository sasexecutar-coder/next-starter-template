export const meta = {
  name: 'marca-pacote-campanha',
  description: 'Pacote de assets de um ciclo editorial Risco Cognitivo: plano por asset → produção (produtor) → verificação em contexto limpo (auditor), com WIP por asset',
  phases: [{ title: 'Plano' }, { title: 'Produzir' }, { title: 'Verificar' }, { title: 'Consolidar' }],
}

// args: { pluginRoot: "<caminho do plugin>", tema: "viés de confirmação", fonte: "content/artigo.md", cenario: "DOC-004" | "PD", campanha: "C02", saida: "dist/C02" }
const A = args || {}
const ROOT = (A.pluginRoot || 'plugins/risco-cognitivo-brand') + '/skills'
if (!A.tema || !A.fonte) {
  return { status: 'BLOCKED', missing: ['tema', 'fonte'].filter((k) => !A[k]), hint: 'informe tema e arquivo-fonte (artigo mãe aprovado)' }
}

const PLAN = {
  type: 'object',
  properties: {
    assets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          asset_id: { type: 'string' }, tipo: { type: 'string' }, skill: { type: 'string' }, spec_id: { type: 'string' },
          arquivo: { type: 'string' }, briefing: { type: 'string' }, a_definir: { type: 'array', items: { type: 'string' } },
        },
        required: ['asset_id', 'tipo', 'skill', 'spec_id', 'arquivo', 'briefing'],
      },
    },
    bloqueios: { type: 'array', items: { type: 'string' } },
  },
  required: ['assets'],
}
const BUILD = { type: 'object', properties: { arquivos: { type: 'array', items: { type: 'string' } }, verificacao: { type: 'array', items: { type: 'string' } }, pendencias: { type: 'array', items: { type: 'string' } } }, required: ['arquivos'] }
const REVIEW = { type: 'object', properties: { resultado: { enum: ['VERIFIED', 'VERIFIED_COM_AVISOS', 'REWORK'] }, bloqueantes: { type: 'array', items: { type: 'string' } }, evidencia: { type: 'string' } }, required: ['resultado', 'evidencia'] }

phase('Plano')
const plan = await agent(
  `Você é o orquestrador-marca do Risco Cognitivo. Leia ${ROOT}/rc-formats/references/editorial-cycle.md e ${ROOT}/rc-brand/references/deliverable-rules.md. ` +
  `Tema: "${A.tema}". Fonte: ${A.fonte}. Cenário ativo: ${A.cenario || 'DOC-004'} (não multiplique quantidades). Campanha: ${A.campanha || 'C00'}. ` +
  `Monte a lista de assets com skill (rc-social, rc-ebook, rc-cards, rc-infographic, rc-editorial), spec_id (use python3 ${ROOT}/rc-formats/scripts/spec.py), ` +
  `arquivo no padrão {campaign_id}__{asset_id}__{spec_id}__v1.0.0.{ext} dentro de ${A.saida || 'dist/' + (A.campanha || 'C00')}, briefing curto e campos A DEFINIR. ` +
  `Asset sem spec verificada entra com a_definir preenchido; não invente.`,
  { label: 'plano', phase: 'Plano', schema: PLAN })

const results = await pipeline(
  plan.assets,
  (a) => agent(
    `Você é o produtor-assets do Risco Cognitivo. Produza UM asset seguindo ${ROOT}/${a.skill}/SKILL.md. Fonte: ${A.fonte}. ` +
    `Asset: ${JSON.stringify(a)}. Só conteúdo da fonte; número sem fonte fica fora (EVIDENCE REQUIRED). Rode os validadores do script e devolva arquivos e comandos de verificação.`,
    { label: `produzir:${a.asset_id}`, phase: 'Produzir', schema: BUILD }).then((built) => ({ built, a })),
  ({ built, a }) => agent(
    `Você é o auditor-marca do Risco Cognitivo, em contexto limpo. Plano do asset: ${JSON.stringify(a)}. Arquivos entregues: ${JSON.stringify(built.arquivos)}. ` +
    `Rode: python3 ${ROOT}/rc-audit/scripts/audit_html.py nos HTML (--print se imprimível), render_check.mjs/export_slides.mjs conforme o tipo, lint_reading.py em Markdown. ` +
    `Compare plano × entrega (fora do plano? A DEFINIR preenchido?). Não edite nada.`,
    { label: `verificar:${a.asset_id}`, phase: 'Verificar', schema: REVIEW }).then((r) => ({ asset: a, build: built, review: r }))
)

phase('Consolidar')
const rework = results.filter((r) => r.review.resultado === 'REWORK')
return {
  status: rework.length ? 'REWORK' : 'VERIFIED',
  bloqueios: plan.bloqueios || [],
  assets: results.map((r) => ({ id: r.asset.asset_id, tipo: r.asset.tipo, resultado: r.review.resultado, arquivos: r.build.arquivos, pendencias: r.build.pendencias || [], a_definir: r.asset.a_definir || [] })),
}
