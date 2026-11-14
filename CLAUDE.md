# CLAUDE.md

A small Express 4 REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` overrides)
- `npm test` — run all tests with the built-in `node:test` runner
- `node --test tests/users.test.js` — run one test file; add `--test-name-pattern="<regex>"` to run a single test
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Route handlers access data only through functions exported from `db/store.js`; never import or mutate the `users` array directly.
- Error responses use the shape `{ error: "<message>" }` with the matching status (400 for invalid input, 404 for missing resources).
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app`; do not add Jest/Mocha or start a real server in tests.

## Architecture

- `server.js` builds the app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `app.listen` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/` holds one `express.Router` file per resource; new resources get a new file mounted in `server.js`.
- `db/store.js` is a module-level in-memory store standing in for a database: data resets on restart, and state is shared across all tests in the same process, so tests shouldn't assume a fixed user count.
- Route params arrive as strings — convert with `Number(req.params.id)` before calling the store, which compares ids with `===`.
