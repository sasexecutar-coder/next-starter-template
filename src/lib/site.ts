// Fonte única de identidade e navegação do site (D-04, D-14, D-26).
export const SITE = {
  name: "Risco Cognitivo",
  description:
    "Entenda como funções executivas, demandas e estratégias se relacionam na execução do dia a dia.",
  locale: "pt-BR",
  url: "https://next-starter-template.sas-executar-0f5.workers.dev",
} as const;

// LIVE = rota existente; SOON = "Em breve", visível e não clicável (D-26).
export type NavStatus = "LIVE" | "SOON";
export type NavLink = { label: string; href?: string; status: NavStatus };
export type NavItem = NavLink & { children?: NavLink[] };

// Menu L1 (handoff de arquitetura UX, adaptação ao blog).
export const NAV: NavItem[] = [
  {
    label: "Blog",
    href: "/artigos",
    status: "LIVE",
    children: [
      { label: "Início", href: "/artigos", status: "LIVE" },
      { label: "Artigos", href: "/artigos?tipo=artigo", status: "LIVE" },
      { label: "Guias", href: "/artigos?tipo=guia", status: "LIVE" },
      { label: "Vídeos", href: "/artigos?tipo=video", status: "LIVE" },
    ],
  },
  { label: "Mapas", href: "/mapas", status: "LIVE" },
  { label: "Ferramentas", href: "/ferramentas", status: "LIVE" },
  { label: "Assets (Loja/Oficina)", status: "SOON" },
  { label: "Programa Executar", status: "SOON" },
  { label: "Comunidade", status: "SOON" },
  { label: "Entrar", status: "SOON" },
];

// CTA primário único (D-29) e contorno do pé do menu.
export const PRIMARY_CTA: NavLink = { label: "Começar agora", href: "/mapas", status: "LIVE" };
export const SECONDARY_CTA: NavLink = { label: "Fale conosco", status: "SOON" };

// Sub-nav L2 da seção Blog (hub e artigos).
export const BLOG_SUBNAV: (NavLink & { key: string })[] = [
  { key: "inicio", label: "Início", href: "/artigos", status: "LIVE" },
  { key: "artigo", label: "Artigos", href: "/artigos?tipo=artigo", status: "LIVE" },
  { key: "guia", label: "Guias", href: "/artigos?tipo=guia", status: "LIVE" },
  { key: "asset", label: "Assets", href: "/artigos?tipo=asset", status: "LIVE" },
  { key: "video", label: "Vídeos", href: "/artigos?tipo=video", status: "LIVE" },
  { key: "buscar", label: "Buscar", href: "/artigos#busca", status: "LIVE" },
];
