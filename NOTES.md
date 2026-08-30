# NOTES

## CLAUDE.md

I kept the three things that cost time to rediscover by reading several files at once:
the `require.main === module` guard in `server.js` (it exports the app and only listens
when run directly, which is what lets the tests import it), the fact that `db/store.js`
is a single in-memory array shared across the whole process (so a test that POSTs a user
affects later tests), and the CommonJS-only rule enforced by ESLint's `sourceType:
"script"`. I added the commands, including how to run a single test file.

I cut the list of routes and the per-file descriptions: both are visible in ten seconds
in `routes/`, and the README already covers them. I also left out generic advice like
"write tests" — it adds tokens without changing any decision.

## Permissions

`allow` covers what I run constantly and what changes nothing: the test and lint
commands, plus the read-only `git status` / `diff` / `log`. `ask` covers actions with
lasting effects — `git commit`, `git push`, and `npm install`, which downloads code from
the network and can run arbitrary `postinstall` scripts. `deny` blocks `Read(./.env)`,
`git push --force` (and `-f`, since matching is literal), and `git reset --hard`.

Without the deny rules, a single wrong command is unrecoverable: a force-push overwrites
remote history and can erase someone else's commits, `reset --hard` destroys uncommitted
work with no undo, and reading `.env` would pull a real secret into the session
transcript. These are guardrails against accidents, not a security boundary — matching is
on the command prefix, so a variant like `--force-with-lease` is not covered.

## Verified

`/memory` shows `CLAUDE.md` loaded, `/permissions` shows the allow / ask / deny rules.

## Fix along the way

`.gitignore` had leading spaces on every line but the first, so `.env`, `npm-debug.log*`
and `.claude/settings.local.json` were never actually ignored — leading whitespace is
part of the pattern in gitignore. Removed the indentation and confirmed with
`git check-ignore -v`.
