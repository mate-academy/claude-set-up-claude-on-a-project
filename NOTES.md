# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to the four parts the project needs: a one-line description, the commands, the conventions and a short architecture note. The commands include how to run a single test (`node --test --test-name-pattern=...`), because that isn't obvious from `package.json` and it's what Claude needs most often while it works. The conventions are rules Claude would otherwise get wrong or have to ask about: CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, data access only through `db/store.js`, and the JSON error shape with its status codes. The architecture note covers the things you only see after reading several files: why `server.js` only calls `listen()` when it's run directly, how to add a new resource, and that the in-memory store is shared across tests.

I deliberately left out a file-by-file listing (Claude can see that with `ls`), the course assignment steps (a one-off task, not lasting guidance), generic advice like "write tests", and anything from `.env`. Every line in the file should change what Claude does. Lines that don't just cost context in every session.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `node --test`. These are read-only and run constantly, so a confirmation prompt each time only adds friction.
- **ask:** `git push` and `npm install`. Pushing publishes work, and installing pulls third-party code onto my machine, so I want to see both before they happen.
- **deny:** reading `.env`, `git push --force` / `-f`, `git reset --hard` and `rm -rf`.

Without the deny rule on `.env`, Claude could read real secrets (database URLs, API keys) into the conversation while "looking at the config", and from there they could end up in a log, a commit or a pasted answer. Without the force-push and `reset --hard` rules, one wrong command could permanently destroy my own or someone else's commits. Deny rules always win over allow rules, so these hold even if a broader rule is added later.

I made one mistake along the way. My first version also denied `Read(./.env.*)`, but that blocked `.env.example`, which is meant to be read and documents the config. Because deny beats allow, it couldn't be re-allowed, so I narrowed the rule to `.env` only. Claude also wasn't allowed to edit its own `.claude/settings.json`, so I made that fix by hand. That's a good safeguard.

## Verification

- `npm test` (4/4 passing), the single-test command from `CLAUDE.md`, and `npm run lint` (clean) all work on Node 22, the same version CI uses.
- In a fresh session, `/memory` lists `CLAUDE.md` as loaded and `/permissions` shows the allow, ask and deny rules above.
