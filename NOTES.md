# NOTES.md

## CLAUDE.md

I kept it to four lean parts: a one-line description, the commands I run most
(`dev`, `test`, single-test, `lint`), the architecture (how `server.js`,
`routes/`, and `db/store.js` fit together), and two conventions (env-based
config, and the `.claude/settings.json` vs `settings.local.json` split).

I left out a file-by-file listing of `routes/` and `tests/` — that's obvious
from opening the directory, and repeating it just gives Claude more to get
out of sync with the code. I also left out anything about secrets or the
course/assignment itself, since neither belongs in a file that's meant to
describe the codebase to Claude long-term.

## Permission rules

I added one allow rule (`npm test`, since I run it constantly and it's
read-only/safe), one deny rule (`Read(./.env)` and `git push --force`), and
one ask rule (`git push`).

Without the deny rule, Claude could read `.env` into context while exploring
the codebase — even though it's git-ignored, Claude has filesystem access
and would happily cat it if asked to "check the config." That risks leaking
real secrets into a conversation or a shared transcript. Blocking force-push
similarly prevents an agent from rewriting shared git history by mistake.

## Verification

Ran `/memory` and `/permissions` in a fresh session — `CLAUDE.md` shows as
loaded and the allow/deny/ask rules from `.claude/settings.json` are listed.
