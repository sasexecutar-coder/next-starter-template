import type { Root } from "mdast";
import type {} from "mdast-util-directive";
import { visit } from "unist-util-visit";

// Blocos do MDX contract (03-editorial/contratos) escritos como diretivas Markdown:
//   :::callout{title="Leitura recomendada"} … :::
//   :::summary … :::            (QuickSummary, obrigatório em textos > 300 palavras)
//   :::definition{term="Termo"} … :::
//   :::keypoints … :::
// Viram <aside>/<section> com classe e data-block-type; nenhum JavaScript no cliente.
const BLOCKS: Record<string, { tag: string; label?: (a: Record<string, string>) => string }> = {
  callout: { tag: "aside", label: (a) => a.title || "Destaque" },
  summary: { tag: "section", label: () => "Resumo rápido" },
  definition: { tag: "aside", label: (a) => a.term || "Definição" },
  keypoints: { tag: "section", label: () => "Pontos-chave" },
};

export function remarkEditorialBlocks() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      const block = BLOCKS[node.name];
      if (!block) return;
      const attrs = (node.attributes ?? {}) as Record<string, string>;
      const label = block.label?.(attrs);
      const data = (node.data ??= {});
      data.hName = block.tag;
      data.hProperties = { className: ["ed-block", `ed-${node.name}`], "data-block-type": node.name };
      if (label) {
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { className: ["ed-block-title"] } },
          children: [{ type: "text", value: label }],
        });
      }
    });
  };
}
