# CLAUDE.md


Starter Express API — CommonJS, in-memory data store.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the API with `node --watch` on http://localhost:3000
- `npm start` — start the API without watch mode
- `npm test` — run all tests (`node --test`)
- `npm test -- tests/users.test.js` — run a single test file
- `npm run lint` — run ESLint over the whole project

## Conventions

- Use `require`/`module.exports`, not `import`/`export`.
- Use one route file per resource in `routes/`, not scattered route handlers.
- Use `db/store.js` for data access, not direct mutations in route handlers.
- Route handlers stay thin: validation and response shaping happen in the route; data access goes through `db/store.js`, never direct manipulation of data structures from a route file.
- ESLint config (`.eslintrc.json`) allows unused `req`/`res`/`next` args and `_`-prefixed args; otherwise follows `eslint:recommended`.

## Architecture

- `server.js` is the entry point: builds the Express `app`, mounts `routes/users.js` at `/users` and `routes/health.js` at `/health`, and only calls `app.listen` when run directly (`require.main === module`) — this lets `tests/` import `app` from `server.js` and drive it with `supertest` without opening a real port.
- `db/store.js` is an in-memory data store standing in for a real database; state resets on every server restart. All user data access goes through its exported functions (`getAllUsers`, `getUserById`, `createUser`).