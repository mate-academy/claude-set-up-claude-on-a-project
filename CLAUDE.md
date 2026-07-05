# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server with hot-reload (http://localhost:3000)
npm test        # Run tests via Node's built-in test runner + supertest
npm run lint    # Check code style with ESLint
npm start       # Start production server
```

## Architecture

This is a small Express.js API (`claude-course-starter`) used as a learning project for Claude Code configuration.

**Entry point**: `server.js` — creates the Express app, mounts routes, and conditionally starts the HTTP server only when run directly (so tests can `require()` it without binding a port).

**Layers:**
- `routes/` — one file per resource (`users.js`, `health.js`), mounted at `/users` and `/health`
- `db/store.js` — in-memory data store that acts as the data layer; all route handlers go through its public API (`getAllUsers`, `getUserById`, `createUser`)

**Data**: In-memory only, resets on restart. Seed data is two users (Ada Lovelace, Alan Turing).

**Tests**: `tests/users.test.js` uses `supertest` directly against the app (no real server started). Node 22 built-in test runner.

## Conventions

- CommonJS (`require` / `module.exports`) throughout — no ES modules.
- HTTP semantics: `201` for POST success, `400` for validation failures, `404` for missing resources.
- ESLint config (`.eslintrc.json`): `eslint:recommended` + node/es2022. Unused vars allowed only when prefixed with `_` or named `req`/`res`/`next`.
- CI (`.github/workflows/ci.yml`) runs lint then tests on every push/PR against Node 22.
