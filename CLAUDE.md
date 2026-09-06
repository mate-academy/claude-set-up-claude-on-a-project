## Overview
This project is a real world application, in which newly learned Claude features can be tried out.
It is written in JavaScript and uses Express API calls against localhost.

## Commands

- `npm run dev` — start the API on http://localhost:3000 with auto-restart (`node --watch`)
- `npm test` — run the test suite (`node --test`, uses `node:test` + `supertest`)
- `npm test -- --test-name-pattern="<name>"` — run a single test by name
- `npm run lint` — run ESLint (`eslint:recommended`)

## Architecture

- `server.js` — builds and exports the Express `app`.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data access module. Data resets on every restart.

## Conventions

- Route handlers validate input and return JSON error bodies (`{ error: "..." }`).
- Data access is never inlined in routes, even for trivial in-memory operations.
