"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExecutiveFunction } from "@/content/functions";
import { GapChip } from "@/app/_components/gap-chip";
import { Icon } from "@/app/_components/icons";
import s from "./brain-stage.module.css";

// Porte do Brain Home v1 (docs/design-kit/04-handoff/brain-home/brain-home-v1.html, D-22).
// A cena (three + brain-scene) só é importada quando o palco entra na tela; antes disso, pôster.

const ASSETS = "/models/home-brain/";
const HOME = { x: 0.16, y: -0.42 };
const STORAGE_KEY = "rc-home-brain";

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
  const [sel, setSel] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [status, setStatus] = useState<Status>("poster");
  // Pedido de carga separado do status exibido: mudar o status não pode desmontar a cena.
  const [load, setLoad] = useState(false);
  const functionsRef = useRef(functions);
  const [dragging, setDragging] = useState(false);
  const live = useRef({ sel: -1, paused: false, reduced: false, inView: true });

  // Preferência de movimento: sistema + escolha salva (como na v1)
  useEffect(() => {
    let r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) r = !!saved.reduced;
    } catch {}
    setReduced(r);
  }, []);

  useEffect(() => {
    live.current = { ...live.current, sel, paused, reduced };
  }, [sel, paused, reduced]);

  const select = useCallback(
    (i: number) => {
      setSel(i);
      engineRef.current?.aimAt(i);
    },
    [],
  );

  const toggleReduced = () => {
    const next = !reduced;
    setReduced(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ reduced: next }));
    } catch {}
  };

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
        // Névoa na cor do canvas da marca (#FFFDFA) para separar frente e verso
        const fog = new THREE.Fog(0xfffdfa, 5, 9);
        sc.fog = fog;

        // Configuração da v1
        const cfg = structuredClone(scene.DEFAULT_CONFIG);
        cfg.lines.intensity = 0.35;
        cfg.surface.crown = "#fdfdfe";
        cfg.surface.fundus = "#dcdde5";
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
        const placeMarkers = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          anchors.forEach((m, i) => {
            const el = markerRefs.current[i];
            if (!el) return;
            v.copy(m.p).applyMatrix4(pivot.matrixWorld);
            nrm.copy(m.n).applyQuaternion(pivot.quaternion);
            const facing = nrm.dot(v.clone().sub(camera.position).negate().normalize());
            v.project(camera);
            const x = (v.x * 0.5 + 0.5) * w;
            const y = (-v.y * 0.5 + 0.5) * h;
            const ew = el.offsetWidth;
            let left = x < w * 0.5;
            if (!left && x - 11 + ew > w) left = true;
            else if (left && x + 11 - ew < 0) left = false;
            el.classList.toggle(s.left, left);
            const tx = THREE.MathUtils.clamp(left ? x - ew + 11 : x - 11, 0, Math.max(0, w - ew));
            el.style.transform = `translate(${tx.toFixed(1)}px, ${(y - 11).toFixed(1)}px)`;
            const o = THREE.MathUtils.smoothstep(facing, -0.25, 0.2);
            el.style.opacity = (0.15 + 0.85 * o).toFixed(2);
            el.classList.toggle(s.back, facing < -0.35);
            el.tabIndex = facing < -0.35 ? -1 : 0;
            el.style.zIndex = String(Math.round(o * 10));
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
          const { paused: p, reduced: r, sel: si } = live.current;
          if (rot.anim) {
            rot.anim.t = Math.min(1, rot.anim.t + dt / 0.9);
            const e = 1 - Math.pow(1 - rot.anim.t, 3);
            rot.x = rot.anim.fx + (rot.anim.x - rot.anim.fx) * e;
            rot.y = rot.anim.fy + (rot.anim.y - rot.anim.fy) * e;
            if (rot.anim.t >= 1) rot.anim = null;
          } else if (!p && !r && !drag && si < 0) rot.y += dt * 0.12;
          pivot.rotation.set(rot.x, rot.y, 0);
          pivot.updateMatrixWorld();
          placeMarkers();
          renderer.render(sc, camera);
        };
        raf = requestAnimationFrame(tick);

        engineRef.current = { aimAt, dispose: () => {} };
        if (live.current.sel >= 0) aimAt(live.current.sel);
        setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(raf);
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
    } else if (e.key === " " && e.target === e.currentTarget) {
      e.preventDefault();
      setPaused((p) => !p);
    } else if (e.key === "Escape") select(-1);
  };

  const still = paused || reduced;
  const current = sel >= 0 ? functions[sel] : null;

  return (
    <div className={reduced ? s.rm : undefined}>
      <div className={s.map}>
        <div
          ref={stageRef}
          className={`${s.stage} ${dragging ? s.dragging : ""}`}
          tabIndex={0}
          role="application"
          aria-label="Cérebro 3D. Arraste para girar. Setas trocam de função; espaço pausa; Esc volta à visão geral."
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
          <div className={s.markers}>
            {functions.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                type="button"
                className={`${s.mk} ${status === "ready" ? "" : s.hidden}`}
                aria-pressed={i === sel}
                onClick={() => select(sel === i ? -1 : i)}
              >
                <span className={s.dot} />
                <span className={s.pill}>{f.name}</span>
              </button>
            ))}
          </div>
          {status === "loading" && <p className={s.status}>Carregando cérebro…</p>}
          {status === "failed" && (
            <p className={s.status} role="status">
              A visualização 3D não está disponível neste navegador. As funções continuam acessíveis no card.
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

        <aside className={`${s.card} ${current ? s.sel : ""} ${s.fade}`} aria-live="polite" key={sel}>
          {current ? (
            <>
              <button type="button" className={s.close} aria-label="Fechar detalhes" onClick={() => select(-1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <h2>
                <Icon name={current.id} />
                {current.name}
              </h2>
              <p className={s.lead}>{current.lead}</p>
              <div className={s.rows}>
                <Row icon="target" label="Demanda" text={current.demand} />
                <Row icon="warn" label="Dificuldade possível" text={current.difficulty} />
                <Row icon="bulb" label="Estratégia de apoio" text={current.strategy} />
                {variant === "mapas" && (
                  <>
                    <div className={s.r}>
                      <Icon name="stop" />
                      <div>
                        <b>Riscos relacionados</b>
                        {current.relatedRisks.length ? <span>{current.relatedRisks.join(", ")}</span> : <GapChip />}
                      </div>
                    </div>
                    <div className={s.r}>
                      <Icon name="target" />
                      <div>
                        <b>Evidência</b>
                        {current.evidence.length ? <span>{current.evidence.join("; ")}</span> : <GapChip label="Fontes em preparação" />}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h2>Funções executivas</h2>
              <p className={s.lead}>
                Quatro capacidades que sustentam a execução. Selecione uma para ver demandas, riscos e apoio.
              </p>
              <div className={s.rows}>
                {functions.map((f, i) => (
                  <button key={f.id} type="button" className={s.pick} onClick={() => select(i)}>
                    <i />
                    <span>
                      <b>{f.name}</b>
                      <span>{f.short}</span>
                    </span>
                    <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>

      <div className={s.ctrl}>
        <div className={s.hints}>
          <span>Arraste para explorar o cérebro</span>
          <span className={s.sep} />
          <span>Clique nos marcadores para ver detalhes</span>
        </div>
        <div className={s.bar}>
          <div className={s.tools}>
            <button
              type="button"
              className={s.ib}
              aria-label={still ? "Retomar rotação" : "Pausar rotação"}
              onClick={() => {
                if (reduced) toggleReduced();
                else setPaused((p) => !p);
              }}
            >
              {still ? (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className={s.ib}
              aria-label="Restaurar vista"
              onClick={() => {
                setPaused(false);
                select(-1);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
              </svg>
            </button>
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
          <label className={s.rmt}>
            Movimento reduzido
            <button type="button" className={s.sw} role="switch" aria-checked={reduced} onClick={toggleReduced} />
          </label>
        </div>
      </div>

      {/* Sem JavaScript: todas as funções com o detalhe completo */}
      <noscript>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {functions.map((f) => (
            <div key={f.id} className={s.card} style={{ minHeight: 0 }}>
              <h2>{f.name}</h2>
              <p className={s.lead}>{f.lead}</p>
              <div className={s.rows}>
                <Row icon="target" label="Demanda" text={f.demand} />
                <Row icon="warn" label="Dificuldade possível" text={f.difficulty} />
                <Row icon="bulb" label="Estratégia de apoio" text={f.strategy} />
              </div>
            </div>
          ))}
        </div>
      </noscript>
    </div>
  );
}

function Row({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <div className={s.r}>
      <Icon name={icon} />
      <div>
        <b>{label}</b>
        <span>{text}</span>
      </div>
    </div>
  );
}
