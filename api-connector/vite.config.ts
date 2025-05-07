import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    proxy: {
      // 여기가 핵심!
      "^/api/.*": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
    cors: {
      origin: "*", // 모든 출처 허용
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: "*",
    },
  },
  build: {
    outDir: "dist",
  },
  // 여기가 핵심: public directory fallback 설정
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
