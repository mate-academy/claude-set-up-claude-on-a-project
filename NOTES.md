# Notes

## CLAUDE.md

I kept it to four short sections: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), two conventions that aren't obvious from skimming one file (CommonJS-only, and that route handlers must go through `db/store.js` rather than touching the `users` array), and a short architecture note on how `server.js`, `routes/`, and `db/store.js` fit together.

I deliberately left out: anything already obvious from reading the code (e.g. that `routes/users.js` has a GET/POST split — Claude can just read the file), the `.env.example` contents, the ESLint rule details (Claude can read `.eslintrc.json` directly), and any one-off task notes. Nothing sensitive lives in the file since this is a starter project with no real secrets.

## Permissions

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, side-effect-free commands I run constantly during a session, so approving them every time would just be friction.
- **Ask**: `Bash(git push:*)` — pushing affects a shared remote, so I want a chance to look at what's about to go out before it does.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets straight out of `.env` and potentially echo them into a response or a committed file. Without the second, a force-push during an agentic session could silently overwrite someone else's commits on a shared branch with no easy way back.

## Verification

- `/memory` shows `CLAUDE.md` loaded.
- `/permissions` shows the allow/ask/deny rules from `.claude/settings.json`.
- Asked "How do I run the tests here?" and Claude answered from `CLAUDE.md` (`npm test`) without needing an explanation.
