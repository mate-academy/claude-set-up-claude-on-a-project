# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (starter for the Claude Code course). It serves `/users` and `/health` from an in-memory data store — there is no real database or persistence layer.

## Commands

```
npm install
npm run dev      # start the API with auto-reload on http://localhost:3000
npm start        # start the API without auto-reload
npm test         # run all tests (Node's built-in test runner)
npm run lint     # check code style with ESLint
```

Run a single test file directly with `node --test tests/users.test.js`.

## Architecture

- `server.js` — creates and configures the Express `app`, mounts routers, and starts listening only when run directly (`require.main === module`). Tests import `app` from this file without opening a port.
- `routes/` — one router file per resource (e.g. `users.js`, `health.js`). Routes call into `db/store.js` for data; they don't manipulate data directly.
- `db/store.js` — in-memory data access module. All reads/writes to `users` go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every server restart.
- `tests/` — one test file per resource, using Node's built-in `test`/`assert` plus `supertest` for HTTP assertions against the exported `app`.

## Conventions

- Add new resources as a new file in `routes/`, mounted in `server.js`, following the existing `users.js`/`health.js` pattern.
- Keep data access inside `db/store.js`; route handlers should not hold or mutate state themselves.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape without real values.