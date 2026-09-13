# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A small Express REST API used as a practice codebase for a Claude Code course. The app exposes `/users` and `/health` endpoints backed by an in-memory store (no real database).

## Commands

```bash
npm install        # install dependencies (required before first run)
npm run dev        # start API with auto-reload on http://localhost:3000
npm test           # run all tests (uses Node's built-in test runner)
npm run lint       # check code style with ESLint
```

To run a single test file:
```bash
node --test tests/users.test.js
```

## Architecture

- **`server.js`** — entry point; mounts route files and exports `app` without starting the server, so tests can import it cleanly.
- **`routes/`** — one file per resource (`users.js`, `health.js`). Each file creates an Express router and exports it.
- **`db/store.js`** — the only data layer. All routes go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data is in-memory and resets on restart.
- **`tests/`** — integration tests using `supertest` against the exported `app`. Uses Node's built-in `node:test` and `node:assert` — no Jest or Mocha.

## Conventions

- Add new resources as a new file in `routes/`, mounted in `server.js` — do not add routes directly to `server.js`.
- All data access goes through `db/store.js` — routes never touch the `users` array directly.
- Environment config comes from `.env` (copy `.env.example`); never hardcode values like `PORT`.
