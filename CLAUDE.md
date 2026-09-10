# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express REST API (`/users`, `/health`) used as the working codebase for the Claude Code course. The app is a fixture — course tasks are about configuring Claude, not changing app behavior.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-reload)
- `npm start` — start without watch
- `npm test` — run the suite with Node's built-in test runner (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint over the repo

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22. Node's test runner and `node --watch` require Node 18+ (use 22 to match CI).

## Conventions

- CommonJS only: `require` / `module.exports`. ESLint is configured with `sourceType: "script"`; do not introduce `import`/`export` or `"type": "module"`.
- Tests use `node:test` + `node:assert` + `supertest`. Do not add Jest, Mocha, or Chai.
- Match existing style: double quotes, 2-space indent, semicolons.
- All user data access goes through `db/store.js`. Never read or mutate its `users` array from a route.
- Add a new resource as `routes/<name>.js` exporting an `express.Router()`, then mount it in `server.js` with `app.use("/<name>", ...)`.
- Keep `db/store.js` in-memory. Persistence and a real database are deliberately out of scope; data resetting on restart is expected.
- Comment WHY, not WHAT (see the existing files for the intended level).

## Architecture

- `server.js` — entry point. Builds the Express app, registers `express.json()` and the route modules, and exports `app`. It only calls `app.listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each an isolated `express.Router()`. Routes handle HTTP concerns (status codes, validation, JSON shape) and delegate data work to the store.
- `db/store.js` — the only data layer: an in-memory array plus `getAllUsers` / `getUserById` / `createUser`, and the `nextId` counter for new records.
- `PORT` comes from `process.env.PORT`, default 3000. Real config lives in `.env` (git-ignored); `.env.example` documents the shape.
