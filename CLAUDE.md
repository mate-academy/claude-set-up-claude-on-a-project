\# Project Guide



Express API for managing users and checking API health.



\## Commands



\- `npm run dev` — start the API in development mode.

\- `npm test` — run the test suite.

\- `npm run lint` — check code style.



\## Conventions



\- Use one route file per resource in `routes/`; do not put unrelated routes in the same file.

\- Keep data access in `db/store.js`; do not access the data store directly from route handlers.

\- Run `npm test` after changing application behavior.

\- Run `npm run lint` before committing code changes.



\## Architecture



\- `server.js` is the application entry point and starts the Express API.

\- `routes/` contains one route file per resource, including users and health.

\- `db/store.js` provides the data-access layer for the application.

\- `tests/` contains the automated tests.

