# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line description, the commands I actually run (`dev`, `test`, `lint`), an architecture note pointing at the three files that matter (`server.js`, `routes/`, `db/store.js`), and two conventions that aren't obvious from skimming one file (CommonJS-only, and the JSON-error-response pattern for validation failures).

I left out anything Claude can already read from the code — the full route list, the shape of the store's functions, the ESLint rule details — and anything sensitive or one-off, like the `.env.example` contents or notes specific to this course exercise. Shorter felt more useful: a long file just gives Claude more chances to read something stale.

## Permissions

- **Allow**: `npm test` and `npm run lint` — both read-only from the repo's point of view (no writes, no network, no state changes), and commands I'd otherwise have to approve on every run.
- **Ask**: `git push` — not destructive on its own, but visible to others, so I want a chance to glance at it first.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets (a `DATABASE_URL`, API keys) straight off disk and potentially echo them into a response or a commit. Without the force-push deny rule, a bad rebase or a misread instruction could silently overwrite shared history on a branch other people are using.
