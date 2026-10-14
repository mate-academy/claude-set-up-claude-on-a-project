# Express Users API

Small Express REST API with a `users` resource and a health check, backed by an in-memory store.

## Commands

- `npm run dev` — start the API on http://localhost:3000
- `npm test` — run the test suite (`tests/`)
- `npm run lint` — check code style; run before finishing any change

## Conventions

- One route file per resource in `routes/`; never define routes in `server.js`.
- Access data only through `db/store.js`; never keep state in route files.
- Read config from `process.env`; add any new variable to `.env.example`, never to code.
- Every new or changed route needs a test in `tests/`; run `npm test` and `npm run lint` before declaring it done.

## Architecture

- `server.js` is the entry point: creates the app, mounts the routers, starts the server.
- `routes/users.js` and `routes/health.js` each export an Express router for one resource.
- `db/store.js` is the single in-memory data helper used by the routes.
- `tests/users.test.js` is the sample test; new tests follow its style.
