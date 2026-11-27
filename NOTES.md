# Notes

## What did I put in CLAUDE.md, what did I leave out, and why?

I started from the /init draft and kept what Claude would otherwise have to guess: the commands (including how to run a single test), the conventions that are easy to get wrong in this repo (CommonJS not ESM, node:test + supertest not Jest, data only through db/store.js, the `{ "error": ... }` response shape), and a short map of how the code is laid out. I also noted that `npm run dev` never exits, so Claude doesn't start it just to check something and end up stuck.

I cut the generic header /init adds, a paragraph about this course assignment (a one-off that won't matter in the next session), detail on how the `require.main` guard works, and the quote/semicolon style note, since Claude can read all of that straight from the code. No secrets go in the file. The only mention of .env is that it must never be read or committed.

## Which permission rules did I add, and what could go wrong without the deny rule?

Allowed: `npm test`, `npm run lint`, `node --test`, `git status` and `git diff`. They're safe and I run them all the time, so approving them every time is just noise. `git push` and `npm install` are on ask, because one publishes my work and the other changes dependencies, and I want to see both happen.

Denied: reading, editing or `cat`-ing `.env`, force pushes, and `rm -rf`. Without the `.env` rule, Claude could read a real secret while debugging and end up quoting it in its output, a commit message or a PR. Without the force-push rule, one wrong command could wipe out history on a shared branch. Deny wins over ask, so `git push --force` is blocked even though plain `git push` only asks. These are prefix matches, so something like `git push origin main --force` would get past the deny rule, but it still hits the ask rule on `git push`, so I'd see it first.

## Something I found

The repo's .gitignore has leading spaces on every line after `node_modules/`. Git doesn't strip those spaces, so `.env` and `.claude/settings.local.json` aren't actually ignored (`git check-ignore` returns nothing for either). I didn't change it, because it's outside the three files this task asks for. It should be fixed separately, though, because right now a real `.env` could be committed by accident.

## Checking it works

In a fresh session, `/memory` shows the project CLAUDE.md as loaded and `/permissions` lists the allow, ask and deny rules above. When I asked "How do I run the tests here?", Claude answered with `npm test` and the single-file `node --test` command from CLAUDE.md without me explaining anything.
