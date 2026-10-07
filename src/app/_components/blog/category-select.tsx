"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Eyebrow } from "../ui/eyebrow";

// Seletor de categoria (L3, ref. f12): botão + listbox que abre SEMPRE para baixo, ancorado ao campo.
// Substitui o <select> nativo (no iOS ele abre como popover sobre o conteúdo).
// Teclado: ↑/↓, Home/End, Enter/Espaço, Esc, busca por letra. Clicar fora fecha.
export type Option = { value: string; label: string; disabled?: boolean; group?: string };

export function CategorySelect({
  options,
  value,
  onChange,
  label,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const selIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [active, setActive] = useState(selIndex);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const typed = useRef({ s: "", t: 0 });

  useEffect(() => {
    if (!open) return;
    setActive(selIndex);
    list.current?.focus({ preventScroll: true });
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, selIndex]);

  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (i: number) => {
    const o = options[i];
    if (!o || o.disabled) return;
    onChange(o.value);
    setOpen(false);
    btn.current?.focus();
  };
  const move = (d: number) => {
    const pos = enabled.indexOf(active);
    const next = enabled[Math.min(enabled.length - 1, Math.max(0, (pos < 0 ? 0 : pos) + d))];
    if (next !== undefined) setActive(next);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") (e.preventDefault(), move(1));
    else if (e.key === "ArrowUp") (e.preventDefault(), move(-1));
    else if (e.key === "Home") (e.preventDefault(), setActive(enabled[0]));
    else if (e.key === "End") (e.preventDefault(), setActive(enabled[enabled.length - 1]));
    else if (e.key === "Enter" || e.key === " ") (e.preventDefault(), choose(active));
    else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      setOpen(false);
      btn.current?.focus();
    } else if (e.key.length === 1) {
      const now = Date.now();
      typed.current = { s: (now - typed.current.t < 600 ? typed.current.s : "") + e.key.toLowerCase(), t: now };
      const hit = enabled.find((i) => options[i].label.toLowerCase().startsWith(typed.current.s));
      if (hit !== undefined) setActive(hit);
    }
  };

  const current = options[selIndex];
  let lastGroup: string | undefined;

  return (
    <div ref={root} className="relative max-w-sm">
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-controls={`${id}-list`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex h-11 w-full items-center justify-between rounded-xl border bg-raised pl-4 pr-3 text-left text-[16px] text-ink ${open ? "border-action-text" : "border-control"}`}
      >
        <span id={`${id}-value`}>{current?.label}</span>
        <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul
        ref={list}
        id={`${id}-list`}
        role="listbox"
        tabIndex={-1}
        hidden={!open}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-o${active}` : undefined}
        onKeyDown={onListKey}
        className="absolute inset-x-0 top-full z-30 mt-2 max-h-[min(60vh,360px)] overflow-y-auto rounded-xl border border-line bg-raised py-2 shadow-[var(--shadow-card-raised)] focus:outline-none"
      >
        {options.map((o, i) => {
          const head = o.group && o.group !== lastGroup ? o.group : null;
          lastGroup = o.group;
          const selected = o.value === value;
          return (
            <li key={o.value} role="presentation">
              {head && (
                <div role="presentation">
                  <Eyebrow className="px-4 pb-2 pt-3">{head}</Eyebrow>
                </div>
              )}
              <div
                id={`${id}-o${i}`}
                data-i={i}
                role="option"
                aria-selected={selected}
                aria-disabled={o.disabled || undefined}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onClick={() => choose(i)}
                className={`flex min-h-[44px] items-center justify-between gap-3 px-4 text-[16px] ${
                  o.disabled ? "cursor-not-allowed text-muted opacity-70" : "cursor-pointer"
                } ${i === active && !o.disabled ? "bg-subtle" : ""} ${selected ? "font-medium text-action-text" : o.disabled ? "" : "text-ink"}`}
              >
                {o.label}
                {selected && (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
