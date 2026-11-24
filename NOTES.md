# NOTES - setting up Claude Code on this project

## What I put in CLAUDE.md, and what I left out

I kept the four parts the project needs and nothing else. The first line says what the API does. **Commands** lists `dev`, `test` and `lint`. It also records that lint must pass, because CI runs lint before the tests. **Conventions** holds five rules Claude can follow without asking:
- CommonJS only.
- One router per resource, mounted only in `server.js`.
- Data access only through `db/store.js`.
- JSON `{ error }` responses with 400 or 404.
- A supertest test for every route, with no real port opened.

**Architecture** is four lines covering `server.js`, `routes/`, `db/store.js` and where config comes from.

I deliberately left out:
- **The file list and the Express/Node basics.** Claude sees those the moment it opens the folder.
- **The seed users.** They are data, not rules.
- **Anything from `.env`.** No values and no example secrets, because CLAUDE.md is committed and loads into every session.
- **One-off tasks.**

Claude drafted it from reading the code, and I kept it lean on purpose. What remains is the rules that are not visible from reading a single file, such as "never touch `users` directly" and "never start a port in tests".

## Permission rules (`.claude/settings.json`, committed)

- **allow:** `npm test`, `npm run lint`, `git status`, `git diff`. These are safe, read-only or check-only commands I run constantly, so approving each one is just noise.
- **ask:** `git push` and `npm install`. A push reaches the shared remote, and an install changes dependencies and the lockfile. I want to see both before they happen.
- **deny:** reading `./.env` and `./.env.local`, force-push (`--force` / `-f`) and `rm -rf`.

Without the deny rule, Claude could open `.env` while "looking at the config". The secret would then sit in its context and could end up in a summary, a commit message or a pasted log. A force-push can silently overwrite teammates' work on the remote. A CLAUDE.md line saying "never read .env" is only guidance, which is why the deny rule is the real lock.

`.claude/settings.local.json` is meant to stay personal. It is **not** actually ignored yet, because of the `.gitignore` problem below. I haven't created one, and it is not part of this PR (the PR contains only `CLAUDE.md`, `.claude/settings.json` and `NOTES.md`).

## Finding while setting up: `.env` was not actually git-ignored

The starter `.gitignore` had every line after the first indented with spaces. Git does not trim leading spaces from a pattern, so `   .env` never matched `.env`. I checked this: with a test `.env` file present, `git status` listed it as untracked and ready to commit, and `.claude/settings.local.json` had the same problem. This PR is scoped to `CLAUDE.md`, `.claude/settings.json` and `NOTES.md`, so I have **not** changed `.gitignore` here. Fixing it (removing the leading spaces) belongs in its own PR. Until then, the `Read(./.env)` deny rule is what keeps Claude out of `.env`.

## Verification (fresh session)

I started a brand-new Claude Code session on branch `set-up-claude`, with no earlier conversation, and checked three things without explaining anything first:

- **Memory (`/memory` check).** I asked which CLAUDE.md files were loaded. The answer was exactly one, the project's `CLAUDE.md`, with first line `# CLAUDE.md`. No user-level `~/.claude/CLAUDE.md` and no nested ones were loaded. This is the same list `/memory` shows.
- **Permissions (`/permissions` check).** I asked which rules apply, and it listed them all:
  - allow: `npm test`, `npm run lint`, `git status`, `git diff`;
  - ask: `git push`, `npm install`;
  - deny: `Read(./.env)`, `Read(./.env.local)`, force-push and `rm -rf`.
  
  It also explained the order: deny beats ask, and ask beats allow, so a normal push asks while a force-push is blocked.
- **Using the file.** Asked *"how do I run the tests here?"* without any explanation, it answered `npm test` (Node's test runner and supertest) and said it took this from CLAUDE.md before opening `package.json`. It also repeated the "lint must pass before any commit" rule.

That session made one useful point: `Read(./.env)` blocks the Read tool but not `cat .env` through Bash. I therefore added `Bash(cat .env:*)` and `Bash(cat ./.env:*)` to `deny`.

The first check above ran in Claude Code on the web, which has no `/memory` or `/permissions` menu, so I then ran the real commands in the terminal.

### `/memory` and `/permissions` in the CLI (Claude Code v2.1.331, macOS terminal)

I started a fresh `claude` session in the repo on branch `set-up-claude`.

- **`/memory`** opened the Memory menu:
  - Project instructions: checked in at `./CLAUDE.md`.
  - User instructions: listed as "Saved in `~/.claude/CLAUDE.md`". This is the personal, machine-level location and is not part of the repo.
  - Auto-memory was on.

  Selecting "Project instructions" opened `./CLAUDE.md` in the editor, showing this PR's file (Commands, Conventions, Architecture). I closed it without saving.

- **`/permissions`** listed exactly the rules from `.claude/settings.json`, one tab each:
  - **Allow:** `Bash(git diff:*)`, `Bash(git status:*)`, `Bash(npm run lint:*)`, `Bash(npm test:*)`.
  - **Ask:** `Bash(git push:*)`, `Bash(npm install:*)`.
  - **Deny:** `Bash(cat ./.env:*)`, `Bash(cat .env:*)`, `Bash(git push --force:*)`, `Bash(git push -f:*)`, `Bash(rm -rf:*)`, `Read(./.env.local)`, `Read(./.env)`.

  No rules came from anywhere else. Every rule in the file shows in the right tab, so the file is valid and Claude Code loads it.

Project health: `npm test` passes all 4 tests and `npm run lint` is clean. No app code changed.
