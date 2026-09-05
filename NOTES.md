CLAUDE.md: small project summary, commands (npm run dev, npm test, npm run lint), conventions (one route file per resource; use db/store.js for data access), and architecture notes (server.js is entry point). I left out implementation details and secrets.
Permissions: allow Bash(npm test:) so automated test runs are safe; ask Bash(git push:) to avoid accidental pushes; deny Read(./.env) and Bash(git push --force:*) to protect secrets and prevent destructive pushes.
I verified .claude/settings.json exists and will check /memory and /permissions in a fresh Claude session.
