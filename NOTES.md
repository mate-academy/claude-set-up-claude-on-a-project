# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the commands I run often (`dev`, `test`, `lint`, plus how to run a single test), a short architecture section covering the parts that span multiple files (the `require.main === module` guard in `server.js` that lets tests import `app` without opening a port, the one-router-per-resource convention, and `db/store.js` as the single data-access layer), and nothing else.

I left out a file-by-file directory listing (discoverable by reading the repo), generic advice like "write tests" or "don't commit secrets," and any mention of the course assignment itself (installing Claude, submitting a PR) — that's a one-off task, not a lasting fact about the codebase, so it doesn't belong in a file every future session loads.

## Permissions

Rules added, mirrored in the committed `.claude/settings.json`:

- **allow** `Bash(npm test:*)` — running tests is safe and frequent; no reason to confirm it every time.
- **ask** `Bash(git push:*)` — pushing affects the shared remote, so I want a checkpoint before it happens, even though it's not destructive on its own.
- **deny** `Read(./.env)` — without this, Claude could read real secrets straight out of the git-ignored `.env` file and potentially echo them into a response or a commit. Denying the read removes that path entirely rather than relying on Claude choosing not to.
- **deny** `Bash(git push --force:*)` — a force-push can silently overwrite or lose commits on a shared branch; without the deny rule, a bad rebase or history rewrite could push through without a second thought.
