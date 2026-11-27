# Notes

## What's in CLAUDE.md, and what I left out

I kept the four parts lean: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), four conventions, and a short architecture map. The conventions are the things Claude would most likely get wrong by guessing: this project is CommonJS (not ES modules), tests use Node's built-in runner with supertest (not Jest), routes go through `db/store.js` instead of touching data, and errors follow one JSON shape with specific status codes.

I left out anything Claude can read straight from the code (individual endpoints, the seed users, the Express version), setup steps like `npm install` and the course instructions from the README, and anything sensitive: no values from `.env`, no ports beyond the public default, no credentials.

## Permission rules

- **Allow** `npm test` and `npm run lint`: safe, read-only checks I run constantly, so Claude shouldn't have to ask each time.
- **Ask** `git push`: pushing shares work with others, so I want to confirm it every time.
- **Deny** reading `.env` and force-pushing. Without the `.env` rule, Claude could read real secrets (like a database URL) into the conversation, where they could end up in a log or a commit message. Without the force-push rule, a mistaken `git push --force` could overwrite commits on the remote that other people depend on.

## Verification

In a fresh session, `/memory` lists `CLAUDE.md` as loaded and `/permissions` shows the allow, ask and deny rules above. Asking "How do I run the tests here?" gets `npm test` from the `CLAUDE.md` without further explanation.
