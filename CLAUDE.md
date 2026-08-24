# CLAUDE.md

A tiny Express API used as the sample project for the Claude Code course.

## Commands

- `npm run dev` — start the API on `http://localhost:3000` with `node --watch` (auto-reloads on save)
- `npm test` — run the whole suite via the built-in `node --test` runner
- `npm test -- tests/users.test.js` — run a single test file
- `npm run lint` — ESLint over the repo (`eslint:recommended` + the rule in `.eslintrc.json`)

## Architecture

- `server.js` is the entry point. It wires middleware and mounts routers, then only calls `app.listen` when run directly (`require.main === module`) so tests can `require("../server")` without opening a port. It exports the `app`.
- `routes/` holds one router per resource (`users.js`, `health.js`), each mounted at its own path in `server.js`. New resources get their own file here and a matching `app.use("/thing", …)` line.
- `db/store.js` is a plain in-memory module (module-scoped arrays + exported functions). It stands in for a real database; data resets on every restart. All persistence goes through it — routes never touch the arrays directly.
- Tests use `supertest` against the exported `app`, not a live HTTP server.

## Conventions

- CommonJS only (`require` / `module.exports`). `package.json` has no `"type": "module"` and ESLint is configured with `sourceType: "script"`.
- Routes validate input and return a JSON `{ error: "…" }` with the appropriate status (`400` for bad input, `404` for missing records) — match this shape when adding endpoints.
- Real secrets belong in `.env` (git-ignored). Only `.env.example` is committed; never add real values to it.
