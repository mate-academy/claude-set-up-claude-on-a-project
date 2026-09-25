# CLAUDE.md

A small Express REST API (users + health check) that serves as the starter project for a Claude Code course.

## Commands

- `npm run dev`: start the API on http://localhost:3000 with `node --watch` (set `PORT` to change the port)
- `npm test`: run all tests with Node's built-in runner (`node --test`)
- `npm run lint`: ESLint (`eslint:recommended`)

CI (`.github/workflows/ci.yml`) runs `npm run lint`, then `npm test`, on Node 22. Both must pass.

## Conventions

- Use CommonJS (`require` / `module.exports`), not ES modules. ESLint is configured with `sourceType: "script"`.
- Error responses are JSON shaped `{ error: "<message>" }` with the right status code (400 for validation, 404 for missing).
- Route params arrive as strings. Convert IDs with `Number(req.params.id)` before calling the store, because the store compares with `===`.
- Put a one-line comment above each route handler in the form `// METHOD /path — what it does`.
- Keep real config in `.env`, which is git-ignored. `.env.example` holds only placeholders.


## Architecture

- `server.js` builds the Express app, mounts one router per resource, and exports `app`. It only calls `listen()` when it is run directly (`require.main === module`), so tests import `app` and never open a port.
- `routes/<resource>.js` holds one `express.Router()` per resource, mounted in `server.js` (`/users`, `/health`).
- `db/store.js` is the only data layer: an in-memory array with `getAllUsers`, `getUserById` and `createUser`. Nothing is persisted, and the data resets on restart. Routes go through these functions and never touch the array directly.

