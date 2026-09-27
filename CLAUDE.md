# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (course starter): lists/creates users in-memory and exposes a health check.

## Commands

```
npm install                       # install dependencies
npm run dev                       # start API with auto-reload (http://localhost:3000)
npm test                          # run all tests (Node's built-in test runner)
node --test tests/users.test.js   # run a single test file
npm run lint                      # run ESLint
```

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js`; routes never touch the in-memory arrays directly.
- Route handlers return errors as `{ error: "message" }` with the matching HTTP status (400 for bad input, 404 for missing records) rather than throwing.

## Architecture

- `server.js` builds the Express app and mounts routes, but only calls `app.listen` when run directly (`require.main === module`) — this lets tests `require("../server")` and exercise the app via `supertest` without opening a real port.
- `db/store.js` is a non-persistent in-memory store that resets on every restart; there is no real database yet.
- Tests (`tests/`) use Node's built-in `node:test` + `supertest`, importing the exported `app` rather than starting a server.
