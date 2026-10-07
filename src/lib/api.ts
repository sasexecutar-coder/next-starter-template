import { Post, PostSummary } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // rascunhos nunca vão para produção
    .filter((post) => !post.draft)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Índice leve para o hub (filtragem no cliente enquanto o índice for pequeno).
export function getPostIndex(): PostSummary[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    eyebrow: p.eyebrow,
    category: p.category,
    type: p.type ?? "artigo",
    pillar: p.pillar,
    program: p.program,
    useCase: p.useCase ?? [],
    featured: !!p.featured,
    draft: false,
    illustration: p.illustration,
    asset: p.asset,
  }));
}
