# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This is a course exercise repo — the task is to set up Claude Code (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`) on top of this project, not to change the app code itself.

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000 (node --watch)
npm test         # runs tests via node --test (uses supertest against the app, no real port)
npm run lint     # eslint .
```

Run a single test file: `node --test tests/users.test.js`

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on push/PR against Node 22.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts one router per resource, and only calls `app.listen()` when run directly (`require.main === module`), so `tests/` can `require("../server")` and hit the app in-process via supertest without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`, mounted in `server.js` under its path prefix (`/users`, `/health`).
- `db/store.js` — in-memory data layer. Routes never touch data directly; they call `store.js` functions (`getAllUsers`, `getUserById`, `createUser`). Data resets on every server restart — there is no persistence.
- Config: `PORT` via `.env` (see `.env.example`); real `.env` is git-ignored.

## Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- ESLint config (`.eslintrc.json`) extends `eslint:recommended`; `no-unused-vars` ignores `req`, `res`, `next`, and `_`-prefixed args.
- camelCase not snake_case for Variables
