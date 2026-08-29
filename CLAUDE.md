# CLAUDE.md

A small Express REST API (`/users`, `/health`) used as the starter codebase for the Claude Code course.

## Commands

```
npm install              # install dependencies
npm run dev              # start the API on http://localhost:3000 with --watch reload
npm test                 # run all tests (node:test built-in runner)
npm run lint             # eslint over the whole repo
```

## Conventions

- Use `require`/`module.exports` (CommonJS), not `import`/`export`. ESLint is configured for `sourceType: "script"` and will error on ES module syntax.
- Use double quotes and semicolons, matching every existing file.
- One route file per resource in `routes/`, each exporting an `express.Router()`. Add a new resource as its own file and mount it in `server.js`, rather than adding unrelated routes to an existing file.
- Route handlers never touch data structures directly — all reads and writes go through `db/store.js`.
- `server.js` must keep the `require.main === module` guard so tests can import `app` without binding a port.

## Architecture

- `server.js` — entry point. Builds the Express `app`, mounts routers, exports `app`, and only calls `listen()` when run directly.
- `routes/` — one router per resource (`users.js`, `health.js`), mounted under a path prefix in `server.js`.
- `db/store.js` — in-memory data helper standing in for a database. State is module-level and resets on restart; tests share this state within a run.
- `tests/` — `node:test` + `supertest` against the imported `app` (no live server).
