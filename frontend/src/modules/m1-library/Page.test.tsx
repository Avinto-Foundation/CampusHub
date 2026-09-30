// Integration tests for the M1 Library page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M1 Library page", () => {
  it.todo("shows the list of books from the API");
  it.todo("shows the recent reservations from the API");
  it.todo("shows the book's title and author after Find is clicked");
});
