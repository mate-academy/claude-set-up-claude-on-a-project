# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), an architecture note on the `server.js` → `routes/` → `db/store.js` layering (including why `server.js` only calls `.listen()` when run directly — that's not obvious from a quick glance and matters for how tests import the app), and two real conventions pulled from the existing code (quote/semicolon style, JSON error-response shape).

I deliberately left out: a file-by-file directory listing (Claude can just look), generic engineering advice ("write tests", "handle errors") that isn't specific to this repo, and everything in the README that's course/assignment logistics (branching, PR steps, Definition of Done) rather than guidance for working in the code itself. Shorter felt more useful here — this is a tiny starter app, and a long CLAUDE.md would mostly be noise Claude has to re-read every session.

## Permission rules

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, read-only-effect commands I run constantly and don't want to approve every time.
- **Ask**: `Bash(git push:*)` — pushing is usually fine but I want a chance to glance at what's being pushed first.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)`.

Without the `.env` deny rule, Claude could read real secrets (API keys, DB credentials) straight into the conversation the first time it went looking for config — even innocently, e.g. while debugging a "why isn't PORT picked up" issue. Without the force-push deny rule, Claude could rewrite shared branch history (overwriting a teammate's commits) while just trying to "clean up" a push that got rejected for being non-fast-forward.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" answers from `CLAUDE.md` (`npm test`) without further explanation needed.
