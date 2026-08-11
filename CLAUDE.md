# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This repo is used to practice setting up `CLAUDE.md` and permission rules — app code changes are generally out of scope unless explicitly requested.

## Commands

- Install: `npm install`
- Dev server (auto-restart, http://localhost:3000): `npm run dev`
- Run all tests: `npm test`
- Run one test file: `node --test tests/users.test.js`
- Lint: `npm run lint`

## Conventions

- `.env` holds real config/secrets and is git-ignored; `.env.example` documents the shape — never commit `.env`.
- `.claude/settings.local.json` is git-ignored (personal permission overrides); `.claude/settings.json` is committed and shared.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `listen()` when required as a module (guarded by `require.main === module`), so tests can import it directly via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under a path prefix (e.g. `/users`, `/health`).
- `db/store.js` — in-memory data access layer used by routes; data resets on every server restart (no real database).
- `tests/` — uses Node's built-in `node:test` + `assert`, with `supertest` for HTTP assertions against the exported `app`.
