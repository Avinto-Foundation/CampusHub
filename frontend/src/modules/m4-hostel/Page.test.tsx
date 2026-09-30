// Integration tests for the M4 Hostel Complaint page.
//
// YOUR TASK: turn each it.todo(...) below into a real test, one at a time.
// Write the test, run it and watch it FAIL (red): that is the bug. Then fix
// the bug and watch it PASS (green). frontend/TESTING.md shows everything
// you need.
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderPage } from "../../test/renderPage";
import Page from "./Page";

describe("M4 Hostel Complaint page", () => {
  it.todo("shows the list of complaints from the API");
  it.todo("shows the hostel notices from the API");
  it.todo("shows the complaint's category and status after Check is clicked");
});
