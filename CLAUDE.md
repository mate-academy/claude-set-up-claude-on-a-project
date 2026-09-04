# claude-course-starter

Express API with in-memory user storage; a practice project for the Claude Code course.

## Commands

- `npm run dev` — start the API on http://localhost:3000 (auto-restarts on change)
- `npm test` — run the tests (`node --test`)
- `npm run lint` — check code style (eslint)

## Conventions

- CommonJS only: `require` / `module.exports`, not ES module `import` / `export`.
- Error responses are `res.status(code).json({ error: "message" })` — match this shape for new endpoints, don't throw raw errors.
- All data access goes through `db/store.js` — never read or mutate the in-memory arrays from a route file directly.

## Architecture

- `server.js` — creates the Express app and mounts routers; only calls `app.listen` when run directly, so tests can `require` the app without opening a port.
- `routes/` — one router file per resource (`users.js`, `health.js`), mounted in `server.js`.
- `db/store.js` — the only place that touches the in-memory data.
