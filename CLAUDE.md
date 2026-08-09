# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A starter Express API (users + health endpoints) used as the base project for the Claude Code course; later course levels build on top of it.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on `http://localhost:3001`
- `npm test` — run all tests (`node --test`, via `node:test` + `supertest`)
- `npm test -- --test-name-pattern "<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint .`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Architecture

- `server.js` — entry point; creates the Express app, mounts routers, starts listening only when run directly (`require.main === module`), so `tests/` can import `app` without opening a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — in-memory data store standing in for a real database; state resets on every restart. All data access goes through this module rather than routes touching data directly.
- `tests/` — integration tests hit the Express `app` via `supertest`, not the store directly.

## Conventions

- Config comes from environment variables (see `.env.example`); real values go in a git-ignored `.env`.
- `.claude/settings.local.json` is git-ignored (personal, per-machine); `.claude/settings.json` is committed and shared.
