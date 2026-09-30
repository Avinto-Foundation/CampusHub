// Integration tests for the M8 Canteen page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M8 Canteen page", () => {
  it.todo("shows the menu items from the API");
  it.todo("shows the recent orders from the API");
  it.todo("shows the dish's name and price after Find is clicked");
});
