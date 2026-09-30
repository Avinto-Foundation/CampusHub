// This file runs before every test file (see `setupFiles` in vite.config.ts).
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "./server";

// Start the fake API before any test runs.
//
// onUnhandledRequest: "error" means: if the page calls a URL that has no
// handler (for example a typo like "/api/canteen/order/" instead of
// "/api/canteen/orders/"), MSW prints a loud error naming that exact URL
// and the request fails, instead of silently doing nothing.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  // Undo any server.use(...) overrides a test added, so every test starts
  // with the normal handlers.
  server.resetHandlers();
  // Remove the rendered page so the next test starts with an empty screen.
  cleanup();
  // Put the real clock back, in case a test froze it with vi.useFakeTimers().
  vi.useRealTimers();
});

// Stop the fake API when all tests are done.
afterAll(() => server.close());
