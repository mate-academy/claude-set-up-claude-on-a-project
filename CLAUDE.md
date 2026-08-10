# CLAUDE.md

## Project
Web app - User clicks a point on a map or enters a location/postcode → app geocodes it → fetches crimes near that point for a given month → shows a breakdown by category (chart) and a list/map of incidents → user can drill into a specific crime to see its outcome status.

## Commands
```
npm install
npm run dev      # start the API with auto-reload (node --watch) on http://localhost:3000
npm start        # start the API without auto-reload
npm test         # run all tests (node:test)
npm run lint     # run eslint
```

Run a single test file:
```
node --test tests/users.test.js
```

## Architecture
- `server.js` — app entry point; mounts routers and starts the server. Exports the `app` (without listening) when required by tests, so `require("../server")` in a test never opens a real port.
- `routes/` — one file per resource (`users.js`, `health.js`), each exporting an Express `Router`.
- `db/store.js` — the only place data is read or written; an in-memory array standing in for a database. Route handlers should go through this module rather than touching data directly.
- `tests/` — `node:test` + `supertest`, one file per resource, importing the exported `app`.

## Conventions
- Components are function declarations, one per file in `src/components/`, filename matching the component name in PascalCase (`Header.jsx`, `UserInput.jsx`, `Results.jsx`).
- Props are destructured directly in the function signature 
- Callback props are named `onX` (`onInputChange`); the handler function passed in is named `handleX` (`handleInputChange`).

