#!/usr/bin/env python3
"""Base de renderização compartilhada pelas skills do Risco Cognitivo.

Todo template HTML recebe `brand_css` (tokens.css + components.css + base) e sai standalone, sem CSS externo além das
fontes Google (DM Sans, Inter, DM Mono). Jinja2 com StrictUndefined: placeholder ausente quebra o build em vez de vazar.

    from rc_render import env_for, brand_css, write
    html = env_for(TEMPLATES).get_template("ebook.html.j2").render(data=..., brand_css=brand_css())
"""
from pathlib import Path
import hashlib
import json

BRAND = Path(__file__).resolve().parents[1]  # skills/rc-brand
TOKENS_CSS = BRAND / "assets" / "tokens" / "tokens.css"
COMPONENTS_CSS = BRAND / "assets" / "components" / "components.css"
FONTS = ("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400..800"
         "&family=Inter:wght@400;500;600;700&display=swap")

BASE_CSS = """
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
button,input,select,textarea{font:inherit;color:inherit}
button{background-color:transparent}
body{margin:0;background:var(--surface-page);color:var(--text-primary);font:400 1rem/1.6 var(--font-body);
  -webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--font-display);color:var(--text-primary);margin:0;letter-spacing:-0.02em;line-height:1.15}
p{margin:0}
a{color:var(--action-text);text-underline-offset:3px}
a.btn,a.btn-icon,a.chip{text-decoration:none}
.btn-primary,.btn-primary:visited{color:var(--text-on-dark)}
code,pre,kbd{font-family:var(--font-mono)}
::selection{background:var(--selection)}
:focus-visible{outline:2px solid var(--brand-action-blue);outline-offset:2px}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
"""

FONT_VARS = """:root{--font-display:"DM Sans",system-ui,sans-serif;--font-body:"Inter",system-ui,sans-serif;
  --font-mono:"DM Mono",ui-monospace,monospace}"""


def brand_css(components=True):
    parts = [TOKENS_CSS.read_text(encoding="utf-8"), FONT_VARS]
    if components and COMPONENTS_CSS.exists():
        parts.append(COMPONENTS_CSS.read_text(encoding="utf-8"))
    parts.append(BASE_CSS)
    return "\n".join(parts)


def env_for(*template_dirs):
    from jinja2 import Environment, FileSystemLoader, StrictUndefined
    env = Environment(loader=FileSystemLoader([str(d) for d in template_dirs]), undefined=StrictUndefined,
                      autoescape=True, trim_blocks=True, lstrip_blocks=True)
    env.globals.update(fonts_url=FONTS)
    return env


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def write(path, text):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return hashlib.sha256(text.encode("utf-8")).hexdigest()
