# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health) used as the shared codebase for the Claude Code course projects.

## Commands

```bash
npm run dev                          # start with auto-reload on http://localhost:3000
npm test                             # node --test — discovers tests/*.test.js
npm run lint                         # eslint .
node --test tests/users.test.js      # run one test file
node --test --test-name-pattern="returns 404"   # run tests matching a name
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 for every push and PR — both must pass.

## Architecture

`server.js` builds the Express app, mounts one router per resource, and only calls `app.listen()` when run directly (`require.main === module`), so tests can `require("../server")` and drive it through supertest without opening a port. Keep that guard intact.

Request flow: `server.js` → `routes/<resource>.js` → `db/store.js`. Routes never hold state; all data access goes through `store.js`, an in-memory module whose data resets on restart. Adding a resource means a new `routes/<resource>.js` exporting an `express.Router()`, mounted in `server.js`, plus any accessor functions it needs in `store.js`.

## Conventions

- CommonJS only (`require` / `module.exports`) — `.eslintrc.json` sets `sourceType: "script"`; ESM `import` will fail lint.
- Node built-ins for tests (`node:test`, `node:assert`) plus supertest — no Jest, Mocha, or Chai.
- Handlers return errors as `res.status(<code>).json({ error: "message" })`; validate required fields up front and `return` on the error response.
- `express` is the only runtime dependency; prefer the standard library over adding packages.
- Read config from `process.env` with an inline fallback (`process.env.PORT || 3000`), and document any new variable in `.env.example`. Never read or write `.env`.
