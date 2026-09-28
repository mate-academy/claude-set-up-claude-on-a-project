# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project does

A minimal Express REST API with user and health endpoints. It uses an in-memory store (no real database) — data resets on every server restart.

## Commands

```bash
npm run dev      # start with auto-restart on file changes (port 3000)
npm test         # run all tests with Node's built-in test runner
npm run lint     # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — creates the Express app, mounts routes, exports `app` for tests; only opens a port when run directly (guards with `require.main === module`)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — the only place that reads or writes user data; all routes go through it

## Conventions

- CommonJS (`require`/`module.exports`), not ESM — `sourceType` is `"script"` in ESLint config
- Route files validate input and return error JSON before calling store functions
- Tests import `app` directly from `server.js` and use supertest; no mock of the store
