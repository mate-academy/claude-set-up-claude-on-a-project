# NOTES

## What went into CLAUDE.md — and what didn't

I kept the things that take reading two or more files to work out. The main one is that
`server.js` exports `app` and only calls `app.listen` under `require.main === module`; the tests
import `app` directly, so removing that guard breaks the suite in a way that isn't obvious from
either file alone. Same reasoning for the `routes/` → `db/store.js` boundary — the useful part
isn't that routes avoid the data array, it's *why*, so swapping in a real database stays a
one-file change. I also noted that router paths are relative to the mount point (`router.get("/")`
in `users.js` serves `GET /users`), that CommonJS is enforced by `sourceType: "script"` in the
ESLint config rather than being a style preference, and that there is no `/` route, so a browser
at the root correctly shows "Cannot GET /".

I left out the route list, the store's function names, and the file tree — all of that is faster
to discover by opening a file than by reading a stale description of it. I also left out generic
Express and testing advice, which doesn't depend on this repo at all. The commands section only
has what I actually ran and confirmed, including the single-file and single-test-by-name forms,
since those are the ones people usually have to go look up.

## Permission rules

Allow covers the inner loop: `npm test`, `node --test`, `npm run lint`, and read-only git
(`status`, `diff`, `log`). `node --test` is listed separately from `npm test` because it's how you
run one file or one test by name — without it, narrowing a test run prompts every time.

Ask covers `git push`, because it's outward-facing and this repo is graded by PR, and
`npm install`, because it can quietly add a runtime dependency when the project deliberately has
exactly one.

Deny covers `Read(./.env)`, `git push --force`, `git reset --hard`, and `rm -rf`. Without the
`.env` rule, a reasonable-sounding request like "check my config" pulls real secrets into the
transcript, and there's no taking that back once it's there. Without the git rules, an agent
tidying up history could force-push over a shared branch or `reset --hard` away uncommitted work
— both destructive, and the second isn't recoverable from the remote. Deny beats allow, so these
hold no matter what the allow list says.

One limit worth being honest about: `Read(./.env)` blocks the Read tool, not the shell —
`cat .env` isn't covered by it. Denying `cat` outright would break too much ordinary work, so
this is a guardrail against accidental reads rather than a real secrets boundary. The actual
protection is that `.env` never exists in the repo.

## Verification

Confirm before submitting: `/memory` should list this project's `CLAUDE.md` as loaded, and
`/permissions` should show the allow / ask / deny rules above. If the permission rules don't
appear, `.claude/settings.json` was created after the session started — open `/hooks` or restart
Claude Code to pick it up.

## One thing I'd fix in the starter repo

`.gitignore` has leading whitespace on the `.env` and `.claude/settings.local.json` lines. Git
does not strip it, so neither pattern matches and neither file is actually ignored:

```
git check-ignore -v .env                        # no match
git check-ignore -v .claude/settings.local.json # no match
git check-ignore -v node_modules                # matches (line 1, unindented)
```

That directly threatens the submission checklist, which requires both to stay out of the PR. The
fix is removing the indentation.
