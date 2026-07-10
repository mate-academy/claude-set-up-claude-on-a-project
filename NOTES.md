# NOTES.md

## CLAUDE.md choices

I kept `CLAUDE.md` to four short sections: a one-line project description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`), an architecture review covering the `server.js` listen-guard pattern, the one-file-per-resource `routes/` split, and the in-memory `db/store.js`, and two conventions (CommonJS modules, inline validation with JSON error bodies). I left out anything about `.env`/secrets handling, since that's already obvious from `.gitignore` and didn't need repeating. I also skipped a file-by-file listing of `routes/` and `tests/` — those are easy to discover by browsing, and padding the file with them would just be noise Claude has to re-read every session.

## Permission rules

I added `.claude/settings.json` with:

- **allow**: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, read-only-ish commands I run constantly, no reason to confirm every time.
- **ask**: `Bash(git push:*)` — pushing is visible to others, so I want a chance to double-check before it happens, without fully blocking it.
- **deny**: `Read(./.env)`, `Bash(git push --force:*)` — without the `.env` deny rule, Claude could read real secrets straight into context and potentially echo them back or include them in a commit message. Without the force-push deny rule, Claude could overwrite shared branch history and destroy someone else's commits with no easy recovery.
