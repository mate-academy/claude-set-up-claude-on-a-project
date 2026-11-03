# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express (Node 22, CommonJS) REST API for users, backed by an in-memory store.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (port from `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js` — run one test file
- `node --test --test-name-pattern="404"` — run tests whose name matches a pattern
- `npm run lint` — ESLint (`eslint:recommended`, v8 `.eslintrc.json` config)

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test`; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` and `supertest` against the exported `app`; do not add Jest/Mocha or start a real server in tests.
- Route handlers read and write data only through `db/store.js` functions; never import or mutate the `users` array directly.
- Error responses are JSON `{ "error": "<message>" }` with the matching status (400 validation, 404 not found); successful creates return 201.
- Unused `req`, `res`, `next`, or `_` params are allowed by the lint config — keep handler signatures as `(req, res)`.

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import it without opening a port.
- `routes/` — one `express.Router()` file per resource; add a new resource as a new file and mount it in `server.js`.
- `db/store.js` — module-level in-memory data (seeded with two users) that resets on restart. State is shared across all tests in the same process, so tests must not assume a fresh store.

## Do not

- Do not read or commit `.env` (secrets live there; `.env.example` is the template).
- Do not commit `.claude/settings.local.json` — it is personal and git-ignored.
