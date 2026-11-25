# CLAUDE.md

A small Express (Node.js) REST API that manages users (list, fetch by id, create)

## Set Up

- `npm install` — install dependencies


## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — for all tests
- `node --test --test-name-pattern="returns 404" tests/users.test.js` — run tests matching a name
- `npm run lint` — ESLint

## Architecture

- `server.js` builds the Express app, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and use `supertest` without opening a port. Keep that guard.
- `routes/`: handlers validate input and return JSON errors as `{ error: "..." }`.
- `db/store.js` is the only data layer. Routes must go through its functions (`getAllUsers`, `getUserById`, `createUser`) and never touch the array directly. Swapping it for a real database should only change this file.
- `tests/` uses `node:test`, `node:assert` and `supertest` against the exported app.

## Conventions

- do not use Jest or Mocha
- CommonJS only (`require` / `module.exports`). Do not use ESM `import`.
- Unused args named `_`, `req`, `res` or `next` are exempt from the lint warning. Other unused vars warn.
- Real config goes in `.env` (git-ignored; copy from `.env.example`). Never commit `.env` or `.claude/settings.local.json`.
