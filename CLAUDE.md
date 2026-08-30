# CLAUDE.md

Small Express API used as a practice project for the Claude Code course. Work here is about configuring Claude Code, not changing the API.

## Commands

- `npm run dev` — start the API with auto-restart (http://localhost:3000)
- `npm test` — run all tests
- `npm run lint` — run ESLint

CI runs lint and tests on every push and PR. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM.
- Add one route file per resource in `routes/`, then mount it in `server.js`. Do not put handlers in `server.js`.
- Read and write data through the exported functions in `db/store.js`, not by touching arrays directly.

## Architecture

- `server.js` — builds the Express app, mounts routers, and calls `app.listen` only when run directly, so tests can import `app` without opening a port.
- `routes/` — one router per resource. Handlers validate input and set HTTP status codes.
- `db/store.js` — in-memory store standing in for a database. Data resets on restart.
- Config lives in `.env`, which is git-ignored. See `.env.example`.
