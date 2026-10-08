# CLAUDE.md


A small Express REST API (users + health check) that serves as the starter project for the Claude Code course. Later course projects build on top of it.

## Commands

```
npm install
npm run dev                                   # node --watch server.js, http://localhost:3000
npm test                                      # node --test (built-in runner, finds tests/*.test.js)
npm run lint                                  # eslint .
node --test tests/users.test.js               # run one test file
node --test --test-name-pattern="404" tests/  # run tests whose name matches
```

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` and then `npm test` on every push and PR. Both must pass.

## Architecture

- `server.js` builds the Express app, mounts one router per resource (`/users`, `/health`) and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` without opening a port.
- `routes/<resource>.js`: each file exports an `express.Router()` with paths relative to its mount point. A new resource gets a new file here and an `app.use(...)` line in `server.js`.
- `db/store.js`: an in-memory store seeded with two users. It resets on restart and is shared module state, so data written in one test is visible to later tests in the same file. `getAllUsers()` returns the live array, not a copy.
- `PORT` comes from `process.env`. Nothing loads `.env` automatically (there is no dotenv), so `.env.example` is documentation only.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Route handlers access data only through `db/store.js` functions, never directly. Add a store function when you need a new query.
- Return errors as JSON `{ error: "<message>" }` with the right status: 400 for invalid input, 404 for missing resources, 201 for a successful create.
- Write tests with `node:test` + `node:assert` + `supertest` against the exported `app`. Do not add Jest or Mocha.
- Route param IDs are strings. Convert them with `Number(req.params.id)` before calling the store, which compares IDs with `===`.
