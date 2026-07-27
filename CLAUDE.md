# CLAUDE.md

A minimal Express REST API used as a learning project for Claude Code setup and configuration.

## Commands

```bash
npm run dev   # start API with auto-reload on http://localhost:3000
npm test      # run all tests (Node built-in test runner)
npm run lint  # check code style with ESLint
```

To run a single test file: `node --test tests/users.test.js`

## Conventions

- Use CommonJS (`require`/`module.exports`), not ES modules — `package.json` has no `"type": "module"`.
- One route file per resource under `routes/`; mount it in `server.js`.
- All data access goes through `db/store.js`; routes never manipulate the `users` array directly.
- `PORT` is read from `process.env.PORT`; real env vars live in `.env` (git-ignored, see `.env.example`).

## Architecture

`server.js` is the entry point — it creates the Express app, mounts route modules, and exports `app` without calling `listen` so tests can import it cleanly (listen only happens when the file is run directly).

`routes/` contains one file per resource; each exports an Express Router.

`db/store.js` is a plain in-memory array with named helper functions. Data resets on every restart — there is no persistence layer.

Tests use Node's built-in `node:test` runner with `supertest` for HTTP assertions; no separate test framework is installed.