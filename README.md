# Next.js Blog Starter on Cloudflare Workers

A statically generated blog using Next.js, Markdown and TypeScript, deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/) with the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare).

This is the [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) example from Next.js (Tailwind CSS v3, `remark`, `gray-matter`), adapted to run as a Worker.

Posts live in `/_posts` as Markdown files with front matter. Adding a new Markdown file there creates a new blog post. `remark` and `remark-html` convert the Markdown to HTML and `gray-matter` parses the metadata.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare Workers

| Command           | Action                                                           |
| :---------------- | :--------------------------------------------------------------- |
| `npm run build`   | Build the Next.js site                                           |
| `npm run preview` | Build for Workers and preview locally in the Workers runtime     |
| `npm run deploy`  | Build for Workers and deploy (uses the `name` in `wrangler.jsonc`) |

### Why static generation matters here

Workers have no filesystem at runtime, so `/_posts` can only be read **at build time**. This is handled by:

- `generateStaticParams` + `dynamicParams = false` in `src/app/posts/[slug]/page.tsx`: every post is prerendered, unknown slugs return 404.
- `open-next.config.ts` uses the static-assets incremental cache, so the prerendered pages are served from the Worker's static assets and nothing is re-rendered (or read from `fs`) per request.

Do not call `getAllPosts()` / `getPostBySlug()` from code that runs per request (route handlers, dynamic pages); keep it in statically generated pages.

## Notes

`blog-starter` uses [Tailwind CSS v3](https://tailwindcss.com/blog/tailwindcss-v3).
