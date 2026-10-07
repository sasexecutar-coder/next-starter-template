"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExecutiveFunction } from "@/content/functions";
import { Chip } from "@/app/_components/ui/chip";
import { FunctionIcon } from "@/app/_components/icons";
import s from "./brain-stage.module.css";

// Cena do Brain Home v1 (D-22) com a camada de interface do Brain Home v2 (D-32):
// marcadores em círculo com ícone, callout tracejado com colchetes, painel com marcas de canto.
// Sem pausa, reset ou switch de movimento (D-36): o movimento segue só o prefers-reduced-motion.
// A cena (three + brain-scene) só é importada quando o palco entra na tela; antes disso, pôster.

const ASSETS = "/models/home-brain/";
const HOME = { x: 0.16, y: -0.42 };
// Contrato de callouts automáticos (v2): entra com facing > 0,32, sai < 0,12, troca após 6 s
const AUTO = { enter: 0.32, leave: 0.12, dwellMs: 6000, settleMs: 300 };

type Status = "poster" | "loading" | "ready" | "failed" | "saveData";

type Engine = {
  aimAt: (i: number) => void;
  dispose: () => void;
};

type Props = {
  functions: ExecutiveFunction[];
  variant: "home" | "mapas";
};

export function BrainStage({ functions, variant }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const engineRef = useRef<Engine | null>(null);
  const calloutRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sel, setSel] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [status, setStatus] = useState<Status>("poster");
  // Pedido de carga separado do status exibido: mudar o status não pode desmontar a cena.
  const [load, setLoad] = useState(false);
  const functionsRef = useRef(functions);
  const [dragging, setDragging] = useState(false);
  const live = useRef({ sel: -1, reduced: false, inView: true });

  // Movimento: só a preferência do sistema (D-36)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    live.current = { ...live.current, sel, reduced };
  }, [sel, reduced]);

  const select = useCallback((i: number) => {
    setSel(i);
    engineRef.current?.aimAt(i);
  }, []);

  // Carga preguiçosa: só quando o palco aparece; respeita "economia de dados"
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || load) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      setStatus("saveData");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          setLoad(true);
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [load]);

  // Monta a cena 3D uma vez, quando a carga é pedida; desmonta só ao sair da página
  useEffect(() => {
    if (!load) return;
    const stage = stageRef.current;
    if (!stage) return;
    const functions = functionsRef.current;
    setStatus("loading");
    const ac = new AbortController();
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const [THREE, scene] = await Promise.all([import("three"), import("@/lib/brain/brain-scene")]);
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        if (!renderer.getContext()) throw new Error("WebGL indisponível");
        const assets = await scene.loadBrainAssets(ASSETS, ac.signal);
        if (disposed) {
          renderer.dispose();
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0xffffff, 0);
        stage.insertBefore(renderer.domElement, stage.firstChild);

        const sc = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
        sc.add(new THREE.HemisphereLight(0xffffff, 0xe6e6ee, 1.5));
        const key = new THREE.DirectionalLight(0xffffff, 1.25);
        key.position.set(-4, 5, 6);
        sc.add(key);
        const fill = new THREE.DirectionalLight(0xeef0ff, 0.55);
        fill.position.set(-6, -2, -5);
        sc.add(fill);
        // Névoa na cor do fundo do tema (D-33) para separar frente e verso
        // ds-allow: fallback do token --surface-page quando o CSS ainda não carregou
        const canvasColor = () => getComputedStyle(document.documentElement).getPropertyValue("--surface-page").trim() || "#fffdfa";
        const fog = new THREE.Fog(canvasColor(), 5, 9);
        sc.fog = fog;
        const onTheme = () => fog.color.set(canvasColor());
        window.addEventListener("rc-theme", onTheme);

        // Configuração da v1
        const cfg = structuredClone(scene.DEFAULT_CONFIG);
        cfg.lines.intensity = 0.35;
        // ds-allow: material da cena v1 (fonte de verdade D-22), não é cor de interface
        cfg.surface.crown = "#fdfdfe"; // ds-allow
        cfg.surface.fundus = "#dcdde5"; // ds-allow
        cfg.surface.sulcStrength = 1.2;
        cfg.surface.roughness = 0.9;
        cfg.particles.sizePx = 2.3;
        cfg.particles.opacity = 1;
        cfg.particles.crownMix = 0.7;

        const rot: { x: number; y: number; anim: null | { fx: number; fy: number; x: number; y: number; t: number } } = {
          x: HOME.x,
          y: HOME.y,
          anim: null,
        };
        const pivot = new THREE.Group();
        sc.add(pivot);
        const brain = scene.createBrain(assets);

        // Anéis orbitais tracejados (v1)
        const rings = new THREE.Group();
        const ringSpecs: [number, number, number, number][] = [
          [2.55, 1.85, 0.35, 0.1],
          [2.35, 1.7, -0.9, 0.5],
          [2.7, 1.55, 1.25, -0.25],
        ];
        ringSpecs.forEach(([rx, ry, ty, tz], k) => {
          const pts: InstanceType<typeof THREE.Vector3>[] = [];
          for (let i = 0; i <= 200; i++) {
            const a = (i / 200) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry * 0.35, Math.sin(a) * ry));
          }
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineDashedMaterial({ color: 0x9da1f2, dashSize: 0.045, gapSize: 0.05, transparent: true, opacity: 0.9, depthWrite: false }),
          );
          line.computeLineDistances();
          line.rotation.set(tz, ty, 0);
          rings.add(line);
          const nodes = [];
          for (let i = 0; i < 5; i++) nodes.push(pts[Math.floor(((i + k * 0.37) / 5) * 200)]);
          const n = new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(nodes),
            new THREE.PointsMaterial({ color: 0x8f93ef, size: 0.08, transparent: true, opacity: 0.9, depthWrite: false }),
          );
          n.rotation.copy(line.rotation);
          rings.add(n);
        });
        pivot.add(rings, brain.root);

        // Âncoras: partícula do córtex mais extrema na direção `dir` de cada função
        const q = new Int16Array(assets.pts);
        const at = new Uint8Array(assets.attr);
        const count = q.length / 3;
        const anchors = functions.map((f) => {
          const d = new THREE.Vector3(...f.dir).normalize();
          let best = -1e9;
          let bi = 0;
          for (let i = 0; i < count; i++) {
            if (at[2 * i + 1] !== 0) continue;
            const v = q[3 * i] * d.x + q[3 * i + 1] * d.y + q[3 * i + 2] * d.z;
            if (v > best) {
              best = v;
              bi = i;
            }
          }
          const p = new THREE.Vector3(q[3 * bi], q[3 * bi + 1], q[3 * bi + 2]).multiplyScalar(2 / 32767);
          return { p, n: p.clone().normalize() };
        });

        let dist = 6.6;
        const frame = () => {
          const w = stage.clientWidth || 1;
          const h = stage.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          dist = Math.max(2.75 / (t * camera.aspect * 0.96), 2.0 / (t * 0.96));
          camera.position.set(0, 0.1, dist);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
          fog.near = dist - 1.4;
          fog.far = dist + 4.2;
          brain.apply({ ...cfg, camera: { ...cfg.camera, distanceUnits: dist } }, { dpr: renderer.getPixelRatio() });
        };

        const v = new THREE.Vector3();
        const nrm = new THREE.Vector3();
        const toCam = new THREE.Vector3();
        const proj = anchors.map(() => ({ x: 0, y: 0, facing: -1, inside: false }));
        let shown: { i: number; since: number }[] = [];
        let settledAt = 0;
        const hit = (a: Box, b: Box) => !(a.r < b.l || b.r < a.l || a.b < b.t || b.b < a.t);

        const project = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          anchors.forEach((m, i) => {
            v.copy(m.p).applyMatrix4(pivot.matrixWorld);
            nrm.copy(m.n).applyQuaternion(pivot.quaternion);
            toCam.copy(camera.position).sub(v).normalize();
            const facing = nrm.dot(toCam);
            v.project(camera);
            const x = (v.x * 0.5 + 0.5) * w;
            const y = (-v.y * 0.5 + 0.5) * h;
            proj[i] = { x, y, facing, inside: x > 24 && x < w - 24 && y > 24 && y < h - 24 };
          });
        };

        // Callouts automáticos por orientação (v2): 1 no mobile, 2 no desktop; histerese e permanência mínima
        const updateAuto = (now: number, busy: boolean) => {
          if (live.current.sel >= 0 || busy || now - settledAt < AUTO.settleMs) return;
          const slots = stage.clientWidth < 600 ? 1 : 2;
          const ok = (i: number) => proj[i].inside && proj[i].facing > AUTO.leave;
          shown = shown.filter((x) => ok(x.i));
          const cands = proj
            .map((_, i) => i)
            .filter((i) => proj[i].inside && proj[i].facing > AUTO.enter && !shown.some((x) => x.i === i))
            .sort((a, b) => proj[b].facing - proj[a].facing);
          for (const i of cands) {
            if (shown.length < slots) {
              shown.push({ i, since: now });
              continue;
            }
            const old = shown.findIndex((x) => now - x.since > AUTO.dwellMs);
            if (old >= 0) shown[old] = { i, since: now };
          }
        };

        const placeOverlay = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          const si = live.current.sel;
          const active = si >= 0 ? [si] : shown.map((x) => x.i);
          anchors.forEach((_, i) => {
            const el = markerRefs.current[i];
            if (!el) return;
            const p = proj[i];
            const front = p.facing > -0.05 && p.inside;
            el.style.transform = `translate(${(p.x - 22).toFixed(1)}px, ${(p.y - 22).toFixed(1)}px)`;
            el.style.opacity = front ? Math.min(1, 0.35 + p.facing * 1.6).toFixed(2) : "0";
            el.classList.toggle(s.back, !front);
            el.classList.toggle(s.on, active.includes(i));
            el.tabIndex = front ? 0 : -1;
          });
          const taken: Box[] = [];
          const order = [...active].sort((a, b) => (a === si ? -1 : b === si ? 1 : 0));
          const showCo = new Set<number>();
          for (const i of order) {
            const co = calloutRefs.current[i];
            const p = proj[i];
            if (!co || (i !== si && !(p.facing > AUTO.leave && p.inside))) continue;
            const cw = co.offsetWidth;
            const ch = co.offsetHeight;
            let x = p.x < w * 0.55 ? p.x + 30 : p.x - 30 - cw;
            let y = p.y - ch / 2;
            x = Math.max(4, Math.min(w - cw - 4, x));
            y = Math.max(4, Math.min(h - ch - 4, y));
            const box = { l: x, t: y, r: x + cw, b: y + ch };
            if (taken.some((t) => hit(t, box))) continue;
            taken.push(box);
            showCo.add(i);
            co.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
          }
          calloutRefs.current.forEach((co, i) => {
            if (!co) return;
            co.classList.toggle(s.show, showCo.has(i));
            co.classList.toggle(s.coSel, i === si);
            co.tabIndex = showCo.has(i) ? 0 : -1;
          });
        };

        const aimAt = (i: number) => {
          let x = HOME.x;
          let y = HOME.y;
          if (i >= 0) {
            const p = anchors[i].p;
            y = Math.atan2(-p.x, p.z) + 0.38;
            x = 0.12;
          }
          const dy = ((((y - rot.y + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
          if (live.current.reduced) {
            rot.x = x;
            rot.y += dy;
            rot.anim = null;
          } else rot.anim = { fx: rot.x, fy: rot.y, x, y: rot.y + dy, t: 0 };
        };

        // Arraste: horizontal gira; vertical inclina só com mouse/caneta (touch-action: pan-y)
        let drag: { id: number; x: number; y: number; type: string } | null = null;
        const onDown = (e: PointerEvent) => {
          if (!e.isPrimary || e.button !== 0) return;
          if ((e.target as HTMLElement).closest("button")) return;
          drag = { id: e.pointerId, x: e.clientX, y: e.clientY, type: e.pointerType };
          rot.anim = null;
          stage.setPointerCapture(e.pointerId);
          setDragging(true);
        };
        const onMove = (e: PointerEvent) => {
          if (!drag || drag.id !== e.pointerId) return;
          rot.y += (e.clientX - drag.x) * 0.008;
          if (drag.type !== "touch") rot.x = THREE.MathUtils.clamp(rot.x + (e.clientY - drag.y) * 0.004, -0.5, 1.2);
          drag.x = e.clientX;
          drag.y = e.clientY;
        };
        const onEnd = () => {
          if (drag) settledAt = performance.now();
          drag = null;
          setDragging(false);
        };
        stage.addEventListener("pointerdown", onDown);
        stage.addEventListener("pointermove", onMove);
        ["pointerup", "pointercancel", "lostpointercapture"].forEach((t) => stage.addEventListener(t, onEnd));

        const io = new IntersectionObserver(([e]) => {
          live.current.inView = e.isIntersecting;
        });
        io.observe(stage);
        const ro = new ResizeObserver(frame);
        ro.observe(stage);
        frame();

        let raf = 0;
        let last = 0;
        const tick = (t: number) => {
          raf = requestAnimationFrame(tick);
          const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
          last = t;
          if (!live.current.inView || document.hidden) {
            last = 0;
            return;
          }
          const { reduced: r, sel: si } = live.current;
          if (rot.anim) {
            rot.anim.t = Math.min(1, rot.anim.t + dt / 0.9);
            const e = 1 - Math.pow(1 - rot.anim.t, 3);
            rot.x = rot.anim.fx + (rot.anim.x - rot.anim.fx) * e;
            rot.y = rot.anim.fy + (rot.anim.y - rot.anim.fy) * e;
            if (rot.anim.t >= 1) {
              rot.anim = null;
              settledAt = t;
            }
          } else if (!r && !drag && si < 0) rot.y += dt * 0.12;
          pivot.rotation.set(rot.x, rot.y, 0);
          pivot.updateMatrixWorld();
          project();
          updateAuto(t, !!drag || !!rot.anim);
          placeOverlay();
          renderer.render(sc, camera);
        };
        raf = requestAnimationFrame(tick);

        engineRef.current = {
          aimAt: (i: number) => {
            shown = [];
            settledAt = performance.now();
            aimAt(i);
          },
          dispose: () => {},
        };
        if (live.current.sel >= 0) aimAt(live.current.sel);
        setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("rc-theme", onTheme);
          ro.disconnect();
          io.disconnect();
          stage.removeEventListener("pointerdown", onDown);
          stage.removeEventListener("pointermove", onMove);
          ["pointerup", "pointercancel", "lostpointercapture"].forEach((t) => stage.removeEventListener(t, onEnd));
          brain.dispose();
          rings.traverse((o) => {
            const g = (o as { geometry?: { dispose: () => void } }).geometry;
            const m = (o as { material?: { dispose: () => void } }).material;
            g?.dispose();
            m?.dispose();
          });
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          engineRef.current = null;
        };
      } catch (err) {
        if (!disposed) {
          console.error(err);
          setStatus("failed");
        }
      }
    })();

    return () => {
      disposed = true;
      ac.abort();
      cleanup?.();
    };
  }, [load]);

  const onKey = (e: React.KeyboardEvent) => {
    const last = functions.length - 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(sel >= last ? -1 : sel + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(sel <= -1 ? last : sel - 1);
    } else if (e.key === "Escape") select(-1);
  };

  const current = sel >= 0 ? functions[sel] : null;

  return (
    <div className={reduced ? s.rm : undefined}>
      <div className={s.map}>
        <div
          ref={stageRef}
          className={`${s.stage} ${dragging ? s.dragging : ""}`}
          tabIndex={0}
          role="application"
          aria-label="Cérebro 3D. Arraste para girar. Setas trocam de função; Esc volta à visão geral."
          onKeyDown={onKey}
        >
          <Image
            src={`${ASSETS}brain-poster.png`}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            priority={variant === "home"}
            className={`${s.poster} ${status === "ready" ? s.posterHidden : ""}`}
          />
          <div className={`${s.layer} ${status === "ready" ? "" : s.hidden}`}>
            {functions.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => {
                  calloutRefs.current[i] = el;
                }}
                type="button"
                tabIndex={-1}
                className={s.co}
                onClick={() => select(i)}
              >
                <i className={s.c} />
                <i className={s.c} />
                <i className={s.c} />
                <i className={s.c} />
                <b>{f.name}</b>
                <span>{f.short}</span>
              </button>
            ))}
          </div>
          <div className={`${s.layer} ${status === "ready" ? "" : s.hidden}`}>
            {functions.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                type="button"
                className={s.mk}
                aria-label={f.name}
                aria-pressed={i === sel}
                onClick={() => select(sel === i ? -1 : i)}
              >
                <i>
                  <FunctionIcon id={f.id} />
                </i>
              </button>
            ))}
          </div>
          {status === "loading" && <p className={s.status}>Carregando cérebro…</p>}
          {status === "failed" && (
            <p className={s.status} role="status">
              A visualização 3D não está disponível neste navegador. As funções continuam acessíveis no painel.
            </p>
          )}
          {status === "saveData" && (
            <p className={s.status}>
              <button type="button" className={s.load} onClick={() => setLoad(true)}>
                Carregar modelo 3D (≈ 10 MB)
              </button>
            </p>
          )}
        </div>

        <aside className={`${s.panel} ${current ? s.sel : ""} ${s.fade}`} aria-live="polite" key={sel}>
          <i className={s.k} />
          <i className={s.k} />
          <i className={s.k} />
          <i className={s.k} />
          {current ? (
            <>
              <button type="button" className={s.close} aria-label="Fechar e voltar à lista" onClick={() => select(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <h2>
                <FunctionIcon id={current.id} />
                {current.name}
              </h2>
              <p className={s.lead}>{current.lead}</p>
              <Row label="Demanda" text={current.demand} />
              <Row label="Dificuldade possível" text={current.difficulty} />
              <Row label="Estratégia de apoio" text={current.strategy} />
              {variant === "mapas" && (
                <>
                  <div className={s.row}>
                    <b>Riscos relacionados</b>
                    {current.relatedRisks.length ? <span>{current.relatedRisks.join(", ")}</span> : <Chip variant="gap" />}
                  </div>
                  <div className={s.row}>
                    <b>Evidência</b>
                    {current.evidence.length ? <span>{current.evidence.join("; ")}</span> : <Chip variant="gap">Fontes em preparação</Chip>}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h2>Funções executivas</h2>
              <p className={s.lead}>
                Quatro capacidades que sustentam a execução. Escolha uma para ver demanda, dificuldade e apoio.
              </p>
              {functions.map((f, i) => (
                <button key={f.id} type="button" className={s.pick} onClick={() => select(i)}>
                  <span className={s.ic}>
                    <FunctionIcon id={f.id} />
                  </span>
                  <span>
                    <b>{f.name}</b>
                    <span>{f.short}</span>
                  </span>
                  <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              ))}
              <p className={s.note}>Os marcadores indicam acessos a redes distribuídas, não regiões clínicas exatas.</p>
            </>
          )}
        </aside>
      </div>

      <div className={s.ctrl}>
        <div className={s.hints}>
          <span>Arraste para explorar o cérebro</span>
          <span className={s.sep} />
          <span>Toque em um marcador para ler</span>
        </div>
        <div className={s.dots} role="tablist" aria-label="Funções">
          {[-1, ...functions.map((_, i) => i)].map((i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === sel}
              aria-label={i < 0 ? "Visão geral" : functions[i].name}
              onClick={() => select(i)}
            >
              <i />
            </button>
          ))}
        </div>
      </div>

      {/* Sem JavaScript: todas as funções com o detalhe completo */}
      <noscript>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {functions.map((f) => (
            <div key={f.id} className={s.panel} style={{ minHeight: 0 }}>
              <h2>{f.name}</h2>
              <p className={s.lead}>{f.lead}</p>
              <Row label="Demanda" text={f.demand} />
              <Row label="Dificuldade possível" text={f.difficulty} />
              <Row label="Estratégia de apoio" text={f.strategy} />
            </div>
          ))}
        </div>
      </noscript>
    </div>
  );
}

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className={s.row}>
      <b>{label}</b>
      <span>{text}</span>
    </div>
  );
}

type Box = { l: number; t: number; r: number; b: number };
