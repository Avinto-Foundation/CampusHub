/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: { url: "http://localhost:5173" },
    },
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    // When a query fails, Testing Library prints the rendered page. Cap it at
    // 1000 characters so the actual error message isn't buried.
    env: { DEBUG_PRINT_LIMIT: "1000" },
    exclude: [...configDefaults.exclude, "**/solution/**"],
  },
});
