# NOTES.md

## CLAUDE.md

I kept it to four lean sections: a one-line project description, the commands I actually run (`npm install`, `npm run dev`, `npm test`, running a single test file, `npm run lint`), a short architecture note (entry point, one router per resource, `db/store.js` as the only place that touches data), and a one-line reminder that this exercise is about configuring Claude Code, not changing app code.

I left out anything Claude can already work out by reading the code — full route lists, the exact shape of the in-memory store, dependency versions — since that goes stale and doesn't save Claude any time. I also left out the CI file contents (just pointed at `.github/workflows/ci.yml`) and anything from `.env.example`, since secrets and one-off config don't belong in a file that's committed and always loaded into context.

## Permissions (`.claude/settings.json`)

- **allow**: `Bash(npm test:*)` — this is the command I run constantly while iterating, so I don't want a confirmation prompt every time.
- **ask**: `Bash(git push:*)` — pushing is easy to reverse for a normal push, but I still want a chance to glance at what's being pushed before it happens.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the `.env` deny rule, Claude could read real secrets into context and potentially echo them back or include them in a commit/PR. Without the force-push deny rule, a bad `git reset`-then-push sequence could silently overwrite shared branch history with no easy way to recover it.

## Verification

- `/memory` shows this `CLAUDE.md` as loaded.
- `/permissions` shows the allow/ask/deny rules above.
- Asking "How do I run the tests here?" in a fresh session returns `npm test` (and the single-file variant) straight from `CLAUDE.md`, without needing to explain the project first.
