# Notes: setting up Claude Code on this project

## What I put in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to four short parts: a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), the architecture, and conventions written as "use X, not Y" rules. The architecture part covers the `server.js` entry point, one route file per resource in `routes/`, and data access only through `db/store.js`. The conventions focus on things Claude could easily get wrong without being told: CommonJS instead of ES modules, `node:test` + `supertest` instead of Jest, and keeping data out of route files.

I deliberately left out a list of every file (Claude can see those itself), the endpoint details (they're readable in `routes/`), generic advice like "write good tests", and anything sensitive. The README's course instructions also stay out, because they're one-off tasks, not rules for working on the code. Every line should save Claude a question or prevent a mistake.

## Which permission rules I added, and why

- **Allow:** `npm test`, `node --test`, and `npm run lint`. They're safe, read-only checks that I run constantly, so approving each one would just slow things down.
- **Ask:** `git push` and `npm install`. Pushing publishes my work, and installing adds dependencies, so I want to confirm both each time.
- **Deny:** reading or editing `.env`, `git push --force` / `-f`, `git reset --hard`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while exploring the project, and real secrets like database passwords would end up in the conversation. A force push could also overwrite history on the remote branch, and `git reset --hard` or `rm -rf` could wipe out uncommitted work, with no way to undo any of it. Deny rules override allow and ask, so these stay blocked even if a broader rule is added later.

## Verification

- `/memory` shows `CLAUDE.md` loaded: ☑
- `/permissions` shows the allow / ask / deny rules: ☑
- Asked "How do I run the tests here?" and Claude answered from `CLAUDE.md`: ☑
