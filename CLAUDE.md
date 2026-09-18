# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. The app code itself is a fixed teaching fixture — course tasks are about configuring Claude Code (CLAUDE.md, permissions) on top of this repo, not changing the API.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (`node --test`, using `supertest` against the exported `app`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint .`)

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts route modules, and only calls `app.listen` when run directly (`require.main === module`). This lets `tests/*.test.js` `require("../server")` and hit routes with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — the only data access layer; an in-memory array with no persistence (resets on restart). All route handlers go through this module rather than touching state directly.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with appropriate status codes (400, 404) rather than throwing.
- Data access is centralized in `db/store.js`; don't add ad-hoc state elsewhere.
- Work in small increments: one change, then one test, then validation, before moving to the next change.
- Before making a change, briefly explain what you propose and wait for approval.
- Make changes directly in the project files rather than asking the user to edit them manually.
- After each change, run the relevant test or check and show the result.
- Preserve existing behavior unless the user explicitly asks for a change.
