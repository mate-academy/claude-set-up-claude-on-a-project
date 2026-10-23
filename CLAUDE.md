# CLAUDE.md

Starter Express API (users + health endpoints, in-memory data) used as a practice project for the Claude Code course.

## Commands

- `npm run dev` — start API on http://localhost:3000 with `node --watch` (`PORT` env overrides)
- `npm test` — run all tests with the built-in `node --test` runner
- `node --test tests/users.test.js` — run a single test file; add `--test-name-pattern="<name>"` for one test


## Conventions

- Use CommonJS (require/module.exports), not ES modules
- Tests use `node:test` + `node:assert` with `supertest`, not Jest/Mocha.
- Unused handler params must be named `_`, `req`, `res`, or `next` to avoid lint warnings.
- "Respond with res.status(N).json({ error: "message" }), not raw text"

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`), and exports `app`. It only calls `listen` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/` — one file per resource, each exporting an `express.Router`. New resources get a new file mounted in `server.js`.
- `db/store.js` — in-memory data store (data resets on restart). Routes access data only through its functions, never by touching the arrays directly. Swapping in a real DB means replacing this module.
- `.env` is git-ignored; copy `.env.example` for local config.

