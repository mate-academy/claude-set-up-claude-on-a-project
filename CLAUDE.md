# CLAUDE.md

Express REST API (users + health check) with an in-memory store.

## Commands

```
npm run dev                       # auto-reload, http://localhost:3000
npm test                          # all tests (node --test)
node --test tests/users.test.js   # one file
npm run lint                      # ESLint
```

CI runs lint then tests on Node 22. Both must pass; don't use features newer than Node 22.

## Conventions

- CommonJS (`require`/`module.exports`), not ES modules.
- One router per resource in `routes/`, mounted in `server.js` via `app.use("/<resource>", ...)`.
- Handlers touch data only through functions exported from `db/store.js`.
- Errors: `res.status(code).json({ error: "<message>" })`. 400 invalid input, 404 missing, 201 created.
- Tests use `node:test`, `node:assert` and `supertest` against the `app` exported from `server.js`.

## Architecture

- `routes/` has one file per resource (`users.js`, `health.js`); `server.js` mounts each at `/users` and `/health`.
- `server.js` exports `app` and only calls `listen()` when run directly, so tests import it without opening a port.
- `db/store.js` holds data in module-level arrays that reset on restart. Tests share this state, so a test that creates users affects later tests.
- Nothing loads `.env` automatically; `PORT` must come from the real environment.
