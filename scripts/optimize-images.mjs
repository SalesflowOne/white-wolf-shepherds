/**
 * Image pipeline for /public photos.
 *
 * For every base .webp under public/ this script:
 *   1. recompresses the original at a sane quality (skipped if it would grow),
 *   2. emits 400 / 800 / 1200px wide responsive variants (never upscaling),
 *   3. writes src/lib/image-manifest.json so <SmartImage> can build srcset
 *      and intrinsic width/height (prevents layout shift).
 *
 * Run with:  node scripts/optimize-images.mjs
 */
import { readdir, stat, writeFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const MANIFEST = "src/lib/image-manifest.json";
const WIDTHS = [400, 800, 1200];
const QUALITY = 72;

const isVariant = (f) => new RegExp(`-(${WIDTHS.join("|")})\\.webp$`).test(f);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith(".webp") && !isVariant(entry.name)) out.push(p);
  }
  return out;
}

async function recompress(file) {
  const before = (await stat(file)).size;
  const tmp = `${file}.tmp`;
  await sharp(file).webp({ quality: QUALITY, effort: 6 }).toFile(tmp);
  const after = (await stat(tmp)).size;
  if (after < before * 0.95) {
    await rename(tmp, file);
    return before - after;
  }
  await unlink(tmp);
  return 0;
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const manifest = {};
  let saved = 0;

  for (const file of files) {
    saved += await recompress(file);
    const meta = await sharp(file).metadata();
    const key = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
    const variants = [];

    for (const w of WIDTHS) {
      if (w >= meta.width) continue;
      const out = file.replace(/\.webp$/, `-${w}.webp`);
      await sharp(file).resize({ width: w }).webp({ quality: QUALITY, effort: 6 }).toFile(out);
      variants.push(w);
    }

    manifest[key] = { w: meta.width, h: meta.height, v: variants };
  }

  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  console.log(
    `optimized ${files.length} images, ${(saved / 1024 / 1024).toFixed(2)} MB saved, manifest written`,
  );
}

main();
