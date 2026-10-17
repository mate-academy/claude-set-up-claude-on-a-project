# claude-course-starter

Small Express 4 REST API (users + health) with an in-memory store, used as a Claude Code practice project.

## Commands
- `npm run dev` — start with auto-reload on http://localhost:3000 (`PORT` env overrides)
- `npm test` — run all tests (`node --test`, picks up `tests/*.test.js`)
- `npm run lint` — ESLint (`eslint:recommended`); run it and tests before finishing any change

## Architecture
- `server.js` — entry point: mounts routers, exports `app`. Only calls `listen` when run directly, so tests import `app` without a port.
- `routes/` — one Router file per resource, mounted at `/<filename>` in `server.js`.
- `db/store.js` — in-memory data (resets on restart). Routes must go through its functions, never touch the arrays directly.

## Conventions
- CommonJS only (`require` / `module.exports`); no ESM `import`.
- Double quotes, semicolons, 2-space indent.
- Validate input in the route handler with early returns. Errors are `res.status(code).json({ error: "message" })`; use 201 for creates, 400 for bad input, 404 for missing.
- Convert `req.params.id` with `Number()` before calling the store.
- Put a `// METHOD /path — description` comment above each route.
- New resource = new `routes/<name>.js` + a store function + `app.use("/<name>", ...)` in `server.js`.
- Tests: `node:test` + `node:assert` + `supertest` against the exported `app`, in `tests/<resource>.test.js`. Don't use Jest/Mocha.
- Never read or commit `.env`; add new config keys to `.env.example`.
