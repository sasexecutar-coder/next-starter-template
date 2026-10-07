import type { Config } from "tailwindcss";

// Utilitários apontam para os tokens de globals.css; não usar hex soltos em componentes.
const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--surface-page)",
        subtle: "var(--surface-subtle)",
        raised: "var(--surface-raised)",
        line: "var(--border-subtle)",
        control: "var(--border-control)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        action: "var(--brand-action-blue)",
        "action-strong": "var(--brand-action-blue-strong)",
        indigo: "var(--brand-dark-indigo)",
        "light-blue": "var(--brand-light-blue)",
        risk: "var(--semantic-risk)",
        solution: "var(--semantic-solution)",
        attention: "var(--attention-surface)",
        "attention-ink": "var(--attention-ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        measure: "68ch",
        page: "var(--container)",
      },
    },
  },
  plugins: [],
};
export default config;
