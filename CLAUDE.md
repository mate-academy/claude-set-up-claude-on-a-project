# CLAUDE.md

## One-Line description 
A small Express REST API (users + health endpoints) backed by an in-memory store. It is the starter project for the Claude Code course; the course tasks are about configuring Claude on it, not changing the app.

## Commands

```
npm install
npm run dev      # start the API with --watch on http://localhost:3000 (PORT env overrides)
npm test         # run all tests with the built-in node:test runner
npm run lint     # eslint .
```

Run a single test file or a single test by name:

```
node --test tests/users.test.js
node --test --test-name-pattern="returns 404" tests/users.test.js
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR, so both must pass before pushing.

## Conventions

- CommonJS only (`require` / `module.exports`). ESLint is configured with `sourceType: "script"`, so `import`/`export` will fail lint.
- Tests use `node:test` + `node:assert` + `supertest`. Do not add jest, mocha, or another runner.
- Tests import `app` from `server.js` and never start a real port. Keep the `require.main === module` guard in `server.js` so this continues to work.
- Routes never touch the `users` array directly; all data access goes through the functions exported by `db/store.js`.
- Validation errors return `400` with `{ error: "..." }`; missing resources return `404` with the same shape.
- Unused `req`, `res`, and `next` parameters are allowed by the lint config; other unused variables warn.
- Config comes from environment variables; `PORT` is the only one the app reads. Never read, print, or commit `.env` files or dump the environment.

## Architecture

- `server.js` builds the Express app, applies `express.json()`, mounts one router per resource, and exports `app`. It only calls `listen` when run directly.
- `routes/<resource>.js` holds one `express.Router` per resource (`users`, `health`). Add a new resource by creating a new file here and mounting it in `server.js`.
- `db/store.js` is the only data layer: an in-memory array seeded with two users that resets on every restart. Swap this module out to move to a real database.
- `tests/` contains supertest-based HTTP tests against the exported `app`.
