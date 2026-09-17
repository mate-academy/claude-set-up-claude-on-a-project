# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for a Claude Code course — a small `/users` and `/health` REST API backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run tests (`node --test`, using `node:test` + `supertest`)
- `npm run lint` — run ESLint

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; builds the Express app and mounts routers. Exports `app` without calling `.listen()` when required (not run directly), so tests can import it without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — in-memory data access layer; all reads/writes to user data go through here, not directly in routes. Data resets on restart.
- `tests/` — integration tests hit the Express app directly via `supertest`, no running server needed.
- The Express app is course material — don't change it unless asked.


## Conventions

- Route handlers validate input and return JSON errors (`{ error: "..." }`) with appropriate status codes (400, 404) rather than throwing.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape only — never commit real values.
- Use CommonJS (`require` / `module.exports`), not ESM — ESLint sets `sourceType: "script"` and errors on `import`.
- Read and write data through `db/store.js`, never by touching the `users` array from a route.
- Return errors as `res.status(code).json({ error: "message" })`, not a bare string or a custom envelope.
- Put the URL prefix in `server.js` (`app.use("/users", …)`), not in the router — paths inside `routes/users.js` are `/` and `/:id`.
