# Notes: setting up Claude Code

## What's in CLAUDE.md, and what I left out

I kept four short sections. A one-line description says what the API is. **Commands** covers dev, test and lint, plus how to run a single test file or filter tests by name, since those are the commands Claude runs most and the single-test form is easy to get wrong (`node --test` needs a file path for the name filter, not a folder). **Conventions** has rules Claude can follow without asking: use CommonJS, not ES modules; reach data only through `db/store.js`; send errors as `{ error }` with a status code; write tests with `node:test` and `supertest`. **Architecture** explains things you only learn by reading several files: `server.js` exports `app` and only calls `listen()` when run directly, there's one router per resource, and the in-memory store is shared between tests in a run.

I left out a file-by-file listing and route details, because Claude can read those from the code. I also left out the course instructions and one-off tasks (like "don't change the app code for this project"), because they won't apply in later levels. There are no secrets in it. It only says that config lives in environment variables and that `.env` is off-limits.

## Permission rules

- **allow:** `npm test`, `node --test` and `npm run lint`. They're safe and run all the time, so a prompt every time would be noise. I didn't allow `npm run dev`, because it starts a long-running server.
- **ask:** `git push`, so nothing reaches the remote without me seeing it first.
- **deny:** reading or editing `.env`, `git push --force` / `-f`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while exploring the project and echo real secrets into the conversation, or a force-push could overwrite shared history on the remote. Deny wins over ask, so a force-push is blocked outright while a normal push still asks.

## Verification

In a fresh session, `/memory` listed `CLAUDE.md` as loaded and `/permissions` showed the allow, ask and deny rules above.
