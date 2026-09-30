import { isEventFull } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("isEventFull", () => {
  it.todo("normal: an event with plenty of seats still free");
  it.todo("edge: an event where the number registered equals the capacity");
  it.todo("edge: an event with exactly one seat left");
  it.todo("weird: an event with a capacity of zero");
});
