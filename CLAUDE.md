# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter). CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, and `npm test` on every push and PR.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, auto-restarts on change (node --watch)
npm test         # runs tests (node:test + supertest)
npm run lint     # eslint .
```

To run a single test file: `node --test tests/users.test.js`.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM `import`/`export`.
- Route handlers return early with `res.status(...).json({ error: ... })` on failure instead of throwing.

## Architecture

- `server.js` — entry point; builds the Express `app` and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and hit routes via supertest without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`, mounted in `server.js`.
- `db/store.js` — in-memory data access layer; routes call into it rather than holding data themselves. Data resets on every server restart.
- `.env.example` — documents expected env vars (e.g. `PORT`); real values go in a git-ignored `.env`.
