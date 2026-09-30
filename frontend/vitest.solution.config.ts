// Used only by `npm run test:solution`.
// It reuses the normal config, but runs ONLY the finished M8 tests in
// src/modules/m8-canteen/solution/ (which the normal config skips).
import { configDefaults, defineConfig } from "vitest/config";

import baseConfig from "./vite.config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["src/modules/m8-canteen/solution/**/*.test.{ts,tsx}"],
    // include: ["src/modules/m1-library/solution/**/*.test.{ts,tsx}"],
    // include: ["src/modules/*/solution/**/*.test.{ts,tsx}"],
    exclude: configDefaults.exclude,
  },
});
