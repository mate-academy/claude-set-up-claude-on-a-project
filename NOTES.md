# Notes

## What's in CLAUDE.md and what I left out

I kept only what Claude can't quickly work out from the code or would probably get wrong. It covers:

- the commands, including how to run one test file or filter by test name, and what CI checks
- the conventions that would otherwise cause failures: CommonJS only (ESLint rejects `import`), `node:test` with `supertest` rather than Jest, and data access only through `db/store.js`
- the `{ error }` JSON shape and status codes, so new routes match the existing ones
- the `require.main === module` guard in `server.js`, which lets tests import the app without opening a port
- a warning that the in-memory store is shared by all tests in the same file, so tests shouldn't depend on record counts or ids

I left out the full file tree, the list of endpoints and what each route does, because Claude can read those in seconds and a copy would go out of date. I also left out the course setup instructions from the README (installing Claude, opening a terminal, the submission steps), since they're one-off tasks, not guidance for working on the code. There are no secrets in it. It only says to keep real config in `.env` and new keys in `.env.example`.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`, and the read-only git commands `status`, `diff` and `log`. These are safe, I run them constantly, and approving each one would just slow things down.
- **Ask:** `git push`, because it publishes work, and `npm install`, because it changes dependencies and runs install scripts. I want to confirm both each time.
- **Deny:** reading, editing or `cat`-ing `.env`, force-pushing, and `git reset --hard`.

Without the deny rules, Claude could read `.env` while "looking at the config" and put real secrets into the conversation, which sends them to an external service. A force-push or a hard reset could also wipe out commits or uncommitted work with no easy way back. I deliberately didn't deny `.env.example`, because CLAUDE.md tells Claude to add new config keys there.
