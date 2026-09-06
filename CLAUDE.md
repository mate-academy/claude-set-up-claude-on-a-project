# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter for a Claude Code course project): a `/users` resource and a `/health` check, backed by an in-memory store.

## Commands

- `npm run dev` — start the server with auto-reload (`node --watch server.js`) on `http://localhost:3000`
- `npm test` — run the test suite (`node --test`, using `supertest` against the exported `app`)
- `npm run lint` — run ESLint

There is no single-test-file shortcut configured; `node --test tests/users.test.js` runs just that file.

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so tests can `require("./server")` and hit the app without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its path prefix.
- `db/store.js` — the only data access layer; an in-memory array with no persistence (resets on restart). Routes call into this rather than touching data directly.

## Conventions

- Data access always goes through `db/store.js` — routes never manipulate the in-memory array directly.
- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
