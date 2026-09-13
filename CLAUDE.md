# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## claude-course-starter

A tiny Express API with an in-memory user store, used as the Claude Code course starter project.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the full test suite (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — the project has no `type: module`.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`). Add new resources the same way rather than growing `server.js`.
- All data access goes through `db/store.js`; route handlers never touch the `users` array directly.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routes, and starts listening only when run directly (so tests can `require` the app without opening a port).
- `routes/` holds one file per resource (`users.js`, `health.js`).
- `db/store.js` is an in-memory data store — no real database, data resets on restart.
