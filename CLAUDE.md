# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (starter project for the Claude Code course) with an in-memory data store.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm test` — run tests (`node --test`, using `node:test` + `supertest`); run a single file with `node --test tests/users.test.js`
- `npm run lint` — run ESLint (`eslint .`)

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, starts listening. Exports `app` (without calling `listen`) when required as a module, so tests can import it directly without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under a matching path prefix (e.g. `routes/users.js` → `/users`).
- `db/store.js` — in-memory data access layer; routes call into it rather than manipulating data directly. State resets on every server restart (no persistence).
- `tests/` — integration tests that hit the Express app via `supertest`, one file per resource.

## Conventions

- Data access goes through `db/store.js`, not inline in route handlers.
- `.env` holds real config/secrets and is git-ignored; `.env.example` documents the shape without real values.
