// Integration tests for the M5 Bus Timetable page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M5 Bus Timetable page", () => {
  it.todo("shows the list of bus routes from the API");
  it.todo("shows the bus announcements from the API");
  it.todo("shows the route after Find is clicked");
});
