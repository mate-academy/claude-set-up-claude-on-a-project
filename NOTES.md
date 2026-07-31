# Notes

## CLAUDE.md

I kept it to four things: a one-line description, the commands I run often (`dev`, `test`, `lint`, plus how to run a single test file), an architecture note on how a request flows from `server.js` → `routes/` → `db/store.js`, and two conventions (new resources go in `routes/` following the existing pattern, and data access stays inside `db/store.js`).

I left out a file-by-file directory listing, since that's one `ls` away and would just go stale. I also left out generic advice like "write tests" or "handle errors" — that's true of every project and doesn't help Claude do anything differently here. Nothing sensitive went in since there's nothing sensitive in this starter beyond `.env`, which isn't referenced at all.

## .claude/settings.json

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — these are read-only or local-only commands I run constantly and don't want to approve every time.
- **Ask**: `git push` — visible to others, so I want a chance to glance at what's going out before it does.
- **Deny**: reading `./.env` and `git push --force`.

Without the `.env` deny rule, Claude could read real secrets into context the moment a `.env` file exists locally (it's git-ignored, but not Claude-ignored) — e.g. while debugging a config issue, and then those values could end up quoted back in a response or a commit message. Without the force-push deny rule, Claude could overwrite shared branch history while trying to "fix" a messy git state, silently discarding other people's commits.