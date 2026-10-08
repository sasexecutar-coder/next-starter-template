#!/usr/bin/env python3
"""Monta o JSON do ONBOARDING de ativação (CV-MARCA-001) a partir das fontes de verdade do plugin.

Comandos ← rc-brand/references/commands.md (linhas canônicas "CV-XXX-NNN — /cmd — ação") + sinônimos.
Cores    ← rc-brand/assets/tokens/tokens.json (tema atual).
Assim o HTML entregue na ativação nunca diverge do que os comandos e tokens realmente são.

Uso: python3 onboarding_doc.py -o onboarding.json [--version 1.0.0]
"""
import argparse
import json
import re
from pathlib import Path

SKILLS = Path(__file__).resolve().parents[2]
CMDS = SKILLS / "rc-brand" / "references" / "commands.md"
TOKENS = SKILLS / "rc-brand" / "assets" / "tokens" / "tokens.json"
LINE = re.compile(r"^(CV-[A-Z]+-\d{3}) — (/[a-z-]+) — (.+?)\.?$")
SWATCHES = [("Canvas", "brand-canvas"), ("Texto", "text-primary"), ("Cinza escuro", "brand-dark-gray"),
            ("Azul de ação (D-01)", "brand-action-blue"), ("Azul de ação forte", "brand-action-blue-strong"),
            ("Azul claro", "brand-light-blue"), ("Índigo", "brand-dark-indigo"), ("Risco", "semantic-risk"),
            ("Solução", "semantic-solution"), ("Atenção", "attention-surface"), ("Cérebro", "brain-accent"),
            ("Cinza claro", "brand-light-gray")]


def commands():
    text = CMDS.read_text(encoding="utf-8")
    syn = dict((s, q) for q, s in re.findall(r'"([^"]+)" = (/[a-z-]+)', text))
    out = []
    for line in text.splitlines():
        m = LINE.match(line.strip())
        if m:
            out.append({"id": m[1], "slash": m[2], "does": m[3][0].upper() + m[3][1:], "say": syn.get(m[2], "")})
    return out


