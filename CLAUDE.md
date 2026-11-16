# CLAUDE.md

A small Express REST API (users + health check) backed by an in-memory store

## Commands

- `npm run dev`: start the API with auto-reload on http://localhost:3000 (`PORT` env var overrides)
- `npm test`: run all tests (Node's built-in runner, `node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404"`: run tests whose name matches a pattern
- `npm run lint`: run ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Write tests with `node:test` + `node:assert` + `supertest`, not Jest or Mocha. Import `app` from `../server` and never call `listen()` in tests.
- Route handlers access data only through functions exported from `db/store.js`. Never touch the arrays directly or require data from anywhere else.
- Return errors as JSON `{ error: "<message>" }` with the matching status code
- Parse route params explicitly (for example `Number(req.params.id)`). The store compares IDs with `===`.
- Never read or commit `.env`. Add new config keys to `.env.example` instead.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), which lets tests import it without opening a port.
- `routes/<resource>.js` holds one `express.Router()` per resource. To add a resource, create a new route file and mount it in `server.js`.
- `db/store.js` is a module-level in-memory store (seeded with two users, `nextId` counter). Data resets on restart but **persists across tests in the same process**, so tests must not assume a fresh store or exact counts.
