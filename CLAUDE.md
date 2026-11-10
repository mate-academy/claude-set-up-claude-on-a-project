# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (`claude-course-starter`) with an in-memory user store — used as a real codebase for the Claude Code course. App code is not meant to change as part of the course exercises; only `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md` are.

## Commands

```
npm install
npm run dev      # start the API with auto-restart on http://localhost:3000
npm test         # run tests (node:test + supertest)
npm run lint     # eslint check
```

Run a single test file: `node --test tests/users.test.js`

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- Routes are grouped by resource under `routes/`, mounted in `server.js` (e.g. `/users` → `routes/users.js`).
- All data access goes through `db/store.js`; routes never touch the in-memory `users` array directly.

## Architecture

- `server.js` — Express app entry point; wires middleware and mounts routers. Exports `app` without calling `listen()` when required (so tests can import it), only starts listening when run directly.
- `routes/` — one file per resource, each exporting an `express.Router()`.
- `db/store.js` — in-memory data store standing in for a real database; state resets on every restart.
- `tests/` — `node:test` + `supertest`, importing `app` directly (no server needs to be running).
