# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express API (starter project for a Claude Code course) with an in-memory data store, one resource route, and a health check.

## Audience

The developer working in this repo is an experienced (20+ year) software engineer who is simply unfamiliar with JavaScript/Node.js/Express specifically. Explain stack-specific idioms and quirks (npm/ecosystem tooling, Express/Node conventions, things like `require.main === module`) when relevant, but don't explain general programming concepts or walk through code line by line.

## Commands

- `npm run dev` — start the API with auto-reload (`node --watch server.js`) on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the project

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR against Node 22.

## Architecture

- `server.js` — entry point; wires up route modules and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and hit the app with supertest without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`, mounted in `server.js` under its path prefix (e.g. `/users`).
- `db/store.js` — the only data access layer; an in-memory array with `getAllUsers`/`getUserById`/`createUser`. Data resets on every server restart. Routes call into this rather than touching the array directly.
- `.env.example` — documents expected env vars (currently just `PORT`); real values go in a git-ignored `.env`.

## Conventions

- Routes validate input and return JSON error bodies directly (`{ error: "..." }`) with the appropriate status code (400/404) rather than throwing or using error-handling middleware.
- New resources should follow the existing pattern: a router file in `routes/`, data access added to `db/store.js` (or a new store module), mounted in `server.js`.
