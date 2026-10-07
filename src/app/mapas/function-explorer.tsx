"use client";

import { useState } from "react";
import type { ExecutiveFunction } from "@/content/functions";
import { FunctionIcon } from "@/app/_components/icons";
import { GapChip } from "@/app/_components/gap-chip";

// Posição dos nós no mapa de rede (viewBox 600×420). Conceitual: não indica regiões cerebrais.
const POS: Record<ExecutiveFunction["id"], { x: number; y: number }> = {
  inibicao: { x: 150, y: 110 },
  memoria: { x: 450, y: 110 },
  flexibilidade: { x: 300, y: 320 },
};

type Props = { functions: ExecutiveFunction[] };

export function FunctionExplorer({ functions }: Props) {
  const [selected, setSelected] = useState<ExecutiveFunction["id"] | null>(null);
  const current = functions.find((f) => f.id === selected) ?? null;
  const edges = functions.flatMap((a, i) => functions.slice(i + 1).map((b) => [a, b] as const));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div>
        {/* 03 MAPA INTERATIVO — rede (o cérebro 3D é GAP: assets do protótipo ausentes) */}
        <div className="card-feature relative">
          <svg viewBox="0 0 600 420" className="h-auto w-full" role="img" aria-label="Rede das três funções executivas">
            {edges.map(([a, b]) => {
              const on = current && (a.id === current.id || b.id === current.id);
              return (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={POS[a.id].x}
                  y1={POS[a.id].y}
                  x2={POS[b.id].x}
                  y2={POS[b.id].y}
                  stroke={on ? "var(--brand-action-blue)" : "#c9c9c9"}
                  strokeWidth={on ? 2.5 : 1.5}
                  strokeDasharray={on ? undefined : "6 6"}
                />
              );
            })}
            {functions.map((f) => {
              const on = f.id === selected;
              return (
                <g key={f.id}>
                  <circle
                    cx={POS[f.id].x}
                    cy={POS[f.id].y}
                    r={on ? 44 : 40}
                    fill={on ? "var(--brand-action-blue)" : "#ffffff"}
                    stroke="var(--brand-action-blue)"
                    strokeWidth={1.5}
                  />
                  <text
                    x={POS[f.id].x}
                    y={POS[f.id].y + 66}
                    textAnchor="middle"
                    className="font-display"
                    fontSize="17"
                    fontWeight={600}
                    fill="#000"
                  >
                    {f.name}
                  </text>
                </g>
              );
            })}
          </svg>
          {/* Hotspots: botões reais sobre os nós (alvo ≥ 44px) */}
          {functions.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-label={f.name}
              aria-pressed={f.id === selected}
              onClick={() => setSelected(f.id === selected ? null : f.id)}
              className={`absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${
                f.id === selected ? "text-white" : "text-action"
              }`}
              style={{ left: `${(POS[f.id].x / 600) * 100}%`, top: `${(POS[f.id].y / 420) * 100}%` }}
            >
              <FunctionIcon id={f.id} className="h-6 w-6" />
            </button>
          ))}
        </div>

        {/* 04 SELETOR DE FUNÇÃO */}
        <div className="mt-6" role="group" aria-label="Selecionar função">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Selecionar função</p>
          <div className="flex flex-wrap gap-2">
            {functions.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={f.id === selected}
                onClick={() => setSelected(f.id)}
                className={`btn ${f.id === selected ? "btn-primary" : "btn-secondary"}`}
              >
                <FunctionIcon id={f.id} className="h-4 w-4" />
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 05 DETALHE DA FUNÇÃO — painel lateral no desktop, empilhado no mobile */}
      <aside aria-live="polite" className="card-micro lg:sticky lg:top-6" style={{ padding: "1.5rem" }}>
        {current ? (
          <FunctionDetail f={current} onClose={() => setSelected(null)} />
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Funções executivas</h2>
            <p className="mt-2 text-muted">
              Escolha uma função no mapa ou no seletor para ver o que ela faz, a demanda, a dificuldade
              possível e uma estratégia.
            </p>
          </div>
        )}
      </aside>

      <noscript>
        <div className="grid gap-6 lg:col-span-2">
          {functions.map((f) => (
            <div key={f.id} className="card-micro" style={{ padding: "1.5rem" }}>
              <FunctionDetail f={f} />
            </div>
          ))}
        </div>
      </noscript>
    </div>
  );
}

function FunctionDetail({ f, onClose }: { f: ExecutiveFunction; onClose?: () => void }) {
  const rows = [
    { label: "O que ela faz", value: f.lead },
    { label: "Demanda", value: f.demand },
    { label: "Dificuldade possível", value: f.difficulty },
    { label: "Estratégia", value: f.strategy },
  ];
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          <FunctionIcon id={f.id} className="h-6 w-6 text-action" />
          {f.name}
        </h2>
        {onClose && (
          <button type="button" onClick={onClose} className="btn -mr-3 -mt-2 px-3 text-muted" aria-label="Fechar e voltar à lista">
            ✕
          </button>
        )}
      </div>
      <dl className="mt-4">
        {rows.map((r) => (
          <div key={r.label} className="border-t border-line py-3">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">{r.label}</dt>
            <dd className="mt-1">{r.value}</dd>
          </div>
        ))}
        <div className="border-t border-line py-3">
          <dt className="font-mono text-xs uppercase tracking-wider text-muted">Riscos relacionados</dt>
          <dd className="mt-2">{f.relatedRisks.length ? f.relatedRisks.join(", ") : <GapChip />}</dd>
        </div>
        <div className="border-t border-line py-3">
          <dt className="font-mono text-xs uppercase tracking-wider text-muted">Evidência</dt>
          <dd className="mt-2">{f.evidence.length ? f.evidence.join("; ") : <GapChip label="Fontes em preparação" />}</dd>
        </div>
      </dl>
    </div>
  );
}
