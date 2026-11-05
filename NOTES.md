# Notes: setting up Claude Code

## What's in CLAUDE.md, and what I left out

CLAUDE.md has a one-line description, the three commands I run most (dev, test, lint) and six conventions taken from the actual code. Each is written as a "do X, not Y" rule so Claude can follow it without asking. The conventions cover CommonJS rather than ES modules, `node:test` and `supertest` rather than Jest, one router per resource, data access only through `db/store.js`, a `{ error }` JSON shape for errors, and config only through `process.env`. These are exactly the things Claude might otherwise guess wrong. A short architecture section explains how `server.js`, `routes/` and `db/store.js` fit together, so Claude knows where new code goes.

I left out anything Claude can learn by reading the code (the dependency list, what each endpoint returns, Express basics), because it costs context on every session and goes stale. I also left out one-off tasks and anything sensitive: no secrets, no `.env` values and no long pasted docs. Every line is something Claude would otherwise get wrong or have to ask about.

## Permission rules

- **Allow:** `npm test` and `npm run lint`. They're safe, read-only checks that I run constantly, so approving them every time would just be noise.  
- **Ask:** `git push`. It changes the shared remote, so I want to confirm each push.  
- **Deny:** reading or editing `.env`, `git push --force` / `-f`, and `rm -rf`.

Without the deny rules, Claude could open `.env` while debugging config and pull real secrets into the conversation. It could also force-push over teammates' commits on the remote, which is hard to undo. `rm -rf` could wipe files that aren't under version control. `.claude/settings.json` is committed so the whole team shares these rules. Personal overrides belong in `.claude/settings.local.json`, which is git-ignored.

Something I noticed: the repo's `.gitignore` indents the `.env` and `.claude/settings.local.json` lines with spaces. Git treats those spaces as part of the pattern, so neither file is actually ignored (I confirmed this with `git check-ignore`). Until that's fixed, a real `.env` could be committed by accident, which makes the deny rule on `.env` more important. I staged files by name for this PR so nothing extra slipped in.

One limit: `Read(./.env)` blocks Claude's file-reading tool, not every shell command. A command like `cat .env` would need its own rule. For real protection, secrets should stay out of the repo folder entirely.

## Verification

In a fresh session, `/memory` showed the project `CLAUDE.md` as loaded, and `/permissions` listed the allow, ask and deny rules above. When I asked "How do I run the tests here?", Claude answered `npm test` from CLAUDE.md without any extra explanation.