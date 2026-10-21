# NOTES.md

## CLAUDE.md choices

Included: one-line description, commands, conventions, architecture.
Left out: the CI details and the README pointer — not something Claude needs to act on, just noise for future sessions.

## Permission rules

- Allow: `npm test` — safe, run often, no reason to confirm each time.
- Ask: `git push` — want to confirm before code leaves my machine.
- Deny: reading `.env` and force-push — without the deny rule, Claude could leak secrets from `.env` into a response, or force-push and overwrite remote history.
