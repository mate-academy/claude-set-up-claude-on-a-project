# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start server with hot-reload (port 3000)
npm start         # Start server without hot-reload
npm test          # Run all tests (Node built-in test runner)
npm run lint      # Run ESLint

node --test tests/users.test.js   # Run a single test file
```

## Architecture

This is a small Express REST API with an in-memory data store. No database — data resets on restart.

**Entry point:** `server.js` — creates the Express app, mounts routes, and starts listening. Exports `app` so test files can import it without binding a port.

**Routes:** `routes/users.js` handles `/users` CRUD; `routes/health.js` handles `GET /health`. One file per resource.

**Data layer:** `db/store.js` — a plain JS in-memory array with three exported functions (`getAllUsers`, `getUserById`, `createUser`). Pre-seeded with two users. All route handlers call these functions directly — there is no ORM or service layer.

**Tests:** `tests/users.test.js` uses Node's built-in `node:test` module with `supertest` for HTTP assertions.

## Conventions

- ESLint config (`.eslintrc.json`) extends `eslint:recommended` with ES2022 and Node environment. Unused parameters named `_`, `req`, `res`, or `next` are exempt from the unused-vars rule.
- Copy `.env.example` to `.env` for local config (`.env` is git-ignored). The only variable is `PORT`.
- CI runs lint then test on every push and PR (`.github/workflows/ci.yml`, Node 22).
