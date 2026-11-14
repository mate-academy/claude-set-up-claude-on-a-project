# Notes on the Claude Code setup

## CLAUDE.md: what went in, what stayed out

**In.** Only things Claude would otherwise have to guess or rediscover each session:

- A one-line description, so Claude knows this is a small Express API with an in-memory store.
- The commands I actually run (`npm run dev`, `npm test`, `npm run lint`), plus how to run a single test file or a test by name. The single-test forms are not in `package.json`, so they are the ones worth writing down.
- Conventions written as "use X, not Y" rules, each taken from the existing code or config rather than invented:
  - CommonJS, not ES modules (ESLint is set to `sourceType: "script"`, so `import` fails lint).
  - `node:test` + `supertest`, no other test framework.
  - Tests import `app` and never bind a port.
  - Routes go through `db/store.js` instead of touching data directly.
  - Errors are JSON `{ "error": ... }` with the matching status code.
  - Never read or commit `.env`; new config goes in `.env.example`.
- A short architecture note covering the three things that need more than one file to understand: `server.js` only listens when run directly (which is why tests can import it), one router file per resource, and the store's state being shared across tests in a process.

**Out, and why.**

- A file-by-file listing and descriptions of each endpoint: Claude can read these from the code in seconds, and a copy in `CLAUDE.md` goes stale.
- Generic advice ("write tests", "handle errors"): it applies to every project and changes nothing about how Claude behaves here.
- The course instructions from the README, and any one-off tasks: they describe this assignment, not the codebase.
- Anything sensitive: no values from `.env`, no tokens, no personal details.

The aim was a file short enough that every line changes what Claude does.

## Permission rules

**Allow** — `npm test`, `npm run lint`, `node --test`. These are read-only checks I run constantly, so a prompt each time is friction with no safety benefit.

**Ask** — `git push` and `npm install`. A push is visible to other people and hard to take back; an install runs third-party code and can change the lockfile. I want to see both before they happen.

**Deny** — reading or editing `.env`, and `git push --force` / `-f` (with the flag before or after the remote and branch).

**What could go wrong without the deny rules.**

- Without the `.env` rule, Claude could open the file while exploring the project, and any real secret in it (a database URL, an API key) would end up in the conversation and could be echoed into a commit, a log, or a pasted snippet. The rule covers Claude's file tools; a shell command such as `cat .env` is not hard-blocked and falls back to the normal permission prompt.
- Without the force-push rule, a single command could overwrite history on the remote and destroy other people's commits. Deny takes precedence over ask, so a force-push is refused outright rather than offered as a prompt I might approve by reflex.

## Verification

- [ ] `/memory` in a fresh session shows `CLAUDE.md` as loaded
- [ ] `/permissions` shows the allow / ask / deny rules above
- [ ] Asking "How do I run the tests here?" is answered from `CLAUDE.md` without extra explanation

## Found along the way

The repo's `.gitignore` indents the `.env`, `npm-debug.log*` and `.claude/settings.local.json` lines with leading spaces. Git treats those spaces as part of the pattern, so `.env` is not actually ignored (`git check-ignore .env` returns nothing). I left it alone because the assignment says not to change the project beyond the three deliverables, but it should be fixed before a real `.env` exists.
