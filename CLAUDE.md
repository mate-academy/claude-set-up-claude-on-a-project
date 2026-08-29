# claude-course-starter

A small Express REST API (`/users` + `/health`) used as the practice codebase for
the Claude Code course.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API on http://localhost:3000 with auto-reload
- `npm test` — run the Node built-in test runner over `tests/*.test.js`
- `node --test tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the repo

## Conventions

- CommonJS only (`require` / `module.exports`); `.eslintrc.json` sets
  `sourceType: "script"`, so no `import` / `export`.
- Double quotes and semicolons, matching the existing files.
- One route file per resource in `routes/`, mounted in `server.js`. Do not add
  route handlers directly to `server.js`.
- Routes never touch the `users` array directly — all data access goes through
  the helpers exported by `db/store.js`.
- Keep `server.js` exporting `app` and calling `app.listen` only when run
  directly, so tests can import the app without opening a port.

## Architecture

- `server.js` — entry point: builds the Express app, registers JSON parsing,
  mounts the routers, listens only when run directly.
- `routes/` — one router per resource (`users.js`, `health.js`).
- `db/store.js` — in-memory data store standing in for a database; resets on
  every restart.
- `tests/` — `node:test` + `supertest` hitting the exported `app`.
