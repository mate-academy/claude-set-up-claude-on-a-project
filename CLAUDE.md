# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API used as the working project for the Claude Code course. It exposes `/users` and `/health` endpoints backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch`) on http://localhost:3000
- `npm test` — run the test suite (`node --test`, Node's built-in runner)
- `npm run lint` — check code style with ESLint
- `node --test tests/users.test.js` — run a single test file

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import` — `.eslintrc.json` sets `sourceType: "script"`.
- Add one route file per resource under `routes/` and mount it in `server.js`; don't add unrelated handlers to an existing route file.
- All data access goes through `db/store.js`. Routes must not hold their own state — add a helper to the store instead of reaching around it.
- Express param values are strings; convert ids with `Number()` before comparing (see `routes/users.js`).

## Architecture

`server.js` is the entry point: it creates the Express app, registers `express.json()`, mounts each router, and only calls `app.listen()` when run directly (`require.main === module`). This guard lets tests `require("../server")` and drive the app with `supertest` without opening a real port.

Request flow: `server.js` → a router in `routes/` → `db/store.js`. The store is an in-memory array that resets on every restart and stands in for a real database; `nextId` tracks the next user id.
