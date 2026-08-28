# Project: Simple Express API
A lightweight REST API for managing users with health check endpoints.
## Commands
- `npm run dev` — Start the development server
- `npm test` — Run the test suite
- `npm run lint` — Check code style


## Conventions
- Use Express.js for all routes
- One route file per resource in `routes/`
- All data access goes through `db/store.js`


## Architecture
- `server.js` — Entry point, initializes Express and loads routes
- `routes/` — Contains `users.js` and `health.js`
- `db/store.js` — In-memory data store
