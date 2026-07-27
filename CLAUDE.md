# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health) used as the working codebase for the Claude Code course projects.

## Commands

```bash
npm run dev                              # start with auto-reload on http://localhost:3000
npm test                                 # node:test runner, discovers tests/
npm run lint                             # eslint .
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` builds and exports the `app`, and only calls `app.listen()` when run directly (`require.main === module`). This is what lets tests `require("../server")` and drive it with supertest without binding a port — keep that guard intact.
- `routes/` holds one `express.Router()` per resource, mounted in `server.js` under its path prefix (`/users`, `/health`). Adding a resource means a new file here plus one `app.use()` line.
- `db/store.js` is the only data access layer — an in-memory array with `getAllUsers` / `getUserById` / `createUser`. State resets on restart. Routes never touch the `users` array directly; go through the store so it can be swapped for a real database later.

## Conventions

- CommonJS (`require` / `module.exports`), not ESM — `.eslintrc.json` sets `sourceType: "script"` and ESM imports will fail lint and runtime.
- Errors are returned as `res.status(code).json({ error: "message" })` with an early `return`; validate inputs at the top of the handler before touching the store.
- Config comes from `process.env` with an inline fallback (`process.env.PORT || 3000`). Document any new variable in `.env.example`; real values live in the git-ignored `.env`.

## Repo notes

The `README.md` is course instructions, not app documentation — the app code is deliberately not the assignment. `.claude/settings.local.json` is git-ignored and personal; `.claude/settings.json` is shared.