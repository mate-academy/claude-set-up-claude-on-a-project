# CLAUDE.md

Small Express REST API (users + health check) with an in-memory store.

## Commands

- `npm run dev` — start on http://localhost:3000 with auto-restart
- `npm test` — run all tests
- `npm run lint` — run ESLint

## Conventions

- New resource: a new file in `routes/` plus one `app.use` line in `server.js`, not handlers written in `server.js`.
- Data: add or call a function in `db/store.js`, not arrays or data kept inside a route file.
- Tests: `node:test` + `supertest` against the exported `app`, not Jest or a server started with `listen`.
- Modules: `require` / `module.exports`, not `import` / `export`.

## Architecture

- `server.js` builds the app, mounts the routers and exports `app`; it calls `listen` only when run directly, so tests can import it.
- `routes/` has one `express.Router()` per resource.
- `db/store.js` keeps data in memory arrays that reset on restart; IDs are numbers.
