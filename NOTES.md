# Notes

## What went into CLAUDE.md, and what didn't

The file answers the questions I'd otherwise re-answer in every session: how to run the thing, the rules Claude can't infer from a single file, and where code belongs.

The conventions are the part that earns its place. That the project is CommonJS is visible in any one file, but *why* ESM breaks is not — `.eslintrc.json` sets `sourceType: "script"`, and CI runs `npm run lint` before `npm test`, so an `import` statement fails the build rather than the runtime. Same with the supertest rule: `server.js` guards `listen()` behind `require.main === module` specifically so tests can import `app`, and a test that starts its own listener will pass locally and hang in CI. Both are cheap to state and expensive to rediscover.

Left out deliberately:

- The route inventory (`GET /users`, `POST /users`, `/health`). Claude reads `routes/` faster than I can maintain a list that drifts.
- Anything from `.env.example`. Config values and secrets don't belong in a file that gets loaded into every session's context.
- Install and clone instructions. That's onboarding for a human, not standing context for a model.
- The store's implementation detail — except the one consequence that changes behaviour: data resets on restart, so ids aren't stable across runs.

The whole file is under 200 words. Everything in it changes what Claude does; nothing is there for completeness.

## Permission rules

```json
"allow": ["Bash(npm test:*)", "Bash(npm run lint:*)"]
"ask":   ["Bash(git push:*)"]
"deny":  ["Read(./.env)", "Bash(git push --force:*)"]
```

`npm test` and `npm run lint` are allowed because they're read-only, fast, and exactly what I want Claude running unprompted after a change — every approval prompt on those trains me to click "yes" without reading, which is how a genuinely destructive prompt gets approved.

`Read(./.env)` is denied rather than asked. `.env` is where a real `DATABASE_URL` lives, and without the deny rule a plausible-sounding request ("check the config") pulls credentials into the session transcript, where they're out of my control — logged, and potentially echoed back into a file or a commit. Prompting me wouldn't help: the request would look reasonable at the moment I'm asked. `.env.example` stays readable, which covers every legitimate reason to look.

`git push --force` is denied because it destroys history on a shared branch and can't be undone from the client. Plain `git push` is on `ask` instead of `deny` — I do want Claude pushing, but only when I've read what's in the commit.

## Verification

`/memory` lists `CLAUDE.md` as loaded at the project root, and `/permissions` shows the allow, ask and deny rules above. Asked "How do I run the tests here?" in a fresh session, Claude answers `npm test` from the file without reading `package.json`.

## One thing found along the way

`.gitignore` doesn't work. Every pattern after the first is indented, and Git treats leading whitespace as part of the pattern — so `   .env` matches a file whose name starts with three spaces, and `.env` is not ignored at all. `git check-ignore -v .env` exits 1, confirming it. The same applies to `.claude/settings.local.json`, which is supposed to stay off the repo.

I've left the fix out of this PR to keep it to the three deliverables, but the deny rule above is doing more work than intended: it's currently the only thing standing between `.env` and a commit.
