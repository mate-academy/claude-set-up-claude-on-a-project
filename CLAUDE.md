# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API used for the Claude Code course. This is a course exercise repo — the primary deliverable is the Claude Code setup (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`), not changes to the app code. Do not modify the app code (`server.js`, `routes/`, `db/store.js`) unless explicitly asked.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch`) on `http://localhost:3000`
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the project

## Architecture

- `server.js` — entry point; builds the Express `app`, mounts routes, and only calls `app.listen` when run directly (`require.main === module`). This lets tests `require("../server")` and drive it with `supertest` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory data layer used by routes instead of talking to a real database. State resets on every restart; there is no persistence.
- `tests/` — integration-style tests that hit the Express `app` through `supertest`.

## Conventions

- Data access from routes goes through `db/store.js`, not inline arrays/logic in the route file.
- Route handlers validate input and return JSON errors (`{ error: "..." }`) with the appropriate status code (400 for bad input, 404 for missing resources) rather than throwing.
