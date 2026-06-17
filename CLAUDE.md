# CLAUDE.md

A minimal Express REST API used as the base project for a Claude Code course. Each course unit adds to it.

## Commands

```bash
npm run dev    # start API with live-reload on http://localhost:3000
npm test       # run all tests (node:test + supertest)
npm run lint   # ESLint with eslint:recommended
```

To run a single test file: `node --test tests/users.test.js`

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` under a matching prefix (e.g. `routes/users.js` → `/users`).
- All data access goes through `db/store.js` — routes never manipulate the in-memory array directly.
- `server.js` guards `app.listen` with `require.main === module` so tests can import `app` without binding a port.
- CommonJS (`require`/`module.exports`) throughout — no ESM.
- `no-unused-vars` is warn-only; args matching `^(_|req|res|next)$` are explicitly ignored.

## Architecture

`server.js` is the entry point: it wires up Express, mounts route modules, and exports `app`. Route handlers in `routes/` call functions from `db/store.js`, which is a plain in-memory array (data resets on restart). Tests use `supertest` against the exported `app` without starting a real server.
