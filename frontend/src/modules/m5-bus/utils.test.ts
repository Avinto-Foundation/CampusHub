import { getNextBus } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("getNextBus", () => {
  it.todo("normal: the current time is between two departures");
  it.todo("edge: the current time is exactly the same as a departure");
  it.todo("edge: the current time is after the last departure of the day");
  it.todo("weird: the route has no departures at all");
});
