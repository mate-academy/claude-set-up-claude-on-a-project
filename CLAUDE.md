# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express REST API (starter project for the Claude Code course). It exposes `/health` and `/users` endpoints backed by an in-memory data store.

## Commands

```
npm install       # install dependencies
npm run dev        # start the API with auto-reload on http://localhost:3000
npm start           # start the API without auto-reload
npm test               # run all tests (Node's built-in test runner)
npm run lint            # run ESLint
```

Run a single test file directly, e.g.:
```
node --test tests/users.test.js
```

## Architecture

- `server.js` — app entry point; wires up middleware and mounts routers. Exports the `app` instance (without calling `.listen()`) when required as a module, so `tests/` can exercise it via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their resource path (e.g. `/users`).
- `db/store.js` — the only data access layer; an in-memory array standing in for a real database. Data does not persist across restarts. Route handlers call into this module rather than manipulating data directly.
- `tests/` — integration tests using Node's built-in `node:test` + `supertest` against the exported `app`.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with appropriate status codes (400, 404) rather than throwing.
- Data access always goes through `db/store.js`, never inline in route handlers.
