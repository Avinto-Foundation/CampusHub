import { calculateGPA } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("calculateGPA", () => {
  it.todo("normal: grade points entered for a few courses");
  it.todo("normal: a grade point entered for only one course");
  it.todo("edge: no grade points entered at all");
  it.todo("weird: grade points with decimals that need rounding");
});
