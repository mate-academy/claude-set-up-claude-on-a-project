# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API used for the Claude Code course. The point of this repo is to set up `CLAUDE.md` and permission rules — not to change the app code.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on change (node --watch)
npm test         # runs tests/*.test.js with node:test + supertest
npm run lint     # eslint .
```

There's no single-test flag configured; `npm test` runs everything under `tests/`.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM.
- Double quotes, semicolons — matches `.eslintrc.json` (`eslint:recommended`).
- Route handlers stay thin: validate input, call into `db/store.js`, respond. No business logic in `routes/`.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` (see `tests/users.test.js`), not a running server.

## Architecture

- `server.js` — Express app entry point. Mounts each route module under its path (`/users`, `/health`) and only calls `app.listen` when run directly, so tests can `require("../server")` without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data layer (no real DB); resets on every restart. All data access goes through its exported functions (`getAllUsers`, `getUserById`, `createUser`), never by reaching into the array directly.
