# CLAUDE.md

## Commands

```
npm run dev                                      # start with auto-reload on http://localhost:3000 
npm test                                         # run all tests 
npm run lint                                     # ESLint (eslint:recommended)
```

CI (`.github/workflows/ci.yml`, Node 22) runs `npm run lint` then `npm test` on every push and PR — both must pass.

## Architecture

- `server.js` builds the Express app, mounts each router under its resource path, and exports `app`. It only calls `listen()` when run directly (`require.main === module`), so tests import `app` and drive it with `supertest` without opening a port.
- `routes/` holds one `express.Router` per resource (`users.js` → `/users`, `health.js` → `/health`). A new resource means a new route file plus an `app.use(...)` line in `server.js`.
- `db/store.js` is the only data layer: an in-memory array with exported functions (`getAllUsers`, `getUserById`, `createUser`).

## Conventions

- CommonJS only: `require` / `module.exports`, not `import` / `export` (ESLint is configured with `sourceType: "script"`).
- Errors are returned as JSON `{ error: "<message>" }` with the right status (400 for invalid input, 404 for missing records); use `return res.status(...)` to exit early.
- Config comes from environment variables (see `.env.example`); never read or commit `.env`.
