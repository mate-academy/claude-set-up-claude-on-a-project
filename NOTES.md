For 1 Command, i add in CLAUDE.md
- `curl http://localhost:3000/health` — quick manual smoke test against a running server (requires `npm run dev`/`npm start` in another terminal)
for 1 Architecture, i add in CLAUDE.md
- `db/store.js` — the only data-access layer; routers call into it rather than reading/writing arrays themselves. Data is in-memory and resets on restart.

allowing the non-destructive npm scripts for this project:

Bash(npm install) — installs dependencies
Bash(npm test) — runs the test suite
Bash(npm run lint) — runs ESLint
