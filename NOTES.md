# NOTES

## CLAUDE.md: what's in, what's out

**In:** a one-line description of the project, the commands (dev server, all tests, a single test file, lint), the project conventions (CommonJS, one router per resource, data access only through `db/store.js`, the error format and status codes, how tests are written), and architecture notes that would otherwise trip Claude up: `server.js` only calls `listen()` when run directly, the in-memory store is shared between tests, and `.env` is never loaded automatically. I also noted that CI runs lint and tests on Node 22, so Claude doesn't use newer Node features.

**Out:** anything Claude can learn by reading the code in a few seconds (the file-by-file layout, the route list, dependency versions), the long README text, secrets or values from `.env`, and one-off tasks. Every line in `CLAUDE.md` is loaded into every session, so I kept only things that change how Claude works or that it would otherwise get wrong.

## Permission rules

- **allow** `Bash(npm test:*)`: running tests is safe and frequent, so Claude shouldn't have to ask each time.
- **ask** `Bash(git push:*)`: pushing affects the shared remote, so I want to confirm each push.
- **deny** `Read(./.env)` and `Bash(git push --force:*)`.

Without the deny rules, Claude could read `.env` and pull real secrets into the conversation, where they could end up in logs, commits or output. It could also force-push and overwrite history on the remote, which is hard to undo. A deny rule blocks these outright, even if a prompt or a mistaken plan asks for them.

## Verification

- `/memory` shows the project `CLAUDE.md` as loaded.
- `/permissions` shows the allow, ask and deny rules above.
- I asked "How do I run the tests here?" and Claude answered from `CLAUDE.md`.
