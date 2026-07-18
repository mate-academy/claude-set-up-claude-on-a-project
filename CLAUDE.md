# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A minimal Express REST API used as the working codebase for the Claude Code course. It exposes `/users` and `/health` endpoints backed by an in-memory store.

## Commands

```
npm install       # install dependencies
npm run dev       # start the API on http://localhost:3000 with --watch (auto-restart)
npm start         # start the API without watch
npm test          # run all tests (node --test)
npm run lint      # eslint .
```

Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` is the entry point. It builds the Express `app`, mounts one router per resource, and only calls `app.listen` when run directly (`require.main === module`) so tests can `require("../server")` and hit the app in-process via `supertest` without opening a port. **This dual-purpose export is load-bearing — always keep the `require.main` guard and `module.exports = app`.**
- `routes/` holds one file per resource (`users.js`, `health.js`), each exporting an `express.Router`. New resources follow the same pattern: create `routes/<resource>.js` and mount it in `server.js` with `app.use("/<resource>", ...)`.
- Route handlers never touch data directly — all reads/writes go through `db/store.js`, a synchronous in-memory module. Data resets on restart and is not persisted; treat `store.js` as the single seam to swap in a real database later.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — `package.json` has no `"type": "module"` and eslint is configured for `sourceType: "script"`.
- Keep data access in `db/store.js`; route files should import `store` rather than manipulating collections inline.
- Return errors as JSON with the right status code (e.g. `res.status(404).json({ error: "..." })`), matching the existing handlers.
- The lint rule allows unused `req`, `res`, `next`, and `_`-prefixed args; other unused vars warn — don't leave them.

## Notes

`.env` is git-ignored; copy `.env.example` to `.env` for local config (`PORT`). The app itself only reads `PORT` today.
