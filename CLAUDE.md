# CLAUDE.md

An in-memory Express REST API for users, with a health check.

## Commands

- `npm run dev` — start the API locally in watch mode
- `npm test` — run the test suite
- `npm run lint` — check code style

## Conventions

- Use CommonJS (`require` / `module.exports`), not ESM `import` / `export` — ESLint parses this project as `sourceType: "script"`.
- Test through the exported `app` with `supertest`, don't start a listening server in tests.

## Architecture

`server.js` is the entry point: it mounts routers and starts the server only when run directly.
Each resource gets its own file in `routes/`, mounted at its path in `server.js`.
All data access goes through `db/store.js` — routes never touch the data directly.
