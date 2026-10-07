"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Term } from "@/content/taxonomy";

export type Selection = Record<string, string[]>;
export type Group = { key: string; label: string; terms: Term[] };

export const countSelected = (s: Selection) => Object.values(s).reduce((a, v) => a + v.length, 0);

// Grupos de filtro (fieldset/legend), acordeão com chevron. Linha de 36, checkbox 20 + 12 de gap.
export function FilterGroups({ groups, value, onChange }: { groups: Group[]; value: Selection; onChange: (s: Selection) => void }) {
  return (
    <div>
      {groups.map((g, gi) => (
        <FilterGroup key={g.key} group={g} defaultOpen={gi === 0} value={value[g.key] ?? []} onChange={(v) => onChange({ ...value, [g.key]: v })} />
      ))}
    </div>
  );
}

function FilterGroup({ group, defaultOpen, value, onChange }: { group: Group; defaultOpen: boolean; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <fieldset className="border-b border-line">
      <legend className="contents">
        <button
          type="button"
          className="flex h-[52px] w-full items-center justify-between text-[14px] text-muted"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {group.label}
          <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </legend>
      <div id={id} hidden={!open} className="pb-3">
        {group.terms.map((t) => {
          const checked = value.includes(t.id);
          return (
            <label key={t.id} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[16px]">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                onChange={() => onChange(checked ? value.filter((v) => v !== t.id) : [...value, t.id])}
              />
              <span
                aria-hidden="true"
                className="grid h-5 w-5 shrink-0 place-items-center rounded-sm border border-control bg-raised peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--brand-action-blue)]"
              >
                {checked && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                )}
              </span>
              {t.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// Drawer de filtro (mobile/tablet): entra pela direita, scrim 20%, foco preso, Esc/scrim/× fecham,
// foco volta ao botão. Seleção pendente até "Aplicar (N)"; Reset desabilitado sem seleção.
export function FilterDrawer({
  open,
  onClose,
  groups,
  value,
  onApply,
  returnFocus,
}: {
  open: boolean;
  onClose: () => void;
  groups: Group[];
  value: Selection;
  onApply: (s: Selection) => void;
  returnFocus: React.RefObject<HTMLElement | null>;
}) {
  const [pending, setPending] = useState<Selection>(value);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) setPending(value);
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = panel.current;
    el?.querySelector<HTMLElement>("button")?.focus();
    const close = () => {
      onClose();
      returnFocus.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && el) {
        const f = [...el.querySelectorAll<HTMLElement>("button:not([disabled]),input")];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, returnFocus]);

  if (!open) return null;
  const n = countSelected(pending);
  const close = () => {
    onClose();
    returnFocus.current?.focus();
  };
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-[var(--scrim)]" onClick={close} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-[min(341px,88vw)] flex-col bg-canvas px-6 shadow-[var(--shadow-card-raised)] sm:w-[400px]"
      >
        <div className="pt-6">
          <button type="button" className="-ml-2 grid h-11 w-11 place-items-center" aria-label="Fechar filtros" onClick={close}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <h2 id={titleId} className="mt-2 border-b border-line pb-4 font-display text-2xl font-semibold">
            Filtrar
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <FilterGroups groups={groups} value={pending} onChange={setPending} />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-6" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}>
          <button type="button" className="btn btn-md btn-secondary" disabled={n === 0} onClick={() => setPending({})}>
            Limpar
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              onApply(pending);
              close();
            }}
          >
            Aplicar{n ? ` (${n})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
