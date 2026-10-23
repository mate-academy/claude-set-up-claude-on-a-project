# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express 4 REST API (Node 22, CommonJS) that serves users from an in-memory store; it's the starter project for the Claude Code course.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint 8 with the legacy `.eslintrc.json` config

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on every push and PR, so both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes never touch the `users` array directly; read and write only through the functions exported by `db/store.js`, adding a new store function when needed.
- Route params arrive as strings; convert ids with `Number(req.params.id)` before looking them up, because store ids are numbers.
- Error responses are JSON `{ "error": "<message>" }` with the right status: `400` for invalid input, `404` for a missing record. Successful creates return `201` with the created object.
- Write tests with `node:test`, `node:assert` and `supertest` against the exported `app` (`require("../server")`). Don't start a real server in tests; keep the `require.main === module` guard in `server.js`.

## Architecture

- `server.js` — entry point: builds the Express app, adds `express.json()`, mounts each router under its path, and exports `app`. It only calls `listen()` when run directly.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. A new resource means a new file here plus one `app.use("/<resource>", ...)` line in `server.js`.
- `db/store.js` — the only data-access layer. Data is kept in memory and resets on every restart; tests share that state within one run, so don't assume a fixed number of users.
- Config comes from env vars (`PORT`, default 3000); `.env.example` lists them. Never read or print `.env`.
