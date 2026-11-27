# Notes

## CLAUDE.md: what I kept and what I cut

**Kept:**
- A one-line description of the project.
- The `dev`, `test` and `lint` commands, plus how to run a single test (`node --test --test-name-pattern`). That last one isn't obvious from `package.json`, and it saves running the whole suite.
- Conventions Claude could get wrong without being told:
  - CommonJS, not ESM (ESLint is set to `sourceType: "script"`);
  - `node:test` + `supertest`, not Jest;
  - data access only through `db/store.js`;
  - errors returned as `{ error }` with 400/404 status codes.
- An architecture note on the parts you only understand by reading several files together:
  - `server.js` exports `app` and only calls `listen()` when run directly, which is what makes the tests work;
  - there is one router per resource;
  - the in-memory store is shared between tests in the same run, so a test can't rely on a fixed user count.

**Cut:**
- A full file listing, because Claude can discover it in one command.
- The course instructions from the README, because they are one-off tasks, not rules for working in the code.
- Any `.env` values, because secrets and config don't belong in a committed file.
- Generic advice ("write tests", "handle errors"), because it adds lines without changing Claude's behaviour.

## Permission rules

- **allow:**
  - `npm test`, `npm run lint` and `node --test` run constantly and only read code or run it locally;
  - `git status`, `git diff` and `git log` are read-only.

  Allowing them removes most permission prompts.
- **ask:**
  - `git push`, because it publishes work, so I want to confirm each time;
  - `npm install`, because it changes `package-lock.json` and runs third-party install scripts.
- **deny:**
  - reading or editing `.env` (through `Read`/`Edit` and `cat .env`);
  - `git push --force` / `-f`;
  - `git reset --hard`;
  - `rm -rf`.

**What could go wrong without the deny rules:**
- Claude could read `.env` while looking for config. The real secrets in it would then end up in the conversation context and could be repeated in output, logs or commits.
- A force-push could overwrite teammates' commits on the remote.
- `reset --hard` and `rm -rf` destroy uncommitted local work and can't be undone.

`.claude/settings.json` is committed so the whole team shares these rules. Personal overrides go in `.claude/settings.local.json`, which is git-ignored.

## Verification

- `npm test` and `npm run lint` pass. The single-test command in `CLAUDE.md` was run and works.
- In a fresh session, `/memory` shows `CLAUDE.md` as loaded and `/permissions` lists the allow / ask / deny rules above.
