# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A starter Express REST API used as the working codebase for the Claude Code course. It exposes `/users` (list, get by id, create) and `/health`, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with file watching (`node --watch`)
- `npm start` — start the API without watching
- `npm test` — run the full test suite (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="returns 404"` — run tests matching a name
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then test on every push and PR

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import`. ESLint is configured for `sourceType: "script"`.
- Use the Node built-in test runner with `node:test` and `node:assert` plus `supertest`. Do not add Jest, Mocha, or other test frameworks.
- Route handlers must not touch data structures directly — all reads and writes go through `db/store.js`.
- One route file per resource in `routes/`, each exporting an `express.Router()`; mount it in `server.js`.
- Keep dependencies minimal: `express` is the only runtime dependency. Prefer the standard library over adding packages.

## Architecture

- `server.js` — entry point. Builds the `app`, registers `express.json()`, mounts each router under its path prefix. It only calls `app.listen()` when run directly (`require.main === module`) so tests can `require("../server")` and get the `app` without binding a port.
- `routes/` — one router module per resource. Handlers validate input, call `db/store.js`, and set status codes (400 for missing fields, 404 for unknown id, 201 on create).
- `db/store.js` — the only data layer. Holds an in-memory `users` array and a `nextId` counter; exports `getAllUsers`, `getUserById`, `createUser`. State resets on every restart and is shared across requests, which is why tests should not assume a clean store.
- Config comes from environment variables (`PORT`); real secrets belong in a git-ignored `.env` copied from `.env.example`.
