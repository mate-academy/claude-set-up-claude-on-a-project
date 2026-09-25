# Notes

## What's in CLAUDE.md and what isn't

CLAUDE.md has a one-line description of the project, the three commands (`npm run dev`, `npm test`, `npm run lint`) and a short outline of the architecture (`server.js`, `routes/`, `db/store.js`). It also lists the conventions Claude can't safely guess: use CommonJS rather than ES modules, go through `db/store.js` for all data access, use the JSON error shape with 400/404/201 status codes, and don't change app code unless asked.

I left out anything Claude can read from the repo itself, like the endpoint list, dependency versions, and the setup steps in the README. I also left out formatting rules that ESLint already enforces. CLAUDE.md is loaded into every session, so each line costs context. Duplicated details also go stale, so the file only holds what's non-obvious and would lead to wrong code if missing.

## Permission rules

These are in `.claude/settings.json`:

- **allow** `Bash(npm test:*)`: running tests is safe and happens often, so it shouldn't prompt every time.
- **ask** `Bash(git push:*)`: pushing is visible to others, so I want to approve each push.
- **deny** `Read(./.env)` and `Bash(git push --force:*)`: Claude can never read secrets or force-push.

Without the deny rules, Claude could read `.env` while exploring the project. The API keys or passwords in it would then end up in the conversation and could be echoed into code, logs or commits. It could also force-push and overwrite commits on the remote, which is hard to undo and affects everyone working on the branch. One limitation is that `Read(./.env)` only blocks the Read tool. A shell command like `cat .env` isn't covered, so a stricter setup would also deny that through Bash or use sandboxing.
