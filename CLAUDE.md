# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. A minimal REST API with in-memory storage — used as a real codebase for practicing Claude Code setup, not a production app.

## Commands

```
npm install
npm run dev      # start the API with --watch on http://localhost:3000
npm start        # start the API without watch
npm test         # run all tests (node:test)
npm run lint     # eslint .
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express app entry point. Mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`. Exports `app` without calling `listen()` when required as a module (`require.main === module` guard), so tests can import it via `supertest` without opening a real port.
- `routes/` — one file per resource, each exporting an `express.Router()`.
- `db/store.js` — in-memory data layer (plain arrays/functions, no real database). Data resets on every server restart. All route handlers go through this module rather than touching data directly.
- `tests/` — `node:test` + `supertest`, importing `app` directly (no server needs to be running).

## Conventions

- New resources follow the existing pattern: a router file in `routes/`, mounted in `server.js`, backed by functions in `db/store.js`.
- ESLint config is `eslint:recommended` with `no-unused-vars` as a warning (Express middleware args `req`/`res`/`next` and `_`-prefixed args are exempt).
