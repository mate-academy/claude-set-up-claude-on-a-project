# CLAUDE.md

## Project

A starter Express API (`claude-course-starter`) with an in-memory data store, used as the base project for the Claude Code course. This project will help the the training participants to work with Calude Code effectively.

## Commands

```
npm install      # install dependencies
npm run dev       # start the API with auto-restart on file changes (http://localhost:3000)
npm start         # start the API without watch mode
npm test          # run all tests (Node's built-in test runner)
npm run lint      # run ESLint
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` is the entry point: it builds the Express `app`, mounts routers, and only calls `app.listen()` when run directly (`require.main === module`) — this lets `tests/` import `app` via `require("../server")` and drive it with `supertest` without opening a real port.
- One route file per resource under `routes/` (e.g. `users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- Data access goes through `db/store.js`, a tiny in-memory store (not a real database — resets on every restart). Routes call its exported functions (`getAllUsers`, `getUserById`, `createUser`) rather than touching data directly.
- Config: `.env` (git-ignored) holds real values; `.env.example` is the template.

## Conventions

- ESLint config (`.eslintrc.json`) extends `eslint:recommended` with one override: unused-var warnings are suppressed for `req`, `res`, `next`, and `_`-prefixed args — standard for unused Express handler params.
- Tests use Node's built-in `node:test` + `assert`, not a third-party test framework.
