# NOTES.md

## What I put in `CLAUDE.md` — and what I left out

I kept four things: a one-line description, the commands I actually run, the architecture that isn't visible from any single file, and conventions written as rules Claude can follow without asking.

The architecture section only covers what costs time to rediscover:

- `server.js` exports `app` and only calls `app.listen()` under `require.main === module`. Without that line written down, a plausible "cleanup" would break every test, because the tests import the app instead of starting a server.
- Routers are mounted in `server.js`, so paths inside `routes/*.js` are relative. This is the thing you get wrong on your first edit if nobody tells you.
- `db/store.js` is the only door to the data. The rule is "add an exported function," not "reach into the array."

The conventions are all rules with a consequence attached. CommonJS over ESM isn't a style preference here — ESLint is configured with `sourceType: "script"`, so an `import` statement fails `npm run lint` and therefore fails CI. Same for the `{ error: string }` response shape and validate-and-return-early: they're what the existing handlers and tests already assume.

I deliberately left out:

- **The file listing.** `ls` shows it, and a list in a doc goes stale the moment someone adds a file.
- **The course submission steps** from the README — a one-off task, not standing guidance.
- **Anything about `.env` contents.** `CLAUDE.md` is committed; secrets don't belong in a committed file, and the pointer to `.env.example` is enough.
- **Generic advice** ("write tests", "handle errors well"). It burns context without changing what Claude does.

I verified each command before writing it down: `node --test tests/users.test.js` passes 4/4 and `npx eslint .` exits clean, so the file doesn't document anything aspirational.

## Permission rules, and what the deny rules are for

**Allow** — `npm test`, `npm run lint`, `node --test`, `git status`, `git diff`. These are read-only or run in a sandbox, they're exactly what CI runs, and I run them dozens of times a session. Approving each one individually is friction that teaches you to click "yes" without reading, which is the real hazard.

**Ask** — `git push` and `npm install`. Both reach outside the repo. A push is visible to other people and hard to walk back; `npm install` can add a dependency or rewrite `package-lock.json`. Neither is dangerous enough to forbid, but both are worth one deliberate look.

**Deny** — `Read(./.env)`, `git push --force`, `git reset --hard`.

What goes wrong without the `.env` deny rule: `.env` is git-ignored precisely because it holds real credentials, but git-ignored only means "not committed." Nothing stops a file from being read into the conversation, and once a secret is in context it can end up quoted back in an explanation, pasted into a code sample, or written into a file that *is* committed. The deny rule keeps the secret out of the transcript in the first place, which is the only reliable place to stop it. `.env.example` is committed and readable, so anyone still learns which variables exist — just not their values.

The two git deny rules cover the operations that destroy work rather than change it. `push --force` can overwrite a branch other people have pulled; `reset --hard` throws away uncommitted changes with no reflog entry to recover them. Neither has a use here urgent enough to justify being one keystroke away, and both are still available by running them by hand.

`.claude/settings.json` is committed so the whole team gets the same rules. `.claude/settings.local.json` stays out — it's already in `.gitignore`, and personal overrides shouldn't silently become everyone's policy.

## Verification

Run these in a fresh session to confirm the setup loads:

- `/memory` — `CLAUDE.md` should appear as a loaded project memory.
- `/permissions` — the allow / ask / deny rules above should be listed.
- Ask "How do I run the tests here?" — the answer should come back with `npm test` (and the single-file form) without any explanation from you.
