# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used for the Claude Code course — a minimal REST API with an in-memory data store.

## Commands

```
npm install
npm run dev                    # start the API on http://localhost:3000 (auto-restarts on change)
npm test                       # run all tests (Node's built-in test runner)
node --test tests/users.test.js  # run a single test file
npm run lint                   # ESLint check
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on Node 22 for every push and PR.

## Conventions

- CommonJS throughout (`require` / `module.exports`) — the package has no `"type": "module"`, so `import`/`export` syntax will not work.
- Route handlers never touch data directly; all reads/writes go through the functions exported by `db/store.js`.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts one router per resource, and exports `app` without calling `listen()` unless the file is run directly (`require.main === module`). This lets `tests/` import `app` and drive it with `supertest` without opening a real port.
- `routes/` — one file per resource (e.g. `users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js` under its resource path (`/users`, `/health`). Add a new resource by creating a router here and mounting it in `server.js`.
- `db/store.js` — a tiny in-memory data layer (plain functions over an in-memory array, no class/DB). Data resets on every restart; this stands in for a real database.
