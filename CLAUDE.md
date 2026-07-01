# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API for user management, used as a learning project for Claude Code setup.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start API on http://localhost:3000 with file-watching
npm test           # run all tests (Node built-in test runner + supertest)
npm run lint       # check code style with ESLint
```

CI runs `npm run lint` then `npm test` on every push and PR (Node 22).

## Architecture

`server.js` is the entry point — it wires up Express, mounts route files, and conditionally starts the server only when run directly (so tests can import `app` without opening a port).

Route files live in `routes/`, one file per resource (`users.js`, `health.js`). Each exports an Express Router. All data access goes through `db/store.js`, which is an in-memory store (no persistence — resets on restart).

## Conventions

- Use `require`/`module.exports` (CommonJS). This project uses `"sourceType": "script"` in ESLint — no ES module syntax.
- Route handlers read from and write to `db/store.js` only; they never touch state directly.
- Tests use Node's built-in `node:test` + `node:assert` with `supertest`. Import `app` from `../server` — not a running server.
- Environment config goes in `.env` (git-ignored). `.env.example` documents the available keys.
