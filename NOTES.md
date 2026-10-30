# NOTES

## What is in CLAUDE.md, and what I left out

I kept four short parts: a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus `npm install` once), concrete conventions and a short architecture map. Each convention is written as "use X, not Y" so Claude can follow it without asking — for example CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, and data access only through `db/store.js`. These are things Claude could easily get wrong by guessing from habits in other projects.

I deliberately left out:

- explanations of each endpoint and the sample data — Claude can read that from the code in seconds;
- the README's setup instructions (terminal, `git clone`, `cd`) — they are for people, not for Claude, and would only make the file longer;
- anything from `.env` or other config values — secrets never belong in a committed file;
- one-off task notes ("this week I'm doing X") — they go stale and then mislead every future session.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `git status`, `git diff` — safe, read-only or quick checks I run all the time, so Claude should not have to ask each time.
- **ask:** `git push` and `npm install` — both change something outside my working copy (the remote, or the dependency tree), so I want to confirm them.
- **deny:** reading `.env` / `.env.*`, `git push --force` / `-f`, `git reset --hard`, `rm -rf`.

Without the deny rules Claude could read `.env` while "debugging config" and print a real secret into the chat or a log, or "fix" a rejected push with a force-push and overwrite other people's commits on the remote. `reset --hard` and `rm -rf` can destroy uncommitted work with no undo.

## Fix to .gitignore

The lines in `.gitignore` started with spaces. Git treats leading spaces as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored (I checked with `git status --ignored`). I removed the indentation, so both are ignored now and cannot be committed by accident.

## Verification

- `claude --version`: _TODO — paste the output here._
- `/memory` in a fresh session: _TODO — confirm CLAUDE.md is listed as loaded._
- `/permissions`: _TODO — confirm the allow / ask / deny rules above are shown._
- Asked "How do I run the tests here?": _TODO — note whether Claude answered `npm test` from CLAUDE.md._
