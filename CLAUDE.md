# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch`
- `npm test`: run all tests (`node --test`)
- `node --test --test-name-pattern="<name>" tests/users.test.js`: run a single test. Pass a file path, not a directory.
- `npm run lint`: ESLint. CI runs lint and then tests on Node 22, and both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES `import`, because ESLint is set to `sourceType: "script"`.
- Use the functions exported by `db/store.js` for data access, not the `users` array directly.
- Send errors as JSON `{ error: "<message>" }` with a 400 (invalid input) or 404 (not found), not plain text.

## Architecture

- `server.js` is the entry point. It mounts each router under its resource path and exports `app`. It only calls `listen()` when run directly, so tests import `app` without opening a port.
- `routes/` has one file per resource. A new resource gets a new file plus an `app.use(...)` line in `server.js`.
- `db/store.js` keeps data in memory. It resets on restart and is shared by every test in a run, so users created in one test are visible to later tests.
