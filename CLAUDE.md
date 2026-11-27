# claude-course-starter

Small Express JSON API (users + health endpoints) backed by an in-memory store.

## Commands

```
npm install
npm run dev     # node --watch server.js on PORT or 3000; never exits, so use npm test to check changes
npm test        # node --test (Node's built-in runner over tests/)
npm run lint    # eslint .
```

Run a single test file: `node --test tests/users.test.js`
Run one test by name: `node --test --test-name-pattern "returns 404"`

CI (`.github/workflows/ci.yml`) runs `npm install && npm run lint && npm test` on Node 22 for every push
and PR — keep both green.

## Architecture

- `server.js` — builds the app, mounts one router per resource (`/users`, `/health`), and exports `app`.
  Only listens when run directly, so tests import `app` without binding a port.
- `routes/` — one file per resource, each exporting an `express.Router()`. Route handlers own request
  validation and HTTP status codes.
- `db/store.js` — the only data access layer. Module-level `users` array and `nextId` counter; state
  resets on restart and is shared across requests, so tests must not assume a clean store between files.
- `tests/` — `node:test` + `supertest` against the imported `app`.

## Conventions

- CommonJS only: `require` / `module.exports`, not ESM `import`. ESLint is configured for
  `sourceType: "script"`, so `import` will fail lint.
- Routes never touch the `users` array directly — add a function to `db/store.js` and call it, so
  swapping in a real database stays a one-file change.
- Tests use `node:test` + `node:assert` + `supertest`. No Jest, Mocha, or Chai.
- Express is the only runtime dependency. Prefer stdlib over adding a package; ask before adding one.
- Validate inputs in the handler and return a JSON error body: `{ "error": "..." }` with 400 for missing
  fields, 404 for a missing resource.
- Config comes from `process.env` with an inline fallback (see `PORT` in `server.js`); document any new
  variable in `.env.example`. Never read or commit `.env`.
