# Starter Express API for the Claude Code course projects.

## Commands
- `npm run dev` — start the API locally on port 3000
- `npm test` — run the test suite
- `npm run lint` — check code style with ESLint

## Conventions
- One route file per resource under `routes/`.
- All data access must go through `db/store.js`.

## Architecture
- `server.js` is the entry point, mounting routers and handling the express app setup.