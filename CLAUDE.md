# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small in-memory Express API used as the starter project for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the test suite (Node's built-in test runner + supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — check code style with ESLint

## Architecture

- `server.js` — entry point; builds the Express `app` and mounts routers. Only calls `app.listen` when run directly (`require.main === module`), so tests can `require("../server")` and hit the app in-process via supertest without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under their resource path.
- `db/store.js` — in-memory data access layer; no real database. State resets on every restart.
- `tests/` — mirrors `routes/`, one test file per resource.

## Conventions

- Use the in-memory `db/store.js`, not a real database client — this starter has no persistence layer by design.
- Put secrets in `.env` (git-ignored), never hardcoded — see `.env.example` for the shape.
- Keep `npm run lint` and `npm test` passing; CI runs both on every push/PR.
