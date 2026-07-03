# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm start` — start the API without auto-reload
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, then `npm test` on every push and PR.

## Architecture

- `server.js` — creates the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`. Exports the `app` instance without calling `.listen()` unless the file is run directly, so tests can import it and drive requests without opening a real port.
- `routes/` — one file per resource; each exports an `express.Router()`.
- `db/store.js` — in-memory data store standing in for a database. State resets on every restart and is not shared across processes.
- `tests/` — uses `node:test` + `node:assert` with `supertest` to make requests directly against the exported `app`.

## Conventions

- Config comes from `.env` (git-ignored); `.env.example` documents available variables. Currently only `PORT` is used.
- `.claude/settings.local.json` is git-ignored — personal permission overrides go there, shared rules go in `.claude/settings.json`.

