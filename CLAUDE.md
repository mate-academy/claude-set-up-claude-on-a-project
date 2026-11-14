# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express 4 REST API (users + health check) backed by an in-memory store, used as the base project for the Claude Code course.

## Commands

```bash
npm install
npm run dev        # node --watch server.js, serves http://localhost:3000 (PORT overrides)
npm test           # node --test (built-in runner, no Jest/Mocha)
npm run lint       # eslint .
```

Run a single test file or a single test by name:

```bash
node --test tests/users.test.js
node --test --test-name-pattern="POST /users"
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22; both must pass.

## Architecture

- `server.js` builds the Express app, mounts each router under its path prefix, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import the app without opening a port.
- `routes/` holds one router file per resource (`users.js` → `/users`, `health.js` → `/health`). A new resource means a new file here plus an `app.use()` line in `server.js`.
- `db/store.js` is the only data layer: a module-level array exposed through named functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on restart, and state is shared across tests in a single run because the module is loaded once.
- `tests/` uses `node:test` + `node:assert` with `supertest` against the exported `app`.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Route handlers never touch data directly; add a function to `db/store.js` and call it from the route.
- Errors are returned as JSON `{ "error": "<message>" }` with the appropriate status (400 for validation, 404 for missing resources); successful creates return 201 with the created object.
- Write tests with `node:test` and `assert.strictEqual`, not Jest-style `expect`; test names follow `"<METHOD> <path> <expected behaviour>"`.
- Put a one-line `// METHOD /path — description` comment above each route handler.
- Do not add dependencies for things Node or Express already provide (test runner, file watching, JSON body parsing).

## Gotchas

- Secrets belong in `.env` (see `.env.example`), but the `.env` line in `.gitignore` is indented, so git does **not** actually ignore it. Never `git add .env` or use `git add -A`/`git add .` while a `.env` exists; stage files by name.
