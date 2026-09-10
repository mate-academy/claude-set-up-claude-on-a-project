# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A small Express REST API (starter project for the Claude Code course) serving an in-memory `users` resource.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run all tests (Node's built-in test runner + Supertest)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the project

CI (`.github/workflows/ci.yml`) runs `npm run lint` then `npm test` on every push and PR.

## Conventions

- Use `require`/`module.exports` (CommonJS), not ES module `import`/`export` — `.eslintrc.json` sets `sourceType: "script"`.
- Route handlers stay thin: validate input and call into `db/store.js` for data access rather than manipulating the `users` array directly from a route file.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts routers, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` and drive it with Supertest without opening a real port.
- `routes/` has one file per resource (`users.js`, `health.js`), each exporting an `express.Router()` mounted in `server.js`.
- `db/store.js` is the sole data-access layer: an in-memory array wrapped by `getAllUsers` / `getUserById` / `createUser`. State resets on every restart — there is no real database in this starter.
