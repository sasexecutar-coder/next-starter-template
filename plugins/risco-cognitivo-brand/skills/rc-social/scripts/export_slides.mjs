#!/usr/bin/env node
// Exporta cada .slide de um HTML em PNG com dimensão exata e (opcional) um PDF com 1 slide por página.
// Uso: node export_slides.mjs <deck.html> <pasta-saida> <W>x<H> [--pdf deck.pdf] [--prefix nome]
// Playwright: npm i -D playwright, ou RC_PLAYWRIGHT=/caminho/node_modules/playwright
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { resolve, join } from "node:path";
import { mkdirSync } from "node:fs";
const require = createRequire(import.meta.url);
const pw = require(process.env.RC_PLAYWRIGHT || "playwright");
const [file, outDir, size, ...rest] = process.argv.slice(2);
if (!file || !outDir || !/^\d+x\d+$/.test(size || "")) { console.error("uso: export_slides.mjs deck.html saida/ 1080x1350"); process.exit(2); }
const [W, H] = size.split("x").map(Number);
const opt = (k) => { const i = rest.indexOf(k); return i >= 0 ? rest[i + 1] : undefined; };
const prefix = opt("--prefix") || "slide";
mkdirSync(outDir, { recursive: true });
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: W + 128, height: H + 128 }, deviceScaleFactor: 1 });
const errors = []; page.on("pageerror", (e) => errors.push(e.message));
await page.goto(pathToFileURL(resolve(file)).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const slides = page.locator(".slide");
const n = await slides.count();
const files = []; let bad = 0;
for (let i = 0; i < n; i++) {
  const el = slides.nth(i);
  const box = await el.boundingBox();
  const p = join(outDir, `${prefix}-${String(i + 1).padStart(2, "0")}.png`);
  await el.screenshot({ path: p });
  const overflow = await el.evaluate((s) => s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1);
  const ok = Math.round(box.width) === W && Math.round(box.height) === H && !overflow;
  if (!ok) bad++;
  files.push({ file: p, width: Math.round(box.width), height: Math.round(box.height), overflow, ok });
}
if (opt("--pdf")) {
  await page.addStyleTag({ content: `@page{size:${W}px ${H}px;margin:0}body{padding:0;background:none}main{gap:0}.slide{break-after:page}` });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: opt("--pdf"), preferCSSPageSize: true, printBackground: true });
}
await browser.close();
console.log(JSON.stringify({ slides: n, expected: size, errors, files, pdf: opt("--pdf") || null }, null, 2));
process.exit(errors.length || bad || n === 0 ? 1 : 0);
