# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as the base project for a Claude Code course. It manages users via an in-memory store and serves as a learning scaffold — app code is intentionally simple.

## Commands

```bash
npm run dev   # start API with file-watching (http://localhost:3000)
npm test      # run all tests (Node built-in test runner)
npm run lint  # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routers and exports `app` without binding a port, so tests can import it cleanly.
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express router.
- `db/store.js` — all data access goes through this module. Currently in-memory (resets on restart); swap this file to add a real database without touching routes.
- `tests/` — uses Node's built-in `node:test` + `supertest`; imports `app` directly, no running server needed.

## Conventions

- All data reads and writes go through `db/store.js` — routes never manipulate data directly.
- Route files export a single Express `Router`, mounted in `server.js`.
- `name` and `email` are required fields for user creation; routes return `400` if either is missing.
- `.env` holds real secrets (git-ignored); `.env.example` documents the shape.
