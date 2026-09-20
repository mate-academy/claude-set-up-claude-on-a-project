# NOTES

## CLAUDE.md

I included the commands I run most (`npm run dev`, `npm test`, running a single test, `npm run lint`), a short architecture note and the conventions the code already follows. The architecture note covers the `server.js` entry point that exports `app` without listening, one router per resource, and data access only through `db/store.js`. The conventions are CommonJS, `node:test`, the `{ error }` response shape and the lint rule for unused args. These are the things Claude can't tell at a glance and would otherwise get wrong or have to ask about.

I deliberately left out the file listing, generic practices ("write tests", "handle errors"), the course instructions from the README and anything sensitive. Claude can discover those from the code, and a shorter file is more likely to be followed.

## Permission rules (`.claude/settings.json`)

- **allow**: `npm test`, `npm run lint` and `node --test`. They are safe, read-only checks I run constantly, so prompting each time only slows things down.
- **ask**: `git push`. I want to confirm each time before anything leaves my machine.
- **deny**: reading `.env` and `git push --force`.

Without the `.env` deny rule, Claude could read real secrets (database URLs, API keys) into the conversation, where they might be logged or sent along with a prompt. Without the force-push deny rule, a mistaken command could rewrite shared history and destroy teammates' commits.

## Verification

I checked the setup in a fresh session:

- `/memory` showed `CLAUDE.md` as loaded.
- `/permissions` showed the rules from `.claude/settings.json`.
- I asked "How do I run the tests here?" without giving any context. Claude answered correctly with the project's commands (`npm test`, `node --test tests/users.test.js`, and `npm run lint` before CI), so it is reading them from `CLAUDE.md`.
