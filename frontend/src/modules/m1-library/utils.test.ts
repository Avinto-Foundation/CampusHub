import { filterBooks } from "./utils";
import { describe, it } from "vitest";

// Test the rule described in README.md, not what the code currently does.
// Try one normal case, one edge case, and one weird case.
// If every test passes before you've fixed anything, try inputs closer
// to the edge of the rule: that's usually where a bug hides.
describe("filterBooks", () => {
  it.todo("normal: a query that is part of one book's title");
  it.todo("edge: a query in a different case than the title");
  it.todo("edge: an empty query");
  it.todo("weird: a query that matches no book at all");
});
