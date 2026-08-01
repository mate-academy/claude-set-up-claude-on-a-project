# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API with `users` and `health` endpoints, backed by an in-memory store.

## Commands

```bash
npm run dev                                      # start on http://localhost:3000 with --watch
npm test                                         # all tests
node --test tests/users.test.js                  # a single test file
node --test --test-name-pattern="returns 404"    # a single test by name
npm run lint                                     # eslint
```

CI runs `npm run lint` then `npm test` on every push and PR; both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM — ESLint sets `sourceType: "script"` and errors on `import`.
- Read and write data through `db/store.js`, never by touching the `users` array from a route.
- Return errors as `res.status(code).json({ error: "message" })`, not a bare string or a custom envelope.
- Put the URL prefix in `server.js` (`app.use("/users", …)`), not in the router — paths inside `routes/users.js` are `/` and `/:id`.

## Architecture

`server.js` is the entry point: `express.json()`, one `app.use` per resource router, and `listen()` only when run directly (`require.main === module`). That guard is what lets tests `require("../server")` and drive the app through supertest without binding a port.

- `routes/<resource>.js` — one file per resource, exporting an `express.Router()`. A new resource is a new file here plus one line in `server.js`.
- `db/store.js` — in-memory stand-in for a database. Module-level `users` and `nextId`, so state persists across tests within a run; don't assume a fixed user count.

The Express app is course material — don't change it unless asked.
