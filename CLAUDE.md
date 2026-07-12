# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course. This particular assignment is about setting up Claude Code itself (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`) — the app code is not meant to change; see README.md for the task.


## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 (auto-restarts via `node --watch`)
- `npm start` — start the API without watch mode
- `npm test` — run all tests (Node's built-in test runner)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint (`eslint:recommended`, Node/CommonJS, ES2022)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on push/PR with Node 22.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES module `import`/`export` — `package.json` has no `"type": "module"`, and every file follows this.
- New resources get their own file in `routes/` exporting an `express.Router()`, mounted in `server.js` — don't add routes inline in `server.js`.
- Client errors return `res.status(4xx).json({ error: "<message>" })` (400 for bad input, 404 for missing), not thrown exceptions or plain-text responses.


## Architecture

- `server.js` — Express app entry point; mounts route modules and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and drive it with `supertest` against an unbound app.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` — in-memory data store standing in for a real database; state resets on every server restart, so don't assume persistence across requests in different processes.
- Real config belongs in `.env` (git-ignored); `.env.example` documents the shape.
