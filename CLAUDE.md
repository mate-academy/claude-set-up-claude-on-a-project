# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the API with `node --watch` on `http://localhost:3000` (override with `PORT`)
- `npm test` — run all tests with Node's built-in runner (`node --test`)
- `node --test --test-name-pattern="404" tests/users.test.js` — run a single test by name
- `npm run lint` — ESLint (`eslint:recommended`, ESLint 8 with `.eslintrc.json`)

## Conventions

- CommonJS only: use `require`/`module.exports`, not `import`/`export` (ESLint is set to `sourceType: "script"`).
- Routes never touch data directly — add or change functions in `db/store.js` and call them from the route.
- Error responses are JSON shaped `{ error: "<message>" }` with the matching status (400 for validation, 404 for missing records).
- `:id` params arrive as strings; convert with `Number(req.params.id)` before looking them up (store IDs are numbers).

## Architecture

- `server.js` is the entry point of the application.
- All data access and manipulation goes through `db/store.js`.
- The `routes/` directory has one route file per resource.
