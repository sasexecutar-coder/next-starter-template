"use client";

import { useState } from "react";
import { CategorySelect } from "@/app/_components/blog/category-select";
import { Button } from "@/app/_components/ui/button";

// Ilhas interativas do storyboard: o mesmo componente do site, com estado local.
export function CategoryDemo() {
  const [v, setV] = useState("");
  return (
    <CategorySelect
      label="Categoria (exemplo)"
      value={v}
      onChange={setV}
      options={[
        { value: "", label: "Todos os recursos" },
        { value: "p1", label: "Pilar 1 — em preparação", disabled: true, group: "Pilares editoriais" },
        { value: "artigo", label: "Artigos", group: "Tipos" },
        { value: "guia", label: "Guias", group: "Tipos" },
        { value: "video", label: "Vídeos", group: "Tipos" },
      ]}
    />
  );
}

export function LoadingButton() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      aria-busy={busy}
      onClick={() => {
        setBusy(true);
        window.setTimeout(() => setBusy(false), 1500);
      }}
    >
      {busy ? "Carregando…" : "Clique para carregar"}
    </Button>
  );
}
