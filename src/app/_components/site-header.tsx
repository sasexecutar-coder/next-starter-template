"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, PRIMARY_CTA, SECONDARY_CTA, type NavItem, type NavLink } from "@/lib/site";
import { SubNav } from "./blog/sub-nav";
import { Wordmark } from "./wordmark";

// Header global L1 (handoff de arquitetura UX, D-25/D-26): 72 px, wordmark à esquerda, menu à direita.
// < 1024: menu em tela cheia (linhas de 76, acordeão "+"). ≥ 1024: itens em linha + CTA primário único.
// Some ao rolar para baixo e volta ao rolar para cima. Nas páginas do Blog, a sub-nav L2 fica junto.
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inBlog = pathname.startsWith("/artigos") || pathname.startsWith("/posts/");

  // Fecha o menu ao navegar
  useEffect(() => setOpen(false), [pathname]);

  // Recolher ao rolar para baixo, mostrar ao rolar para cima
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu aberto: trava a rolagem, Esc fecha, foco fica no painel e volta ao botão
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button:not([disabled])")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const f = [...panel.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")];
        if (!f.length) return;
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
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
  }, [open]);

  const isActive = (href?: string) => !!href && (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]));

  return (
    <div
      className="sticky top-0 z-40 transition-transform duration-200 motion-reduce:transition-none"
      style={{ transform: hidden && !open ? "translateY(-100%)" : undefined, transitionTimingFunction: "var(--ease-standard)" }}
    >
      <header className="border-b border-line bg-canvas">
        <div className="container-page flex items-center justify-between gap-8" style={{ height: "calc(var(--header-h) - 1px)" }}>
          <Wordmark />

          {/* Desktop: itens L1 em linha */}
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-6 text-[15px]">
              {NAV.filter((i) => i.status === "LIVE").map((item) => (
                <li key={item.label}>
                  <DesktopItem item={item} active={isActive(item.href)} />
                </li>
              ))}
              <li>
                <MoreMenu items={NAV.filter((i) => i.status === "SOON")} />
              </li>
            </ul>
            <Link href={PRIMARY_CTA.href!} className="btn btn-md btn-primary">
              {PRIMARY_CTA.label}
            </Link>
          </nav>

          {/* Mobile/tablet: botão de menu (alvo 44×44) */}
          <button
            ref={buttonRef}
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-md lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M7 12h13M10 17h10" />}
            </svg>
          </button>
        </div>
      </header>

      {inBlog && <SubNav />}

      {/* Menu em tela cheia */}
      {open && (
        <div
          id={menuId}
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-y-auto bg-raised lg:hidden"
          style={{ top: "var(--header-h)" }}
        >
          <nav aria-label="Principal" className="container-page flex-1 pt-8">
            <ul>
              {NAV.map((item) => (
                <MobileItem key={item.label} item={item} active={isActive(item.href)} />
              ))}
            </ul>
          </nav>
          <div
            className="container-page grid grid-cols-2 gap-2 pt-6"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
          >
            <SoonButton link={SECONDARY_CTA} className="btn btn-secondary w-full" />
            <Link href={PRIMARY_CTA.href!} className="btn btn-primary w-full">
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SoonTag() {
  return <span className="meta ml-2 rounded-sm bg-subtle px-1.5 py-0.5 text-xs">Em breve</span>;
}

function SoonButton({ link, className }: { link: NavLink; className: string }) {
  return (
    <span role="link" aria-disabled="true" className={className} title="Em breve">
      {link.label}
    </span>
  );
}

// Desktop: itens "Em breve" agrupados em "Mais" para a barra não quebrar linha (D-26)
function MoreMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  if (!items.length) return null;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="inline-flex min-h-[44px] items-center gap-1 text-muted hover:text-ink"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        Mais
        <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul
        id={id}
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-line bg-raised p-2 shadow-[var(--shadow-card-raised)]"
      >
        {items.map((i) => (
          <li key={i.label}>
            <span aria-disabled="true" className="flex min-h-[44px] items-center justify-between rounded-md px-3 text-muted">
              {i.label}
              <SoonTag />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopItem({ item, active }: { item: NavItem; active: boolean }) {
  if (item.status === "SOON") {
    return (
      <span aria-disabled="true" className="inline-flex items-center text-muted opacity-70">
        {item.label}
        <SoonTag />
      </span>
    );
  }
  return (
    <Link
      href={item.href!}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-[44px] items-center ${active ? "text-ink" : "text-muted hover:text-ink"}`}
    >
      {item.label}
    </Link>
  );
}

function MobileItem({ item, active }: { item: NavItem; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const row = "flex min-h-[76px] w-full items-center justify-between border-b border-line text-lg";
  if (item.status === "SOON") {
    return (
      <li>
        <span aria-disabled="true" className={`${row} text-muted`}>
          <span>
            {item.label}
            <SoonTag />
          </span>
        </span>
      </li>
    );
  }
  if (item.children?.length) {
    return (
      <li>
        <button
          type="button"
          className={row}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((e) => !e)}
        >
          <span className={active ? "font-medium" : ""}>{item.label}</span>
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-45" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 4v16M4 12h16" />
          </svg>
        </button>
        <ul id={panelId} hidden={!expanded} className="border-b border-line py-2">
          {item.children.map((c) => (
            <li key={c.label}>
              <Link href={c.href!} className="flex min-h-[44px] items-center pl-4 text-muted hover:text-ink">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li>
      <Link href={item.href!} aria-current={active ? "page" : undefined} className={`${row} ${active ? "font-medium" : ""}`}>
        {item.label}
      </Link>
    </li>
  );
}
