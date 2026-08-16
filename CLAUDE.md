# CLAUDE.md

A small Express REST API serving users and a health check from an in-memory store.

## Commands

```bash
npm run dev                      # start the API on http://localhost:3000 (node --watch)
npm test                         # run the full suite
npm run lint                     # eslint .
node --test tests/users.test.js  # run one test file
```

CI runs `npm run lint` then `npm test` on every push and PR. Both must pass.

## Conventions

- **CommonJS, not ESM.** Use `require` / `module.exports`. ESLint is set to `sourceType: "script"`, so `import` / `export` fails the lint.
- **Double quotes and semicolons**, matching every existing file.
- **Route handlers never touch data directly.** Reads and writes go through `db/store.js` — add a function there rather than reaching into the array from a route.
- **Errors are JSON with a status code:** `return res.status(4xx).json({ error: "message" })`. Don't throw, don't send plain text.
- **Tests use `node:test`, `node:assert` and `supertest`.** Don't add Jest, Mocha, or Chai.
- **Keep `server.js` importable.** It exports `app` and only calls `listen()` under `require.main === module`; the tests import `app` and depend on no port being opened.

## Architecture

- `server.js` — entry point. Builds the app, mounts each router under its base path, exports `app`.
- `routes/` — one file per resource, each exporting an `express.Router`. A new resource means a new file here plus one `app.use()` line in `server.js`.
- `db/store.js` — the only data access layer. In-memory, so all state resets when the server restarts.
- `tests/` — supertest against the imported `app`; no real server is started.
