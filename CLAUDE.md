# CLAUDE.md

A minimal Express REST API (`/users`, `/health`) used as the practice codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-reload)
- `npm test` — run the test suite via the built-in `node --test` runner
- `npm run lint` — ESLint over the whole repo
- `node --test tests/users.test.js` — run a single test file
- `node --test --test-name-pattern="returns 404"` — run tests matching a name

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts routers, and calls `app.listen` **only** when run directly (`require.main === module`). It always `module.exports = app` so tests import the app without binding a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. Mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — the only data layer. In-memory arrays behind `getAllUsers` / `getUserById` / `createUser`; state resets on restart and IDs come from a module-level counter. Route handlers never touch data structures directly — go through `store`.
- `tests/` — black-box tests using `supertest` against the imported `app`.

Request flow: `server.js` → resource router in `routes/` → `db/store.js`.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — `.eslintrc.json` sets `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- Add a new resource as its own file in `routes/`, mounted with `app.use("/resource", ...)` in `server.js`; put its data access in `db/store.js`.
- Validate required fields in the route handler and return `res.status(4xx).json({ error: "..." })` — see `POST /users`.
- Unused args named `_`, `req`, `res`, or `next` are allowed by lint; other unused vars warn.
