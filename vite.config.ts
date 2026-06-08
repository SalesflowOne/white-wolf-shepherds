import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      target: "vercel",
    }),
    react(),
    tailwindcss(),
    viteTsConfigPaths(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});
