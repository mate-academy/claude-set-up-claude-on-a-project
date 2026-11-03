## Project
Bluebird (nickname: RavenClaw). A small Express (Node.js) REST API for managing users. The code lives in `claude-set-up-claude-on-a-project/`; run every command from that folder.

## Commands
- Run the app (auto-restarts on save, port 3000): `npm run dev`
- Run all tests: `npm test`
- Run a single test: `node --test --test-name-pattern="GET /health" tests/`
- Lint: `npm run lint`

## Conventions
- The code in the project should use British spelling
- One line comment above every export function
- CommonJS modules (`require` / `module.exports`), not ES `import`/`export`

## Architecture
- `server.js` is the entry point: it mounts the routes and only listens on a port when run directly, so tests can import `app`
- One route file per resource in `routes/` (`users.js`, `health.js`)
- Data access goes through `db/store.js` only; routes never touch the data directly
- `db/store.js` is in memory, so data resets on every restart
- Tests are in `tests/` and use `node:test` with `supertest`
