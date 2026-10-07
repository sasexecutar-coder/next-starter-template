# Handoff — HOME-BRAIN-001

## Arquivos

- `Brain Home v2.html` + `brain-hollow.js` — representação oca (RC-BRAIN-CRITIQUE-001). Substitui a superfície sólida: a malha triangular não é desenhada; é fatiada em contornos (13 latitudes + 9 planos meridianos, só faces voltadas para fora → sem parede medial nem paredes de sulco) e usada para normais das âncoras. Pontos mascarados por ruído 3D determinístico (fbm) → campos pontilhados alternados com vazios; fundo de sulco e tronco ficam abertos. Frente/verso: alfa por profundidade de vista (verso ≈ 14–18%).
  - Motion: 0,03 rad/s; arraste 0,003 rad/px após limiar de 8 px; toque vertical = scroll da página (touch-action: pan-y); sem inércia; arraste e seleção pausam e só “Girar” retoma; fechar o painel não retoma; IntersectionObserver/aba oculta suspendem sem tocar na pausa; movimento reduzido = estático, transições 0 ms.
  - Callouts por orientação: elegível com facing > 0,32, sai < 0,12 (histerese), permanência mínima 6 s, 2 slots desktop / 1 em < 600 px, colisão descarta o de menor prioridade, posição limitada ao palco. Seleção manual trava o automático.
  - Painel estável: lista → detalhe (Demanda / Dificuldade possível / Estratégia de apoio). Foco no painel pausa.
  - Pendente: pôster de fallback no estilo oco (hoje o fallback é texto + lista); HEX final do acento (amostrado #6E72F0, a aprovar); coordenadas editoriais das âncoras.

- `Brain Home.html` — composição da Home (mockup Risco Cognitivo): marcadores 3D clicáveis, card de detalhe, pontos de navegação, pausa/reset, movimento reduzido, anéis orbitais tracejados.
- `Brain Viewer.html` — prévia de revisão (painel de controles, modos Superfície/Pontos/Combinada).
- `brain-scene.js` — módulo da cena sem framework: `loadBrainAssets`, `createBrain`, `parseGlb`, `inspectGlb`, `DEFAULT_CONFIG`, `VIEWS`.
- `assets/brain-surface.glb`, `assets/brain-particles.bin`, `assets/brain-particles-attr.bin`, `assets/brain-poster.png`.
- `brain-visual-config.json` — configuração padrão com unidades. O painel exporta a configuração atual no mesmo formato.
- `build/build-brain-assets.js` — gerador (entrada `source/`, saída `assets/`).

## O que o GLB carrega e o que depende do código

O GLB abre sozinho em qualquer visualizador (malhas, normais, nomes, materiais PBR e COLOR_0 com o cinza de giros/sulcos já assado). Dependem de `brain-scene.js`:

1. **Shader da superfície** (`MeshStandardMaterial.onBeforeCompile`): recalcula a cor a partir de `_SULC` (`smoothstep(-0.6, 0.9, sulc)` entre `crown` e `fundus`, × `sulcStrength`); cerebelo/tronco usam tom fixo `subcortical`. Graticulado em espaço do objeto: planos de latitude a cada `spacingUnits` e `meridians` meridianos em torno de y, antisserrilhados com `fwidth`. Ao carregar com GLTFLoader, o atributo chega como `_sulc` — o mesmo nome que o shader espera.
2. **Shader das partículas** (`ShaderMaterial`): ponto redondo por `gl_PointCoord`, tamanho em px atenuado pela distância (`sizePx · dpr · 6.6 / −z`), giros maiores e mais laranja (`crownMix`), esmaecimento dos pontos do fundo (`backFade`). `depthWrite: false`, `renderOrder 2`.
3. **Oclusão**: superfície opaca com `polygonOffset` escreve profundidade; partículas a 0,012 un. acima dela. No modo Pontos com “Ocultar verso”, a superfície fica com `colorWrite = false` e continua escrevendo profundidade (oclusor invisível).
4. **Densidade**: partículas embaralhadas deterministicamente no carregamento; `setDrawRange` reduz a quantidade sem eliminar cerebelo/tronco.
5. **Luzes e névoa**: hemisférica + principal (azimute/elevação) + preenchimento; `Fog` da cor do fundo para separar frente e costas.

Paleta (v1.1.0): amostrada da referência do Coliseu — índigo de gravura `#6E72F0` (marca), `#4F53D9` (forte), `#E4E6FF` (suave), pontos `#A3A8F5`→`#5A5FE8`, neutros `#212121 / #5F6068 / #CBCBCB / #F5F5F5`, fundo branco com grade de pontos. Nomes de token mantidos (`--raw-orange*` agora carregam o índigo) para não quebrar consumidores.

## Interação

- Arraste horizontal = giro em y; vertical = inclinação (só mouse/caneta). `touch-action: pan-y` preserva a rolagem vertical no mobile.
- Arrastar pausa a rotação automática. Botões: ←/→ (22,5°), pausar/retomar, reset, aproximar/afastar (distância limitada a 4,6–10 un.).
- Teclado com o cérebro em foco: setas, Espaço/Enter (pausa), R (reset); 1/2/3 trocam o modo em qualquer lugar.
- `prefers-reduced-motion: reduce` → começa parado e transições de vista viram cortes.
- Câmera ajusta a distância para caber em largura e altura (sem cortes em 375, 768 e 1440).
- Sem WebGL ou falha de carga: o pôster permanece e uma mensagem textual aparece.

## Marcadores (Brain Home)

- Âncora = partícula do córtex mais extrema na direção `dir` de cada função (espaço do objeto: +x anterior, +y superior, +z hemisfério direito).
- Projeção por quadro para DOM; opacidade por `dot(normal, câmera)` — marcadores no verso esmaecem e ficam não clicáveis (profundidade frente/costas).
- Clique/ponto/setas: seleciona, gira o cérebro até a âncora (0,9 s ease-out; instantâneo com movimento reduzido) e abre o card Demanda / Dificuldade / Estratégia. Esc ou × volta à visão geral. Rotação automática só na visão geral.
- Textos de Planejamento, Controle inibitório e Flexibilidade no card de detalhe são rascunho de conteúdo; Memória de trabalho é do mockup.

## Integração React (resumo)

```js
const assets = await loadBrainAssets('/models/home-brain/', signal);
const brain = createBrain(assets);
scene.add(brain.root);
brain.apply(config, { dpr: renderer.getPixelRatio() });
// cleanup
brain.dispose(); renderer.dispose(); renderer.forceContextLoss();
```

Rotação, observadores (Resize/Intersection/visibilidade) e eventos podem seguir `03-reference-code/brain-renderer.client.ts`; troque o carregamento de pontos por `loadBrainAssets` + `createBrain`. Home e `/mapas/` usam o mesmo objeto com configurações diferentes (`mode`, `camera.view`, `motion.paused`). Rótulos/marcadores ficam em HTML separado.

## Medições observadas

- Prévia nesta sessão (iframe de revisão, navegador Chromium, GPU desconhecida, canvas 1748×840): 20–30 FPS com 350.236 triângulos e 42.000 partículas. Não é medição de dispositivo final — repita em aparelhos reais.
- Download: GLB 9,47 MB + partículas 0,34 MB. Próximo passo recomendado: compressão meshopt/Draco (reduz para ~2–3 MB) ou grade de 1,6 mm para a Home.

## Pendente para aceite

- Aprovação visual explícita (G2) da paleta índigo e dos textos dos cards.
- Medições em 375/768/1440 em dispositivos reais e FPS por aparelho (G3).
