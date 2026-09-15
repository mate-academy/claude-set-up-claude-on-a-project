# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (`/users`, `/health`) backed by an in-memory store — the starter codebase for the Claude Code course projects.

## Commands

```bash
npm install
npm run dev                          # node --watch server.js, on http://localhost:3000
npm test                             # node --test (discovers tests/*.test.js)
npm run lint                         # eslint .
node --test tests/users.test.js      # single test file
node --test --test-name-pattern="GET /health"   # single test by name
```

CI (`.github/workflows/ci.yml`) runs `npm install && npm run lint && npm test` on Node 22 for every push and PR — both must pass.

## Architecture

- `server.js` builds the `app`, mounts `express.json()` and one router per resource, and **only calls `listen()` when run directly** (`require.main === module`). It exports `app` so tests can drive it through supertest without binding a port. Keep that guard intact.
- `routes/<resource>.js` — one file per resource, each creating an `express.Router()`, exporting it as `module.exports`, and mounted at `/<resource>` in `server.js`. Add a new resource by adding a file here and mounting it there.
- `db/store.js` — the only data-access layer. It holds module-level arrays and resets on restart. Routes must go through its exported functions rather than touching data directly, so a real database can replace it without changing route code.
- `tests/` — `node:test` + `node:assert` + supertest against the imported `app`. No Jest/Mocha; don't add a test framework.

## Conventions

- CommonJS (`require` / `module.exports`), not ESM — `package.json` has no `"type": "module"` and ESLint parses `sourceType: "script"`.
- Double quotes, semicolons, 2-space indent.
- Routes validate input and return JSON errors as `{ error: "message" }` with an explicit status (`400` missing fields, `404` not found); success responses return the bare resource.
- ESLint is `eslint:recommended`; unused args named `req`, `res`, `next`, or `_` are allowed — other unused vars are warnings to fix.
- Config comes from `process.env` with an inline default (`process.env.PORT || 3000`). Document new vars in `.env.example`; never read or commit `.env`.

## Gotchas

- `.gitignore` entries after the first line are indented with leading spaces, which git does not strip — so `.env` and `.claude/settings.local.json` are **not** actually ignored. Verify with `git check-ignore -v <file>` before assuming a file is safe, and never `git add` them.
- This repo is a course exercise about configuring Claude Code (`CLAUDE.md`, `.claude/settings.json`, `NOTES.md`). The app code is deliberately fixed — don't refactor it unless asked.
