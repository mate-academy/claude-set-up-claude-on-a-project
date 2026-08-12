# CLAUDE.md

Express API starter for practicing Claude Code setup — a tiny in-memory `/users` and `/health` service.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the `node --test` + supertest suite
- `npm run lint` — run eslint

## Conventions

- One route file per resource in `routes/`, mounted in `server.js` (`users.js`, `health.js`). New resources follow the same pattern.
- Routes never touch data directly — all reads/writes go through `db/store.js`.
- Validate required fields and return `400` with `{ error: "..." }` before calling the store (see `POST /users`).

## Architecture

`server.js` is the entry point: it builds the Express app, mounts routers, and only calls `app.listen` when run directly (so tests can `require` the app without opening a port). `db/store.js` is an in-memory data layer with no persistence — data resets on restart.
