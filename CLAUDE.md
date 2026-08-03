# CLAUDE.md

A small Express REST API (users + health endpoints) used as the practice codebase for the Claude Code course.

## Commands

```bash
npm run dev                      # auto-reload on http://localhost:3000
npm test                         # node:test; add `-- tests/users.test.js` for one file
npm run lint                     # eslint — CI runs lint then test on Node 22
```

## Conventions

- CommonJS (`require` / `module.exports`), not ESM — eslint is configured for `sourceType: "script"`.
- Double quotes, semicolons, 2-space indent, trailing commas in multi-line literals (not lint-enforced, so match by hand).
- Errors are `{ error: "message" }` with an explicit status (400 missing fields, 404 not found), returned early rather than nested.
- Read config as `process.env.X || fallback` and document new variables in `.env.example` with placeholder values only.
- No new dependencies without asking — express/supertest/eslint are the whole stack.

## Architecture

- `server.js` — builds the app, mounts routers at `/users` and `/health`, exports `app`, and only calls `app.listen()` under `require.main === module` so tests can import it. Keep that guard.
- `routes/` — one file per resource exporting an `express.Router`; paths inside are relative to the mount point.
- `db/store.js` — the only data access layer (in-memory array, resets on restart). Routes go through it, never touch module state directly.
- `tests/` — `node:test` + `supertest` against the imported `app`. The store is shared across a run, so assert on shape and status, not exact counts.

## Scope

This repo is a course exercise about configuring Claude Code. Don't refactor or extend the app unless asked; the deliverables are `CLAUDE.md`, `.claude/settings.json`, and `NOTES.md`.
