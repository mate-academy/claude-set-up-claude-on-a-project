# NOTES

## What is in CLAUDE.md

`CLAUDE.md` (untracked in git at the time of writing, so not yet committed) covers four areas:

1. **Project summary:** a CommonJS Express API on Node 22 (CI), with in-memory data that resets on restart.
2. **Commands:** `npm install`, `npm run dev` (`node --watch`, port 3000, `PORT` overrides), and `npm start`.
3. **Architecture:**
   - `db/store.js` is the only data layer. Routes call it and never touch its arrays. New data access goes there.
   - Tests in `tests/` import `app` from `server.js` and use supertest. New endpoints get tests in the same style.
4. **Conventions:**
   - Use `require`, not `import`, because ESLint uses `sourceType: "script"`.
   - Unused arguments named `_`, `req`, `res`, or `next` are allowed. Any other unused variable is a warning.

It also notes that `.env.example` documents `PORT`, but nothing loads `.env` because there is no dotenv dependency.

## What was deliberately left out, and why

Authorship note: the `CLAUDE.md` was not written by me in this session. I have not added or changed it, so the reasons below are inferred from its content, not from the author's stated intent.

Things it does not cover that a reader might expect:

- **Route and endpoint list.** It is not needed: the routes are small and can be read directly, and a list goes stale as endpoints change.
- **Full test and lint commands** (`npm test`, `npm run lint`). These are in `package.json` and are easy to find. Only the commands that cannot be guessed from the code are listed.
- **Secrets and `.env` contents.** Secrets must never be in a committed instruction file, and `.env` is git-ignored.
- **Long style guides or formatting rules.** Only lint rules that actually change how code is written are included.

## Permission rules

**None were added.** There is no `.claude/settings.json` in the repo. The only file in `.claude/` is `settings.local.json`, which is git-ignored by design for personal settings. I did not create or read it, and I did not write any allow or deny rules.

## What could go wrong without a deny rule

No deny rule exists, so nothing is blocked. Without one, the risks are the usual ones for a session that can run shell commands:

- **Reading or sending secrets.** Claude could read `.env` (which holds real secrets) and include its contents in output or a commit. A deny rule on reading `.env*` would prevent this.
- **Destructive commands.** Commands such as `rm -rf`, `git reset --hard`, or `git push --force` could run without a prompt if they are allowed by default or by a broad allow rule.
- **Unintended network calls.** Commands that send data outside the machine could run without review.

Recommended next step: add a `.claude/settings.json` with allow rules for read-only and routine commands (`npm test`, `npm run lint`, `git status`, `git diff`) and deny rules for `Read(./.env)`, `Bash(rm -rf:*)`, and `Bash(git push --force:*)`. Then check the syntax against the current Claude Code docs before committing it.
