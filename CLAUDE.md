# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express JSON API (users + health) used as the working codebase for the Claude Code course.

## Commands

```bash
npm run dev                                   # start with auto-reload on :3000
npm test                                      # all tests (node:test + supertest)
node --test tests/users.test.js               # one file
node --test --test-name-pattern="returns ok"  # one test by name
npm run lint                                  # eslint
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on every push and PR, on Node 22.

## Architecture

`server.js` is the entry point and the only place routers are mounted. It exports `app` and calls
`app.listen` **only** under `require.main === module`, so tests can import the app without binding a
port — preserve that guard when editing it.

Request flow: `server.js` → `routes/<resource>.js` → `db/store.js`.

- **`routes/`** — one file per resource, each exporting an `express.Router`. Paths inside a router are
  relative to its mount point, so `router.get("/")` in `users.js` serves `GET /users`.
- **`db/store.js`** — in-memory array standing in for a database; state resets on restart. Routes must
  go through its exported functions rather than touching the data directly, so swapping in a real
  database stays a one-file change.

There is no route at `/`, so a browser hitting the root correctly shows Express's "Cannot GET /". Use
`/health` or `/users` to check the server is up.

## Conventions

- CommonJS only (`require` / `module.exports`). ESLint is configured with `sourceType: "script"` and
  there is no `"type": "module"` — `import` syntax will fail lint.
- Double quotes and semicolons throughout.
- Adding a resource means a new `routes/<name>.js` plus one `app.use` line in `server.js`; don't
  register routes anywhere else.
- Error responses are `res.status(code).json({ error: "message" })`. Validate required fields in the
  route and return 400 before calling the store.
- Runtime dependencies stay at express alone; supertest and eslint are dev-only.

## Repo notes

- This repo is a course exercise whose deliverables are `CLAUDE.md`, `.claude/settings.json`, and
  `NOTES.md`. The app code is not meant to change — confirm before modifying it.
- `.gitignore` has leading whitespace on the `.env` and `.claude/settings.local.json` lines, which Git
  does not strip, so **neither is actually ignored**. Verify with `git check-ignore -v <path>` before
  staging either.
