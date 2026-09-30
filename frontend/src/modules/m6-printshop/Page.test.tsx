// Integration tests for the M6 Print Shop page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M6 Print Shop page", () => {
  it.todo("shows the list of print jobs from the API");
  it.todo("shows the price list from the API");
  it.todo("shows the job's file name and cost after Check is clicked");
});
