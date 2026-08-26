# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter project): users resource backed by an in-memory store, plus a health check.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on file changes
npm start        # starts the API without watch mode
npm test         # runs all tests (node:test)
npm run lint     # eslint
```

Run a single test file:
```
node --test tests/users.test.js
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on push and PR.

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `listen()` when required as a module (guarded by `require.main === module`), so tests can import it and hit routes via supertest without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data access module; all reads/writes to user data go through its exported functions. Data resets on every server restart (no persistence).
- `tests/` — `node:test` + `supertest`, importing `app` directly rather than starting a server on a port.
