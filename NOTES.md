# Notes

## What's in CLAUDE.md, and what I left out

I kept four short sections: a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus how to run a single test by name), four conventions, and a short architecture note. The conventions are the things Claude couldn't safely guess and would otherwise ask about or get wrong: CommonJS rather than ES modules (ESLint enforces `sourceType: "script"`), `node:test` + `supertest` rather than Jest, the `{ error: "..." }` JSON error shape, and going through `db/store.js` for data. The architecture note explains why `server.js` only listens when run directly, which takes reading two files to work out.

I deliberately left out a file-by-file listing (Claude can see it with `ls`), the course submission steps (one-off, not useful in later sessions), generic advice like "write good tests", and anything from `.env`. Every line in the file is meant to save a question or prevent a mistake.

## Permission rules

- **Allow:** `npm test`. It's a safe, read-only check that I run constantly, so being prompted each time is pure friction.
- **Ask:** `git push`. Pushing is outward-facing and can't be quietly undone, so I want to confirm each time.
- **Deny:** reading `.env`, and `git push --force`.

Without the deny rules, Claude could read `.env` while exploring the project and pull real secrets (database URLs, API keys) into the conversation, where they could end up in logs, commits or a PR. A force push could overwrite the shared branch history and destroy other people's commits. Deny rules win over allow and ask rules, so even an accidental "yes" can't trigger them.

## Verification

- `/memory` shows `CLAUDE.md` loaded: <!-- confirm after starting a fresh session -->
- `/permissions` shows the allow / ask / deny rules above: <!-- confirm after starting a fresh session -->
