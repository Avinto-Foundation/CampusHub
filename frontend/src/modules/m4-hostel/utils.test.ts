import { validateComplaint } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("validateComplaint", () => {
  it.todo("normal: both room and description are filled in");
  it.todo("edge: room is filled in but description is empty");
  it.todo("edge: description is filled in but room is empty");
  it.todo("weird: both room and description are empty");
});
