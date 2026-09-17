# NOTES

## CLAUDE.md

I kept it to four short sections: a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`), two conventions that aren't obvious from skimming a single file (CommonJS-only, and "data access goes through `db/store.js`, not directly from routes"), and a short architecture note pointing at `server.js`, `routes/`, and `db/store.js`.

I deliberately left out: a description of what each endpoint does (that's already clear from reading `routes/users.js` and `routes/health.js`, and would just go stale if the routes change), any mention of `.env.example` contents (nothing sensitive, but also nothing Claude needs restated), and any one-off task notes — this file should describe the project, not today's work.

## Permissions (.claude/settings.json)

- **Allow**: `npm test` and `npm run lint` — both are safe, side-effect-free, and I run them constantly, so I don't want to approve them every time.
- **Ask**: `git push` — pushing is reversible but visible to others, so I want a chance to glance at what's being pushed each time rather than blanket-allow or blanket-deny it.
- **Deny**: reading `.env`, plus `git push --force`, `git push -f`, and `git push --force-with-lease`. Without the `.env` deny rule, Claude could read real secrets (API keys, credentials) into context and potentially echo them back in a response or a file it writes — even though `.env` isn't committed, it exists locally per the setup instructions. Without the force-push deny rules, an agent working autonomously on a branch could overwrite someone else's history with no easy way to recover it; a single `--force` pattern isn't enough since `-f` and `--force-with-lease` are equally destructive but don't match it.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asking "How do I run the tests here?" is answered directly from `CLAUDE.md` (`npm test`) without needing further explanation.
