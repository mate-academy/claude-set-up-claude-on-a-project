# Notes

## What's in CLAUDE.md, and what I left out

I started from `/init` and cut it down to the four parts that change how Claude works here: a one-line description, three commands, conventions, and architecture. The conventions are the things Claude would plausibly get wrong on its own: using ES modules instead of CommonJS, reaching for Jest instead of `node:test` + `supertest`, keeping state inside a route instead of going through `db/store.js`, and naming unused handler params in a way the lint rule rejects. The architecture section explains the `require.main === module` guard in `server.js`, because removing it would silently break the tests.

I left out a file-by-file listing (Claude can read the tree), generic advice like "write clean code", `npm start` (obvious from `package.json`), and anything from `.env`. I kept one course-specific rule — don't modify the app code unless asked — because it applies to every session on this repo, not just one task.

## Permission rules

- **allow:** `npm test` and `npm run lint`. They're read-only, fast, and I want Claude to run them after every change without asking.
- **ask:** `git push`. Pushing is visible to others, so I want to confirm each one.
- **deny:** reading `.env` (both via the Read tool and `cat .env`), and `git push --force` / `git push -f`.

Without the `.env` deny rule, Claude could read real secrets into the conversation, where they'd leave my machine and could end up in logs or get pasted into a file or commit. The deny rule doesn't stop programs from using the values — the app still reads its config at runtime — it only keeps them out of Claude's context. It isn't airtight (there are other shell commands that could print the file), so the real protection is still keeping secrets out of the repo and scoping tokens narrowly. Without the force-push deny, a mistaken push could overwrite history on the remote.

## .gitignore fix

Lines 2–7 of `.gitignore` had leading spaces, so git wasn't actually ignoring `.env` or `.claude/settings.local.json` (confirmed with `git check-ignore`). I removed the spaces so secrets and personal settings can't be committed by accident.

## Verification

In a fresh session, `/memory` shows `CLAUDE.md` loaded, and `/permissions` lists the allow / ask / deny rules above. Asking "How do I run the tests here?" gets `npm test` from `CLAUDE.md` without extra explanation.
