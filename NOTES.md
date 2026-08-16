# NOTES.md

## What went into CLAUDE.md, and what I left out

I kept four things: a one-line description, the commands I actually run, conventions that are decisions rather than facts, and a short map of how the folders relate.

The conventions are the part that earns its keep. Every one of them is a rule Claude would otherwise get wrong by defaulting to what's most common elsewhere: it reaches for `import` (this project is CommonJS and ESLint's `sourceType: "script"` will fail the lint), and it reaches for Jest (this project uses the built-in `node:test` runner with `supertest`). "Data access goes through `db/store.js`" and "errors are `res.status(4xx).json({ error })`" are the two rules that keep a new route looking like the existing ones. The note about `server.js` staying importable exists because that guard is easy to "tidy up" and doing so breaks every test at once.

What I deliberately cut:

- **The endpoint list.** `routes/users.js` is 35 lines. Claude can read it faster than I can describe it, and a hand-written list goes stale the moment a route changes.
- **Setup and Node version.** `package.json` and the README already say it, and CI pins it.
- **Anything from `.env`.** Config values and secrets don't belong in a file that gets committed and loaded into every session.
- **Explanations of Express itself.** Claude knows what a router is; spending lines on it dilutes the rules that are actually project-specific.

The test was whether a line changes what Claude does. A line that only restates the code doesn't, so it went.

## Permission rules

```json
"allow": ["Bash(npm test:*)", "Bash(npm run lint:*)", "Bash(node --test:*)"]
"ask":   ["Bash(git push:*)", "Bash(npm install:*)"]
"deny":  ["Read(./.env)", "Bash(git push --force:*)", "Bash(git reset --hard:*)"]
```

**Allow** covers the three commands that run constantly and can't damage anything — they read code and print results. Approving them by hand every time trains you to click "yes" without reading, which is exactly the habit that makes the ask rules useless.

**Ask** covers the two that reach outside the working tree. `git push` publishes to a shared branch, and `npm install` can write to `node_modules` and `package.json` from the network — both are fine to do, but worth a glance first.

**Deny** covers what shouldn't happen at all.

Without `Read(./.env)`, the risk isn't malice — it's that a real `.env` holds a database URL or API key, and reading one pulls that secret into the conversation. From there it can be echoed into a commit message, a code comment, or a bug report, and a secret only has to leak once. Denying the read means it never enters the context in the first place. `.env.example` stays readable, so Claude can still see what config the project expects.

`git push --force` and `git reset --hard` are both irreversible against work that isn't yours: a force-push overwrites commits on the remote, and a hard reset discards uncommitted changes with no undo. Neither has a legitimate use here that's worth the blast radius, so they're denied outright rather than left to a yes/no prompt.

## Verification

- **CLAUDE.md loads.** Confirmed by running `claude -p "How do I run the tests here, and what test framework does this project use?"` in the project root. It answered with `node --test tests/users.test.js` and "not Jest or Mocha" — both facts that exist only in `CLAUDE.md`, not in the code. `/memory` in an interactive session lists it as a Project memory.
- **Permission rules load.** `/permissions` shows the allow, ask, and deny lists above.

One gotcha worth recording: on the first headless run, Claude Code printed `Ignoring 3 permissions.allow entries from .claude/settings.json: this workspace has not been trusted.` A committed `settings.json` only takes effect after you've opened the project interactively once and accepted the trust dialog. Worth knowing before assuming the rules aren't working — a teammate cloning this repo has to do the same.

## One fix outside the brief

`.gitignore` had leading whitespace on every line after the first. Git treats leading spaces as part of the pattern, so `   .env` only matched a file literally named `   .env` — the real `.env` and `.claude/settings.local.json` were **not** being ignored. `git check-ignore -v .env` exited 1, confirming it. Since the whole point of the deny rule above is keeping secrets out of the repo, I stripped the whitespace so the file does what it claims.
