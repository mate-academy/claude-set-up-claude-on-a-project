# CLAUDE.md

A minimal Express REST API (users + health check) backed by an in-memory store — the target project for a Claude Code course, so don't change app code unless asked.

## Commands

```
npm run dev       # start on http://localhost:3000 with auto-restart
npm test          # run all tests (Node's built-in runner)
npm run lint      # eslint — CI runs lint + tests on Node 22, both must pass
node --test tests/users.test.js   # run a single test file
```

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — ESLint is configured with `sourceType: "script"`.
- Route handlers never touch data directly; call functions exported from `db/store.js`.
- Errors return JSON `{ error: "<message>" }` with the right status (400 invalid input, 404 not found); successful creates return 201.
- Tests use `node:test` + `node:assert` with `supertest` against the exported `app`, not Jest or a live server.
- Never read or commit `.env`; document new config keys in `.env.example` instead.

## Architecture

- `server.js` builds the Express `app`, mounts routers, and only calls `listen()` when run directly — otherwise it exports `app` for tests.
- `routes/` holds one router per resource (`users.js`, `health.js`), mounted at `/users` and `/health`.
- `db/store.js` is the only data layer: a plain in-memory array that resets on restart. Adding persistence is a deliberate change to this file.
- New resource = store functions → router file in `routes/` → mount in `server.js`.
