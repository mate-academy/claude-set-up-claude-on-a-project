# CLAUDE.md

Small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (long-running; don't use it to check a change, use the tests)
- `npm test` — run all tests (Node's built-in `node --test`)
- `npm run lint` — ESLint; CI runs lint and then tests on every push, so both must pass before committing

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules (`import` / `export`). ESLint is set to `sourceType: "script"`.
- Routes never touch data directly. Add a function to `db/store.js` and call it from the route.
- Error responses are JSON shaped `{ error: "<message>" }` with the right status code (400 for bad input, 404 for not found). Return early on errors.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`. Don't add Jest/Mocha, and don't start a real server in tests.
- Name test files `tests/<resource>.test.js` so `node --test` picks them up.
- Don't add new dependencies without asking.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly, which is how tests import it.
- `routes/` holds one file per resource, each exporting an `express.Router()`. A new resource means a new file here plus one `app.use(...)` line in `server.js`.
- `db/store.js` is an in-memory store that stands in for a database. Data resets on restart, and state is shared across tests in the same file.
- Config comes from environment variables (`PORT`). See `.env.example`. Never read or print `.env`.
