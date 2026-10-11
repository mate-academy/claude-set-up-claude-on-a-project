# NOTES

## What did you put in your `CLAUDE.md`, and what did you leave out, and why?

I put in a one-line project description, the main commands (`npm run dev`, `npm test`, running a single test, `npm run lint`), a short architecture note (`server.js` entry point, one route file per resource, data access through `db/store.js`) and a few conventions (CommonJS, routes go through `db/store.js`, `node:test` + `supertest` for tests, `{ error: "message" }` error format, never read `.env`). I left out anything Claude can see from the code, long documentation, one-off task notes, secrets and generic advice, because a short file is followed more reliably and every line costs context.

## Which permission rules did you add, and what could go wrong without your deny rule?

I added an allow rule for running tests, an ask rule for `git push`, and deny rules for reading `.env` and force-pushing. Without the deny rules, Claude could read real secrets from `.env` into the conversation, and a force-push could overwrite remote history and destroy teammates' work.

## Verification

Checked with `/memory` (CLAUDE.md loaded) and `/permissions` (allow / ask / deny rules listed).
