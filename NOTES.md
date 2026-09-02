# Notes

## CLAUDE.md

I kept it to a one-line description, commands, conventions, and architecture — the four things the course asked for. The conventions I picked (CommonJS over ESM, routes calling into `db/store.js` rather than touching data directly) are things Claude could get wrong by guessing, since nothing enforces them except the existing code style.

I left out a file-by-file walkthrough of `routes/` and `db/store.js` — that's obvious from opening the files — and any notes about the in-memory store resetting on restart, since that's already commented in `db/store.js` itself. Also left out anything about `.env`/secrets, since there's nothing sensitive in this starter project to document.

## Permission rules

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — the two commands I'd run constantly during a session, and both are read-only/side-effect-free.
- **Ask**: `Bash(git push:*)` — pushing is easy to reverse but visible to others, so I want a chance to check the diff first each time.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the `Read(./.env)` deny, Claude could end up reading real secrets into context (and potentially echoing them back or into a commit) just by exploring the repo — there's nothing else stopping it from opening that file. Without the force-push deny, a bad rebase or an overeager "let me fix this" could overwrite shared history on the remote with no easy way back.

## Checks done
- I run the command /memory and /permissions to check if my changes are present
