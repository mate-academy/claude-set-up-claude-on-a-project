# NOTES

## What's in my CLAUDE.md, and what I left out

I kept four short sections: a one-line description, **Commands**, **Conventions**, and **Architecture**.

- **Commands**: the four commands I actually use. I also noted that CI runs lint and tests, so Claude checks both before a push.
- **Conventions**: rules Claude can't safely guess and would otherwise get wrong. CommonJS instead of `import`, `node:test` + `supertest` instead of Jest, data access only through `db/store.js`, one error-response format, and no touching `.env`. Each one is written as "do X, not Y", so Claude doesn't need to ask.
- **Architecture**: three lines on how `server.js`, `routes/` and `db/store.js` fit together. I added the non-obvious detail that `server.js` only calls `listen()` when run directly, which is why tests can import `app`.

**What I left out on purpose:**
- the list of endpoints and the fields of a user, because Claude can read them straight from the code and they would go out of date;
- installing Claude Code, opening a terminal and the steps for submitting the task, because those are one-off steps that don't help in day-to-day work;
- anything from `.env` or other configuration values, because secrets don't belong in a committed file.

## Permission rules

- **allow**: `npm test`, `npm run lint`, `git status`, `git diff`. These are safe, read-only or local checks that I run all the time, so they shouldn't ask for confirmation.
- **ask**: `git push` and `npm install`. A push sends code to GitHub, and an install changes dependencies and `package-lock.json`, so I want to approve these myself each time.
- **deny**: reading or editing `.env` (including through `cat`), `git push --force` / `-f`, and `rm -rf`.

**What could go wrong without the deny rules:** Claude could read `.env` and show real secrets in the chat or put them into another file. A force-push could overwrite someone else's commits on the remote, and `rm -rf` could delete files with no way to get them back. This matters even more here, because in the current `.gitignore` the `.env` line starts with spaces, and I checked with `git check-ignore` that git does not actually ignore the file. So the deny rule is a real extra layer of protection.

## Verification

- **Tests:** `npm install` + `npm test` on Node.js v26.13.1 (npm 11.20.0). All 4 tests passed (`pass 4`, `fail 0`). CI uses Node 22, so a final check on Node 22 happens in CI.
- **Previous task's `CLAUDE.md`:** there was a `CLAUDE.md` in the parent folder from a previous task (`hello.py`, `snake_case`), and Claude Code loaded it here too, so it conflicted with this project. I moved it to a separate backup folder, so now only this project's `CLAUDE.md` loads.
- **"How do I run the tests here?"** I asked this in a fresh session (Claude Code 2.1.330) without any extra explanation. The answer was: "Run `npm test`. It uses Node's built-in test runner. On a fresh clone, run `npm install` once first." Claude said it took this from the **Commands** section of `CLAUDE.md`, and it also reminded me to run `npm run lint` before a push, because CI checks both.
- **`/memory`:** I checked this in a new interactive session. It shows only the project's `./CLAUDE.md`, with no old file from the parent folder.
- **`/permissions`:** I checked this in a new interactive session. It shows the rules from `.claude/settings.json`:
  - **Allow:** `npm test`, `npm run lint`, `git status`, `git diff`
  - **Ask:** `git push`, `npm install`
  - **Deny:** `.env` (`Read`, `Edit`, `cat`), `git push --force` / `-f`, `rm -rf`
