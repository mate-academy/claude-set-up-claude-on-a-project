# Notes: Claude Code setup

## What I put in CLAUDE.md, and what I left out

The `CLAUDE.md` has four short parts: a one-line description of the project, the three commands I run most (`npm run dev`, `npm test`, `npm run lint`), four conventions written as "do X, not Y" rules, and a few lines on the architecture (`server.js` as entry point, one route file per resource, data only through `db/store.js`).

I left out anything Claude can read straight from the code (file listings, what each function does), one-off notes or tasks, long pasted docs, and anything sensitive such as real values from `.env`. Every extra line costs attention in each session, so I kept only what changes how Claude works here.

## Permission rules

- **allow:** `Bash(npm test:*)` and `Bash(npm run lint:*)`. They are safe, I run them constantly, and approving them every time would be noise.
- **ask:** `Bash(git push:*)`. I want to confirm each push before code leaves my machine.
- **deny:** `Read(./.env)` and `Bash(git push --force:*)`.

Without the `.env` deny rule, Claude could read real secrets (API keys, database credentials) and they could end up in the conversation, in logs, or in a commit. Without the force-push deny rule, a single bad command could overwrite shared history on the remote and lose other people's work.

## Verification

- [x] `claude --version` runs (installed and signed in)
- [x] `/memory` shows `CLAUDE.md` loaded in a fresh session
- [x] `/permissions` shows the allow / ask / deny rules above
- [x] Asking "How do I run the tests here?" is answered from `CLAUDE.md` without extra explanation
