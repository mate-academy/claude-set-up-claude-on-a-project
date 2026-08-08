# CLAUDE.md

A minimal Express API starter project with `/health` and `/users` endpoints backed by an in-memory store.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter project for the Claude Code course). It exposes `/health` and `/users` endpoints backed by an in-memory store — there is no real database or persistence layer.

## Commands

```
npm install       # install dependencies
npm run dev        # start the API with auto-reload (node --watch) on http://localhost:3000
npm start          # start the API without auto-reload
npm test           # run all tests (Node's built-in test runner)
npm run lint        # run ESLint
```

Run a single test file directly, e.g. `node --test tests/users.test.js`.

## Architecture

- `server.js` — app entry point; mounts routers and starts the server. Exports the Express `app` (without calling `listen`) when required by tests, so tests can use `supertest` against it without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data access layer; all route handlers go through this rather than touching data directly. Data resets on every server restart.
- `tests/` — uses Node's built-in `node:test` + `node:assert` with `supertest` for HTTP assertions, not a separate test framework.

## Conventions

- Route handlers stay thin: validation and response shaping happen in the route file, data access happens only in `db/store.js`.
- New resources follow the existing pattern: add a router in `routes/`, mount it in `server.js`, back it with functions in `db/store.js`.
