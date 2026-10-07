"use client";

import { useState } from "react";

// Fim do artigo (handoff, adaptação ao blog): asset para baixar (quando existir) e compartilhar.
// Downloads e compartilhamentos são as métricas do blog.
export function PostActions({ title, asset }: { title: string; asset?: { url: string; label: string } }) {
  const [msg, setMsg] = useState("");
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setMsg("Link copiado.");
    } catch {
      setMsg("");
    }
  };
  return (
    <aside aria-label="Ações do artigo" className="mx-auto mt-24 max-w-measure rounded-xl border border-line bg-subtle p-6">
      {asset ? (
        <>
          <p className="font-display text-lg font-semibold">Material deste artigo</p>
          <p className="mt-2 text-[16px] text-muted">{asset.label}</p>
        </>
      ) : (
        <p className="font-display text-lg font-semibold">Gostou? Leve este artigo adiante.</p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {asset && (
          <a href={asset.url} download className="btn btn-primary">
            Baixar
          </a>
        )}
        <button type="button" className={`btn ${asset ? "btn-secondary" : "btn-primary"}`} onClick={share}>
          Compartilhar
        </button>
      </div>
      <p className="meta mt-3" aria-live="polite">
        {msg}
      </p>
    </aside>
  );
}
