# Notes

## What's in my CLAUDE.md and what I left out

I kept it to four parts: a one-line description, the three npm commands, a short architecture section and a list of conventions. I started from `/init` and then cut about half of what it gave me.

The conventions are the part I care about most, because they cover the things Claude would get wrong if left to guess. The obvious one is tests. Most JS projects use Jest, so Claude reaches for it by default, but this repo uses `node:test` with supertest. The same goes for CommonJS vs ESM. I also wrote down the `require.main === module` check in `server.js`, because if someone "simplifies" that away the tests start opening a real port. I tried to phrase every rule so Claude can follow it without asking me anything ("use X, not Y").

Things I left out on purpose:
- The full list of endpoints. Claude can read `routes/` in a second, and a copy in CLAUDE.md would just go stale.
- Setup steps like `npm install` or how to clone the repo. That's for humans and already in the README.
- Anything from `.env`, or even what the variables mean. There's nothing secret yet, but I don't want the habit of putting config in there.
- The course instructions themselves. That's a one-off task, not something Claude needs every session.

## Permission rules

**Allow:** `npm test`, `npm run lint`, and read-only git (`status`, `diff`, `log`). I run these constantly and none of them can break anything, so approving them every time is just noise.

**Ask:** `git push` and `npm install`. Pushing is visible to other people, and installing pulls in new code from the internet. Both are fine to do, I just want to see them happen.

**Deny:** reading or editing `.env` (plus `cat .env`), force-pushing, and `rm -rf`.

The `.env` rule turned out to matter more than I expected. While setting this up I noticed the `.gitignore` that came with the repo had three spaces in front of every line after the first. Git treats leading spaces as part of the pattern, so `.env` and `.claude/settings.local.json` weren't actually being ignored. `git status` showed `.env` as untracked. I fixed the file, but it showed me that "it's in .gitignore" isn't a guarantee. Without the deny rule, Claude could read real secrets into the conversation while debugging, then quote them in a commit, a log line or a PR description. The deny rule stops it at the source.

One limitation: Bash rules match by prefix, so `cat .env` is blocked but something like `head .env` or `grep x .env` isn't. The `Read` deny covers Claude's normal file reading, but it isn't airtight. If real secrets ever go in `.env`, I'd add a sandbox or a hook for this too.

Force-push is denied rather than "ask" because I can't think of a case where I'd want Claude to rewrite shared history. If I need it, I'll do it myself.

## Verification

- `claude --version` runs and I'm signed in.
- In a fresh session, `/memory` lists `./CLAUDE.md` as loaded.
- `/permissions` shows the allow / ask / deny rules from `.claude/settings.json`.
- I asked "How do I run the tests here?" and Claude answered `npm test` using Node's built-in runner, without me explaining anything.
