# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter project). CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on Node 22 for every push and PR.

## Commands

```
npm install
npm run dev              # starts the API on http://localhost:3000, restarts on file changes (node --watch)
npm test                 # runs all tests (node --test)
node --test tests/users.test.js   # run a single test file
npm run lint              # eslint .
```

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts one router per resource, and only calls `app.listen` when run directly (`require.main === module`). This lets `tests/*.test.js` `require("../server")` and drive it with `supertest` against an unbound app instance, with no real port opened.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. New resources should follow this same pattern rather than adding routes directly in `server.js`.
- `db/store.js` — in-memory data access layer used by routes instead of talking to arrays/objects directly. Data does not persist across restarts; there is no real database in this starter.
- `.env` (git-ignored) / `.env.example` — config values (e.g. `PORT`). No secrets are currently used by the starter app.
