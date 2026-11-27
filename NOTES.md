# Notes

## What I put in CLAUDE.md, and what I left out

I started from the course's five headings: Project status, Commands, Conventions, Architecture, and Maintenance & health checks. I later removed the Maintenance & health checks section, along with a macOS-specific shell note, so four headings remain. Each section only holds what Claude can't work out quickly from the code, or would otherwise ask me about.

**Kept in:**
- **A one-line description** of the project.
- **Commands ready to copy and paste**, including the less obvious ones: running a single test file, and a `curl` health check against a running server.
- **Conventions a linter can't enforce:** CommonJS instead of ES modules, data access only through `db/store.js`, the JSON error format with status codes, `node:test` and `supertest` instead of Jest, and working on a branch with a pull request rather than committing to `main`.
- **A short architecture overview:** the `server.js` entry point, one router per resource in `routes/`, and data access through `db/store.js`.

**Left out:**
- **Generic Claude Code commands** like `/exit` and `/clear`. They're the same in every project and don't help Claude work on this one.
- **Anything obvious from the code**, such as the list of endpoints, the seed users, or what the tests, CI and permission files contain, which would only go out of date.
- **Course-specific instructions**, like the rule not to change the app code, which would go stale once the project moves on.
- **One-off tasks**, like the npm security fix I did once, and **anything sensitive**: no secrets or tokens.

**One fix along the way:** I renamed `Claude.md` to `CLAUDE.md`. macOS doesn't care about capital letters in file names, but Linux does, and that includes CI and a reviewer's machine.

## Which permission rules I added, and why

`.claude/settings.json` is committed so everyone working on the repo gets the same rules:

- **Allow `npm test`:** it's safe, read-only and run constantly, so asking for permission every time is just friction.
- **Deny `rm -rf *`:** a recursive delete can wipe out work that isn't committed yet, and it can't be undone.
- **Deny reading `.env`:** that file holds local secrets, and anything Claude reads ends up in the conversation. It only covers the Read tool (not `cat .env`), so it guards against accidents rather than locking the file.
- **Ask before `git push`:** a push puts work on GitHub where others can see it, so I want to approve each one. Commits stay local and easy to undo, so they don't need this.
- **Deny `git push --force`:** a force push overwrites history on GitHub and can wipe out other people's commits. Deny beats ask, so it's blocked outright. Variants like `git push -f` slip past this rule but still hit the ask rule.

**What could go wrong without the `rm -rf` deny rule:** a well-meant recursive delete, aimed at the wrong place or buried in a longer command, could wipe out uncommitted work. This happened once: Claude chained `rm -rf` into a GitHub CLI install command, and the rule blocked the whole command before any of it ran.

## Verification

- [x] `claude --version` runs; Claude Code is installed and signed in.
- [x] `npm test` (4/4) and `npm run lint` pass on `main`.
- [x] CI runs on GitHub for every push, pull request and merge to `main`, and passes. The repo is a fork, so workflows first had to be enabled once in the Actions tab. CI can also be started by hand there with "Run workflow".
- [x] `/memory` shows `CLAUDE.md` loaded as the project memory, so its instructions reach every new session. Claude's auto-memory folder for this project is still empty, which is expected: nothing has been worth saving between sessions yet.
- [x] `/permissions` shows the shared rules from `.claude/settings.json`: `Bash(npm test)` under Allow, `Bash(git push:*)` under Ask, and `Bash(rm -rf *)`, `Bash(git push --force:*)` and `Read(./.env)` under Deny. There's no `.claude/settings.local.json`, so no personal rules override them.
