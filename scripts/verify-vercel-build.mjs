import { readFileSync } from "node:fs";

const config = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");

if (/nitro\s*\(\s*\{[\s\S]*?output\s*:\s*\{[\s\S]*?dir\s*:/.test(config)) {
  console.error(
    "vite.config.ts must use nitro() without output.dir on Vercel.\n" +
      "Custom Nitro output breaks TanStack Start routing and causes production 404s.",
  );
  process.exit(1);
}
