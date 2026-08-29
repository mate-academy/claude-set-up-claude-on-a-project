# CLAUDE.md

A small Express REST API with in-memory storage, used as a learning project for Claude Code.

## Commands

```bash
npm run dev    # start API on http://localhost:3000 (hot-reload via --watch)
npm test       # run tests with Node's built-in test runner
npm run lint   # check code style with ESLint
```

## Conventions

- One route file per resource in `routes/` (e.g. `users.js`, `health.js`); do not put route logic in `server.js`.
- All data access goes through `db/store.js`; routes must not manipulate data directly.
- Use `require`/`module.exports` (CommonJS); this project does not use ES modules.
- Keep `server.js` thin: mount routers and start the server, nothing else.

## Architecture

- `server.js` — entry point; creates the Express app, mounts routers, starts the server only when run directly (so tests can import `app` without binding a port).
- `routes/` — one file per resource; each file exports an Express Router.
- `db/store.js` — in-memory data helper; data resets on every server restart (no real database).
- `tests/` — integration tests using `supertest`; run with `npm test`.
