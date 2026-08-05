# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This is a teaching repo: the app code itself is intentionally minimal and is not meant to be extended — the actual deliverable is a working `CLAUDE.md` and `.claude/settings.json` for it (see README.md).

## Commands

```
npm test                 # runs all tests (Node's built-in test runner)
npm run lint             # eslint over the whole project

```

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM — matches `"sourceType": "script"` in `.eslintrc.json`.
- Each route file exports an Express `Router` and is mounted in `server.js`; no route logic lives in `server.js` itself.
- Tests use Node's built-in `node:test` + `assert`, plus `supertest` for HTTP assertions — no other test framework.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape without real values.

## Architecture

- `server.js` — builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `.listen()` when run directly (so tests can `require("../server")` and hit the app in-process via supertest without opening a real port).
- `routes/` — one file per resource; handlers call into `db/store.js` for data rather than managing state themselves.
- `db/store.js` — an in-memory stand-in for a real database (a module-level array). Data resets on every server restart; there is no persistence layer.
