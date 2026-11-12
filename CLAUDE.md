# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Small Express REST API (users + health check) backed by an in-memory store; the starter project for a Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on http://localhost:3000 (`PORT` env var overrides)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `npm run lint` — ESLint (`eslint:recommended`); CI runs lint then tests on Node 22, so both must pass

## Architecture

- `server.js` builds the Express app, mounts each router under its path (`/users`, `/health`), and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port — keep that guard.
- `routes/` has one file per resource, each exporting an `express.Router()`. A new resource means a new file in `routes/` plus an `app.use()` line in `server.js`.
- `db/store.js` is the only data layer: a module-level in-memory array with exported functions (`getAllUsers`, `getUserById`, `createUser`). Routes call the store, never hold data themselves. Data resets on restart and is shared across all tests in a process.

## Conventions

- CommonJS only (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Errors are returned as `res.status(<code>).json({ error: "<message>" })`; use 400 for missing/invalid input and 404 for unknown ids.
- Route `:id` params are strings — convert with `Number(req.params.id)` before looking up in the store.
- Tests use `node:test` + `node:assert` + `supertest` against the exported `app` (no Jest/Mocha); put them in `tests/*.test.js`.
- Never read or commit `.env`; config examples belong in `.env.example`.
