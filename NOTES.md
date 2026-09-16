# Notes: setting up Claude Code

## What's in CLAUDE.md, and what I left out

`CLAUDE.md` has four short parts. There's a one-line description, then the three commands I run most (`dev`, `test`, `lint`), including how to run only matching tests and a note that CI needs lint and tests to pass. Next come four conventions written as "use X, not Y": CommonJS instead of ES modules, data only through `db/store.js`, JSON errors with 400 or 404 instead of plain text, and `node:test` + `supertest` instead of Jest or Mocha. Last is a three-line architecture note. It covers things you only learn by reading several files: `server.js` exports `app` and only listens when run directly (so tests don't open a port), a new resource needs both a route file and an `app.use` line, and the in-memory store is shared by every test in a run.

I cut anything Claude can see by opening a single file: the `PORT` setting (it's in `.env.example`), the lint rule exceptions (in `.eslintrc.json`), the `Number(req.params.id)` conversion, the 201 status on create, and a full file listing. I also left out the course's submission steps, because they're a one-off task rather than guidance for working in this repo, and anything from `.env`. The first draft was 30 lines, and trimming it to 24 left only the lines that change what Claude does.

While writing it I also found and fixed a bug in `.gitignore`. Every line after the first started with three spaces, and git treats those spaces as part of the pattern. As a result, `.env` and `npm-debug.log*` weren't ignored at all. `.claude/settings.local.json` was only ignored on my machine, thanks to my global git ignore file. I checked this with `git check-ignore` before and after the fix.

## Permission rules

- **Allow:** `npm test` and `npm run lint`. They're safe, read-only checks that I run constantly, so being asked every time only slows things down.
- **Ask:** `git push`. Pushing publishes work, so I want to confirm each one.
- **Deny:** reading `.env` and `.env.*`, editing `.env`, and `git push --force` / `git push -f`. The `.env.*` pattern also catches variants like `.env.local`. The cost is that Claude can't read `.env.example` either, which I accept. A deny rule wins over an ask rule, so a force-push is refused outright rather than asked about.

Without the deny rules, Claude could read `.env` while "checking the config" and pull real secrets into the conversation. From there they could end up in a log, a commit message or a pasted snippet. A force-push could overwrite commits on the remote that other people rely on, and that is hard to undo.

These rules only cover Claude's built-in file and command tools. A shell command like `cat .env` isn't stopped by `Read(./.env)`. So the real protection for secrets is still keeping them out of git, which is why the `.gitignore` fix matters.

## Verification

- `/memory`: <!-- confirm CLAUDE.md shows as loaded -->
- `/permissions`: <!-- confirm the allow / ask / deny rules are listed -->
- Asked "How do I run the tests here?": <!-- note whether it answered from CLAUDE.md -->
