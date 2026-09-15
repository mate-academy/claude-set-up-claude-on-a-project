# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health) used as the practice codebase for the Claude Code course projects.

## Commands

```bash
npm run dev                                          # start with auto-reload on http://localhost:3000
npm test                                             # run all tests (node:test runner)
npm run lint                                         # eslint
node --test tests/users.test.js                      # run one test file
node --test --test-name-pattern="returns 404"        # run tests matching a name
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` builds the Express app, mounts `express.json()` and one router per resource, then **exports `app`** and only calls `app.listen()` when run directly (`require.main === module`). This split is what lets tests import the app without binding a port — keep it when editing.
- `routes/` — one file per resource, each exporting an `express.Router()`. Mount points live in `server.js`, so paths inside a router are relative (`router.get("/:id")` → `/users/:id`).
- `db/store.js` — an in-memory array behind `getAllUsers` / `getUserById` / `createUser`. It stands in for a real database and resets on restart. Routes must go through these functions; never read or mutate the `users` array directly, and add a new exported function rather than reaching into the module's state.

## Conventions

- **CommonJS, not ESM** — `require` / `module.exports`. ESLint is configured with `sourceType: "script"`, so `import`/`export` will fail lint.
- **Double-quoted strings**, matching every existing file.
- **Validate and return early in route handlers**: check input, then `return res.status(4xx).json({ error: "message" })` before the success path. Errors are always `{ error: string }`; 400 for missing/invalid input, 404 for a missing record.
- **Tests use `node:test` + `supertest` against the imported `app`** — `require("../server")`, never start a server or hardcode a port. New test files go in `tests/` as `*.test.js`.
- Config comes from `process.env` with a literal fallback (`process.env.PORT || 3000`). Document new variables in `.env.example`; real values live in the git-ignored `.env`.

## Scope

This repo exists so Claude Code can be *set up* on a real project — course work happens in `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md`. Don't change the app code under `server.js`, `routes/`, `db/`, or `tests/` unless asked to.
