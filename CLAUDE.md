# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the test suite (`node --test`)
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured for `sourceType: "script"`.
- Use double quotes and semicolons, matching the existing files.
- One route file per resource in `routes/`; register it in `server.js` with `app.use("/<resource>", ...)`.
- All data access goes through `db/store.js` — route handlers never touch the data array directly.
- Validate request input in the route and return JSON errors (`400` for bad input, `404` for missing records).
- Do not change app behaviour to make a test pass; fix the cause.

## Architecture

- `server.js` — entry point. Builds the Express app, mounts routes, and only calls `listen()` when run directly so tests can import `app` without opening a port.
- `routes/` — one Router per resource (`users.js`, `health.js`).
- `db/store.js` — a tiny in-memory data helper standing in for a database; it resets on every restart.
- `tests/users.test.js` — uses the built-in `node:test` runner with `supertest` against the imported `app`.
- Config comes from environment variables (e.g. `PORT`); copy `.env.example` to `.env` for local secrets (`.env` is git-ignored).
