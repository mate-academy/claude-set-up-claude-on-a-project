# Notes

## What went into CLAUDE.md, and what was left out

`CLAUDE.md` has four parts: a one-line description, the commands, the conventions, and an architecture note.

- **Commands:** `npm run dev`, `npm test` and `npm run lint`, plus how to run a single test file or a single test by name, because that is not in `package.json` and Claude would otherwise have to guess. It also says CI runs lint then tests, so both get run before a commit.
- **Conventions:** rules written as "use X, not Y" so Claude can follow them without asking: CommonJS rather than ES modules, `node:test` with `supertest` rather than Jest or Mocha, data access only through `db/store.js`, errors as JSON `{ "error": ... }` with the right status code, and config through `process.env` with new variables documented in `.env.example`.
- **Architecture:** the things that take reading several files to see: `server.js` exports `app` and only listens when run directly (which is what lets the tests import it), each resource is one router file in `routes/`, and the store is module-level state shared across tests in a process.

Deliberately left out:

- A file-by-file listing and the list of endpoints. Claude can read those from the code, and a copy in `CLAUDE.md` would go stale.
- Generic advice such as "write tests" or "handle errors". It applies to every project and changes nothing here.
- The course instructions from the README, one-off tasks, and anything from `.env`. The file is loaded into every session, so it should hold only what stays true and is safe to share.

## Permission rules

- **Allow:** `npm test`, `npm run lint` and `node --test`. They are read-only checks I run constantly, so a prompt each time is just friction.
- **Ask:** `git push` and `npm install`. A push is visible to other people, and an install runs third-party code and changes the lockfile, so I want to confirm each one.
- **Deny:** reading `./.env`, and `git push --force` / `git push -f`.

Without the deny rules, Claude could open `.env` while exploring the project and pull real secrets into the conversation, where they could end up echoed in output or pasted into a commit. A force-push could overwrite history on the remote and destroy other people's work, with no easy way back. `.env.example` is left readable on purpose: it has no secrets and documents the config.

One limit: the `Read` deny rule blocks the Read tool, not a shell command like `cat .env`, so it is a guard rather than a guarantee.

## Other change

While setting up, `git check-ignore` showed that `.gitignore` was not ignoring `.env` or `.claude/settings.local.json`: those lines were indented, and git treats leading spaces as part of the filename. I removed the indentation and confirmed both are now ignored.

## Verification

<!-- TODO: run /memory and /permissions in a fresh session, then replace this line with what you saw. -->
