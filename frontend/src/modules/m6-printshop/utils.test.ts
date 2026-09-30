import { calculatePrintCost } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("calculatePrintCost", () => {
  it.todo("normal: a black-and-white job with several pages and several copies");
  it.todo("normal: a color job with several pages and several copies");
  it.todo("edge: a job with just one page and one copy");
  it.todo("weird: a job with zero pages");
});
