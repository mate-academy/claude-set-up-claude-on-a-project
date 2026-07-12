# CLAUDE.md

A small Express REST API (`/users`, `/health`) backed by an in-memory store — the sample project for setting up Claude Code on a real codebase.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-reload)
- `npm test` — run the test suite via the built-in `node --test` runner
- `npm run lint` — ESLint over the project
- Run a single test file: `node --test tests/users.test.js`

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — `.eslintrc.json` sets `sourceType: "script"`.
- Use double quotes and end statements with semicolons.
- Add one route file per resource under `routes/`, mounted in `server.js` — don't put route handlers directly in `server.js`.
- All data access goes through `db/store.js`; routes never touch the `users` array directly.

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) so tests can import `app` without opening a port.
- `routes/` holds one router per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` is an in-memory data helper standing in for a database — state resets on every restart and is not persisted.
- Tests use `supertest` against the imported `app` (no live server); CI (`.github/workflows/ci.yml`) runs lint then tests on Node 22.
