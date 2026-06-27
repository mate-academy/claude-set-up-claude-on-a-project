# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (`claude-course-starter`) used as the practice project for the Claude Code course. The app code is intentionally stable — most course work is about configuring Claude, not changing the API.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-reloads on file changes)
- `npm test` — run the test suite via Node's built-in test runner (`node --test`)
- `npm run lint` — run ESLint over the repo
- Run a single test: `node --test tests/users.test.js`

There is no build step; the app runs directly with Node (requires Node 22, per CI).

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`). It exports `app` so tests can use it via `supertest` without opening a port. Keep this guard intact.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. Add a new resource as its own router file and mount it in `server.js`.
- `db/store.js` — the only data-access layer: a tiny in-memory store (resets on restart). Routes must go through `store`'s functions (`getAllUsers`, `getUserById`, `createUser`) rather than touching the `users` array directly.

Data flow: request → router in `routes/` → `db/store.js` → JSON response. There is no service layer; routes hold the request/response handling and validation.

## Conventions

- CommonJS modules only (`require` / `module.exports`), not ES `import`. ESLint is configured for `sourceType: "script"`.
- Use double quotes and semicolons, matching existing files.
- Validate required fields in the route and return the established error shapes: `400` `{ error: "..." }` for bad input, `404` `{ error: "User not found" }` when a record is missing.
- Tests use `node:test` + `node:assert` + `supertest`, importing `app` from `server.js`. Follow this pattern for new tests; do not pull in another test framework.
- `req`/`res`/`next` and `_`-prefixed args are exempt from `no-unused-vars` — keep that naming for unused Express params.

