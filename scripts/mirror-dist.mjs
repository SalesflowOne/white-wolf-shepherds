// Mirrors the Nitro build output (.output/) into dist/ so platform dist-checks
// find the expected artifacts. Vercel keeps using the untouched .output/ build.
import { cp, rm, mkdir, access } from "node:fs/promises";
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

const source = p(".output");
if (!(await exists(source))) {
  console.error("mirror-dist: .output/ not found — did the build run?");
  process.exit(1);
}

const dist = p("dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

if (await exists(p(".output/public"))) {
  await cp(p(".output/public"), p("dist/client"), { recursive: true });
}
if (await exists(p(".output/server"))) {
  await cp(p(".output/server"), p("dist/server"), { recursive: true });
}
if (await exists(p(".output/nitro.json"))) {
  await cp(p(".output/nitro.json"), p("dist/nitro.json"));
}

console.log("mirror-dist: copied .output/ -> dist/ (client, server)");
