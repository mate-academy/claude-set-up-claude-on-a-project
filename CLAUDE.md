# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (users + health endpoints) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run tests (`node --test`, via Supertest against the exported Express `app`)
- `npm run lint` — run ESLint (`eslint:recommended`)

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express entry point; mounts routers and exports `app` without calling `listen()` when required as a module (so tests can import it directly)
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`
- `db/store.js` — in-memory data access layer; all reads/writes to `users` go through this module, not the routes directly. Data resets on every server restart.

## Conventions

- Data access goes through `db/store.js`; routes never touch the `users` array directly.
- Unused function arguments named `req`, `res`, `next`, or prefixed with `_` are exempt from `no-unused-vars`.
