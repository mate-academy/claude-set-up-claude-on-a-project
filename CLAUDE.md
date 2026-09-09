# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A minimal Express API (course starter project): `/health` and `/users` endpoints backed by an in-memory store.

## Commands

```
npm install       # install dependencies
npm run dev        # start the API with auto-reload (http://localhost:3000)
npm start          # start the API without auto-reload
npm test           # run all tests (Node's built-in test runner)
npm run lint        # run ESLint
node --test tests/users.test.js   # run a single test file
```

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on every push/PR — keep both green before opening a PR.

## Conventions

- CommonJS throughout (`require` / `module.exports`), not ES module `import`/`export` — `.eslintrc.json` sets `sourceType: "script"`.
- One route file per resource in `routes/`, mounted in `server.js` (e.g. `routes/users.js` → `app.use("/users", usersRoutes)`).
- All data access goes through `db/store.js`; routes never touch the in-memory arrays directly.

## Architecture

- `server.js` builds the Express app, mounts routers, and exports `app` — it only calls `app.listen` when run directly (`require.main === module`), so `tests/*.test.js` can `require("../server")` and drive it with `supertest` against an in-memory instance instead of a real port.
- `db/store.js` is a fake database: plain in-memory arrays with no persistence, reset on every restart. It's the seam where a real database would later be swapped in.
