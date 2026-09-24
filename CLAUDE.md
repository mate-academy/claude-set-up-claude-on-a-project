# CLAUDE.md

A small Express REST API (users + health check) backed by an in-memory store; the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (port via `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `npm run lint` — ESLint (`eslint:recommended`)

## Conventions

- CommonJS only: use `require` / `module.exports`, not `import` / `export` (ESLint `sourceType: "script"`).
- Tests use `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and call `request(app)` 

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users` → `routes/users.js`, `/health` → `routes/health.js`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it.
- `routes/` — one file per resource, each exporting an `express.Router()`. A new resource means a new file here plus an `app.use(...)` line in `server.js`.
- `db/store.js` — in-memory stand-in for a database. State lives in module scope, so it resets on every restart and is shared across all tests in the same process (e.g. a `POST` in one test is visible to later ones).