def build(version):
    cmds = commands()
    tok = json.loads(TOKENS.read_text(encoding="utf-8"))["theme"]["atual"]
    core, more = cmds[:3], cmds[3:]
    for c in core:
        c["tag"] = "rotina mínima"
    return {"doc": {
        "id": "RC-ONBOARDING", "version": version, "lang": "pt-BR",
        "title": "Ativação da marca · Risco Cognitivo",
        "description": "Onboarding de ativação do plugin risco-cognitivo-brand: comandos, regras e checklist de controle.",
        "brand_name": "Risco Cognitivo", "nav_label": "Ativação",
        "eyebrow": "CV-MARCA-001 · /marca-ativar",
        "headline": "Sua marca em qualquer projeto, com 3 comandos.",
        "lead": "Este arquivo é o seu painel de controle da marca: o que o plugin faz, os comandos por função, as regras que "
                "ele segue e quando ele deve parar. Abra no navegador, marque o checklist e guarde como PDF.",
        "chips": [f"{len(cmds)} comandos", "10 skills", "4 agentes", "3 temas", "WCAG 2.1 AA"],
        "footer": "Risco Cognitivo · plugin risco-cognitivo-brand · fonte de verdade: tokens.json (D-01…D-36)",
        "sections": [
            {"id": "o-que-e", "title": "O que é o plugin", "nav": "O que é", "blocks": [
                {"type": "p", "text": "Um conjunto de skills, agentes, comandos, hooks e um servidor MCP que carregam o design "
                                      "system do Risco Cognitivo para fora do site: tokens, componentes, regras editoriais, "
                                      "formatos de canal e auditoria."},
                {"type": "grid", "items": [
                    {"kicker": "Skills", "title": "Conhecimento", "text": "rc-brand é o núcleo; as outras 9 produzem um tipo de asset cada."},
                    {"kicker": "Agentes", "title": "Funções", "text": "Orquestrador resolve o pedido, produtor gera, auditor e revisor de acessibilidade verificam."},
                    {"kicker": "Comandos", "title": "Atalhos", "text": "/marca-* com ID verbal e numérico estável. Um comando = uma ação."},
                    {"kicker": "Hooks + MCP", "title": "Guarda", "text": "Aviso automático ao salvar HTML/CSS/SVG fora da marca; tokens e specs via MCP em outros sistemas de IA."}]}]},
            {"id": "primeiro-acesso", "title": "Primeiro acesso", "nav": "Primeiro acesso", "blocks": [
                {"type": "steps", "items": [
                    {"title": "Instale o plugin", "text": "No Claude Code: /plugin marketplace add <pasta ou repositório> e /plugin install risco-cognitivo-brand."},
                    {"title": "Ative", "text": "Rode /marca-ativar. O orquestrador confere as fontes (tokens, specs, regras) e entrega este arquivo."},
                    {"title": "Só a skill?", "text": "No claude.ai, envie rc-brand.skill em Configurações → Capabilities → Skills."}]},
                {"type": "code", "text": "/plugin marketplace add sasexecutar-coder/next-starter-template\n/plugin install risco-cognitivo-brand@risco-cognitivo\n/marca-ativar"}]},
            {"id": "primeiro-teste", "title": "Seu primeiro teste em 3 mensagens", "nav": "Primeiro teste", "blocks": [
                {"type": "timeline", "items": [
                    {"when": "Mensagem 1", "title": "“Ativa minha marca”", "text": "Recebe o relatório de fontes e este onboarding."},
                    {"when": "Mensagem 2", "title": "“Faz o carrossel sobre viés de confirmação”", "text": "Recebe HTML + PNGs 1080×1350 com a marca."},
                    {"when": "Mensagem 3", "title": "“Confere a marca”", "text": "Recebe o review: bloqueantes, avisos e o que fazer."}]}]},
            {"id": "rotina", "title": "A rotina mínima", "nav": "Rotina mínima", "blocks": [
                {"type": "p", "text": "Você vive com estes três. O resto aparece quando a tarefa pede (revelação progressiva)."},
                {"type": "commands", "items": core}]},
            {"id": "comandos", "title": "Comandos por função", "nav": "Comandos", "blocks": [
                {"type": "commands", "items": more},
                {"type": "callout", "title": "Regra", "text": "IDs nunca são removidos nem renomeados. Se um comando mudar de nome, o antigo vira alias."}]},
            {"id": "marca", "title": "A marca em uma tela", "nav": "A marca", "blocks": [
                {"type": "swatches", "items": [{"name": n, "token": t, "value": tok[t]["$value"]} for n, t in SWATCHES]},
                {"type": "table", "caption": "Tipografia", "head": ["Papel", "Família", "Uso"], "rows": [
                    ["Display", "DM Sans 700–800", "títulos, números, wordmark"],
                    ["Texto", "Inter 400–600", "corpo, interface, tabelas"],
                    ["Mono", "DM Mono 400–500", "IDs, código, metadados"]]},
                {"type": "list", "items": [
                    "Azul de ação (D-01) é o único azul de interação; laranja e azuis de outras marcas não entram.",
                    "Vermelho = risco e verde = solução: nunca decorativos.",
                    "Espaço só na escala 4/8/12/16/24/32/48/64/96; raios 2/4/8/12/16.",
                    "Contraste mínimo 4,5:1 em texto e 3:1 em controles, nos 3 temas."]}]},
            {"id": "limites", "title": "O que ele pode fazer e quando deve parar", "nav": "Limites", "blocks": [
                {"type": "rules",
                 "yes": ["Gerar assets com os tokens da marca", "Converter artefatos existentes para a marca",
                         "Auditar e apontar o que falta, com evidência", "Mostrar specs verificadas de canal"],
                 "no": ["Inventar cor, fonte, número ou spec que não esteja nas fontes",
                        "Preencher o que está A DEFINIR (safe areas, símbolo, owner)",
                        "Aprovar a própria produção: quem verifica é o auditor, em contexto limpo",
                        "Publicar ou enviar para fora sem a sua aprovação"]},
                {"type": "table", "caption": "Estados", "head": ["Estado", "Quando"], "rows": [
                    ["BLOCKED", "falta fonte ou entrada obrigatória"], ["EVIDENCE REQUIRED", "claim ou valor sem fonte"],
                    ["REWORK", "auditoria reprovou"], ["USER ACTION REQUIRED", "precisa da sua decisão ou aprovação"],
                    ["VERIFIED", "auditor aprovou com evidência"]]}]},
            {"id": "outros-sistemas", "title": "Em outros projetos e sistemas de IA", "nav": "Outros sistemas", "blocks": [
                {"type": "table", "caption": "Portabilidade", "head": ["Destino", "Use"], "rows": [
                    ["Site / app web", "tokens.css + components.css ou tailwind.preset.cjs"],
                    ["React", "componentes em rc-brand/assets/components/react"],
                    ["Python (PPTX, DOCX, PDF)", "tokens.py → rgb()"],
                    ["Figma / Style Dictionary", "tokens.json (DTCG)"],
                    ["Outro agente / IDE", "servidor MCP rc-brand: get_tokens, get_spec, check_contrast, audit_html"]]}]},
            {"id": "faq", "title": "Perguntas comuns", "nav": "Perguntas", "blocks": [
                {"type": "faq", "items": [
                    {"q": "Preciso decorar os comandos?", "a": "Não. Fale normalmente; o orquestrador resolve a frase para o ID."},
                    {"q": "Posso mudar uma cor?", "a": "Só no site (globals.css). O build regenera os tokens e a paridade é testada."},
                    {"q": "E se a spec de um canal estiver A DEFINIR?", "a": "O plugin mostra o que é verificado e lista o resto; não chuta valor típico."},
                    {"q": "O hook bloqueia meu trabalho?", "a": "Não. Ele só avisa quando um HTML/CSS/SVG salvo foge da marca."},
                    {"q": "Funciona sem internet?", "a": "Os HTMLs são standalone; só as fontes vêm do Google Fonts, com fallback de sistema."}]}]},
            {"id": "pronto", "title": "Você está pronto quando…", "nav": "Checklist", "blocks": [
                {"type": "checklist", "items": [
                    "Rodei /marca-ativar e recebi este arquivo", "Gerei um asset com /marca-carrossel ou /marca-ebook",
                    "Rodei /marca-auditar e entendi o review", "Exportei os tokens com /marca-tokens para outro projeto",
                    "Sei o que o plugin não deve fingir", "Salvei este onboarding em PDF"]}]},
        ]}}


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--version", default="1.0.0")
    a = ap.parse_args()
    Path(a.out).write_text(json.dumps(build(a.version), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(a.out)
