# Notes

## What is in CLAUDE.md, and what was left out

**In:**

- A one-line description, so Claude knows this is a small Express API with an in-memory store.
- The commands used constantly (`npm run dev`, `npm test`, `npm run lint`), plus how to run a single test file or a single test by name, since that is not obvious from `package.json`.
- An architecture note covering the things that take reading several files to work out: `server.js` exports the app and only listens when run directly, one router file per resource in `routes/`, and all data access going through `db/store.js`.
- Conventions written as "use X, not Y" rules Claude can follow without asking: CommonJS rather than ES modules, routes never touching data directly, the JSON error shape and status codes, and `node:test` with `assert` rather than Jest-style `expect`.
- One gotcha: the `.env` line in `.gitignore` is indented, so git does not actually ignore `.env`. Claude is told to stage files by name.

**Left out:**

- A file-by-file listing, because Claude can discover that by looking at the repo.
- Generic advice ("write tests", "handle errors"), because it applies to every project and costs context on every session.
- The course instructions from the README, one-off tasks, and anything sensitive such as real config values.

The file is loaded into every session, so each line has to be something Claude would otherwise get wrong or have to ask about.

## Permission rules

- **Allow** `npm test`, `npm run lint` and `node --test`: safe, read-only checks that run many times a session, so prompting for them each time is pure friction.
- **Ask** on `git push`: pushing is visible to other people, so it gets a confirmation every time.
- **Deny** reading `.env`, and `git push --force` / `git push -f`.

Without the deny rules, Claude could read `.env` while exploring the project and pull real secrets into the conversation, where they might be echoed into output, a commit, or a log. That risk is higher here because `.env` is not actually git-ignored. A force-push could overwrite commits on the remote that cannot be recovered locally.

## Verification

- `/memory` shows `CLAUDE.md` loaded: _to confirm in a fresh session_
- `/permissions` shows the allow / ask / deny rules above: _to confirm in a fresh session_
