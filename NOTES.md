# Notes

## What I put in CLAUDE.md and why

I kept the file short and focused on what Claude actually needs to know to be useful in this project.

**Kept:** The four dev commands (`dev`, `test`, `lint`, and how to run a single test by name) because these are the commands I run most. The conventions section calls out CommonJS over ESM and the one-route-per-file pattern — both are easy to get wrong if Claude guesses. The architecture section explains how `server.js` exports `app` for testing without opening a port, because that's not obvious from reading one file alone.

**Left out:** I didn't list every file or endpoint — Claude can discover those by reading the code. I left out generic advice like "write clean code" or "add tests" since that's not project-specific. I also kept secrets and environment details out of the file entirely.

## Permission rules and why

- **Allow** `npm test` and `npm run lint` — these are safe, read-only commands that I want Claude to run freely without asking every time. Always test.
- **Ask** `git push` — I want to confirm before anything goes to the remote. No pushing without my say-so.
- **Deny** reading `.env` — real secrets would live there; Claude should never see them. Also denied `git push --force` because force-pushing can destroy history and is never worth the risk on a shared repo.

Without the deny rule on `.env`, Claude could accidentally read and echo back API keys or database credentials in a conversation.
