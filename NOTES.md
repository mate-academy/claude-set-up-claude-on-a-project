# NOTES.md

## CLAUDE.md

I kept it to four lean sections: a one-line description, Commands (`dev`, `test`, `lint`, plus running a single test), Conventions (quote/semicolon style, thin route handlers, the ESLint unused-arg exemption), and Architecture (entry point, router-per-resource, data access through `db/store.js`, and the CI pipeline).

I deliberately left out: a file-by-file directory listing (Claude can discover that itself), the in-memory store's actual data shape (visible in `db/store.js`, not worth duplicating), anything about `.env`/secrets beyond what's needed to know it exists, and generic advice like "write tests" or "don't leak API keys" — those don't earn their place and just add noise Claude has to read every session.

## Permissions (`.claude/settings.json`)

- **Allow**: `npm test`, `npm run lint` — safe, read-only-ish commands I run constantly; no reason to confirm every time.
- **Ask**: `git push` — not destructive, but I want a chance to review what's about to leave my machine before it does.
- **Deny**: reading `./.env` and `git push --force`. Without the `.env` deny rule, Claude could read and potentially echo real secrets (API keys, DB credentials) into a response or a file it writes. Without the force-push deny rule, an agentic slip could silently overwrite shared branch history with no easy way back.

## Verifying the setup

- Run `/memory` inside Claude Code to confirm `CLAUDE.md` is loaded — it opens the file that's currently in context.
- Run `/permissions` to confirm the allow/ask/deny rules above are active and showing up correctly.
