# Notes

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to four short parts: a one-line description, the commands, the conventions and the architecture. The commands are `dev`, `test` and `lint`, plus how to run a single test file or only the tests matching a name, since that's what saves time when one test fails. The conventions are rules Claude couldn't safely guess and would otherwise get wrong: CommonJS instead of ES modules (ESLint is set to `sourceType: "script"`), `node:test` + `supertest` instead of Jest, all data access through `db/store.js`, and the `{ error: "..." }` response shape. The architecture section explains how the pieces connect, including two things that aren't obvious from a single file: `server.js` only calls `listen` when run directly so tests can import `app`, and the in-memory store is shared across tests in one run.

I left out a file-by-file listing, since Claude can see the files itself. I also left out the endpoint list, which is already readable in `routes/`. Generic advice like "write tests" or "handle errors" doesn't help on this project, so it's out too. Nothing sensitive is in the file: no secrets, no real `.env` values, no one-off tasks. The less it says, the more weight each line carries.

## Permission rules

- **Allow:** `npm test`, `npm run lint` and `node --test`. They only read code and run checks, and Claude runs them all the time, so prompting for them would just be noise.
- **Ask:** `git push` and `npm install`. Pushing sends my work to the remote, and installing pulls in outside code, so I want to approve both each time.
- **Deny:**
  - **Reading or editing `.env`:** without this rule, Claude could read real secrets into the conversation (and from there into logs or a commit), or overwrite my local config.
  - **`git push --force` / `-f`:** without it, one mistaken command could overwrite shared history on the remote. Deny beats ask, so a plain push still prompts but a force-push is always refused.
  - **`git reset --hard` and `rm -rf`:** these destroy uncommitted work with no undo.

The `.env` rule only covers Claude's file tools. A shell command like `cat .env` would still get through unless I deny that too. So the rule lowers the risk; it doesn't make reading `.env` impossible.

## Verification

- `/memory`: <!-- TODO: confirm CLAUDE.md shows as loaded in a fresh session -->
- `/permissions`: <!-- TODO: confirm the allow / ask / deny rules are listed -->
