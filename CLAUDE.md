# claude-course-starter
Small Express 4 REST API (users + health) with an in-memory store; CommonJS, Node 22.

## Commands
- `npm run dev` — start the API with --watch on http://localhost:3000 (PORT from env)
- `npm test` — node:test + supertest, test files in `tests/`
- `npm run lint` — ESLint (eslint:recommended); CI runs lint, then test

## Conventions
- Use CommonJS `require`/`module.exports`, not ES `import`/`export`.
- Use `node:test` + `node:assert`, not Jest/Mocha; test HTTP with `supertest` against the exported `app`, never a running port.
- Routes never touch data directly — go through `db/store.js` functions.
- Errors return JSON `{ error: "<message>" }` with the right status (400 validation, 404 not found).
- Use full, meaningful variable names; keep functions under 40 lines; add or update tests for every change.

## Architecture
- `server.js` — builds the Express app, mounts routers, exports `app`; only listens when run directly.
- `routes/<resource>.js` — one Express Router per resource, mounted at `/<resource>` in `server.js`.
- `db/store.js` — in-memory data access (resets on restart); the swap point for a real DB.
- Secrets live in `.env` (git-ignored); see `.env.example`. Never read or commit `.env`.
