# Notes

## CLAUDE.md

Included: the project summary (starter Express API for the Claude Code course, not production), the commands to install/run/test/lint the app, the two-file architecture note explaining how `server.js` is exported for `supertest` without opening a real port, and the conventions (CommonJS, JSON error bodies with proper status codes instead of throwing).

Left out: no explanation of *how* Express, Node's test runner, or supertest work internally — that's general knowledge Claude already has, not project-specific. Also left out speculative future architecture (e.g. auth, database) since this is a small starter repo and documenting things that don't exist yet would just go stale. Kept it short so it stays useful instead of turning into unmaintained documentation.

## Permissions (.claude/settings.json)

Allowed without prompting: `npm test`, `npm install`, `npm run dev`, `npm start`, `npm run lint` — routine, safe commands needed constantly during this kind of work.

Ask before running: `git push` (any form) — pushing affects the shared remote, so it should always get a confirmation.

Denied outright: reading `./.env` and force-pushing (`git push --force`).

Without the `.env` deny rule, Claude could read and potentially echo back secrets (API keys, tokens) into the conversation or a file, leaking them. Without the force-push deny rule, an agent could rewrite shared branch history and silently overwrite a teammate's commits — a hard-to-reverse, easy-to-miss mistake compared to a normal push, which is why force-push gets a hard deny instead of just an "ask".
