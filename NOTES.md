# Notes on my Claude Code setup

## CLAUDE.md choices

I included a one-line project description, four commands (dev, test, single test, lint), three conventions (CommonJS not ES modules, data access only through `db/store.js`, JSON `{ error }` responses with 400/404), and a short architecture section. The architecture section covers what you can't see from a single file: `server.js` only listens when run directly so tests can import `app`, and the in-memory store is shared across tests.

I left out a per-file listing, what Express is, and the course instructions from the README, since Claude can read those from the code or they don't help with the work. I also skipped one-off notes and anything sensitive like `.env` contents. Shorter = more useful.

## Permission rules

My allow rules let Claude run `npm test` and `npm run lint` without asking, since those are the two checks CI runs and the main way I validate changes.

Pushing is an ask rule, so I confirm every push. On top of that, the deny rules block force-pushing (`--force` and `-f`) and reading `.env` (via the Read tool and `cat`). Without the force-push deny, a force push would only get a prompt, and approving it too quickly could overwrite commits other people have made. Without the `.env` deny, Claude could read secrets into the conversation. These are prefix matches, so they don't catch every variation (for example `git push origin main --force`). The ask rule on `git push` is the backstop for those.

I also fixed `.gitignore`. Its lines had leading spaces, so `.env` and `.claude/settings.local.json` weren't actually being ignored.

## Verification

In a fresh session, `/memory` shows `./CLAUDE.md` as loaded and `/permissions` lists the allow, ask and deny rules above.
