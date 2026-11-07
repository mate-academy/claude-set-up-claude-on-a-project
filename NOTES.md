# NOTES

## What's in my CLAUDE.md, and what I left out

**What's in it.** It opens with a one-line description of the project. **Commands** covers dev, test, a single test file, a test-name pattern, and lint, plus what CI runs and that both lint and tests must pass. **Architecture** explains how `server.js`, `routes/`, `db/store.js` and the tests fit together. **Conventions** lists the rules Claude couldn't safely guess: use CommonJS and not ES modules, the JSON error format and status codes, `Number(req.params.id)`, not assuming an exact user count in tests, and config coming from `process.env` with no `dotenv`.

I kept the lines that stop Claude from making a plausible but wrong change. For example, it would be easy to drop the `require.main === module` guard and break the tests, or to write tests that expect exactly 2 users while store state is shared across the run.

**What I left out, and why:**
- **A list of every endpoint or store function.** Claude can read these from the code, and a copy goes out of date as soon as the code changes.
- **Setup steps, like cloning and opening a terminal.** These are for people and already live in the README.
- **Secrets and real `.env` values.** `CLAUDE.md` is committed, so anything in it is public.
- **One-off tasks and generic advice ("write clean code").** They don't help in later sessions, and every line is loaded into context each time.

Shorter is better: every line should change what Claude does.

## Permission rules

My rules are in `.claude/settings.json`:

- **allow:** `npm test` and `npm run lint`. Both are safe, read-only, and run all the time, so Claude can check its own work without asking.
- **ask:** `git push`. Pushing is visible to others, so I want to confirm it each time.
- **deny:** reading `.env` and `.env.*`, plus `git push --force` and `git push -f`.

**What could go wrong without the deny rules.** Without the `.env` rule, Claude could read real secrets while debugging, such as a database URL with a password. Those secrets would then be in the conversation and could end up in a commit message, a log, or a pasted snippet. Without the force-push rule, one mistaken command could overwrite the remote branch and wipe out other people's commits.

**Known limitations:**
- `Read(./.env.*)` also blocks `.env.example`, which contains no secrets. I accepted that, because `CLAUDE.md` already says config comes from `PORT`.
- A `Read` deny rule doesn't stop a shell command like `cat .env`. It's a guardrail, not a sandbox.

## Verification

- `/memory` shows the project `CLAUDE.md` as loaded.
- `/permissions` lists the allow, ask and deny rules above.
- Asked "How do I run the tests here?", Claude answered from `CLAUDE.md`: `npm test`, plus the single-file and pattern options.
