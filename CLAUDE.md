## Description
A simple rest API for testing connections.
## Conventions
- Write TypeScript (`.ts`) with `import`/`export`, not `require`/`module.exports`. Strict mode is on, so give exported functions explicit parameter and return types.
- One route file per resource in `routes/`. Each file exports an `express.Router()` as its default export, and `server.ts` mounts it (`app.use("/users", usersRoutes)`).
- Routes never touch data directly. They go through functions in `db/store.ts`, and shared types (like `User`) live there too.
- In a route handler, send an error with `res.status(...).json({ error: "..." })` and then `return;` on its own line, not `return res.status(...)`.
- An unused parameter must be named exactly `_`, `req`, `res` or `next`, or lint warns. A name like `_id` is not exempt.
- Add a test in `tests/` for every new endpoint, using `supertest` against the exported `app`.

## Commands
- `npm run dev` — start the dev server (runs on http://localhost:3000)
- `npm test` — run the tests
- `npm run lint` — check code style
- `npm run typecheck` — check TypeScript types
- `npm run build` — compile to JavaScript (output goes to dist/)

## Architecture
- `server.ts` is the entry point. It creates the Express app, mounts the routers and exports `app` so tests can import it without opening a port.
- `routes/` has one router per resource (`users.ts`, `health.ts`).
- `db/store.ts` is an in-memory store standing in for a database. Data resets on every restart.
- `tests/` holds `node:test` + `supertest` tests, run through `tsx`.
