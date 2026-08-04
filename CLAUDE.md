# CLAUDE.md

Starter Express API used for a Claude Code training course. The app itself is not meant to be modified — this repo exists so a real (if small) codebase is available for configuring Claude Code (`CLAUDE.md`, `.claude/settings.json`).

## Commands

```
npm install
npm run dev      # starts the API on http://localhost:3000, restarts on file changes (node --watch)
npm test         # runs all tests (node:test)
npm run lint     # eslint .
```

Run a single test file: `node --test tests/users.test.js`

## Conventions

- Use `require`/`module.exports` (CommonJS), not `import`/`export`.
- Error responses are always `res.status(code).json({ error: "message" })`, not plain strings or other shapes.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and exercise the app with supertest without opening a real port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js` under its own path prefix (`/users`, `/health`).
- `db/store.js` — in-memory data layer; the only place routes should touch data. State resets on every server restart (no persistence).
- `tests/` — supertest-based route tests, one file per resource, mirroring `routes/`.
