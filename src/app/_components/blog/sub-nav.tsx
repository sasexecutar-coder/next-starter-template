"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useState } from "react";
import { BLOG_SUBNAV } from "@/lib/site";

// Sub-nav L2 da seção Blog (handoff: barra de 52, lista inline sobre o conteúdo, sem scrim).
// ≥ 1024: itens visíveis, sem dropdown.
export function SubNav() {
  return (
    <Suspense fallback={<SubNavInner activeKey="inicio" />}>
      <SubNavWithParams />
    </Suspense>
  );
}

function SubNavWithParams() {
  const pathname = usePathname();
  const params = useSearchParams();
  const tipo = params.get("tipo");
  const activeKey = pathname.startsWith("/posts/") ? "artigo" : tipo ?? "inicio";
  return <SubNavInner activeKey={activeKey} />;
}

function SubNavInner({ activeKey }: { activeKey: string }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname, activeKey]);
  const current = BLOG_SUBNAV.find((i) => i.key === activeKey) ?? BLOG_SUBNAV[0];

  return (
    <nav aria-label="Seção Blog" className="relative border-b border-line bg-canvas">
      {/* Mobile/tablet: rótulo + chevron */}
      <div className="container-page lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between text-[14px] text-ink"
          style={{ height: "calc(var(--subnav-h) - 1px)" }}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        >
          <span>
            Blog <span className="text-muted">/ {current.label}</span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
      <ul
        id={listId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-30 border-b border-line bg-canvas pb-4 pt-2 lg:hidden"
      >
        {BLOG_SUBNAV.map((i) => (
          <li key={i.key} className="container-page">
            <Link
              href={i.href!}
              aria-current={i.key === activeKey ? "page" : undefined}
              className={`flex min-h-[44px] items-center gap-2 text-[16px] ${i.key === activeKey ? "font-medium text-action-text" : "text-muted hover:text-ink"}`}
            >
              {i.key === "buscar" && <SearchIcon />}
              {i.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: itens em linha */}
      <div className="container-page hidden items-center gap-8 lg:flex" style={{ height: "calc(var(--subnav-h) - 1px)" }}>
        <span className="text-[14px] font-medium text-ink">Blog</span>
        <ul className="flex items-center gap-6 text-[14px]">
          {BLOG_SUBNAV.map((i) => (
            <li key={i.key}>
              <Link
                href={i.href!}
                aria-current={i.key === activeKey ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center gap-2 ${i.key === activeKey ? "font-medium text-action-text underline underline-offset-8" : "text-muted hover:text-ink"}`}
              >
                {i.key === "buscar" && <SearchIcon />}
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
