# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express API (starter project for the Claude Code course) exposing `/health` and `/users` endpoints backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-reload (`node --watch`)
- `npm test` — run the test suite (Node's built-in test runner + supertest); run a single file with `node --test tests/users.test.js`
- `npm run lint` — check code style with ESLint

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`) with the appropriate status code (400, 404) rather than throwing.
- Data access only goes through `db/store.js` exported functions — routes never touch the `users` array directly.
- New resources get their own file in `routes/`, mounted in `server.js` — routes aren't added inline in `server.js`.

## Architecture

- `server.js` — entry point; creates the app, mounts routes, only calls `app.listen` when run directly, so `tests/` can import `app` without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — in-memory data layer; all data access goes through its exported functions. 

