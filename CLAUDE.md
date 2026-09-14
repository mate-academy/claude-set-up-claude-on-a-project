# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter for the Claude Code course). Data is in-memory and resets on every restart — there is no real database.

## Commands

```
npm install
npm run dev              # starts the API on http://localhost:3000, restarts on file changes
npm test                 # runs all tests (node:test + supertest)
node --test tests/users.test.js   # run a single test file
npm run lint              # eslint .
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push/PR.

## Architecture

- `server.js` — creates the Express app, mounts routers, and starts listening. It only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive the app with supertest without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — the only place that touches data. Routes call into it (`getAllUsers`, `getUserById`, `createUser`) rather than manipulating the in-memory array directly.
- `tests/` — integration-style tests that hit the Express app through supertest rather than unit-testing modules in isolation.

## Notes for this repo

- This is a course exercise: the task is to configure Claude Code (`CLAUDE.md`, `.claude/settings.json`) around this app, not to change the app code itself.
