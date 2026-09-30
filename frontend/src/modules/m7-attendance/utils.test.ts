import { isEligibleForExam } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("isEligibleForExam", () => {
  it.todo("normal: a student who attended most of the classes");
  it.todo("normal: a student who missed many classes");
  it.todo("edge: attendance exactly on the eligibility line");
  it.todo("edge: just below the eligibility line");
  it.todo("weird: a subject with no classes held yet");
});
