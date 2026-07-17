# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for a Claude Code course project. The goal of this repo (at this stage) is not to change the app code, but to configure Claude Code itself — `CLAUDE.md` and `.claude/settings.json` — so it's useful on a real codebase.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `npm run lint` — run ESLint

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, starts listening. Exports `app` (without starting the server) when required by tests, so `npm test` never opens a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data store standing in for a real database. Data resets on every restart; not persisted.
- `tests/` — one test file per resource, using `supertest` against the exported `app`.

## Conventions

- Data access goes through `db/store.js`, not directly through the `users` array — keeps route handlers free of storage details.
- Config comes from environment variables (see `.env.example`), never hardcoded; real secrets live in a git-ignored `.env`.
