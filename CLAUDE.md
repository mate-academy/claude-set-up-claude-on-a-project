# CLAUDE.md

A small Express REST API (users + health) that serves as the working codebase for the Claude Code course projects.

## Commands

```bash
npm install
npm run dev      # node --watch server.js — API on http://localhost:3000
npm test         # node --test — discovers tests/
npm run lint     # eslint .
```

Run a single test file or a single test by name:

```bash
node --test tests/users.test.js
node --test --test-name-pattern "returns 404"
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 for every push and PR — match that locally before pushing.

## Conventions

- Use `npm`, not `pnpm` or `yarn`. The committed `package-lock.json` and CI both assume npm; switching package managers would break them.
- CommonJS only (`require` / `module.exports`), not ESM. `.eslintrc.json` sets `sourceType: "script"`, so `import` statements fail lint.
- Routes never touch the user array directly. All data access goes through a named function in `db/store.js`; add a function there rather than reaching into its state.
- One route file per resource in `routes/`, mounted in `server.js` under its path prefix. A new resource means a new file plus one `app.use` line, not a new branch in an existing router.
- Route handlers respond with `res.json(...)` and an explicit `res.status(...)` for anything that isn't 200. Validate required fields up front and `return` the error response early.
- Read config from `process.env` with an inline fallback (see `PORT` in `server.js`). Document any new variable in `.env.example`; real values live in the git-ignored `.env`.

## Architecture

`server.js` is the entry point and the only place routers are wired up. It creates the app, applies `express.json()`, mounts each router, and exports `app`.

`db/store.js` is an in-memory array behind three functions and stands in for a real database. State is module-level and resets on restart, which means tests share one store within a run: a test that creates a user affects later tests, so assert on shape and relative counts rather than exact contents.
