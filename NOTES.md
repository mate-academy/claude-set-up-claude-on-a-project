# Notes

## What I put in CLAUDE.md, and what I left out

I kept CLAUDE.md to the four parts Claude needs to work on this project without asking: a one-line description, the commands, the conventions and a short architecture note.

- **Commands:** `dev`, `test` and `lint` are the ones I run every day. I added `typecheck` and `build` because the project is now TypeScript, and Claude should check types before saying a change is done.
- **Conventions:** only rules that are specific to this project and easy to get wrong. Examples: use `import`, not `require`; one router file per resource; routes go through `db/store.ts`; how to return errors from a handler; and the lint rule for unused parameters, which exempts only the exact names `_`, `req`, `res` and `next` (not anything starting with `_`).
- **Architecture:** a few lines on how a request flows from `server.ts` through `routes/` to `db/store.ts`, so Claude knows where new code goes.

I left out:

- anything Claude can read from the code itself, like what Express does or the full list of endpoints
- one-off tasks and notes, because CLAUDE.md is loaded into every session and they would go stale
- my reasoning, which lives here in NOTES.md instead
- anything sensitive, such as values from `.env`

## Permission rules

The rules are in `.claude/settings.json`:

- **Allow** `npm test` and `npm run typecheck`. Claude runs these often, they only read the code, and they can't break anything.
- **Ask** before `git push`. A push is normal, but it publishes work, so I want to confirm each one.
- **Deny** reading `.env` and running `git push --force`.

Without the deny rules, Claude could read `.env` and put a real secret into the conversation, where it might end up in a log or a commit. It could also force-push and overwrite commits on the remote that can't be recovered.

The deny rules have limits. `Read(./.env)` doesn't stop a shell command like `cat .env`. `git push --force` doesn't match `git push -f`, but the ask rule on `git push` still catches that, so it never runs without my OK.

## Verification

- [ ] In a fresh session, `/memory` shows CLAUDE.md as loaded
- [ ] `/permissions` shows the allow, ask and deny rules above
- [ ] Asking "How do I run the tests here?" gets `npm test` from CLAUDE.md without me explaining
