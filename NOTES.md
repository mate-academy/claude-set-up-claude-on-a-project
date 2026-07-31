# Notes

## CLAUDE.md

I kept it to four short parts: a one-line description, the three npm scripts I actually run
(`dev`, `test`, `lint`), two conventions (CommonJS over ESM, and always going through
`db/store.js` instead of touching the `users` array directly), and a short architecture note
covering `server.js`, `routes/`, and `db/store.js`.

I left out: anything already obvious from reading the code (e.g. that `/users` returns JSON),
the full request/response shape of each endpoint, and any mention of `.env` contents — none of
that saves time for Claude and it's the kind of thing that goes stale the moment a route
changes. No secrets or pasted docs went in either.

## Permission rules

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are safe, read-only-ish
  commands I run constantly, so approving them every time is just friction.
- **ask**: `Bash(git push:*)` — pushing affects a shared remote, so I want a chance to glance
  at it each time rather than auto-approving.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`. Without the first, Claude could read
  real secrets out of `.env` and potentially echo them into a response, a commit message, or a
  log. Without the second, a force-push could silently overwrite a teammate's commits on a
  shared branch with no easy way back.

## Verification

Node.js isn't available in the environment I used to generate these files, so I couldn't run
`claude --version`, `/init`, `npm install/test/lint`, `/memory`, or `/permissions` myself. Please
run those in your own terminal to confirm: `claude --version` reports a version, `/memory` shows
this `CLAUDE.md` as loaded, and `/permissions` lists the allow/ask/deny rules above.
