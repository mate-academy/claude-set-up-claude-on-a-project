# Notes

## What went into `CLAUDE.md`, what was left out, and why

**In:**

- A one-line description, so Claude knows it is a small Express API with an in-memory store before reading any code.
- The commands used constantly (`npm run dev`, `npm test`, `npm run lint`) plus how to run a single test file or a test by name, which is not obvious from `package.json`.
- Conventions that Claude would otherwise have to guess or ask about: CommonJS rather than ES modules, `node:test` + `supertest` rather than Jest, the `{ "error": "..." }` error shape, and all data access going through `db/store.js`. Each is taken from what the code already does.
- A short architecture note covering the things that need more than one file to understand: `server.js` exports `app` and only listens when run directly, which is why tests can import it; adding a resource means a new router file plus one `app.use` line.
- Two gotchas that would cause real mistakes: nothing loads `.env`, and the `.env` line in `.gitignore` is indented so git does not actually ignore it.

**Out:**

- A file-by-file listing and descriptions of each endpoint. Claude can read those from the code in seconds, and a copy in `CLAUDE.md` would go stale.
- Generic advice ("write tests", "handle errors"), which changes nothing about how Claude behaves.
- The course instructions from the README, one-off tasks, and anything sensitive. The file is loaded into every session, so every line costs context; it should hold only what stays true and useful across sessions.

## Permission rules, and what could go wrong without the deny rules

**Allow:** `npm test`, `npm run lint`, and `node --test`. These only read the code and report, and they run many times per session, so a prompt each time is pure friction.

**Ask:** `git push` and `npm install`. A push leaves my machine and is visible to others; an install runs third-party code and changes the lockfile. Both are worth a deliberate yes.

**Deny:** reading or editing `./.env`, and force-pushing (`--force` / `-f`, whether it comes straight after `git push` or after the remote and branch).

Without the `.env` deny rule, Claude could read the file while exploring the project, and any real secret in it (a database URL, an API key) would end up in the conversation and could be echoed into output, a commit, or a log. That matters more here because the repo's `.gitignore` does not currently ignore `.env`. The rule covers Claude's file tools only, not a shell command such as `cat .env`, so it reduces the risk rather than removing it.

Without the force-push deny rule, a single mistaken command could overwrite history on the remote and destroy other people's commits, which cannot be undone from my side. Deny takes precedence over ask, so a force-push is blocked outright instead of being one careless "yes" away.

## Verification

- [ ] `/memory` in a fresh session shows `CLAUDE.md` loaded
- [ ] `/permissions` shows the allow, ask, and deny rules above
- [ ] Asking "How do I run the tests here?" is answered from `CLAUDE.md`
