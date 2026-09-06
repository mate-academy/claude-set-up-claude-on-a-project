# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API with `users` and `health` resources, backed by an in-memory store.

## Commands

- `npm run dev` — run the API with auto-reload on http://localhost:3000
- `npm test` — run all tests; `node --test tests/users.test.js` for one file
- `npm run lint` — ESLint over the repo (CI runs lint then test; keep both green)

## Conventions

- Use CommonJS (`require` / `module.exports`), not `import` / `export` — ESLint is set to `sourceType: "script"`.
- Use double-quoted strings.
- Access data through `db/store.js` functions, not by importing or mutating its array directly.
- On bad input return `res.status(400).json({ error: "..." })`; for a missing record use `404`. See `routes/users.js`.
- Read config from `process.env` with a fallback; add new keys to `.env.example`.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts each router, and only calls `app.listen` when run directly; always exports `app` so tests use it without a port.
- `routes/` — one router file per resource (`users.js`, `health.js`). A new resource is a new file plus one `app.use()` line in `server.js`.
- `db/store.js` — the only data layer: an in-memory array with `getAllUsers` / `getUserById` / `createUser`. Resets on restart.
- `tests/` — `node:test` + `supertest` against the imported `app`; no running server.
