# CLAUDE.md

A small Express REST API (`/users`, `/health`) backed by an in-memory store.

## Commands

```
npm run dev      # start on http://localhost:3000 with --watch
npm test         # node --test, runs tests/*.test.js
npm run lint     # eslint .
```

Run `npm test` and `npm run lint` before proposing a change is finished.

## Conventions

- CommonJS only — `require` / `module.exports`, never `import` / `export` (ESLint parses this project as `sourceType: script`).
- Tests use the built-in `node:test` + `node:assert` with `supertest` against the exported `app`. Do not add Jest, Mocha, or Chai.
- Routes never touch data directly — all reads and writes go through `db/store.js`. Add a helper there rather than reaching into its arrays.
- `server.js` must keep exporting `app` and only call `app.listen` inside the `require.main === module` guard; the tests import it and would otherwise open a real port.
- Error responses are `res.status(code).json({ error: "message" })` — a JSON `error` string, never a bare string or HTML.
- Stay dependency-light: `express` is the only runtime dependency. Ask before adding another.
- Config comes from `process.env` with a fallback (`process.env.PORT || 3000`), and every new variable gets a commented entry in `.env.example`. Never read or write `.env`.

## Architecture

- `server.js` — entry point: builds the app, mounts `express.json()`, mounts each router at its path.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an `express.Router()`. A new resource means a new file plus one `app.use` line.
- `db/store.js` — the only data layer. In-memory, so state resets on restart and tests must not assume a fixed row count.
- `tests/` — one `*.test.js` per resource, HTTP-level tests via supertest.
