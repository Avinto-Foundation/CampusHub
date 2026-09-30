# Test setup

How the CampusHub frontend tests are set up, what they need, and how to
extend them. For *writing* tests, see [TESTING.md](TESTING.md).

## Requirements

| Requirement | Version | Why |
| --- | --- | --- |
| Node.js | 18 or newer (see `.nvmrc`; CI uses 18) | Runs Vite, Vitest and TypeScript |
| npm | comes with Node | Installs packages |
| Docker / Django backend | **not needed** | Tests use a fake API (MSW) instead |

Install everything from the `frontend` folder:

```
npm install
```

## What's installed and why

All of these are `devDependencies` (only used while developing and testing).
Versions are pinned exactly in `package.json`. Some newer major versions
(MSW 3, jsdom 27+, jest-dom 7) need Node 22, so we use the latest versions
that still work on Node 18.

| Package | Version | What it's for |
| --- | --- | --- |
| `vitest` | 1.6.0 | The test runner: finds `*.test.ts(x)` files, runs them, reports results |
| `jsdom` | 26.1.0 | A fake browser (`document`, `window`) so React pages can render in Node |
| `@testing-library/react` | 16.3.3 | `render()` and `screen` for finding things on the page like a user would |
| `@testing-library/dom` | 10.4.2 | Required by `@testing-library/react` |
| `@testing-library/user-event` | 14.6.7 | Realistic clicking and typing (`user.click`, `user.type`) |
| `@testing-library/jest-dom` | 6.10.0 | Extra checks like `toBeInTheDocument()` and `toBeDisabled()` |
| `msw` | 2.15.0 | Mock Service Worker: catches `fetch` calls and answers with fake data |

## Files involved

```
frontend/
├── vite.config.ts              # the `test:` section configures Vitest
├── vitest.solution.config.ts   # config for `npm run test:solution` only
├── TESTING.md                  # student guide
├── TEST_SETUP.md               # this file
└── src/
    ├── test/
    │   ├── setup.ts            # runs before every test file
    │   ├── server.ts           # the MSW server, combining every module's handlers
    │   ├── renderPage.tsx      # renderPage(<Page />) helper
    │   └── vitest-globals.d.ts # tells TypeScript about describe/it/expect globals
    └── modules/<module>/
        ├── mocks/
        │   ├── data.ts         # fake API data, copied from backend seed.json
        │   └── handlers.ts     # fake endpoints, matching Swagger
        ├── Page.test.tsx       # integration tests (student starter: 3 it.todo)
        ├── utils.test.ts       # unit tests (student starter: it.todo)
        ├── <Thing>Lookup.tsx   # small "find by ID" form (GET only) for the beginner tests
        └── ...                 # Page.tsx, utils.ts, types.ts: app code, untouched
```

Mentors also have a `solution/` folder in every module: `Page.test.tsx` and
`utils.test.ts` are the finished answers to the student files, and
`Page.extra.test.tsx` has harder extra tests. It is gitignored (mentor reference
only), so students don't see it.

## How the pieces fit together

**`vite.config.ts` → `test:`**

- `environment: "jsdom"`: tests run inside the fake browser.
- `environmentOptions.jsdom.url: "http://localhost:5173"`: the fake
  browser's page address. The app calls relative URLs like `/api/canteen/menu/`,
  which are resolved against this address, just like in the real browser, so
  no app code has to change. (Vitest would default to `localhost:3000`; we
  use the dev server's address so it matches what students see.)
- `setupFiles: ["./src/test/setup.ts"]`: runs `setup.ts` before every test file.
- `globals: true`: `describe`, `it` and `expect` are available without
  importing them (the test files still import them, for clarity).
- `exclude: [..., "**/solution/**"]`: leaves the M8 solution tests out of
  `npm test`, because they fail on purpose until the M8 bugs are fixed.

**`src/test/setup.ts`**

1. Loads the jest-dom matchers.
2. `beforeAll`: starts MSW with `onUnhandledRequest: "error"`, so any request
   to a URL with no handler fails loudly and names the URL.
3. `afterEach`: removes per-test `server.use(...)` overrides and unmounts the
   rendered page, so tests don't affect each other.
4. `afterAll`: stops MSW.

**`src/test/server.ts`**: `setupServer(...)` from `msw/node`, with every
module's `handlers` spread in.

**`src/test/renderPage.tsx`**: wraps the page in `MemoryRouter` (pages use
`<Link>`, which needs a router) and returns `{ user, ...render result }`
with `user = userEvent.setup()`.

## Commands

| Command | What it runs |
| --- | --- |
| `npm test` | Vitest in watch mode (all tests except `solution/`) |
| `npm run test:run` | All tests once (this is what CI runs) |
| `npm run test:solution` | Only `src/modules/m8-canteen/solution/`. Fails until the M8 bugs are fixed. |
| `npm run typecheck` | `tsc --noEmit`, which includes the test files |

## CI

`.github/workflows/test.yml` runs on every pull request, with Node 18:

1. `npm ci`
2. `npm run typecheck`
3. `npm run test:run`

The workflow didn't need changing. On a fresh clone it passes, because
every student test starts as `it.todo(...)` (reported as "todo", not as a
failure) and the solution tests are excluded.

## Mocks must match Swagger

The mocks are only useful if they describe the **real** API. If a mock is
wrong, a test can pass while the real app is broken. So:

- Take paths from `backend/config/urls.py` and each app's `urls.py` (or
  Swagger at `/api/docs/`), **never** from the URL the page calls.
- Take response fields from each app's `serializers.py` (the `fields` list),
  and data from `fixtures/seed.json`.
- Match the real ordering (for example `order_by("-id")` means newest first).
- Mock types are written in `mocks/data.ts` (`ApiBook`, `ApiMenuItem`, ...)
  instead of imported from the module's `types.ts`. This is on purpose:
  `types.ts` is app code and may itself contain a bug.

When the backend changes, update the matching `mocks/data.ts` and
`mocks/handlers.ts` in the same pull request.

## Adding tests for a new module

1. Create `src/modules/<new-module>/mocks/data.ts` with the API types and the
   seed data (copy the style of `m8-canteen/mocks/data.ts`).
2. Create `mocks/handlers.ts` with one handler per endpoint the page uses,
   using the correct paths from Swagger.
3. Add the handlers to `src/test/server.ts`:
   ```ts
   import { handlers as newHandlers } from "../modules/<new-module>/mocks/handlers";
   // ...
   export const server = setupServer(...otherHandlers, ...newHandlers);
   ```
4. Add `Page.test.tsx` and `utils.test.ts` next to the page. Copy an existing
   starter file and change the `it.todo(...)` lines.
5. Run `npm run test:run` and `npm run typecheck`.

## Setup troubleshooting

- **`npm install` warns about the Node version (`EBADENGINE`)**: check
  `node -v`. You need Node 18 or newer. Don't upgrade MSW, jsdom or jest-dom
  to a newer major version unless CI moves to Node 22 as well.
- **`TypeError: Failed to parse URL from /api/...`**: the test isn't running
  in jsdom (check `environment` in `vite.config.ts`, and that the file has no
  `// @vitest-environment node` comment). Relative URLs need a page address.
- **`Property 'toBeInTheDocument' does not exist` from `tsc`**: `setup.ts`
  must be inside `src/` (so `tsc` sees its jest-dom import).
- **`Cannot find name 'describe'` from `tsc`**: `src/test/vitest-globals.d.ts`
  is missing.
- **All 8 module handlers are loaded in every test file.** That's fine. They
  use different paths, so they never clash.
