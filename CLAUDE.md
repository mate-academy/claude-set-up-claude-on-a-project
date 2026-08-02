# CLAUDE.md

Starter Express API used for the Claude Code course — a small REST API for practicing Claude Code setup, not a production app.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ESM import/export — see `.eslintrc.json` (`sourceType: "script"`).
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), mounted in `server.js`.
- Route handlers should not touch data directly — all data access goes through `db/store.js`.
- Each new route adding, or older one change should be represented in tests `/tests/*`.

## Architecture

- `server.js` is the entry point
- `db/store.js` is an in-memory data store standing in for a real database.