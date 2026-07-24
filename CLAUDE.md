# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (starter project for a Claude Code course). Do not change the app code unless explicitly asked — the primary deliverables in this repo are `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md`.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on change (node --watch)
npm test         # runs tests via node:test + supertest
npm run lint     # eslint
```

To run a single test file: `node --test tests/users.test.js`

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- One route file per resource under `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`, not directly against the in-memory arrays.
- `server.js` only calls `app.listen` when run directly (`require.main === module`), so tests can import `app` without opening a port.

## Architecture

- `server.js` — entry point; wires up middleware and mounts route modules.
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an `express.Router()`.
- `db/store.js` — in-memory data store standing in for a real database; resets on restart.
- `tests/` — `node:test` + `supertest`, importing `app` from `server.js` directly (no running server needed).
- `.env.example` — sample config; real values go in a git-ignored `.env` (not present in the repo).
