# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store.

## Commands

```bash
npm run dev                                    # start on http://localhost:3000, restarts on save
npm test                                       # all tests
node --test tests/users.test.js                # one file
node --test --test-name-pattern="returns 404"  # one test by name
npm run lint                                   # eslint
```

CI runs `npm run lint` then `npm test` on Node 22 for every push and PR, so both must pass before a PR is ready.

## Conventions

- CommonJS only — `require` / `module.exports`. ESLint is set to `sourceType: "script"` and `package.json` has no `"type": "module"`, so ESM `import` will fail.
- Double-quoted strings, 2-space indent, semicolons.
- Routes never touch the users array directly; all data access goes through `db/store.js`.
- Error responses are `{ error: "message" }` — 400 for missing required fields, 404 for a resource that doesn't exist.
- Only `server.js` calls `app.listen()`, and only inside its `require.main === module` guard. Tests import `app` and would hang on a real port otherwise.

## Architecture

`server.js` is the entry point: it creates the app, applies `express.json()`, mounts one router per resource, and exports `app` for tests.

Each file in `routes/` owns one resource, exports an `express.Router()`, and is mounted under its path prefix in `server.js`. Adding a resource means a new file there plus one `app.use()` line.

`db/store.js` stands in for a database — a module-level array plus a `nextId` counter, exposed as named functions. State resets on every restart, and tests share one process, so tests that create users must not assume a fixed count.

## Scope

This repo is a Claude Code course exercise. The Express app is a fixture to configure Claude *on* — the deliverables are `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md`. Don't change app code unless asked.
