# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A minimal Express API starter for the Claude Code course projects (`claude-course-starter`). It's
intentionally small: one resource (`users`), an in-memory store instead of a database, and just
enough tooling (lint, tests, CI) to be a realistic target for setting up Claude Code permissions and
guidance — not a production app.

`hello.py` may be present in this directory as an untracked, unrelated scratch file (`git status`
will show it, if so) — it is not part of this project; ignore it unless asked about it directly.

## Commands

```powershell
npm install       # installs express, eslint, supertest — none are vendored
npm run dev        # node --watch server.js — starts the API on http://localhost:3000
npm start          # node server.js — same, without the watch/reload
npm test           # node --test — runs everything under tests/
npm run lint        # eslint .
```

Run a single test file: `node --test tests/users.test.js`
Run tests matching a name: `node --test --test-name-pattern="404"`
Lint a single file: `eslint routes/users.js`

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs `npm install`, `npm run lint`, then
`npm test` on Node 22, on every push and PR.

## Architecture

- [server.js](server.js) is the only entry point. It builds the `express` app, mounts
  `routes/users.js` at `/users` and `routes/health.js` at `/health`, and exports the `app` instance.
  It only calls `.listen()` when the file is run directly (`require.main === module`), so
  [tests/users.test.js](tests/users.test.js) can `require("../server")` and drive it with
  `supertest` against an in-memory instance, no real port needed.
- Each resource gets one router file under `routes/`; there is no shared router-registration
  mechanism beyond the two `app.use()` calls in `server.js` — a new resource means a new route file
  and a new line in `server.js`.
- [db/store.js](db/store.js) is the only data access path — routes never touch state directly. It's
  a plain in-memory array seeded with two users; there is no persistence, and state resets on every
  restart. If you add a resource, follow this pattern: a `store.js`-style module owning the data plus
  plain functions (`getAll`, `getById`, `create`, ...), not a class or ORM.
- Validation is done inline in the route handler (e.g. `users.js` checks `name`/`email` are present
  before calling `store.createUser`), not in a middleware layer or schema library.

## Conventions

- CommonJS throughout (`require`/`module.exports`) — `.eslintrc.json` sets `sourceType: "script"`,
  not `"module"`.
- ESLint extends `eslint:recommended` with one override: `no-unused-vars` is a `warn`, and ignores
  unused `req`/`res`/`next` handler params (and any `_`-prefixed name) rather than requiring them all
  to be referenced.
- Route handlers use `res.status(code).json(...)` for non-200 responses; a missing resource is a 404
  with `{ error: "..." }`, a bad request body is a 400 with the same shape.
- Real secrets go in `.env` (git-ignored); `.env.example` documents the shape (currently just `PORT`)
  and is committed instead.
