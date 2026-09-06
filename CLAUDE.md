# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Starter Express API for the Claude Code course — a minimal REST API used as a real codebase to practice setting up Claude Code (CLAUDE.md, permissions), not a production app.

## Commands

```
npm install
npm run dev      # start the API on http://localhost:3000 (auto-restarts via node --watch)
npm test         # run tests (node:test + supertest)
npm run lint     # eslint .
```

Run a single test file: `node --test tests/users.test.js`

## Architecture

- `server.js` — Express app entry point; mounts route modules and only calls `app.listen` when run directly (`require.main === module`), so `tests/` can `require("../server")` and exercise the app without opening a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`.
- `db/store.js` — in-memory data layer (plain arrays/objects, reset on every restart); routes call into it rather than manipulating data directly. There is no real database.
- `tests/` — supertest-based HTTP tests against the exported `app`.

## Conventions

- Data access goes through `db/store.js`, not directly in route handlers.
- New resources get their own file in `routes/`, mounted in `server.js`.
- Validation errors return `400` with `{ error: "..." }`; missing resources return `404` with the same shape.
