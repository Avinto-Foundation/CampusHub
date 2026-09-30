// Integration tests for the M2 Events page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M2 Events page", () => {
  it.todo("shows the list of events from the API");
  it.todo("shows the announcements from the API");
  it.todo("shows the event's title and date after Find is clicked");
});
