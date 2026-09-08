# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal REST API used as a real codebase to practice setting up Claude Code (`CLAUDE.md`, permissions), not a production app.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm test` — run the test suite (`node:test` + `supertest`)
- `npm test -- --test-name-pattern="GET /users"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`). Add a new resource by creating `routes/<resource>.js` and mounting it there.
- Routes never touch data directly — all reads/writes go through `db/store.js`. Add new data operations there, not inline in routes.
- `server.js` only starts listening when run directly (`require.main === module`), so tests import `app` without opening a real port — keep that guard when editing it.
