# CLAUDE.md

Starter Express API used as a teaching project for the Claude Code course. It is a small in-memory REST API for `users`, plus a `health` endpoint.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- Double quotes and semicolons throughout (no Prettier/formatter configured — match existing style by hand).
- CommonJS modules (`require`/`module.exports`), not ESM `import`/`export`.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- Route handlers do request/response and validation only; data access goes through `db/store.js`, not inline arrays/logic in routes.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/users.test.js` `require("../server")` and drive it with `supertest` without opening a real port.
- `db/store.js` is a tiny in-memory data store (a plain array) standing in for a real database; state resets on every server restart.
- `.env.example` documents expected env vars (currently just `PORT`); real values go in a git-ignored `.env`.
