# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course — a small REST API used as a real codebase to practice setting up Claude Code (`CLAUDE.md`, permissions) on. App code itself is not meant to change as part of that exercise.

## Commands

```
npm install
npm run dev      # start the API with --watch on http://localhost:3000
npm start        # start the API without watch mode
npm test         # run all tests (node:test)
npm run lint     # run ESLint
```

Run a single test file:
```
node --test tests/users.test.js
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on Node 22 for every push and PR.

## Architecture

- `server.js` — entry point. Builds the Express app, mounts one router per resource, and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and get the app without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. Route handlers do not touch data directly; they call into `db/store.js`.
- `db/store.js` — in-memory data layer standing in for a real database. State (`users`, `nextId`) is module-level and resets on restart; there is no persistence.
- `tests/` — uses Node's built-in `node:test` + `assert`, with `supertest` to exercise the Express app in-process (no server needs to be running).

## Conventions

- Routes validate required fields and respond with `400`/`404` + `{ error: "..." }` directly in the handler (see `routes/users.js`) — no separate validation/error-handling middleware layer.
- ESLint (`eslint:recommended`) ignores unused `req`, `res`, `next`, and `_`-prefixed args, since Express handlers often don't use all of them.
