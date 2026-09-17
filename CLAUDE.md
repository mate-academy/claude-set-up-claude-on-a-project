# CLAUDE.md

A small Express REST API (users + health) used as the working codebase for the Claude Code course projects.

## Commands

```bash
npm install
npm run dev      # node --watch server.js — API on http://localhost:3000
npm test         # node --test — discovers tests/*.test.js
npm run lint     # eslint .
```

Run a single test file or a single test case:

```bash
node --test tests/users.test.js
node --test --test-name-pattern="GET /users returns a list of users"
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 for every push and PR — both must pass.

## Conventions

- **CommonJS, not ESM.** Use `require` / `module.exports`. `.eslintrc.json` sets `sourceType: "script"`, so `import`/`export` is a parse error.
- **ESLint 8 with legacy `.eslintrc.json`.** Do not migrate to `eslint.config.js` flat config or bump to ESLint 9 — both break `npm run lint`.
- **Routes never touch the data directly.** All reads and writes go through `db/store.js`; route files import the store and call its functions.
- **Tests use `node:test` + `node:assert` + `supertest`.** No Jest, Mocha, or Chai — they aren't dependencies.
- **Config comes from `process.env` with an inline default** (see `PORT` in `server.js`). New config keys get documented in `.env.example`; `.env` itself is git-ignored and should never be read or committed.

## Architecture

`server.js` is the entry point: it builds the `app`, mounts `express.json()`, and mounts one router per resource (`/users`, `/health`). It **exports `app`** and only calls `app.listen()` when `require.main === module`, so tests can import the app without binding a port. Any new route must preserve this.

`routes/` holds one file per resource, each exporting an `express.Router()` mounted under its own path prefix in `server.js`. Routes own HTTP concerns only: parsing params (`Number(req.params.id)`), validating the body, and choosing status codes (404 for a missing user, 400 for a missing `name`/`email`, 201 on create).

`db/store.js` is an in-memory array plus an `nextId` counter standing in for a database. It exposes `getAllUsers` / `getUserById` / `createUser` and nothing else. Two consequences: state resets on every server restart, and tests in a run share the same mutable store — so a test that creates a user changes what later tests see.
