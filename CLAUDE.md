# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This repo is the base project students configure Claude Code on — not a real product.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with `node --watch` (auto-restarts on change)
- `npm test` — run all tests (`node --test`, using `node:test` + `supertest`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — check code style with ESLint

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules (`import`/`export`) — `.eslintrc.json` sets `sourceType: "script"` and every file in the repo uses `require`.
- Return errors as `res.status(<code>).json({ error: "<message>" })`, not thrown exceptions or a different response shape — see the 404 in `routes/users.js` (`GET /:id`) and the 400 in `routes/users.js` (`POST /`).
- Access and mutate user data only through `db/store.js`'s exported functions (`getAllUsers`/`getUserById`/`createUser`), not by reaching into its internal `users` array from a route file.

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts route modules, and only calls `app.listen()` when the file is run directly (`require.main === module`) — this lets `tests/` `require("../server")` and hit the app in-process via `supertest` without opening a real port.
- One route file per resource under `routes/` (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- All data access goes through `db/store.js`, a tiny in-memory module (a plain array, reset on every restart) exposing `getAllUsers`/`getUserById`/`createUser`. Routes never touch the data array directly.
