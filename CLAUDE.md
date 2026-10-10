# CLAUDE.md

Starter Express API (users and health endpoints, in-memory data) for the Claude Code course.

## Commands

- `npm run dev` — start the API with file watching on port 3000
- `npm test` — run all tests
- `node --test tests/users.test.js` — run one test file
- `npm run lint` — run ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Write tests with `node:test`, `node:assert` and `supertest`, not Jest.
- Read and write data only through `db/store.js` functions, not arrays inside route files.
- Return errors as JSON `{ error: "message" }` with the matching status code, not plain text.

## Architecture

- `server.js` builds and exports the app. It listens only when run directly, so tests import `app` instead of starting a server.
- `routes/` has one router file per resource, each mounted in `server.js`.
- `db/store.js` is the only data access: in-memory, reset on every restart.
