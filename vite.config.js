import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Desativa o overlay de erro do HMR
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  publicDir: "src/assets",
});
