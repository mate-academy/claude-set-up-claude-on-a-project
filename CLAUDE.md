# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Description

Starter Express API used for the Claude Code course. Note: this is a practice
repo for setting up Claude Code itself — the task in this course unit is to
configure `CLAUDE.md` and permission rules, not to change the app code.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000 (auto-restarts on change)
npm test         # runs tests (node:test)
npm run lint     # eslint
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express `app` and only calls
  `app.listen` when run directly (`require.main === module`), so tests can
  `require("../server")` and drive it with supertest without opening a port.
- `routes/` — one file per resource (`users.js`, `health.js`), mounted in
  `server.js` (e.g. `app.use("/users", usersRoutes)`).
- `db/store.js` — in-memory data access layer; routes call this instead of
  holding data themselves. State resets on every server restart (no real DB).
- `tests/` — supertest-based route tests against the exported `app`.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- Use thin route handlers, not business logic in `routes/`: handlers only
  validate input and call `db/store.js`.
