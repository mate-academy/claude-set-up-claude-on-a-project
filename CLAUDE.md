# Project
Small Express API for users and health checks, backed by an in-memory store.

## Commands
- `npm run dev`: start the API with file watching on port 3000 (or PORT).
- `npm test`: run the Node test runner; run after changing API behavior.
- `npm run lint`: check JavaScript with ESLint before committing.

## Conventions
- Use CommonJS `require` and `module.exports` to match existing modules.
- Put each resource's HTTP handlers in its own file in `routes/`; access user data through `db/store.js`.
- Return JSON errors with an appropriate HTTP status; cover changed success and failure cases in `tests/`.
- Keep secrets in the ignored `.env`; never copy secret values into tracked files.

## Architecture
- `server.js` assembles middleware and mounts `/users` and `/health`; it listens only when run directly so tests can import the app.
- `routes/` defines resource routers; `db/store.js` manages nonpersistent user data.
- `tests/users.test.js` exercises the API with Supertest and the Node test runner.
