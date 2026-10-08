# Figuras vetoriais, infográficos e ilustração

Fontes: `kit/02-design-system/linguagem-visual/{vector-figure-contract,infographic-isometric-system,image-illustration-system}.md`.

## Princípio
**Mono-first com acento semântico:** 80–95% neutro, 5–20% cor com significado.

| Papel | Valor |
|---|---|
| figure-bg | `#FFFDFA` |
| figure-ink / ink-muted / line-subtle | `#000000` / `#545454` / `#ECECEC` |
| accent-brand (navegação, caminho ativo) | `#2D5CE6` · soft `#CBD4FF` |
| accent-solution (controle, resolvido) | `#00BF63` |
| accent-risk (risco, falha) | `#FF0000` |
| accent-indigo | `#0E025D` |
Amarelo de atenção em figuras: **A DEFINIR** (D-35 restringe ao chip GAP no site).

## Traço e geometria
Primário médio em ink, secundário fino em muted, guia hairline em line; escala relativa 1× / 1,5× / 2× (px A DEFINIR);
pontas arredondadas; opacidades 1 / .72 / .48 / .19. Só linha, círculo, retângulo, retângulo arredondado, seta, colchete e
polígono simples. Proibido: blobs, ornamentos, 3D sem dado, gradientes, sombras pesadas, arco-íris, várias famílias de ícone.

## Orçamento de complexidade
≤ 4 níveis · ≤ 7 nós primários · ≤ 3 cores semânticas · ≤ 3 tamanhos de fonte · ≤ 3 espessuras · ≤ 2 contêineres
aninhados. Passou disso: dividir a figura. Fluxos de cima para baixo (ou esquerda→direita), sem cruzamentos.
Rótulos 1–4 palavras (aviso > 6), ≤ 2 linhas, Inter (DM Mono para técnico). Caption "Figura N — …" obrigatório em dados,
diagrama causal e infográfico.

## SVG (rc-audit verifica)
`viewBox` obrigatório; sem `width`/`height` fixos; decorativo `aria-hidden="true"`; informativo com `<title>` + alt
externo; preferir `currentColor`/tokens a hex inline. Responsivo: reorganizar/empilhar, nunca só encolher.

## Infográfico isométrico (INFO-ISO-01)
Padrão é flat 2D; isométrico só para magnitude, arquitetura ou sistema. Projeção ortográfica 30°/150°/90°, sem fuga;
prisma 1×1, altura linear a partir de 0; faces topo claro / esquerda média / direita escura; rótulos planos fora da
projeção; sempre há representação 2D/tabela acessível. Rampa de solução `#E7F8EE → #B8EBCB → #73D99A → #00BF63 → #007A3E`;
rampas de risco/marca: A DEFINIR. Composição: título → visual → KPIs → divisor → matriz 2D → legenda "menos → mais".

## Ilustração (IMG-STYLE-ARCH-LINE-01)
"Architectural Technical Line Art": foto → cinza → contornos → traço fino → hachura leve → acento seletivo → dot grid.
70–90% neutro; linha `#545454`, luz `#ECECEC`, fundo `#FFFDFA`; acento só no foco. Proibido: foto realista colorida,
aquarela, cartoon, 3D hiper-realista. Fotos (D-11): fundo removido, isoladas no canvas, FX-EDGE-01 no recorte.
