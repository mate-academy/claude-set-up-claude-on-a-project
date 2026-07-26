# Notes

## CLAUDE.md

I kept it to four short sections: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), two conventions that aren't obvious from skimming the code (CommonJS-only, and always going through `db/store.js` instead of touching the `users` array directly), and a brief architecture map of `server.js` → `routes/` → `db/store.js`.

I left out: anything the file structure already makes obvious (e.g. "there's a `tests/` folder"), the `.env.example` contents, and any deployment or environment notes, since none of that changes how Claude should write code here. Nothing sensitive is in the project, so there was nothing to scrub on that front — the deny rule below is the safeguard for that going forward.

## Permission rules

- **Allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — these are read-only/side-effect-free commands I run constantly, so I don't want a prompt every time.
- **Ask**: `Bash(git push:*)` — pushing affects the shared remote, so I want a chance to review before it happens, even though it's not destructive by itself.
- **Deny**: `Read(./.env)` and `Bash(git push --force:*)` — without the first, Claude could read real secrets out of `.env` and potentially echo them back into a response or a file; without the second, a force-push could silently overwrite someone else's commits on a shared branch.

Verified in a session: `/memory` shows `CLAUDE.md` as loaded, and `/permissions` lists the allow/ask/deny rules above.
