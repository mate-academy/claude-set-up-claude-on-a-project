# NOTES

## 1. What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

My `CLAUDE.md` has a one-line description of the project, a Set Up step (`npm install`), and the commands I use: `npm run dev`, `npm test`, a name-filtered test command, and `npm run lint`. The Architecture section covers what you only learn by reading several files. `server.js` only calls `listen()` when run directly, so tests can import `app` through `supertest`. All data access goes through `db/store.js`. The Conventions section holds rules Claude could otherwise break: don't use Jest or Mocha, use CommonJS only, the lint exemption for unused `_`/`req`/`res`/`next` args, and keep real config in `.env`.

I left out a file-by-file listing, because Claude can see the tree itself. I also left out generic advice like "write tests", the README's course tasks, and anything secret. I dropped a separate single-test-file command, because the name-filter command already shows how to target a file. These are either obvious from the code or don't help Claude work in the repo, so they would only make the file longer.

## 2. Which permission rules did you add, and what could go wrong without your deny rule?

I added four rules:

- **allow `Bash(npm test:*)`:** tests are safe and I run them constantly, so Claude can run them without prompting.
- **ask `Bash(git push:*)`:** pushing shares work with others, so I want to confirm each time.
- **deny `Read(./.env)`:** keeps real secrets out of Claude's context.
- **deny `Bash(git push --force:*)`:** blocks force-pushing outright.

Without the `.env` deny rule, Claude could read real secrets such as database URLs or API keys. They would then sit in the conversation and could leak into logs or generated code. Without the force-push deny rule, one mistaken command could overwrite shared history and destroy other people's commits. The `ask` rule would still prompt, but I could approve a force push by accident, while the deny rule blocks it every time.

## 3. How did you verify the setup?

I started a fresh Claude Code session and ran `/memory` to confirm that `CLAUDE.md` was loaded. I then ran `/permissions` to verify that the allow, ask, and deny rules were in effect.
