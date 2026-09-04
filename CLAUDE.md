A small Express REST API (users + health) that serves as the practice codebase for the Claude Code course.

## Commands

- `npm run dev` — start the API with auto-reload on `http://localhost:3000`
- `npm test` — run the full test suite (`node --test`)
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — ESLint over the whole project

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules — `.eslintrc.json` sets `sourceType: "script"`.
- Double-quoted strings and semicolons, matching the existing files.
- Route handlers never touch data directly — all reads and writes go through `db/store.js`.
- Add a new resource as its own file in `routes/`, then mount it in `server.js` under its path prefix.
- `server.js` must keep exporting `app` and only call `app.listen` under `require.main === module`, so tests can import it without opening a port.

## Architecture

- `server.js` — entry point: builds the Express app, adds `express.json()`, mounts each route module under its prefix (`/users`, `/health`).
- `routes/` — one router file per resource. Handlers validate input and shape the HTTP response.
- `db/store.js` — in-memory data store standing in for a database. Seeded with two users; state resets on restart. The only module that holds application data.
- `tests/` — `node:test` + `supertest`, exercising the routes through the exported `app`.
