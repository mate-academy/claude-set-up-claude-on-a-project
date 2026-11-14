# Notes

## What went into CLAUDE.md, and what was left out

I put in things Claude can't easily work out by reading one file. That covers the exact commands (dev, test, a single test by name, lint), the fact that CI runs lint and then tests, and a short map of how the code is laid out (`server.js` exports `app` and only listens when run directly, one router per resource, `db/store.js` is the only data layer). It also lists the conventions that matter when writing new code: CommonJS only, routes go through the store, the `{ error }` JSON shape with 400/404/201, converting ID params with `Number()`, tests use `node:test` + `supertest` and no Jest/Mocha, and never touch `.env`. I also noted that the in-memory store is shared across tests, because that trap causes confusing test failures.

I left out anything Claude can find on its own: a full file listing, every endpoint, dependency versions, general Express or JavaScript advice, and generic rules like "write clean code". CLAUDE.md is loaded into every session, so each line costs context. Stale or obvious content also hides the rules that actually matter, so I kept it short and specific to this project.

## Permission rules, and what the deny rules protect against

In `.claude/settings.json`:

- **allow** `Bash(npm test:*)`: running tests is safe and frequent, so it shouldn't need a prompt each time.
- **ask** `Bash(git push:*)`: a push is outward-facing and hard to undo, so I want to confirm each one.
- **deny** `Read(./.env)` and `Bash(git push --force:*)`.

Without the `.env` deny, Claude could read real secrets (API keys, DB passwords) while debugging config. Those values would then end up in the conversation, could be echoed into logs, commits or code, and would be sent to the model provider. Without the force-push deny, one mistaken `git push --force` could overwrite the remote history and destroy other people's commits. Deny beats ask, so that command is blocked outright, even if someone approves pushes in a hurry.
