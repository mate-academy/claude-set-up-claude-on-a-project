# Notes

## CLAUDE.md

I included a one-line description, the four commands I actually run
(`install`, `dev`, `test`, `lint`), the conventions that aren't obvious from a
quick skim (CommonJS-only, data access through `db/store.js`, one router per
resource, and the "`app.listen` only when run directly" pattern), and a short
architecture map.

I left out per-file walkthroughs, the seed users in `db/store.js`, and anything
from `.env` — those are either obvious from the code or sensitive, and every
extra line makes the file slower to load and easier to ignore.

## Permissions

- allow: `Bash(npm test:*)`, `Bash(npm run lint:*)` — safe, read-only, run
  constantly.
- ask: `Bash(git push:*)` — I want to confirm every push consciously.
- deny: `Read(./.env)`, `Bash(git push --force:*)`.

Without the deny rules, Claude could read real credentials out of `.env` and
surface them in the transcript, or force-push and rewrite shared history on the
remote. The deny list blocks both regardless of context.

## Verification

- `/memory` shows `CLAUDE.md` loaded at the project root.
- `/permissions` lists the allow / ask / deny rules above.
- Asking "How do I run the tests here?" is answered with `npm test` straight from
  `CLAUDE.md`.
