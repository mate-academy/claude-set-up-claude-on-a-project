# CLAUDE.md

This project inquire user health status.

## Commands

```bash
npm run dev    # start server with live reload on http://localhost:3000
npm test       # run tests with Node's built-in test runner
npm run lint   # check code style with ESLint
```

## Conventions

- One route file per resource in `routes/`; mount it in `server.js` under its resource path (e.g. `app.use("/users", usersRoutes)`)
- All data access goes through `db/store.js`; routes never manipulate the `users` array directly
- Use `require`/`module.exports` (CommonScript); ESLint is configured with `"sourceType": "script"`
- Tests use Node's built-in `node:test` + `assert` modules with `supertest` for HTTP; import `app` from `server.js` directly (no live port needed)

## Architecture

`server.js` is the entry point — it wires up middleware and mounts routes, then conditionally starts the HTTP server only when run directly (so tests can import `app` without binding a port).

`db/store.js` is an in-memory store (no real database). Data resets on every server restart. All CRUD helpers live here and are the only way routes should touch data.

`routes/` contains one file per resource. Each file creates an `express.Router`, defines handlers, and exports the router. CI runs lint then tests on every push/PR (Node 22).
