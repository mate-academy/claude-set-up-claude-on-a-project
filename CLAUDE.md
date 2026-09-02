# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A minimal Express API (in-memory data, no database) used as the starter project for the Claude Code course. The app code itself is not the point of this exercise — see README.md for the actual assignment (setting up `CLAUDE.md` and `.claude/settings.json`).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with file-watch reload on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in `node:test` runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint

## Architecture

- `server.js` — creates and configures the Express `app`, mounts route modules, and only calls `app.listen()` when run directly (`require.main === module`). This lets `tests/*.test.js` `require("../server")` and hit the app with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. Add new resources the same way and mount them in `server.js`.
- `db/store.js` — the only place data is read or written. It's an in-memory array standing in for a real database; state resets on every restart. Route handlers should never manipulate the `users` array directly — go through this module's exported functions.

## Conventions

- Double quotes and semicolons throughout; no existing Prettier config, so match surrounding style by hand.
- ESLint extends `eslint:recommended` with `no-unused-vars` as a warning (Express middleware params `req`/`res`/`next` are exempted).
