# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (`/users`, `/health`) backed by an in-memory store — the practice codebase for the Claude Code course.

## Commands

```bash
npm install
npm run dev                                  # node --watch server.js on http://localhost:3000
npm test                                     # node --test (discovers tests/*.test.js)
npm test -- tests/users.test.js              # a single test file
npm test -- --test-name-pattern="GET /health"  # a single test by name
npm run lint                                 # eslint .
```

CI (`.github/workflows/ci.yml`) runs `npm install && npm run lint && npm test` on Node 22 for every push and PR — both must pass.

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export`. There is no `"type": "module"` and ESLint parses `sourceType: "script"`.
- Double quotes for strings, semicolons, 2-space indent — match the existing files.
- Routes never touch the `users` array directly; all reads and writes go through `db/store.js`. Add a helper there rather than reaching around it.
- Add a new resource as its own file in `routes/` exporting an `express.Router()`, then mount it in `server.js` with `app.use("/<resource>", ...)`.
- Validate input in the route and return the JSON error shape already in use: `{ error: "message" }` with 400 for missing fields, 404 for a missing record.
- Read config from `process.env` with a fallback (see `PORT` in `server.js`) and document new keys in `.env.example`. Never read or write `.env` itself.

## Architecture

`server.js` builds the app, mounts `express.json()` and the routers, and exports `app`. It only calls `app.listen()` when `require.main === module` — the tests `require("../server")` and drive it with `supertest`, so that guard must stay or the test run will hang on an open port.

Three layers, one direction: `server.js` → `routes/*.js` → `db/store.js`. `db/store.js` is a module-level array plus a `nextId` counter, so state persists across requests within a process and resets on restart; tests share one process, meaning writes from one test are visible to later ones — assert on relative facts (`length >= 1`) rather than exact counts.

## Scope

This repo is the subject of a course exercise about configuring Claude Code (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`). The Express app is scaffolding — don't refactor or extend it unless asked. See `README.md` for the exercise itself.
