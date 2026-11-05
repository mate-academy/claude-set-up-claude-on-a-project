# CLAUDE.md

Small Express REST API (users + health check) used as a practice codebase.

## Commands

npm run dev                       # start on http://localhost:3000 with reload
npm test                          # node --test, runs tests/*.test.js
npm run lint                      # eslint .
node --test tests/users.test.js   # run one test file

CI runs lint + test on Node 22 for every push and PR: keep both green.

## Architecture

- `server.js`: entry point. Mounts routers (`/users`, `/health`) and exports `app`; it only calls `app.listen` under `require.main === module` so tests can import it without opening a port.
- `routes/`: one file per resource, each an `express.Router()`. Paths are relative to the mount point (`router.get("/:id")` = `GET /users/:id`).
- `db/store.js`: the only data layer, an in-memory array. Nothing persists; tests rely on the seeded users.

## Conventions

- CommonJS (`require` / `module.exports`), not ESM `import`.
- Routes access data only through `db/store.js`; add a store function rather than touching the array in a route.
- New resource = new `routes/<name>.js`, mounted in `server.js`.
- Tests use `node:test` + `node:assert` + `supertest` on the imported `app`, not Jest or Mocha.
- Error responses are JSON `{ "error": "..." }`: 400 for missing fields, 404 for a missing record.