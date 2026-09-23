# CampusHub

A small fullstack teaching project for practicing debugging and testing.
Eight modules, each with the same handful of small, realistic bugs
waiting for you to find with browser DevTools and Swagger, then fix and
cover with a test.

## Setup checklist

1. Clone this repository.
2. Start the backend:
   - `docker compose up` (or `docker-compose up` on older Docker installs)
   - Wait for `Starting development server at http://0.0.0.0:8000/`
3. Open http://localhost:8000/api/docs/ in your browser and confirm you
   see the CampusHub API Swagger page — this means the backend is
   running.
4. In a second terminal, set up the frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
5. Open http://localhost:5173 in your browser. You should see the
   CampusHub home page listing 8 modules.
6. In the frontend folder, run `npm test` to see the test runner start
   (each module's `utils.test.ts` starts out empty — that's expected,
   see below).

## Project structure

```
backend/    Django + DRF API (one app per module, m1_library ... m8_canteen)
frontend/   React + Vite + TypeScript app (one folder per module)
```

Each frontend module folder (`frontend/src/modules/mN-name/`) has:

- `README.md` — what the feature is supposed to do
- `types.ts` — TypeScript interfaces for the data
- `Page.tsx` — the page itself
- `utils.ts` — one small function with the page's logic
- `utils.test.ts` — write your tests here
- `styles.css` — the page's styles

## How to work through a module

1. Read the module's `README.md` to see what "correct" looks like.
2. Open the page in the browser and try it. Something will be wrong.
3. Use DevTools (Network, Console, Elements, Sources) and Swagger at
   http://localhost:8000/api/docs/ to figure out why.
4. Fix it in the code.
5. Write a test in `utils.test.ts` for the module's logic function, so
   the bug can't come back unnoticed.

Module 8 (Canteen Order) has an extra `SOLUTION.md` with every step
worked out — read it first if you want to see the whole process
demonstrated once before trying modules 1-7 yourself.

## Troubleshooting

- **Docker not running**: start Docker Desktop (or your Docker daemon)
  before running `docker compose up`.
- **Port already in use**: something else is already using port 8000 or
  5173. Stop that process, or change the port mapping in
  `docker-compose.yml` (backend) or run `npm run dev -- --port <other>`
  (frontend) — just remember the frontend's Vite proxy still expects the
  backend on port 8000.
- **"exec format error" or "not found" when the backend container
  starts**: this usually means `backend/entrypoint.sh` was checked out
  with Windows-style (CRLF) line endings. The `.gitattributes` file in
  this repo should prevent that automatically after a fresh clone; if
  you still see it, re-clone the repository.
- **A `version` warning from `docker compose`**: harmless. Newer Compose
  versions no longer need the `version:` key in `docker-compose.yml` and
  just warn about it; the file still works.
- **I don't want to use Docker for the backend**: you can run it
  directly with Python 3.8+ instead:

  ```
  cd backend
  python3 -m venv venv
  source venv/bin/activate      # on Windows: venv\Scripts\activate
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py loaddata \
      m1_library/fixtures/seed.json \
      m2_events/fixtures/seed.json \
      m3_gpa/fixtures/seed.json \
      m4_hostel/fixtures/seed.json \
      m5_bus/fixtures/seed.json \
      m6_printshop/fixtures/seed.json \
      m7_attendance/fixtures/seed.json \
      m8_canteen/fixtures/seed.json
  python manage.py runserver 0.0.0.0:8000
  ```

- **Every `utils.test.ts` fails with "No test suite found"**: that's
  expected on a fresh clone — those files only contain an import and a
  reminder comment. The test runner (and the pull request check in
  `.github/workflows/test.yml`) will pass once you've written at least
  one test in the file.
