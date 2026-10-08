---
name: rc-editorial
description: >-
  Formata e revisa textos da marca Risco Cognitivo — artigo mãe, post de blog, MDX, newsletter, roteiro e legendas —
  com a voz editorial (didático, prático, com evidência, zero coach, jornalístico), blocos (:::callout, :::summary,
  :::definition, :::keypoints) e o orçamento de leitura cognitiva verificado por linter. Use ao escrever, revisar ou
  "formatar o artigo", converter texto em MDX, adaptar artigo para newsletter/LinkedIn, ou checar legibilidade.
---

# Editorial (CV-MARCA-011 · /marca-editorial)

## Voz (as 5 diretrizes do ciclo editorial)
| Diretriz | Faça | Evite |
|---|---|---|
| Didático | explicar o mecanismo com exemplo concreto | jargão sem definição |
| Prático | terminar a seção com algo que o leitor faz hoje | conselho genérico ("seja mais consciente") |
| Evidência | dado com fonte linkada; separar evidência de interpretação | número sem fonte, "estudos mostram" |
| Zero coach | afirmar e mostrar | "você consegue!", promessa, emoji motivacional |
| Jornalístico | título que afirma o achado | título-anúncio ("Introdução", "Tudo sobre…") |

## Fluxo
1. **Estrutura** — artigo mãe: 1.800–2.400 palavras em 9–11 blocos Claim → Evidência → Exemplo → Interpretação;
   H2 de 3–8 palavras que afirmam; 1 bloco pesado + 1 leve por H2. Modelo: `examples/artigo-exemplo.md`.
2. **Blocos** — sintaxe e render em `../rc-brand/references/editorial.md` (callout só para a frase a lembrar).
3. **Lint**
   ```bash
   python3 scripts/lint_reading.py artigo.md [--mother] [--strict]
   ```
   Falha: frase > 30 palavras, parágrafo > 90 ou > 4 frases, H1 no corpo, nível pulado, seção > 400 sem H3,
   lista > 9. Aviso: faixas de alerta, negrito/itálico/caixa alta, **número sem link ou nota (EVIDENCE REQUIRED)**.
4. **GEO/SEO** — resposta direta logo após a pergunta do H2; dados e fontes citáveis; título e description claros.
5. **Derivados** — newsletter, LinkedIn e roteiros partem do artigo aprovado (ciclo em `../rc-formats/references/editorial-cycle.md`);
   carrossel em `../rc-social`, ebook em `../rc-ebook`.

## Newsletter e e-mail
Clientes de e-mail não leem `var(--token)`: use os valores HEX do tema claro de `tokens.json` inline, largura 600px,
Inter com fallback Arial, 1 CTA `brand-action-blue`, texto alternativo em toda imagem. É a única exceção à regra "sem
hex fora de :root" — registre no review como exceção de formato.
