# CLAUDE.md

Express REST API with a `/users` resource and a `/health` check, the starter project for a Claude Code course.

## Commands

```
npm run dev     # start with auto-reload on http://localhost:3000 (PORT overrides)
npm test        # run all tests (node --test)
npm run lint    # eslint .
```

CI runs `npm run lint` then `npm test` on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules.
- Read and change data only through functions exported from `db/store.js`, not with state kept in route files. Put new data operations in the store.
- Return errors as JSON `{ "error": "<message>" }` with status 400 for invalid input and 404 for a missing record. A successful create returns 201 with the created object.
- Convert route ids with `Number(req.params.id)` before calling the store. Stored ids are numbers and params are strings.
- Write tests in `tests/*.test.js` with `node:test`, `node:assert` and `supertest` against the exported `app`, not against a running server.

## Architecture

- `server.js` is the entry point. It builds the app, mounts the routers, exports `app`, and calls `listen()` only when run directly.
- `routes/<resource>.js` holds one `express.Router()` per resource (`users.js`, `health.js`), which validates input and shapes responses.
- `db/store.js` is the in-memory data layer. Data resets on restart and is shared by all tests in one process.
