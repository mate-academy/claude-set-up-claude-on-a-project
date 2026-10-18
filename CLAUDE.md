# Claude course starter - small Express REST API (users + health) with an in-memory store

## Commands
- Dev server with auto-reload: npm run dev (http://localhost:3000)
- Run tests: npm test
- Lint: npm run lint (CI runs lint and test on Node 22 - both must pass)

## Conventions
- Use CommonJS (require / module.exports), not ES import/export
- Return errors as res.status(<code>).json({ error: "<message>" }) - 400 for invalid input, 404 for not found
- Route handlers access data only through db/store.js functions, never by editing the users array directly
- Tests use node:test + node:assert + supertest and import app from server.js; never call app.listen in tests

## Architecture
- server.js - entry point: creates the app, mounts routers, exports app; listens only when run directly
- routes/ - one file per resource (users.js, health.js), each mounted in server.js under /<resource>
- db/store.js - in-memory data helper; data resets on every restart
- tests/ - one *.test.js file per area
