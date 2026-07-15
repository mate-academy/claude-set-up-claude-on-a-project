# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter project for the Claude Code course). Data is stored in memory only — nothing persists across restarts.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the project

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR with Node 22.

## Conventions

- Routes live one file per resource under `routes/` (e.g. `users.js`, `health.js`) and export an `express.Router()`; register new resources in `server.js` with `app.use("/<resource>", ...)`.
- Route handlers do not talk to data directly — they call functions exported from `db/store.js`. Add new data operations there rather than mutating state inline in a route.
- ESLint's `no-unused-vars` ignores `req`, `res`, `next`, and any `_`-prefixed identifier — unused Express middleware args don't need renaming.

## Architecture

- `server.js` is the entry point: it builds the Express app, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with supertest against an in-memory instance without opening a real port.
- `db/store.js` is a single in-memory module-level array acting as the whole "database" — no persistence, no real DB layer to configure.
- Real secrets/config would go in `.env` (git-ignored); `.env.example` documents the shape.
