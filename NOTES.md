# Notes

## What's in CLAUDE.md, and what I left out

I kept four things: a one-line description, the commands I actually run (`dev`, `test`, `lint`, plus how to run a single test file), conventions Claude can follow without asking, and a short architecture note. The conventions are real rules from this codebase: CommonJS rather than ES modules (ESLint enforces `sourceType: "script"`), one router per resource in `routes/`, data access only through `db/store.js`, JSON `{ error }` responses with the right status codes, and `supertest` against the exported `app` in tests. The architecture note covers the one non-obvious detail: `server.js` only listens when run directly, which is why tests can import it.

I left out anything Claude can see quickly by reading the code: the list of endpoints, the seed users, and the dependency versions. I also left out the course setup instructions, which are one-off steps, and anything secret. `.env` is mentioned only as something never to read or commit. Every line should save Claude a question or prevent a mistake.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`, `git status` and `git diff`. These are read-only or safe and I run them constantly, so approving them every time is just friction.
- **Ask:** `git push` and `npm install`. Both change things outside my working copy (the remote, or the dependency tree and lockfile), so I want to confirm each one.
- **Deny:** reading `.env` / `.env.*`, `git push --force` / `-f`, and `rm -rf`.

Without the deny rules, Claude could read `.env` while "looking around" and pull real secrets (such as a `DATABASE_URL` with a password) into the conversation, logs or a commit. A force-push could overwrite history on the shared branch and destroy teammates' work. `rm -rf` could delete files that can't be recovered. A deny rule blocks these even if I approve something carelessly, or a broad allow rule would otherwise cover them.

I also fixed `.gitignore`. Its lines had leading spaces, so `.env` and `.claude/settings.local.json` weren't actually ignored.

## Verification

In a fresh Claude session started in this folder, `/memory` showed this `CLAUDE.md` as loaded. `/permissions` listed the allow, ask and deny rules above. "How do I run the tests here?" was answered from `CLAUDE.md` (`npm test`, or `node --test <file>` for one file) without any extra explanation.
