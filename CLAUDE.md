Express REST API for managing users — a learning project for the Mate Academy Claude Code course.

## Commands
- `npm run dev` — start the API on http://localhost:3000
- `npm test` — run the test suite
- `npm run lint` — check code style with ESLint

## Conventions
- One route file per resource in `routes/` (e.g., `users.js`, `health.js`)
- Validate required fields at the route level before touching the store
- Data access goes through `db/store.js` — routes never manipulate the data array directly

## Architecture
- `server.js` — entry point; registers routes and exports `app` for tests (no live port in test mode)
- `routes/` — one file per resource; each exports an Express Router
- `db/store.js` — in-memory data helper; data resets on every restart, no real database
- `tests/` — imports `app` directly, not from a live server
