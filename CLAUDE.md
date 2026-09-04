# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small JSON API (users + health) used as the working codebase.

## Commands

```bash
npm install
npm run dev                          # node --watch server.js on http://localhost:3000
npm test                             # node --test (Node's built-in runner)
npm test -- tests/users.test.js      # run a single test file
npm run lint                         # eslint .
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` — entry point. Builds the app, mounts `express.json()` and one router per URL prefix. It only calls `app.listen()` when run directly (`require.main === module`) and exports `app`, so tests can drive it via supertest without binding a port. Adding a resource means adding a `routes/` file and mounting it here.
- `routes/` — one file per resource, each exporting an `express.Router()`. Routers own HTTP concerns only: parse/validate input, pick a status code, shape the JSON response.
- `db/store.js` — the only data access layer. An in-memory array with a hand-incremented `nextId`; state resets on every restart, so tests must not assume a fixed row count or that a created user persists across runs.

## Conventions

- CommonJS only: `require` / `module.exports`, never `import` / `export`. `package.json` has no `"type": "module"` and `.eslintrc.json` sets `sourceType: "script"`.
- Always use named exports, never default exports. Every module assigns an object of named bindings — `module.exports = { router }`, `module.exports = { app }`, `module.exports = { getAllUsers, getUserById, createUser }` — never `module.exports = router`. Import with destructuring: `const { router } = require("./routes/users");`.
- Double-quoted strings, semicolons, 2-space indent — match the existing files.
- Routes never touch the `users` array directly. Add a function to `db/store.js` and call it through the `store` module, so swapping in a real database stays a one-file change.
- Validate required fields in the route before calling the store (see `routes/users.js`), and coerce `req.params.id` with `Number()` since store lookups compare with `===`.
