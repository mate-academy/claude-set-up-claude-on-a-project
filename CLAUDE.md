A small Express REST API (users + health) 

## Commands

```bash
npm run dev                                   # node --watch server.js, port 3000
npm test                                      # node --test — discovers tests/*.test.js
npm run lint                                  # eslint .
node --test tests/users.test.js               # one test file
node --test --test-name-pattern="returns 404" # one test by name
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on Node 22 for every push and PR. Both must pass.

## Architecture

Three layers, each with one job:

- `server.js` — builds the app, mounts routers, exports `app`. It only calls `listen()` under `require.main === module`, so tests import the app without binding a port. **Preserve this guard**; `supertest` in `tests/` depends on it.
- `routes/<resource>.js` — one Express `Router` per resource, mounted at `/<resource>`. Routes own HTTP concerns only: parse params, validate the request, choose a status code.
- `db/store.js` — the single data-access boundary. An in-memory array plus a `nextId` counter; state resets on restart, so tests must not assume a clean store or a specific row count.

Routes never touch the `users` array directly — they go through `store`'s exported functions. Adding a resource means a new `routes/` file, a new `app.use()` line in `server.js`, and any new accessors in `db/store.js`.

## Conventions

- CommonJS (`require` / `module.exports`), not ESM. `package.json` has no `"type": "module"` and `.eslintrc.json` sets `sourceType: "script"`.
- Double quotes, semicolons, 2-space indent.
- No runtime dependencies beyond `express`. Prefer Node built-ins (`node:test`, `node:assert`) over adding packages.
- Error responses are `res.status(<code>).json({ error: "<message>" })`, returned early with `return`.
- Read config from `process.env` with an inline fallback (`process.env.PORT || 3000`). Document any new variable in `.env.example`; never read or commit `.env`.

