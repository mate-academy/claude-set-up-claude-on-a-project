# NOTES.md

## What I put in CLAUDE.md — and what I left out

I included a one-line project description, the four npm scripts plus how to run a single test file, the key architectural relationships (how `server.js` exports `app` without starting the server so tests can import it cleanly, and that all data access flows through `db/store.js`), and two conventions about where new routes belong and how to access data.

I left out the full file tree — it's small enough to discover with `ls` in seconds. I also left out generic advice like "write tests" or "don't commit secrets", since those apply everywhere and add no value here. Nothing one-off or task-specific made it in either, since CLAUDE.md is meant to be durable across sessions.

## Permission rules — and what could go wrong without the deny rule

I allowed `npm test`, `npm run lint`, `npm run dev`, and `npm install` so Claude can run them freely during development without interrupting the flow. I set `git push` to ask, so I get a chance to review what's going out to the remote before it happens.

The two deny rules are the most important. Without `deny: Read(./.env)`, Claude could read the `.env` file and inadvertently echo real secrets (API keys, database credentials) into the conversation, where they'd appear in logs or be visible to anyone looking over your shoulder. Without `deny: Bash(git push --force:*)`, a force-push could silently overwrite shared remote history — a mistake that's hard to recover from and affects everyone working on the repo.
