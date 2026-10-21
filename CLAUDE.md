# CLAUDE.md

A small Express (Node.js) REST API that manages users in memory. It is the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API with `node --watch` on http://localhost:3000 (set `PORT` to change it)
- `npm test`: run all tests with the built-in Node test runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `node --test --test-name-pattern="404" tests/users.test.js`: run tests whose names match a pattern
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint` and `npm test` on Node 22. Both lint and tests must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`, so `import` fails lint.
- Write tests with `node:test` and `node:assert` plus `supertest`. Do not use Jest or Mocha. Put them in `tests/*.test.js`.
- Import `app` from `../server` in tests and call `request(app)`. Never start a real server in a test.
- Route handlers access data only through functions exported from `db/store.js`. Do not keep data inside a route file.
- Send errors as JSON in the form `{ error: "<message>" }` with the right status code: 400 for bad input, 404 for something not found.
- Coerce route params before you use them (for example, `Number(req.params.id)`). The store compares ids with `===`.
- Never read or commit `.env`. Add new config keys to `.env.example` instead.

## Architecture

- `server.js` is the entry point. It builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It calls `listen()` only when `require.main === module`, which lets tests import the app without opening a port.
- `routes/` holds one file per resource, each exporting an `express.Router()`. To add a resource, create `routes/<name>.js` and mount it in `server.js`.
- `db/store.js` is an in-memory store held in module-level state. Data resets when the process restarts. Tests in the same file share this state, so a test must not depend on exact record counts or on ids that an earlier test may have created.
