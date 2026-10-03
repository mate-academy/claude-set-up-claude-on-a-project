# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (users + health check) used as the starter project for the Claude Code course.

## Commands

```
npm run dev     # node --watch server.js, serves http://localhost:3000 (PORT env var overrides)
npm test        # node --test, Node's built-in runner, finds tests/*.test.js
npm run lint    # eslint . (eslint:recommended, CommonJS, ES2022)
node --test tests/users.test.js                       # one test file
node --test --test-name-pattern="health"              # tests whose name matches
```

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm run lint`, `npm test` on Node 22 for every push and PR.

## Conventions

- Run npm test before committing
- Use npm run lint to check code style before pushing
- Use the existing { error: "..." } JSON shape for failures, not res.send() with plain text.
- Use CommonJS require/module.exports, not ES import/export.

## Architecture

- `server.js` builds the Express app, mounts one router per resource, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and drive it with `supertest` without opening a port.
- `routes/<resource>.js` exports an `express.Router()`, mounted in `server.js` at `/<resource>`. Routes validate input and respond with `{ error: "..." }` JSON plus a 400/404 status on failure.
- `db/store.js` is the only data-access layer: an in-memory array that resets on restart. Routes call its functions and never hold data themselves.
