"use client";

import { useEffect, useRef, useState } from "react";
import type { PostSummary } from "@/interfaces/post";
import { ResourceCard } from "./resource-card";
import { Button } from "../ui/button";

// Carrossel de destaques (handoff): scroll-snap, card de altura fixa, setas 40 nas pontas, dots 6 (pitch 25).
// Sem avanço automático. 1 item: sem controles. > 7 itens: contador "3 de 9". Setas desabilitadas nas pontas (D-30).
export function Carousel({ posts }: { posts: PostSummary[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const n = posts.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = [...el.children] as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIndex(slides.indexOf(e.target as HTMLElement));
        });
      },
      { root: el, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [n]);

  const go = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  if (!n) return null;
  return (
    <section aria-roledescription="carrossel" aria-labelledby="destaques-titulo">
      <h2 id="destaques-titulo" className="mb-6 font-display text-2xl font-semibold">
        Destaques
      </h2>
      <div
        ref={track}
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((p, i) => (
          <div
            key={p.slug}
            role="group"
            aria-roledescription="destaque"
            aria-label={`${i + 1} de ${n}`}
            className="w-[min(100%,360px)] shrink-0 snap-start sm:w-[min(85%,360px)]"
          >
            <ResourceCard post={p} variant="featured" />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button variant="icon" aria-label="Destaque anterior" disabled={index === 0} onClick={() => go(index - 1)}>
            <Chevron dir="left" />
          </Button>
          {n > 7 ? (
            <p className="meta" aria-live="polite">
              {index + 1} de {n}
            </p>
          ) : (
            <div className="flex items-center">
              {posts.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  aria-label={`Ir para o destaque ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => go(i)}
                  className="grid h-11 w-[25px] place-items-center"
                >
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${i === index ? "bg-action-text" : "bg-control"}`} />
                </button>
              ))}
            </div>
          )}
          <Button variant="icon" aria-label="Próximo destaque" disabled={index >= n - 1} onClick={() => go(index + 1)}>
            <Chevron dir="right" />
          </Button>
        </div>
      )}
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
      <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}
