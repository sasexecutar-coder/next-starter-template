// Fonte única de identidade do site (D-04, D-14). Textos de marca vêm daqui.
export const SITE = {
  name: "Risco Cognitivo",
  description:
    "Entenda como funções executivas, demandas e estratégias se relacionam na execução do dia a dia.",
  locale: "pt-BR",
  url: "https://next-starter-template.sas-executar-0f5.workers.dev",
} as const;

export const NAV = [
  { href: "/#artigos", label: "Artigos" },
  { href: "/mapas", label: "Mapas" },
  { href: "/ferramentas", label: "Ferramentas" },
] as const;
