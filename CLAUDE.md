# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (`claude-course-starter`) with an in-memory data store. It's the starter project for a Claude Code course — the app itself is intentionally small and stable; course work is about setting up Claude Code (`CLAUDE.md`, permissions), not extending the API.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-restarts on change)
- `npm test` — run tests via `node --test` (built-in Node test runner, uses `supertest`)
- `npm run lint` — run ESLint
- Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `listen()` when required (not run directly), which is what lets `tests/` import it via `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each an `express.Router()` mounted in `server.js`.
- `db/store.js` — the only data access layer; an in-memory array, not a real database. Data resets on every server restart. Route handlers call into `store.js` rather than touching data directly.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access always goes through `db/store.js`; routes don't manipulate the in-memory arrays directly.
- Config comes from environment variables (see `.env.example`); real secrets go in a git-ignored `.env`, never committed.
