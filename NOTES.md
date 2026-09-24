# NOTES

## CLAUDE.md

I kept the file to four lean parts: a one-line description, the commands I actually
run (`dev`, `test`, `lint`, plus how to run a single test), the conventions that
aren't obvious from a quick read, and a short architecture note.

The conventions earn their place because they would otherwise cause wrong guesses:
the project uses CommonJS (not ES modules — ESLint enforces `sourceType: "script"`),
double quotes, and all data access must go through `db/store.js`. The architecture
note explains the one subtle bit — `server.js` only calls `listen()` when run
directly so tests can import `app` via supertest.

I deliberately left out: the full course instructions from the README, a directory
listing (easy to discover with `ls`), and any generic advice ("write tests",
"don't commit secrets"). Anything obvious from the code was cut so the signal stays high.

## Permissions

- **allow** `npm test` and `npm run lint` — safe, read-only-ish commands I run
  constantly; allowing them removes repeated prompts.
- **ask** `git push` — I want a confirmation before anything leaves my machine.
- **deny** `Read(./.env)` and `git push --force` — these protect secrets and history.

Without the `Read(./.env)` deny rule, Claude could read real secrets from a local
`.env` and surface them in the conversation or a commit. Without the force-push deny,
a single command could overwrite shared branch history irrecoverably.

`.claude/settings.json` is committed so the rules are shared; `settings.local.json`
stays git-ignored and personal.

## Verification

In a fresh session, `/memory` lists this `CLAUDE.md` as loaded, and `/permissions`
shows the allow / ask / deny rules above. Asking "How do I run the tests here?"
is answered from `CLAUDE.md` (`npm test`) without further explanation.
