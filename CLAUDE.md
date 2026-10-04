# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API for managing users, backed by an in-memory store. It is the starter codebase for the Claude Code course — the app code is a stable backdrop, not the assignment.

## Commands

```bash
npm run dev      # start with auto-reload on http://localhost:3000
npm test         # run all tests (node:test)
npm run lint     # eslint
```

Run a single test file or a single test by name:

```bash
node --test tests/users.test.js
node --test --test-name-pattern="returns 404"
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR.

## Conventions

- **CommonJS, not ESM.** `require` / `module.exports` throughout; ESLint is configured with `sourceType: "script"` and `package.json` has no `"type": "module"`.
- **Node's built-in test runner, not Jest or Mocha.** Tests use `node:test` + `node:assert` with `supertest` for HTTP assertions.
- **Routes never touch data directly.** All reads and writes go through `db/store.js`; a route that manipulates the users array itself is a bug.
- **Keep `server.js` side-effect free on import.** It exports `app` and only calls `listen()` under `require.main === module`, which is what lets tests import it without binding a port.
- **Paths inside a route file are relative to its mount point.** `routes/users.js` defines `/` and `/:id`, not `/users` and `/users/:id`.

## Architecture

`server.js` is the entry point: it creates the app, installs `express.json()`, and mounts one router per resource (`/users`, `/health`).

`routes/` holds one file per resource, each exporting an `express.Router()`. Adding a resource means a new file there plus one `app.use()` line in `server.js`.

`db/store.js` is the only data layer — a module-level array plus an incrementing `nextId`, exposing `getAllUsers` / `getUserById` / `createUser`. It stands in for a real database, so swapping in persistence should mean changing this file alone. Two consequences worth knowing: state resets on every server restart, and it is shared across all tests in a process, so tests that create users are not isolated from each other.
