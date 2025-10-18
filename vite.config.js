import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [
    react(),
    // mkcert()
  ],
  build: {
    outDir: "docs",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://scheduler.push.mvladt.ru",
        changeOrigin: true,
      },
    },
    // https: true,
  },
});
