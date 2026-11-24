# CLAUDE.md

A small Express API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev`: start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404"`: run tests whose names match a pattern
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR. Both must pass.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`) and exports `app`. It calls `listen()` only when run directly (`require.main === module`), so tests can import `app` without opening a port.
- `routes/`: one file per resource. Each exports an `express.Router()`, and a new resource needs its own file plus an `app.use(...)` line in `server.js`.
- `db/store.js`: the only data layer, an in-memory array with module-level state. Routes call store functions and never touch the data directly.
- `tests/`: `node:test` + `node:assert` + `supertest`, run against the exported `app`. The store is shared module state, so data created in one test is visible to later tests in the same file.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Use `node:test` and `node:assert` for tests, not Jest or Mocha.
- Return errors as JSON `{ error: "<message>" }` with the matching status (400 for validation, 404 for not found), and return 201 on create.
- Parse route params explicitly (for example `Number(req.params.id)`) before passing them to the store, which compares ids with `===`.
- Read config from `process.env` directly; don't add dotenv.