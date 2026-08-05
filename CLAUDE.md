# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal `/users` and `/health` REST API backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run tests (`node --test tests/users.test.js` for a single file)
- `npm run lint` — run ESLint

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- Each route file exports an `express.Router()`; mount it in `server.js` rather than adding routes directly to `app`.

## Architecture

- `server.js` only calls `app.listen` when run directly, so `tests/*.test.js` can `require("../server")` and hit routes via `supertest` without opening a real port.
- All data access goes through `db/store.js`, an in-memory store with no persistence — data resets on every restart.
