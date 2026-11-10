One-line: Kleine Express-API mit User-Routes, In-Memory-Store und Tests.
Commands:
- npm run dev    # startet den API-Server auf http://localhost:3000
- npm test       # führt die Tests aus
- npm run lint   # prüft Code-Style


Conventions:
- Use ES modules/CommonJS as the repo currently uses (do not change import style).
- Keep one route per file under routes/ (e.g. routes/users.js).
- Do not add secrets to source—use .env (which is gitignored).
- Tests are the source of truth for behavior; update tests when changing behavior.


Architecture:
- Entry point: server.js starts the Express app.
- routes/: one file per resource (users.js, health.js).
- db/store.js: in-memory data helper used by route handlers.
- tests/: simple Jest tests; run `npm test` to execute.
