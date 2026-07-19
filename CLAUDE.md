# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A starter Express.js API (`claude-course-starter`). Data lives only in memory (`db/store.js`) and resets on every restart — there is no real database.

## Commands

```
npm install
npm run dev      # start the API with auto-reload (node --watch) on http://localhost:3000
npm start        # start the API without auto-reload
npm test         # run all tests (node:test + supertest)
npm run lint     # eslint .
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express app entry point. Mounts one router per resource (`/users`, `/health`). Exports `app` without calling `.listen()` unless the file is run directly (`require.main === module`), so tests can import it and drive it with supertest without opening a real port.
- `routes/` — one file per resource (e.g. `users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — the only data-access layer; routes never touch data directly. Currently an in-memory array, so treat it as the seam where a real database would later be plugged in.
- `tests/` — integration-style tests that import `app` from `server.js` and make real HTTP requests via `supertest`.

## Conventions

- Data access goes through `db/store.js`, not inline in route handlers.
- ESLint config (`.eslintrc.json`) ignores unused `req`, `res`, `next`, and `_`-prefixed args — expected in Express handlers.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape.
