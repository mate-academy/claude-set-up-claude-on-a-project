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

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`/`export` — `.eslintrc.json` sets `sourceType: "script"`.
- Access data only through `db/store.js`'s exported functions (`getAllUsers`, `getUserById`, `createUser`), not by reading or mutating the in-memory array directly.
- Test routes through the Express app with supertest (`require("../server")`), not by unit-testing route or store modules in isolation.

## Architecture

- `server.js` — creates the Express app, mounts routers, and starts listening. It only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive the app with supertest without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under `/users` and `/health`.
- `db/store.js` — the only place that touches data (see Conventions).
- `tests/` — integration-style tests that hit the Express app (see Conventions).

## Notes for this repo

- This is a course exercise: the task is to configure Claude Code (`CLAUDE.md`, `.claude/settings.json`) around this app, not to change the app code itself.
