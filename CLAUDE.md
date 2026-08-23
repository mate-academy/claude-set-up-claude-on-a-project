# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal REST API used as a real codebase to practice setting up Claude Code, not for feature work.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner, via `node --test`)
- `npm run lint` — run ESLint over the project

To run a single test file: `node --test tests/users.test.js`

## Conventions

- Never commit changes yourself — leave all changed files uncommitted and unstaged for a human to review and commit.
- Run `npm run lint` on any file you change and fix reported issues before considering the change done, to keep formatting consistent with the project's ESLint conventions.

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and hit routes via `supertest` without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its path prefix (e.g. `/users`, `/health`).
- `db/store.js` — in-memory data access layer; all data reads/writes go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every server restart — there is no real database.
- Routes validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) directly; there is no separate validation or error-handling middleware layer.
