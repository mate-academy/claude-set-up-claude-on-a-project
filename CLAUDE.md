# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Minimal in-memory Express API (`/users`, `/health`) used as a practice codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on http://localhost:3000
- `npm test` — run the test suite (single file: `node --test tests/users.test.js`)
- `npm run lint` — run ESLint

## Conventions

- New resources get their own router file in `routes/`, mounted in `server.js` — never add inline route handlers directly to `server.js`.
- Routes read/write data through `db/store.js`'s exported functions, not by touching its arrays directly.
- Keep `server.js`'s `require.main === module` guard around `app.listen` — it's what lets tests import `app` without opening a real port.

## Architecture

`server.js` (entry point) → `routes/*.js` (one router per resource) → `db/store.js` (in-memory data, resets on restart). `tests/` exercises the exported `app` via `supertest`, no network calls involved.
