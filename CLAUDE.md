# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This app itself is not meant to be changed — it exists as a real codebase to practice setting up `CLAUDE.md` and permission rules on.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart
- `npm test` — run all tests (`node:test` + `supertest`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts one router per resource, and only calls `app.listen` when run directly (`require.main === module`) — this lets tests `require("../server")` and hit the app in-process via `supertest` without opening a real port.
- `routes/` holds one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. New resources should follow this pattern rather than adding routes directly in `server.js`.
- `db/store.js` is the only data access layer — an in-memory array with no persistence (resets on restart). Routes call into it rather than touching data directly.
- `tests/` contains one test file per resource, testing through HTTP via `supertest` against the exported `app`, not by calling route handlers or the store directly.
