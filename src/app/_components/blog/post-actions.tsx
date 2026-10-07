"use client";

import { useState } from "react";
import { Button, buttonClass } from "../ui/button";
import { Panel } from "../ui/panel";

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
    <Panel as="aside" aria-label="Ações do artigo" className="mx-auto max-w-measure">
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
          <a href={asset.url} download className={buttonClass("primary")}>
            Baixar
          </a>
        )}
        <Button variant={asset ? "secondary" : "primary"} onClick={share}>
          Compartilhar
        </Button>
      </div>
      <p className="meta mt-3" aria-live="polite">
        {msg}
      </p>
    </Panel>
  );
}
