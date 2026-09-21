# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install
npm run dev      # node --watch server.js, http://localhost:3000 (PORT env overrides)
npm start        # node server.js
npm test         # node --test (Node's built-in runner, not Jest/Mocha)
npm run lint     # eslint . (eslint:recommended, CommonJS)
```

Run a single test file: `node --test tests/users.test.js`
Run a single test by name: `node --test --test-name-pattern="returns 404" tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22.

## Architecture

Small Express 4 API using CommonJS (`require`, not ESM).

- `server.js` builds the `app`, mounts `express.json()` and the routers (`/users`, `/health`), and exports `app`. It only calls `listen` when run directly (`require.main === module`), so tests import `app` and use `supertest` without opening a port. Preserve this when editing.
- `routes/` — one Express router per resource, mounted in `server.js`. New resources need a router file and a mount line there.
- `db/store.js` — in-memory data store standing in for a database. State is module-level and resets on restart. Routes call its functions rather than touching data directly. Shared across tests in the same process, so tests that create users affect later ones.
- `tests/` — `node:test` + `node:assert` + `supertest`.

Route conventions: IDs are parsed with `Number(req.params.id)`; errors return `{ error: "<message>" }` with 400/404 status.

## Setup notes

- Copy `.env.example` to `.env` for config; `.env` and `.claude/settings.local.json` are git-ignored.
- This repo is a Claude Code course project (see README.md). The README asks for `CLAUDE.md`, `.claude/settings.json` and `NOTES.md` without changing app code.

## Conventions

- add english comment before every function with short comment what it is doing
- every new enpoint should cover feature tests
- Files: `kebab-case.js` (components: `PascalCase.jsx`)
- Variables and functions: `camelCase`; classes: `PascalCase`
- Booleans start with `is`, `has`, `should`, or `can`
- Environment variables: `UPPER_SNAKE_CASE`, and every new one is added to `.env.example`
- Prefer `async`/`await` over `.then()` chains
- Business logic lives in `src/services/`, not in route handlers or components
- Shared helpers go in `src/utils/`; check there before writing a new one
- E2E with Playwright for critical flows (login, CRUD, permissions)
- Don't edit `node_modules/`, `dist/`, or `build/`
