# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a learning project for Claude Code setup.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start API with live reload on http://localhost:3000
npm test             # run all tests (Node built-in test runner)
npm run lint         # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routes and exports `app` (does not call `listen` when imported, so tests work without opening a port)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data helper; all data access goes through its exported functions; data resets on restart

## Conventions

- Use CommonJS (`require`/`module.exports`), not ESM — the project uses `"sourceType": "script"` in ESLint
- All data reads and writes must go through `db/store.js`, not inline arrays
- Route files own HTTP logic only (status codes, request parsing, response shaping); business logic belongs in `db/store.js` or a dedicated module
- `name` and `email` are required on POST `/users`; return `400` with `{ error: "..." }` on missing fields

