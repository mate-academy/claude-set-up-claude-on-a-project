# NOTES.md

## CLAUDE.md

I kept it to four short sections: a one-line project description, the three
npm commands I actually run day to day, two conventions that aren't obvious
from just reading the code (thin route handlers, pre-configured lint
exceptions for unused params), and a short architecture note explaining how
server.js, routes/, and db/store.js fit together.

I deliberately left out: the `--test-name-pattern` flag detail (a one-off
usage note, easy to look up when actually needed), any mention of specific
route paths or request/response shapes (that's obvious from reading
routes/*.js), and anything from .env.example (no secrets or config values
belong in a file that gets committed and fed into every session).

## Permissions

- Allow: `npm test`, `npm run lint` — safe, read-only-ish commands I run
  constantly; no reason to confirm each time.
- Ask: `git push` — not dangerous, but I want visibility into what's being
  pushed before it happens.
- Deny: reading `.env`, and `git push --force` — without the `.env` deny
  rule, Claude could end up reading real secrets into context and
  potentially leaking them in output or logs. Without the force-push deny
  rule, a bad suggestion (or a misclick) could overwrite shared history on
  the remote branch.

## Verification

- `/memory` shows CLAUDE.md loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asked "How do I run the tests here?" in a fresh session — Claude answered
  `npm test` directly from CLAUDE.md without me explaining the project.
