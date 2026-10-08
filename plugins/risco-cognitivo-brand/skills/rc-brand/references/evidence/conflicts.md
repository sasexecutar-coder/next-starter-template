# Conflitos registrados (não adotados)

| ID | Fonte | Valor encontrado | Valor da marca | Decisão |
|---|---|---|---|---|
| CF-01 | DESIGN-TECH-SCHEMA-001 › DESIGN_TOKENS_SCOPED.yaml; CMD-REACT-INFOGRAFICO | laranja `#F56A1C` / `#E85A0C` como destaque, Inter como base, raios 12–24 | azul `#2D5CE6` (D-01); raios 2/4/8/12/16 (D-25/D-32) | recolorir para D-01; manter wireframe só como referência de layout |
| CF-02 | CAMPANHA-01 › prompt.jinja | azul `#2563EB`, preenchimentos `#CBD5F5`/`#99B0F4`, contorno `#111827` | `#2D5CE6`, `#CBD4FF`, `#000000`/`#545454` | substituir pelos tokens na skill rc-infographic |
| CF-03 | conversor de cards (cards.json) | marca "Custo Cognitivo", acento `#155AAF`, tinta `#17212D` | "Risco Cognitivo", tokens da marca | renomear e recolorir no template rc-cards |
| CF-04 | RC-CARD-001 (DOC-010) | cores de quadrante `#C5453D`/`#DA6B37`/`#0C8855`/`#7C8892`, Nimbus Sans Narrow | semânticas D-01; DM Sans/Inter | não adotar; 3 delas falham AA como texto (COMPUTED_EVIDENCE) |
| CF-05 | X-Ray brand layer / ebook | proíbe Inter; Poppins + Lora; pesos sem 600 | D-03 (Inter corpo, DM Sans 600 em títulos) | adotar a arquitetura do X-Ray, manter a tipografia D-03 |
| CF-06 | onboarding EXECUTAR Copiloto | preto `#171717` como ação, raio 20 | azul de ação, raios da marca | reaproveitar a anatomia, recolorir |
| CF-07 | handoff editorial §7 × leitura-cognitiva | justificar PDF × nunca justificar | — | à esquerda até decisão (print.md) |
| CF-08 | PD-CLB × DOC-004 | quantidades por ciclo divergentes (carrosséis 6×2, newsletters 3×1, CTAs 6×1…) | — | escolher cenário ativo; ver rc-formats |
