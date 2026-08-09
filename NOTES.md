# Notes

## What went into CLAUDE.md — and what didn't

I kept four things: a one-line description, the three commands I actually run
(`npm run dev`, `npm test`, `npm run lint`), the conventions that aren't visible
from any single file, and a short architecture note.

The conventions are the part that earns its place. CommonJS-vs-ESM, "tests use
`node:test` + supertest, don't add Jest", "all data access goes through
`db/store.js`", and "keep the `require.main === module` guard in `server.js` so
tests can import `app`" are all rules Claude would otherwise guess at — and the
`require.main` one is a real trap: drop the guard and every test run tries to
bind port 3000.

What I deliberately left out:

- Anything Claude can read in ten seconds — the route list, what
  `getAllUsers()` does, the ESLint config.
- Setup prose from the README (cloning, `cd`, installing Node). That's for
  humans arriving at the repo, not for a session that's already inside it.
- Secrets and env values. `.env.example` is the pointer; real values live in
  the git-ignored `.env` and belong nowhere near a file that loads into every
  prompt.
- One-off task notes ("finish the users endpoint"). Those go stale in a week
  and quietly cost tokens on every request from then on.

Every line loads into context on every message, so anything that doesn't change
what Claude *does* is pure overhead.

## Permission rules

`.claude/settings.json`:

- **allow** — `npm test`, `npm run lint`, `git status`, `git diff`. Read-only or
  idempotent, run constantly, and approving each one manually is the main source
  of friction in a session.
- **ask** — `git push` and `npm install`. Both are fine most of the time and
  both are things I want to see before they happen: one is outward-facing, the
  other rewrites the lockfile and pulls in third-party code.
- **deny** — `Read(./.env)`, `Bash(cat .env:*)`, `git push --force`, `rm -rf`.

Without the `.env` deny, a plausible request like "why is the server on the
wrong port?" leads straight to reading `.env` — and once a secret is in the
transcript it's in the transcript. `.env.example` stays readable, which is
enough to answer config questions. I denied both the `Read` tool and `cat .env`
on purpose: a `Read` deny doesn't cover a shell command that prints the same
file.

Without the `git push --force` deny, one confidently wrong "let me clean up the
branch history" overwrites work on the remote that no local reset brings back.
`rm -rf` is the same argument on the filesystem.

## Verification

In a fresh session, `/memory` lists `CLAUDE.md` as loaded from the project root,
and `/permissions` shows the allow / ask / deny rules above. Asking "How do I
run the tests here?" gets `npm test` back with no further explanation from me.
