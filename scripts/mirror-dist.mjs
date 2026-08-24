// Mirrors the Nitro build output (.output/) into dist/ so platform dist-checks
// find the expected artifacts.
//
// Vercel requires the DEFAULT Nitro output location (.output/), so vite.config.ts
// must not set nitro({ output: { dir } }) — scripts/verify-vercel-build.mjs guards
// that. This script therefore reproduces, after the build, exactly the layout that
// `output: { dir: "dist" }` used to emit:
//
//   dist/public/     <- static client assets
//   dist/server/     <- SSR server bundle (index.mjs)
//   dist/nitro.json
//
// dist/client/ is also written as an alias, since some checks look there instead
// of dist/public. .output/ itself is left untouched for Vercel.
import { cp, rm, mkdir, access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const p = (rel) => fileURLToPath(new URL(rel, root));

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

// On Vercel, Nitro emits to .vercel/output (not .output/). The platform deploys
// that layout directly — dist/ mirroring is only for local / non-Vercel checks.
if (process.env.VERCEL) {
  console.log("mirror-dist: skipping on Vercel (.vercel/output is deployed directly)");
  process.exit(0);
}

const source = p(".output");
if (!(await exists(source))) {
  console.error("mirror-dist: .output/ not found — did the build run?");
  process.exit(1);
}

const dist = p("dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

// Copy .output/* verbatim -> dist/* (public, server, nitro.json, ...)
await cp(source, dist, { recursive: true });

// Alias dist/public -> dist/client for checks that expect the Vite client dir name.
if (await exists(p("dist/public"))) {
  await cp(p("dist/public"), p("dist/client"), { recursive: true });
}

// Fail loudly if the two artifacts that matter are missing.
const missing = [];
if (!(await exists(p("dist/server/index.mjs")))) missing.push("dist/server/index.mjs");
if (!(await exists(p("dist/public/assets")))) missing.push("dist/public/assets");
if (missing.length) {
  console.error(`mirror-dist: expected build artifacts missing: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`mirror-dist: .output/ -> dist/ (${(await readdir(dist)).join(", ")})`);
