# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

A small Express REST API (starter project for a Claude Code course) exposing
`/health` and `/users` endpoints backed by an in-memory store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on [API](http://localhost:3000)
  (auto-restarts on change via `node --watch`)
- `npm test` — run the test suite (Node's built-in test runner + Supertest)
- `npm run lint` — check code style with ESLint

To run a single test file: `node --test tests/users.test.js`

## Conventions

- Use `require`/`module.exports` (CommonJS),
  not ESM import/export — `.eslintrc.json` sets `sourceType: "script"`.
- One route file per resource under `routes/`, mounted in `server.js`
  (e.g. `routes/users.js` → `/users`).
- Route handlers stay thin: validation and JSON responses in the route, data
  logic in `db/store.js`.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and
  only calls `app.listen` when run directly (`require.main === module`) so tests
  can import `app` without opening a real port.
- `db/store.js` is a tiny in-memory data helper — no real database. Data resets
  on every server restart.
- No `.env` is loaded at runtime; `.env.example` documents the shape config
  would take (currently just `PORT`).
