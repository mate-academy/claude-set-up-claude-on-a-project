# NOTES

## 1. What went into CLAUDE.md (and what stayed out)

CLAUDE.md holds a one-line description of the project, the commands (`npm run dev`, `npm test`, running a single test file, `npm run lint`), five conventions (CommonJS, one router file per resource, handlers go through `db/store.js`, the error and status-code format, and supertest against the exported `app`) and a short architecture section. I confirmed with `/memory` that CLAUDE.md is loaded.

I deliberately left out the boilerplate intro line, because it adds nothing Claude can use. I also left out the `.env` line, because a deny rule enforces that instead, and a rule is more reliable than an instruction. Anything obvious from reading the code is omitted too, since Claude can see it already.

## 2. Permission rules

I added these rules, and `/permissions` showed them:

- **Allow:** `npm test` and `npm run lint`, so the routine checks run without prompts.
- **Ask:** `git push`, so every push needs my confirmation.
- **Deny:** `Read(./.env)` and `git push --force`.

Without the deny rules, Claude could read secrets from `.env` and carry them into its context or output. A force-push could also overwrite remote history and lose commits that can't easily be recovered.

On Windows, commands run through PowerShell, so I added `PowerShell(...)` equivalents of the rules.

**Known problem:** `.gitignore` has leading spaces on its entries, so git does not match them and `.env` is not actually ignored. It could be committed by accident. The leading spaces need to be removed.
