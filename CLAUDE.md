# CLAUDE.md

A minimal Express API (in-memory data, no database) — starter project for the Claude Code course.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start on http://localhost:3000 with auto-reload
- `npm test` — run tests (`node:test` + Supertest)
- `npm run lint` — ESLint

## Architecture

`server.js` only calls `app.listen` when run directly (`require.main === module`), so tests `require("../server")` and drive it with Supertest without opening a real port.

All reads/writes to users go through `db/store.js` — never manipulate data directly in routes.

## Conventions

- Route handlers stay thin: validate input, call `db/store.js`, return JSON.
- New resources: add a store module under `db/`, a router under `routes/`, mount it in `server.js`.
