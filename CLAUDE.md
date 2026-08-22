# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express REST API (`users` and `health` endpoints) backed by an in-memory store. It exists as the practice codebase for the Claude Code course: the graded deliverables are `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md` — **not** changes to the app code. Don't refactor the API unless asked.

## Commands

```
npm install
npm run dev                        # node --watch server.js, serves http://localhost:3000
npm test                           # node --test — discovers tests/*.test.js
npm test -- tests/users.test.js    # single file
node --test --test-name-pattern "returns ok"   # single test by name
npm run lint                       # eslint .
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs `npm install && npm run lint && npm test` on Node 22. There is no build step and no test watcher.

## Architecture

- [server.js](server.js) is the entry point *and* the exported app. It mounts each router under its path and only calls `app.listen()` when `require.main === module`, so tests `require("../server")` and drive it through supertest without binding a port. Preserve that guard.
- [routes/](routes/) holds one `express.Router()` per resource, one file per resource. A new resource means a new file in `routes/` plus one `app.use()` line in `server.js`.
- [db/store.js](db/store.js) is the only data access layer. Routes call `store.*` and never touch the `users` array directly — swapping the in-memory store for a real database should require no route changes. State resets on every restart, so tests must not assume a specific user count (the existing ones assert `length >= 1`).

## Conventions

- CommonJS throughout: `require` / `module.exports`, not ESM `import` / `export`. `sourceType` is `"script"` in [.eslintrc.json](.eslintrc.json), so ESM syntax fails lint.
- Export a named object (`module.exports = { getAllUsers, ... }`) rather than a default value — routers are the one exception, since `express.Router()` instances are exported bare.
- camelCase for variables and functions; double-quoted strings and semicolons, matching the existing files.
- Route handlers validate input first and `return res.status(4xx).json({ error: "..." })` on failure — error responses always use an `error` key.
- Each route gets a one-line comment above it in the form `// GET /users/:id — what it does`.
- Config comes from `process.env` with an inline fallback (`process.env.PORT || 3000`). Document any new variable in [.env.example](.env.example); never read or write the real `.env`.

## Note on the parent-directory CLAUDE.md

`../CLAUDE.md` describes a different project ("Bluebird", `hello.py`, `src/features`, named-exports-only). It is loaded alongside this file but does not apply here; this file's conventions win for anything under this repo.
