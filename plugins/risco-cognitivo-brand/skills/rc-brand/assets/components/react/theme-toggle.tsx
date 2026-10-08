"use client";

import { useEffect, useState } from "react";

// Seletor de tema para teste (D-33): atual (marca) · claro e noite (tokens do blog-starter).
export const THEMES = [
  { id: "atual", label: "Atual" },
  { id: "claro", label: "Claro" },
  { id: "noite", label: "Noite" },
] as const;
export type ThemeId = (typeof THEMES)[number]["id"];
export const THEME_KEY = "rc-theme";

// Roda no <head> antes da pintura (mesma ideia do NoFOUCScript do blog-starter): sem flash de tema.
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="claro"||t==="noite")document.documentElement.dataset.theme=t}catch(e){}`;

export function applyTheme(t: ThemeId) {
  const el = document.documentElement;
  if (t === "atual") delete el.dataset.theme;
  else el.dataset.theme = t;
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {}
  window.dispatchEvent(new CustomEvent("rc-theme", { detail: t }));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>("atual");
  useEffect(() => {
    const read = () => setTheme((document.documentElement.dataset.theme as ThemeId) ?? "atual");
    read();
    window.addEventListener("rc-theme", read);
    return () => window.removeEventListener("rc-theme", read);
  }, []);
  return (
    <div role="group" aria-label="Tema (teste)" className={`segmented ${className}`.trim()}>
      {THEMES.map((t) => (
        <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => applyTheme(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
