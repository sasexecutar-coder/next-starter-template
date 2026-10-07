# Risco Cognitivo

Site e blog do Risco Cognitivo: Next.js (geração estática), Markdown e TypeScript, publicado no [Cloudflare Workers](https://developers.cloudflare.com/workers/) com o [adaptador OpenNext](https://opennext.js.org/cloudflare).

Marca, design e regras editoriais vêm do design kit em [`docs/design-kit`](docs/design-kit/README.md). Comece por lá antes de mudar cores, tipografia ou componentes.

Os posts ficam em `/_posts`, em Markdown com front matter. O build converte o Markdown com `unified` (`remark-gfm`, `remark-directive`), e `gray-matter` lê os metadados. Os blocos do contrato editorial são escritos como diretivas:

```markdown
:::summary
Resumo rápido (obrigatório em textos com mais de 300 palavras).
:::

:::callout{title="Leitura recomendada"}
Texto do destaque.
:::

:::definition{term="Risco cognitivo"}
Definição curta.
:::
```

Conteúdo da Home, de `/mapas` e de `/ferramentas` fica em `src/content/*.ts`. Itens com `status: "GAP"` aparecem como "Em preparação" até terem fonte.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare Workers

| Command           | Action                                                           |
| :---------------- | :--------------------------------------------------------------- |
| `npm run build`   | Build the Worker bundle (`.open-next/`) with the prerendered cache |
| `npm run preview` | Build for Workers and preview locally in the Workers runtime     |
| `npm run deploy`  | Build for Workers and deploy (uses the `name` in `wrangler.jsonc`) |

### Why static generation matters here

Workers have no filesystem at runtime, so `/_posts` can only be read **at build time**. This is handled by:

- `generateStaticParams` + `dynamicParams = false` in `src/app/posts/[slug]/page.tsx`: every post is prerendered, unknown slugs return 404.
- `open-next.config.ts` uses the static-assets incremental cache, so the prerendered pages are served from the Worker's static assets and nothing is re-rendered (or read from `fs`) per request.

Do not call `getAllPosts()` / `getPostBySlug()` from code that runs per request (route handlers, dynamic pages); keep it in statically generated pages.

## Notes

`blog-starter` uses [Tailwind CSS v3](https://tailwindcss.com/blog/tailwindcss-v3).
