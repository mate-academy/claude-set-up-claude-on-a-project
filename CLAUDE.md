# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API (users + health endpoints) for the Claude Code course; plain JavaScript, no build step.

## Commands

- `npm run dev` — start on http://localhost:3000 with `node --watch`
- `npm test` — Node's built-in test runner (`node --test`), not Jest/Mocha
- `npm run lint` — ESLint; CI runs lint then tests on Node 22

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` and `supertest`, not Jest or Mocha.
- Routes read and write data through `db/store.js`, never by keeping their own state.
- Name unused Express handler params `_`, `req`, `res`, or `next` — the lint rule only exempts those names.
- Don't modify app code (`server.js`, `routes/`, `db/`) unless explicitly asked; this repo is a course exercise.

## Architecture

- `server.js` is the entry point: it wires up the routes and calls `app.listen` only when `require.main === module`, so tests can `require("../server")` without opening a port. Keep that guard.
- One route file per resource in `routes/` (`users.js`, `health.js`).
- `db/store.js` is an in-memory store — data resets on every restart; there is no real database.
- Config comes from env vars (`PORT`, default 3000); see `.env.example`. Never read `.env`.
