# CLAUDE.md

Small Express REST API (users + health check) backed by an in-memory store; used as the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="404"` to run matching tests only
- `npm run lint` — ESLint over the whole repo

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 — both must pass.

## Conventions

- CommonJS only: use `require`/`module.exports`, not `import`/`export` (ESLint is configured with `sourceType: "script"`).
- Route handlers never touch data directly — go through functions exported from `db/store.js`; add a new store function rather than mutating `users` from a route.
- Errors are returned as JSON `{ error: "<message>" }` with the matching status (400 for missing fields, 404 for not found).
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app` — don't add Jest/Mocha or start a real server in tests.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/<resource>.js` — one `express.Router()` per resource; a new resource needs a new file plus an `app.use()` line in `server.js`.
- `db/store.js` — module-level in-memory array seeded with two users; resets on restart. Because state is shared per process, tests that create users affect later tests in the same file.
