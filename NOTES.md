# NOTES.md

The application is user registry where you can list and show user contact inrmormation.
It should be mention that real application with personal information must follow GDPR and related rules.

# CLAUDE.md choices

I kept it to four short sections: a one-line description, Commands, Conventions, and Architecture ” all pulled directly from the actual code (`server.js`, `routes/`, `db/store.js`, `.eslintrc.json`, `package.json`) rather than the README's course framing.

Left out on purpose:
- Anything about the course itself (units, submission steps, definition of done) â€” that's in README.md and isn't something Claude needs to operate on the code.
- A description of each route's behavior (e.g. exact status codes) â€” that's easily read from `routes/users.js` itself and would go stale the moment a route changes.
- Any mention of `.env` contents or secrets.
- An earlier, unrelated draft of this file that referenced a Python image-deduplication script from a different project on my machine â€” it had nothing to do with this repo, so I replaced it rather than merge it in.

## Permission rules

- **Allow**: `npm test` and `npm run lint`. Both are usefull on daily base usage and read-only from the repo's point of view (no writes, no network, no state changes), and they're the commands I'd want Claude to run without asking every time it checks its own work.
- **Ask**: `git push`. Reversible enough not to deny outright, but visible to others once it happens, so I want a chance to look first.
- **Deny**: reading `.env` and force-pushing. Without the `.env` deny rule, Claude could read real secrets (e.g. a `DATABASE_URL`) into context the moment a real `.env` exists, even though nothing in this starter needs it. Without the force-push deny rule, a bad `git push --force` could silently overwrite someone else's commits on a shared branch with no easy way back.

