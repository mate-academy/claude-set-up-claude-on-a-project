# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A tiny Express API (starter project for the Claude Code course) with an in-memory data store — no database, no persistence.

## Commands

```
npm install
npm run dev              # starts the API on http://localhost:3000, restarts on change (node --watch)
npm test                 # runs all tests (node:test)
node --test tests/users.test.js   # run a single test file
npm run lint              # eslint .
```

## Architecture

- `server.js` — creates the Express app, mounts routes, and exports `app`. It only calls `app.listen` when run directly (`require.main === module`), so tests can `require("../server")` and hit the app in-process via `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each a standalone `express.Router()` mounted in `server.js`.
- `db/store.js` — the only place that touches data. Routes call into it rather than manipulating the `users` array directly; state resets on every server restart.
- `tests/` — `node:test` + `assert` + `supertest`, one file per resource, following `routes/`.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ES modules — `.eslintrc.json` sets `sourceType: "script"`.
- Route handlers validate input and return JSON errors directly (e.g. `{ error: "..." }` with 400/404); there's no shared error-handling middleware.
