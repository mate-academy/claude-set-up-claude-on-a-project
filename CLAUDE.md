#CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Express API with users and health endpoints, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run all tests; for one file use `node --test tests/users.test.js`
- `npm run lint` — ESLint; CI runs lint then tests, so both must pass

## Conventions

- Use CommonJS (`require` / `module.exports`), not `import`/`export`.
- Write tests with `node:test` + `supertest`, not Jest or Mocha.
- Return errors as `res.status(code).json({ error: "message" })`.

## Architecture

- `server.js` builds the Express app, mounts the routers, and exports `app`. It calls `listen` only when run directly, so tests can import `app` without opening a port. Keep that guard.
- One router file per resource in `routes/`, mounted in `server.js`.
- Routes access data only through `db/store.js` (in-memory, resets on restart), never directly.
