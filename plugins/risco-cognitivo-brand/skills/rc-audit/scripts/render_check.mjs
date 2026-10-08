#!/usr/bin/env node
// Render real com Chromium (Playwright): erros de página, rolagem horizontal, 3 temas, PDF A4 e PNG com dimensão exata.
// Uso: node render_check.mjs <arquivo.html> [--themes] [--pdf out.pdf] [--png out.png --size 1080x1350] [--selector .slide]
// Playwright: `npm i -D playwright` no projeto, ou defina RC_PLAYWRIGHT=/caminho/para/node_modules/playwright.
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let pw;
try { pw = require(process.env.RC_PLAYWRIGHT || "playwright"); } catch { console.error("Playwright não encontrado (npm i -D playwright ou RC_PLAYWRIGHT)."); process.exit(2); }

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--") && !/^\d+x\d+$/.test(a) && !args[args.indexOf(a) - 1]?.match(/^--(pdf|png|size|selector)$/));
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!file) { console.error("informe o HTML"); process.exit(2); }
const url = pathToFileURL(resolve(file)).href;
const [w, h] = (opt("--size") || "1280x900").split("x").map(Number);
const out = { file, checks: [] };
const browser = await pw.chromium.launch();
const themes = args.includes("--themes") ? ["atual", "claro", "noite"] : ["atual"];
let fail = false;
for (const theme of themes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("rc-theme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate((t) => { if (t !== "atual") document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }, theme);
  await page.waitForTimeout(150);
  const m = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth, vw: innerWidth,
    bg: getComputedStyle(document.body).backgroundColor,
    fonts: [...new Set([...document.querySelectorAll("body *")].slice(0, 400).map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g, "").trim()))],
  }));
  const hscroll = m.scrollW > m.vw + 1;
  if (errors.length || hscroll) fail = true;
  out.checks.push({ theme, errors, horizontalScroll: hscroll, background: m.bg, fonts: m.fonts });
  if (theme === "atual") {
    if (opt("--pdf")) { await page.emulateMedia({ media: "print" }); await page.pdf({ path: opt("--pdf"), preferCSSPageSize: true, printBackground: true }); out.pdf = opt("--pdf"); await page.emulateMedia({ media: "screen" }); }
    if (opt("--png")) {
      const sel = opt("--selector");
      const target = sel ? page.locator(sel).first() : page;
      await target.screenshot({ path: opt("--png"), fullPage: !sel && args.includes("--full") });
      const box = sel ? await page.locator(sel).first().boundingBox() : { width: w, height: h };
      out.png = { path: opt("--png"), width: Math.round(box.width), height: Math.round(box.height) };
      const want = opt("--size");
      if (sel && want && `${out.png.width}x${out.png.height}` !== want) { fail = true; out.png.mismatch = `esperado ${want}`; }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
process.exit(fail ? 1 : 0);
