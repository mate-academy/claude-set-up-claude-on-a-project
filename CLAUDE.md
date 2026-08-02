# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`claude-course-starter` is a small Express API (users + health endpoints) backed by an in-memory store.

## Commands

```
npm run dev    # start the API with --watch (auto-restart), http://localhost:3000
npm test       # run all tests (Node's built-in test runner)
npm run lint   # eslint .
```

Run a single test file with `node --test tests/users.test.js`. CI runs `lint` and `test` on every
push/PR — keep both green before pushing.

## Conventions

- Route handlers validate input and return the status code (400/404) directly; there's no shared
  error-handling middleware, so follow the existing inline-check pattern in `routes/users.js`.
- Double-quoted strings, semicolons, CommonJS (`require`/`module.exports`) — not ESM.

## Architecture

- `server.js` only calls `app.listen` when run directly (`require.main === module`), so
  `tests/*.test.js` can `require("../server")` and drive it with `supertest` without opening a port.
- One router per resource in `routes/`, mounted in `server.js`. Routes call into `db/store.js` for
  data rather than touching storage directly.
- `db/store.js` is a plain in-memory array — no persistence, state resets on every restart.
