# NOTES.md

## CLAUDE.md

I kept it to four lean sections: a one-line project description, the commands I actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`), two real conventions (routes live one-per-file under `routes/` and are mounted in `server.js`; data access goes through `db/store.js` rather than touching the in-memory arrays directly), and a short architecture note on how `server.js`, `routes/`, `db/store.js`, and `tests/` fit together.

I deliberately left out: the course-assignment instructions from the README (settings.json, NOTES.md, submission/PR steps) since those are one-off homework steps, not standing guidance for future coding sessions; anything about `.env`/secrets beyond what's obvious, since there's nothing project-specific to say; and speculative conventions I couldn't derive from the actual code, so I wouldn't be inventing rules that don't hold up.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)` — I run tests constantly, and it's a safe, non-destructive command, so approving it every time was pure friction.
- **ask**: `Bash(git push:*)` — pushing affects a shared remote, so I want a chance to glance at what's being pushed each time rather than blanket-allowing it.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the `.env` deny rule, Claude could read real secrets straight into context/logs if a `.env` ever existed with live credentials. Without the force-push deny rule, an unattended `git push --force` could silently overwrite someone else's commits on the remote with no easy way to recover them.
