# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API starter used for a Claude Code course exercise.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000`
- `npm test` — run tests (`node --test`, uses `supertest` against the exported `app`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on push/PR with Node 22.

## Architecture

- `server.js` — creates the Express app, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`); the app is exported unstarted so tests can import it and hit it via `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory data store standing in for a real database; state is module-level and resets on every server restart (no persistence).
- `tests/` — integration-style tests that import `server.js`'s exported `app` and issue real HTTP requests via `supertest`.

## Conventions

- ESLint's `no-unused-vars` ignores `req`, `res`, `next`, and `_`-prefixed args — Express handlers can leave unused params unnamed without lint errors.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape but is never used to configure the running app.
