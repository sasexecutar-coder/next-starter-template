// Copia os assets do cérebro do design kit (fonte única) para public/models/home-brain/,
// conferindo o SHA-256 antes. Hashes: assets/build-report.json (malha e partículas) e
// MASTER-INDEX.csv (pôster). Falha o build se algum divergir.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const KIT = "docs/design-kit";
const SRC = join(KIT, "04-handoff/brain-home/assets");
const DEST = "public/models/home-brain";

const report = JSON.parse(readFileSync(join(SRC, "build-report.json"), "utf8"));
const index = readFileSync(join(KIT, "MASTER-INDEX.csv"), "utf8");
const indexHash = (path) => index.split("\n").find((l) => l.includes(`,${path},`))?.split(",").at(-1)?.trim();

const files = {
  "brain-surface.glb": report.glb.sha256,
  "brain-particles.bin": report.particles.sha256,
  "brain-particles-attr.bin": report.particles.attrSha256,
  "brain-poster.png": indexHash("04-handoff/brain-home/assets/brain-poster.png"),
};

mkdirSync(DEST, { recursive: true });
for (const [name, expected] of Object.entries(files)) {
  const buf = readFileSync(join(SRC, name));
  const actual = createHash("sha256").update(buf).digest("hex");
  if (!expected || actual !== expected) {
    console.error(`sync-brain-assets: hash divergente em ${name}\n  esperado ${expected}\n  obtido   ${actual}`);
    process.exit(1);
  }
  copyFileSync(join(SRC, name), join(DEST, name));
}
console.log(`sync-brain-assets: ${Object.keys(files).length} arquivos conferidos e copiados para ${DEST}`);
