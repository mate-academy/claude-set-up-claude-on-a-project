# Notes

## What's in CLAUDE.md, and what I left out

**In:** one line on what the project is, the commands I run every day (dev, test, lint), how to run a single test or filter tests by name, and that CI runs lint and then tests on Node 22. Conventions cover things Claude would otherwise guess wrong. Use CommonJS, not ES modules. Use `node:test` with `supertest`, not Jest. Routes get data only through `db/store.js`. Errors are JSON `{ error }` with 400, 404 or 201 status codes. Route IDs must go through `Number()` before lookup, because the store compares with `===`. The architecture section explains why `server.js` exports `app` and only listens when run directly. It also says the in-memory store is shared across all tests in a file, which isn't obvious until a test breaks.

**Out:** a file-by-file listing, because Claude can find that with `ls`. I also left out the course setup steps from the README, which don't help with coding, and generic advice like "write tests". Secrets and the contents of `.env` stay out too. Every line had to be something Claude couldn't learn quickly from the code itself.

## Permission rules

- **allow:** `npm test`, `npm run lint`, `node --test …`. These are read-only checks I run constantly, so prompting for them is just friction. `npm run dev` is left out on purpose because it starts a server that never finishes.
- **ask:** `git push …`. Pushing is visible to others, so I want to confirm each one.
- **deny:** `Read(./.env)` and `cat .env`, plus `git push --force` / `-f` / `--force-with-lease`.

**Without the deny rules:** Claude could read `.env` while debugging config. Real secrets such as `DATABASE_URL` would then end up in the conversation and could leak into code, commits or logs. Claude could also run a force-push that overwrites remote history and destroys teammates' commits with no easy undo.

**Known limits:** rules match by prefix. `git push origin main --force` doesn't hit the force-push deny rule, but it still hits the `git push` ask rule, so I get prompted. `head .env` isn't blocked either. The deny list is a guardrail, not a sandbox.

## Verification

- [x] `/memory` picks up `./CLAUDE.md` as the project memory file
- [x] `/permissions` shows the allow / ask / deny rules above
- [x] Asked "How do I run the tests here?" and Claude answered from `CLAUDE.md`

## Side note

The repo's `.gitignore` has leading spaces on every line after the first. Git treats those spaces as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored. I checked this with `git check-ignore`, then removed the leading spaces. Both paths are now ignored.