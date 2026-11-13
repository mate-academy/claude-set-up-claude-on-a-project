# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

**Kept:**
- **A one-line description** of what the project is.
- **Commands** for dev, test and lint. I also added how to run one test file, or one test by name, with `node --test`. Claude can't easily work that out from `package.json`.
- **Conventions** that aren't obvious from reading a single file:
  - CommonJS only, which is what the ESLint config enforces.
  - Stick with `node:test` and supertest instead of reaching for Jest.
  - Keep the `require.main === module` guard in `server.js`, because the tests depend on it.
  - Route handlers get data only through `db/store.js`.
  - Error responses use the `{ error }` shape.
  - Convert `req.params.id` to a number. Otherwise the store's `===` lookup fails without any error.
- **Architecture:** a few lines on the entry point, one router file per resource, and the store. I also noted that the in-memory store is shared by every test in a run, so tests can affect each other.

**Left out on purpose:**
- **A file-by-file listing and per-endpoint docs.** Claude can see these by reading the code, and they would go stale.
- **Generic advice** like "write tests" or "handle errors". It costs context in every session and doesn't change what Claude does.
- **The course instructions and setup steps from the README.** They are one-off tasks, not standing guidance.
- **Anything from `.env` or any secret.** The only config mentioned is the `PORT` variable name.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`, and the read-only git commands (`status`, `diff`, `log`). They are run all the time and can't damage anything, so prompting for them only adds friction.
- **Ask:** `git commit`, `git push` and `npm install`. They change shared history or the dependency tree, so I want to see each one before it happens.
- **Deny:**
  - Reading or editing `.env` and `.env.local`, plus `cat .env`.
  - `git push --force` and `git push -f`.
  - `git reset --hard` and `rm -rf`.

**Without the deny rules:**
- Claude could read real secrets out of `.env` while exploring the project. They would end up in the conversation context, and from there possibly in logs, commits or other tools.
- A force-push could overwrite teammates' work on the remote.
- `git reset --hard` or `rm -rf` could throw away uncommitted work with no way to undo it.

`.env.example` is left readable on purpose, because it's where new config keys get documented. The deny rule doesn't cover every possible way of reading a file, such as `grep` or `head` on `.env`. Its job is to keep Claude from doing it by accident, not to be a security boundary.

## Verification

- [x] `/memory` shows `CLAUDE.md` as loaded in a fresh session
- [x] `/permissions` lists the allow / ask / deny rules above
- [x] Asking "How do I run the tests here?" is answered from `CLAUDE.md`
