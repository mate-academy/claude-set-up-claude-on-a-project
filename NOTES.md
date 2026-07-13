# NOTES.md

## CLAUDE.md

I kept it to four lean parts: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), two conventions that aren't obvious from a quick skim (CommonJS over ESM, and routing through `db/store.js` instead of touching the in-memory array directly), and a short architecture note about how `server.js`, `routes/`, and `db/store.js` fit together.

I deliberately left out: a description of every route and its request/response shape (that's visible in `routes/*.js` in two seconds), the `.env.example` contents, and any mention of the in-memory store's data resetting on restart beyond one line — all things Claude can just read from the code. No secrets, no long pasted docs, nothing one-off.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — both are safe, read-only-ish commands I run constantly and don't want to approve every time.
- **Ask**: `git push` — I want a chance to review what's being pushed before it happens, but it's common enough that a full deny would be annoying.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets (API keys, credentials) into context and potentially leak them into a commit, a pasted log, or a suggestion. Without the force-push deny rule, an over-eager rebase/push could silently overwrite shared history on a branch someone else is using.

Verified with a fresh session: `/memory` shows `CLAUDE.md` as loaded, and `/permissions` lists the allow/ask/deny rules above.
