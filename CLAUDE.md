# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Express API (in-memory data, no database) used as the starter project for the Claude Code course. This is the course project itself — do not change the app code (`server.js`, `routes/`, `db/store.js`) unless explicitly asked; the task is to configure Claude Code (`CLAUDE.md`, `.claude/settings.json`) around it.

## Commands

- `npm run dev` — start the API on `http://localhost:3000` (auto-restarts via `node --watch`)
- `npm test` — run the test suite (`node:test` + `supertest`)
- `npm run lint` — run ESLint (`eslint:recommended`)

To run a single test file: `node --test tests/users.test.js`.

## Conventions

- CommonJS throughout (`require`/`module.exports`), not ESM — matches `package.json` (`"type"` unset) and `.eslintrc.json` (`sourceType: "script"`).
- Unused-var lint rule ignores `_`, `req`, `res`, `next` (see `.eslintrc.json`) — don't rename otherwise-unused Express handler params to satisfy lint.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape only — never put actual values in `.env.example`.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` from `server.js` without opening a real port.
- One router per resource under `routes/` (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- All data access goes through `db/store.js`, a tiny in-memory store (data resets on restart) — routes never touch the `users` array directly.

## Other Rules

- Never grant permission to delete files.
