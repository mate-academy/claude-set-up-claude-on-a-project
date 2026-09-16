# NOTES.md

## CLAUDE.md

I kept `CLAUDE.md` to the four things the project needs: a one-line description, the commands I actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`), the real conventions this codebase follows (CommonJS modules, one route file per resource, JSON error bodies with proper status codes instead of throwing), and a short architecture note on `server.js`'s test-friendly listen guard and the centralized `db/store.js` data access.

I left out anything obvious from reading the code (e.g. restating what each route does line by line), one-off notes that only apply to this session, and anything that reads like a tutorial rather than a standing rule. I also didn't include speculative "best practices" that aren't actually enforced in this repo — every line is something Claude would otherwise have to ask about or get wrong.

## Permissions

In `.claude/settings.json` I added:

- **allow**: `npm test` and `npm run lint` — safe, read-only commands I run constantly, so I don't want to approve them every time.
- **ask**: `git push` — pushing affects the shared remote, so I want a chance to review before it happens, even though I trust Claude to run it.
- **deny**: reading `.env` and force-pushing.

Without the deny rule on `.env`, Claude could read real secrets (database URLs, API keys) into its context during normal exploration — even without malicious intent, that risks the secret being echoed back, logged, or included in a commit or PR description. Without the deny rule on `git push --force`, an agent trying to "fix" a messy branch could force-push over teammates' commits and silently destroy their work with no easy recovery.
