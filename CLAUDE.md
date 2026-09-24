# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter Express API for the Claude Code course. A minimal REST API with an in-memory data store, used to practice setting up `CLAUDE.md` and permission rules — not for building out app features.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on change
npm start        # starts the API without watch mode
npm test         # runs tests (Node's built-in test runner)
npm run lint     # checks code style with ESLint
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express app, mounts routers, and starts listening. Exports `app` without starting the server when required (not run directly), which is what lets `tests/` import it via `supertest` without binding a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under a path prefix (e.g. `/users`).
- `db/store.js` — in-memory data access layer; all reads/writes to `users` go through its exported functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every restart — there is no real database.
- `tests/` — integration tests that hit the Express app directly via `supertest`, using Node's built-in `node:test` and `node:assert`.

## Conventions

- CommonJS modules (`require`/`module.exports`), not ESM.
- Route handlers stay thin: validation and response shaping in the router, data logic in `db/store.js`.
- Every new file must start with this header, with `<year>` replaced by the current year:
  ```
  -----------------------------------
  evtimokn <year>
  -----------------------------------
  ```
