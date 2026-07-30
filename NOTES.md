# NOTES.md

## CLAUDE.md

I kept it to four short parts: a one-line description, the commands I run
often (`npm run dev`, `npm test`, `npm run lint`), two real conventions
(CommonJS over ESM, and always going through `db/store.js` instead of
touching the in-memory arrays directly from route files), and a short
architecture note (entry point, one route file per resource, data access
layer).

I left out anything Claude can already get from reading the code — the
exact shape of the `/users` and `/health` endpoints, the contents of
`package.json`, and one-off setup notes like `.env.example`. I also kept
out anything sensitive; there are no secrets or real config values in the
file. Shorter felt more useful than exhaustive: a long file just adds
noise Claude has to re-read every session.

## Permissions

In `.claude/settings.json` I added:

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe,
  read-only commands I run constantly, so I don't want to be prompted
  every time.
- **ask**: `Bash(git push:*)` — I want to confirm every push myself
  before it happens.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the
  first, Claude could read real secrets out of a local `.env` file and
  potentially leak them into its output or a commit; without the second,
  Claude could force-push and overwrite remote history, destroying
  teammates' work with no easy way back.

## Verification

- `/memory` shows `CLAUDE.md` as loaded.
- `/permissions` shows the allow / ask / deny rules from
  `.claude/settings.json`.
- Asking Claude "How do I run the tests here?" correctly answered
  `npm test`, pulled straight from `CLAUDE.md`.
