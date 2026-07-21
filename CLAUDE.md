# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (starter project for the Claude Code course) exposing `/users` and `/health` endpoints backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner + supertest)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — see `eslintrc.json`'s `sourceType: "script"`.
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`).
- Route handlers talk to data only through `db/store.js`, never manipulating the in-memory arrays directly.

## Architecture

- `server.js` is the entry point: builds the Express app, mounts routers, and starts listening. It exports `app` without calling `.listen()` when required (not run directly), which is what lets `tests/users.test.js` import it and drive it with `supertest` against an in-process app rather than a real port.
- `db/store.js` is a stand-in for a real database: plain in-memory arrays, reset on every restart. Swapping in a real DB later means changing only this file.
- No `.env` is loaded/read yet (`.env.example` documents the shape but nothing in the app currently reads `process.env` beyond `PORT` in `server.js`).
