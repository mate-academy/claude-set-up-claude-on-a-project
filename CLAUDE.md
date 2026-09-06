# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. It exposes a `/users` and `/health` resource backed by an in-memory store, and exists as a small, real codebase to practice setting up Claude Code on (see README.md for the course task itself).

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the tests (`node --test`, uses `supertest` against the exported `app`)
- `npm run lint` — check code style (`eslint .`)

## Conventions

- Use one route file per resource in `routes/`, mounted in `server.js` (e.g. `app.use("/users", usersRoutes)`), not adding routes for a new resource to an existing file.
- Use `db/store.js` for all data access, not direct array manipulation in routes.
- Use the `require.main === module` guard in `server.js` so `app` is exported without calling `.listen()`, not starting the server as a side effect of requiring the file — this lets tests import `app` directly instead of hitting a running server.

## Architecture

- `server.js` — entry point; wires up JSON body parsing and mounts route modules.
- `routes/` — one Express router per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data store (resets on restart); the only place that touches the `users` array.
- `tests/` — `node:test` + `supertest` tests that import `app` from `server.js` directly.
