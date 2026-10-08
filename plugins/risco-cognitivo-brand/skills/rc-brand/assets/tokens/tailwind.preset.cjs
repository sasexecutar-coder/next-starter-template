/* Risco Cognitivo — preset Tailwind (gerado). Requer tokens.css carregado antes. */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "canvas": "var(--surface-page)",
        "subtle": "var(--surface-subtle)",
        "raised": "var(--surface-raised)",
        "line": "var(--border-subtle)",
        "control": "var(--border-control)",
        "strong": "var(--border-strong)",
        "ink": "var(--text-primary)",
        "muted": "var(--text-secondary)",
        "action": "var(--brand-action-blue)",
        "action-strong": "var(--brand-action-blue-strong)",
        "action-text": "var(--action-text)",
        "on-dark": "var(--text-on-dark)",
        "indigo": "var(--brand-dark-indigo)",
        "light-blue": "var(--brand-light-blue)",
        "risk": "var(--semantic-risk)",
        "solution": "var(--semantic-solution)",
        "attention": "var(--attention-surface)",
        "attention-ink": "var(--attention-ink)"
      },
      "fontFamily": {
        "display": [
          "var(--font-display)",
          "DM Sans",
          "system-ui",
          "sans-serif"
        ],
        "body": [
          "var(--font-body)",
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "var(--font-mono)",
          "DM Mono",
          "ui-monospace",
          "monospace"
        ]
      },
      "borderRadius": {
        "xs": "var(--radius-xs)",
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)"
      },
      "maxWidth": {
        "measure": "68ch",
        "page": "var(--container)"
      }
    }
  }
};
