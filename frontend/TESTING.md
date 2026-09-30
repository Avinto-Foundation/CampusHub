# Testing CampusHub

You already found bugs by hand with DevTools and Swagger. Tests let the
computer find them for you, every time you run them. This guide covers
everything you need to write your first ones.

## Three kinds of tests

- **Unit test**: checks one small function on its own. _Example:_ give
  `calculateTotal` a cart with 2 samosas at 20.00 and check it returns 40.
- **Integration test**: renders a whole page and checks how its parts work
  together (buttons, forms, data from the API). _Example:_ render the
  Canteen page, click "Add" twice, and check the cart says "Total: 40".
- **End-to-end (E2E) test**: drives a real browser against the real running
  app, like a robot student. _Example:_ open Chrome, visit
  `localhost:5173/m8`, and check the Place Order button is actually visible.
  (We don't write these in this course, but it's good to know they exist.)

In CampusHub, unit tests go in `utils.test.ts` and integration tests go in
`Page.test.tsx`.

## What MSW does, and why we fake the API

Pages load their data with `fetch("/api/...")`. In a test there is no Django
server running, so we use **MSW** (Mock Service Worker). It catches every
`fetch` and answers with fake data, as if it were the real API.

Why fake it?

- Tests run in a second, without Docker or a database.
- The data is always the same, so tests don't randomly break.
- We can make the API answer whatever we want, for example "not found",
  to check the page handles it.

Each module's fake API lives in `src/modules/<module>/mocks/`:

- `data.ts`: the fake data, copied from the backend's seed data. When a
  test needs a name, a title or an id, look here.
- `handlers.ts`: one handler per real endpoint, matching Swagger.

The handlers use the **correct** URLs and field names from Swagger. If
your page calls a wrong URL, no handler matches it, and MSW prints an error
that names that exact URL.

## Running the tests

From the `frontend` folder:

| Command                  | What it does                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `npm test`               | Runs all tests and keeps watching. Save a file and the tests run again. Press `q` to quit. |
| `npm run test:run`       | Runs all tests once and stops (this is what CI runs).                                      |
| `npm test -- m1-library` | Runs only the test files whose path contains `m1-library`.                                 |

Tests written as `it.todo(...)` show up as **todo**. They are reminders, not
failures. Your job is to turn them into real tests.

## Your task in each module

Every module's `Page.test.tsx` has the same **3 `it.todo`s**, in this order:

| Test | What it checks | The bug it finds |
| ---- | -------------- | ---------------- |
| 1 | The main list shows data from the API | None. It's a warm-up, so it passes straight away |
| 2 | The side panel shows data from the API | A wrong URL |
| 3 | The small "find by ID" form at the bottom shows the right result | A wrong field name |

Your mentor solves the same 3 tests on M8 first. Every module is solved the
same way, only the texts, ids and placeholders change.

Do them one at a time:

1. Change `it.todo("...")` to `it("...", async () => { ... })` and write the
   test. Take the expected text from the module's `README.md`, and names,
   titles and ids from `mocks/data.ts`.
2. Save and run the tests. **The test should fail (red).** That's good:
   it proves the test can see the bug. If it passes straight away, either
   there is no bug there, or your test isn't checking the right thing.
   (Test 1 is the exception: it's a warm-up and passes straight away.)
3. Not sure what's wrong? Do the same steps in the app in your browser,
   and use DevTools, like you did before.
4. **Fix the bug** in the app code.
5. **Run the tests again and watch it pass (green).**
6. **Commit** the fix and the test together, for example
   `fix(m1): load recent reservations from the right URL`.

When all three are green, open a **pull request**. GitHub runs all the
tests again. If someone later brings the bug back, your test turns the PR
red.

## Everything the tests use

That's the whole toolbox. You don't need anything else for the task.

```tsx
// Show the page. `user` is how you click and type.
const { user } = renderPage(<Page />);

// Find text that comes from the API. findBy... WAITS a moment for it.
expect(await screen.findByText("Samosa")).toBeInTheDocument();

// Type and click, like a student.
await user.type(screen.getByPlaceholderText("Dish ID"), "2");
await user.click(screen.getByRole("button", { name: "Find" }));
```

## Common errors

**`[MSW] Error: intercepted a request without a matching request handler: GET /api/...`**
The page called a URL that has no handler. Compare it letter by letter with
Swagger and `mocks/handlers.ts`. Often this _is_ the bug you're looking for.
Don't "fix" it by adding a handler for the wrong URL.

**`Unable to find an element with the text: ...` right after rendering**
You probably used `getBy...` for something that comes from the API.
`getBy...` looks **once, right now**. `findBy...` **keeps looking for a
moment** until it appears. Use `findBy...` for anything loaded by `fetch`,
and `getBy...` for things already on the page.

**`Found multiple elements with the text: ...`**
The same text is on the page more than once, for example a book title in
the list *and* in the "Choose a book" dropdown. Tell the query which one you
mean: `screen.getByText("The Hobbit", { selector: "strong" })` only looks
inside `<strong>` tags.

**A test passes when it shouldn't, or fails with a strange message about an
unfinished promise**
You probably forgot an `await`. `findBy...`, `user.click(...)` and
`user.type(...)` all need `await` in front of them. Without it, the test
ends before the page has finished reacting.

**`Unable to find an element with the text` even though you can see it in
the printed page**
The text may be split across several elements, like
`<strong>Samosa</strong> — Snacks`. Search for a smaller piece
(`"Samosa"`), or use a regular expression: `screen.getByText(/Samosa/)`.
Also check spaces and punctuation: the text must match exactly.
