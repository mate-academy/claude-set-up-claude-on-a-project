# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Description

Starter Express API (users + health endpoints) backed by an in-memory store, used as the base project for the Claude Code course.

## Commands

```bash
npm run dev    # start the API with --watch on http://localhost:3000
npm test       # run tests (node:test + supertest) against the exported app
npm run lint   # eslint .
```

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES modules — `package.json` has no `"type": "module"` and `.eslintrc.json` sets `sourceType: "script"`.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`). Add new resources the same way rather than growing an existing route file.
- All data access goes through `db/store.js`; route handlers never touch the `users` array directly.
- `server.js` exports the `app` without calling `.listen()` when required (e.g. by tests) — guarded by `if (require.main === module)`. Don't remove that guard.

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, starts listening on `PORT` (default 3000).
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — tiny in-memory data helper (`getAllUsers`, `getUserById`, `createUser`); data resets on every restart, no real persistence.
- `tests/` — `node:test` files that import `app` from `server.js` and drive it with `supertest`.
