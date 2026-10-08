# Checklist bloqueante da camada de marca

Adaptado do X-Ray brand layer (6 itens) para o Risco Cognitivo. Qualquer item falhando → o artefato não sai (REWORK).

| # | Verificação | Como conferir |
|---|---|---|
| 1 | A fonte da identidade foi lida nesta sessão (tokens.json do plugin ou brand_config.json declarado) | citar o arquivo no relatório |
| 2 | Nenhum nome de outra marca no texto visível (lista em rc-audit `FOREIGN`) | `audit_html.py` → 0 `brand-name` |
| 3 | Wordmark tipográfico "Risco Cognitivo" ou favicon RC presente em ao menos um lugar (cabeçalho ou rodapé) | inspeção / grep |
| 4 | Cor de ação = `--brand-action-blue` (D-01); laranja/azuis estrangeiros remapeados | relatório `apply_brand.py` sem `unmapped` |
| 5 | Estrutura preservada: espaço 4/8/12/16/24/32/48/64/96, raios 2/4/8/12/16, pesos 400–800, mínimo 12px em tela | `audit_html.py` sem `off-scale-*` novos |
| 6 | Contraste AA nos 3 temas (texto 4,5:1, controles 3:1) | `../rc-brand/scripts/contrast.py fg bg` |

## O que nunca é sobrescrito
Escala de espaço e raio, tipografia mínima, alvos de toque ≥ 44px, foco visível, regras de cor semântica (vermelho =
risco, verde = solução), proibição de gradiente decorativo e de emoji como ícone.

## Co-branding (outra identidade sobre a estrutura Risco Cognitivo)
`brand_config.json` declara **somente** tokens a trocar:
```json
{"brand": {"name": "Parceiro X", "tokens": {"brand-action-blue": "#RRGGBB", "brand-action-blue-strong": "#RRGGBB"}}}
```
Campo vazio = mantém o token da marca. Valor não-HEX = erro. Nunca deduza cor de logo, print ou conversa.
Rodapé co-branded: "Parceiro X · estrutura Risco Cognitivo" (opcional, decisão do usuário).
