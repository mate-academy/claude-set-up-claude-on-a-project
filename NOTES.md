# Notes

## CLAUDE.md choices
I kept only the essential commands (dev, test, lint) and the core architecture (server.js, routes/, db/store.js). I deliberately left out obvious code details and anything sensitive like `.env` contents.

## Permission rules
I added an allow rule for `npm test`, an ask rule for `git push`, and a deny rule for reading `.env` and force-pushing. Without the deny rule, Claude could accidentally read sensitive secrets.

## Verification
- `/memory` shows CLAUDE.md loaded.
- `/permissions` shows my rules.