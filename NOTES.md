# Notes

## What's in CLAUDE.md, and what I left out

I kept the four parts the project asks for: a one-line description, the commands, the conventions and the architecture. The commands section includes how to run a single test (`node --test --test-name-pattern=...`), because that isn't obvious from `package.json`. The conventions are rules Claude could get wrong without being told: CommonJS only, one router per resource, data access only through `db/store.js`, the `{ error }` response shape, converting route params with `Number()`, and testing through `supertest` without starting a server. The architecture section explains the one non-obvious behaviour: the in-memory store is shared state, so a `POST` in one test changes what the next test sees.

I left out a file-by-file listing (Claude can see the tree itself), generic advice like "write tests" or "handle errors", the course/README instructions (a one-off task, not something useful in every session), and anything from `.env`. Every line is something Claude would otherwise have to discover or guess.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`. These are safe, read-only checks I want Claude to run often without a prompt each time.
- **Ask:** `git push` and `npm install`. Pushing publishes my work and installing changes dependencies, so I want to confirm both each time.
- **Deny:** reading `.env` (through the Read tool and through `cat`), `git push --force` / `-f`, and `rm -rf`.

Without the deny rules, Claude could read `.env` and paste real secrets into the conversation or a commit, which sends them to an external service. A force-push could overwrite the remote branch and destroy commits, mine or a teammate's. `rm -rf` could delete files that aren't tracked by git and can't be recovered. `.env.example` stays readable on purpose, because it only documents the config.

## Verification

- `/memory`: verified, CLAUDE.md at the project root is listed as loaded
- `/permissions`: verified, the allow, ask and deny rules from .claude/settings.json all appear
