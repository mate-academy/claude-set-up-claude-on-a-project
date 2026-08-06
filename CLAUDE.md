# Claude Course Starter — Express API

Small Express API with in-memory store, used as the scaffold for the Claude Code course projects.

## Commands
- `npm run dev` — start the API on `http://localhost:3000` with auto-reload (`node --watch`)
- `npm test` — run the sample tests (Node's built-in `node --test` runner)
- `npm run lint` — ESLint over the whole project

## Conventions
- CommonJS modules (`require` / `module.exports`) — not ESM
- One route file per resource under `routes/`; mount it in `server.js` with `app.use("/<resource>", ...)`
- All data access goes through `db/store.js` — never touch the in-memory `users` array directly from route handlers
- Return proper HTTP status codes: `400` for missing/invalid input, `404` for not found, `201` for created

## Architecture
- `server.js` — entry point; wires middleware, mounts routes, and starts the listener only when run directly (so tests can import `app` without opening a port)
- `routes/` — one Express router per resource (`users.js`, `health.js`)
- `db/store.js` — the in-memory data helper; the seam where a real database would slot in later
- `tests/` — uses `supertest` + Node's `--test` runner; imports `app` from `server.js`
