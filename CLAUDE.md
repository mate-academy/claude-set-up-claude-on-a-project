# claude-course-starter

Express 4 JSON API over an in-memory store — no database, no build step.

## Commands

- `npm run dev` — start the API on :3000 with `node --watch`
- `npm test` — run the `node:test` suite in `tests/`
- `npm run lint` — ESLint; CI runs lint before tests, so lint failures block the PR

## Conventions

- CommonJS only (`require` / `module.exports`). `.eslintrc.json` parses as `script`, so ESM `import` fails lint.
- One router per resource in `routes/`, mounted in `server.js`. Add a new file there rather than a handler in `server.js`.
- Routes read and write data only through `db/store.js` — no module-level state in `routes/`.
- Validate input in the route and return a JSON `{ error: "..." }` with 400 or 404; don't throw.
- Tests import `app` from `server.js` and drive it with supertest — never open a real port in a test.

## Architecture

`server.js` builds the app, mounts `/users` and `/health`, and calls `listen()` only when run directly, so tests can import `app` without binding a port. `db/store.js` is an in-memory array with a module-level id counter: data resets on every restart, and nothing may assume persistence or stable ids across runs.
