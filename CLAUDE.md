# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) backed by an in-memory store, used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000`. `PORT` is read from the shell environment; nothing loads `.env` automatically (no dotenv).
- `npm test` — run all tests with the built-in `node --test` runner.
- `node --test --test-name-pattern="health"` — run a single test by name.
- `npm run lint` — ESLint (`eslint:recommended`, v8 config in `.eslintrc.json`).
- Green means `npm run lint && npm test` both pass; CI runs exactly these on Node 22.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Routes access data only through the functions exported by `db/store.js`, never by holding or mutating the arrays directly. New data operations become new store functions.
- Error responses are JSON shaped `{ error: "<message>" }`: `400` for missing or invalid input, `404` for unknown ids.
- Convert route params with `Number(req.params.id)` before calling the store — it compares ids with `===`.
- Tests use `node:test`, `node:assert` and `supertest` against the exported `app` (`require("../server")`); never call `app.listen()` in tests.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which is what lets tests import it without opening a port.
- `routes/<resource>.js` holds one `express.Router` per resource; a new resource means a new file there plus an `app.use()` line in `server.js`.
- `db/store.js` is the single data layer: module-level state seeded with two users, reset on every restart. State is shared across all tests in the same file, so tests that create users change what later tests see.
