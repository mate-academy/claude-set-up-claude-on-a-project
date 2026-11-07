# CLAUDE.md

A small Express (Node.js) REST API for users, with an in-memory data store. It is the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 and restart on file changes (`node --watch`)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `node --test tests/users.test.js`: run one test file
- `npm run lint`: run ESLint over the repo

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22. Both must pass.

## Architecture

- `server.js` builds the Express app, mounts each router, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests can import it without opening a port.
- `routes/` has one file per resource (`users.js` → `/users`, `health.js` → `/health`). Each file exports an `express.Router()` that `server.js` mounts.
- `db/store.js` is the only data layer: an in-memory array with `getAllUsers`, `getUserById`, and `createUser`. Data resets on restart and is shared across tests in the same process.
- `tests/` uses `node:test` + `node:assert` + `supertest` against the exported `app`.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is set to `sourceType: "script"`.
- Use `node:test` and `node:assert` for tests, not Jest or Mocha. Name files `tests/<resource>.test.js` and call endpoints through `supertest(app)`.
- Routes access data only through `db/store.js` functions, never by touching the array directly. Add a new store function when a route needs one.
- A new resource gets its own file in `routes/`, mounted in `server.js` at `/<resource>`.
- Errors return JSON as `{ "error": "<message>" }` with the right status (400 for invalid input, 404 for not found). Successful creates return 201.
- Convert route params with `Number(req.params.id)` before you look them up, because store IDs are numbers.
- Config comes from environment variables (see `.env.example`). Never read or commit `.env`.
