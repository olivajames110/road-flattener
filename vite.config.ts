import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative paths so the build works under /smoother-roads/ on GitHub Pages
export default defineConfig({
  base: "./",
  plugins: [react()],
});
