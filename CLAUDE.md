# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the practice codebase for the
Claude Code course. The exercise is to configure Claude on it — the app code itself is
not meant to change unless a task explicitly asks for it.

## Commands

```bash
npm install                                   # required first; node_modules is not committed
npm run dev                                   # start with auto-reload on http://localhost:3000
npm start                                     # start without auto-reload
npm test                                      # run every test (node --test)
npm run lint                                  # ESLint

node --test tests/users.test.js               # run a single test file
node --test --test-name-pattern="returns 404" # run tests matching a name
```

CI runs `npm run lint` then `npm test` on Node 22 for every
push and pull request. Both must pass.

## Architecture

Three layers, each with one job:

- `server.js` — builds the Express app, mounts each router under its path prefix, and
  exports the app. It calls `app.listen()` **only** when run directly
  (`require.main === module`), so tests can `require("../server")` and drive it through
  supertest without opening a real port. Preserve this guard.
- `routes/` — one file per resource, each exporting an `express.Router`. Adding a
  resource means a new file here plus one `app.use()` line in `server.js`.
- `db/store.js` — the only place that touches data. It is an in-memory array standing in
  for a database: state is shared across the whole process and resets on restart, so a
  test that POSTs a user leaves it visible to later tests in the same run. Write tests
  that don't depend on the exact number of users.

## Conventions

- CommonJS only — `require` / `module.exports`. ESLint is configured with
  `sourceType: "script"`, so `import`/`export` will fail lint.
- Double quotes in JS.
- Route handlers own validation and status codes; errors return
  `res.status(<code>).json({ error: "<message>" })`. Follow that shape for new errors.
- Reach data through `db/store.js` functions, never by importing or mutating the array
  directly.
- Configuration comes from `process.env` with a fallback (`process.env.PORT || 3000`).
  Document any new variable in `.env.example`; real values live in the untracked `.env`.
