# CLAUDE.md

Starter Express API used for the Claude Code course projects.

## Commands

- `npm run dev` — start on :3000 with auto-reload; `npm start` for no watch
- `npm test` / `node --test tests/users.test.js` — run all or one test file
- `npm run lint`

## Architecture

- `server.js` — only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` without opening a real port.
- `routes/` — one file per resource, each an `express.Router()`.
- `db/store.js` — in-memory data layer; resets on every restart.
- `tests/` — `node:test` + `supertest` against the exported `app`.

## Conventions

- Routes access data only via `db/store.js` functions, never direct array manipulation.
- Route handlers return JSON error bodies (`{ error: "..." }`) with proper status codes instead of throwing.
