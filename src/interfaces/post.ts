import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  eyebrow?: string;
  category?: string;
  preview?: boolean;
  // Taxonomia do hub (D-27); todos opcionais
  type?: string; // artigo | guia | asset | video
  pillar?: string;
  program?: string;
  useCase?: string[];
  featured?: boolean;
  draft?: boolean;
  illustration?: string; // imagem 108×108 do card (célula própria do grid)
  asset?: { url: string; label: string };
};

// Versão leve do post para o índice do hub (sem o corpo).
export type PostSummary = Omit<Post, "content" | "ogImage" | "author" | "coverImage" | "preview">;
