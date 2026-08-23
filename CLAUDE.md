A starter Express API used for the Claude Code course. Data is in-memory only (no real database, no persistence across restarts).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR against Node 22.

## Conventions

- Add a new resource by creating `routes/<resource>.js` (export a router) and mounting it in `server.js` — follow the existing pattern in `routes/users.js`.
- All data access goes through `db/store.js`; don't reach into in-memory state from route handlers directly.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape but is never used at runtime.

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts routes, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can import `app` and drive it with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`, mounted in `server.js` under its path prefix (e.g. `/users`, `/health`).
- `db/store.js` — the only data access layer; an in-memory array wrapped in functions (`getAllUsers`, `getUserById`, `createUser`). Routes never touch the array directly, always go through this module.
- `tests/` — one test file per resource, using `node:test` + `node:assert` + `supertest` against the exported `app`.

