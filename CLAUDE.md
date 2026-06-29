# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as a course starter project. In-memory data only — no database.

## Commands

```
npm install       # install dependencies
npm run dev       # start API with file-watching on http://localhost:3000
npm test          # run tests (Node's built-in test runner)
npm run lint      # ESLint check
```

To run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — entry point; mounts routes and exports `app` (no port binding when imported, so tests work cleanly)
- `routes/` — one file per resource (`users.js`, `health.js`); each exports an Express Router
- `db/store.js` — in-memory data helper; resets on server restart; all routes import from here

## Conventions

- Routes go in `routes/`, one file per resource. Add a new resource by creating `routes/<resource>.js` and mounting it in `server.js`.
- All data access goes through `db/store.js` — routes never manipulate the data arrays directly.
- Use `Number()` to coerce URL params to integers before passing to store functions (see `routes/users.js`).
- Return `{ error: "..." }` JSON with the appropriate status code for all error responses.
