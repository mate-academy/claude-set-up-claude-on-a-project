# Notes

## What I put in `CLAUDE.md`, and what I left out

I kept four things: a one-line description of the project, the three commands I actually run
(`npm run dev`, `npm test`, `npm run lint`), the conventions that aren't obvious from reading a
single file, and a short architecture note.

The conventions are the part that earns its place. "Use CommonJS, not ESM" and "reach data only
through `db/store.js`" are rules Claude cannot infer reliably from one file — it would happily
write an `import` statement or query the `users` array straight from a route. The architecture
note explains the one genuinely surprising line in the codebase: `server.js` guards `listen()`
behind `require.main === module` so the tests can import the app without binding a port.

I deliberately left out: a file-by-file listing (Claude can read the tree faster than I can
describe it), the Express and ESLint versions (they live in `package.json` and would go stale),
API endpoint documentation (the route files are shorter than any summary of them), and anything
resembling a secret or a one-off task. Everything I cut was either already in the code or would
have needed updating the moment the code changed.

## Permission rules, and what the deny rule prevents

**Allow** — `npm test` and `npm run lint`. Both are read-only checks I run constantly, and CI runs
them on every push anyway. Approving them one at a time was pure friction with no safety benefit.

**Ask** — `git push`. Pushing is the moment work becomes visible to other people, so I want to
see it coming rather than have it happen mid-task.

**Deny** — reading `.env`, and `git push --force`.

Without the `.env` deny rule, `.env` is just an ordinary readable file. Claude might open it while
debugging a config problem, and its contents — a real `DATABASE_URL` with a password in it, in a
real project — would land in the transcript. `.gitignore` keeps `.env` out of Git; it does nothing
to keep it out of a conversation. The deny rule is what actually closes that gap.

`git push --force` is denied rather than asked because it can overwrite commits on the remote that
no longer exist anywhere else. There is no situation in this project where I'd want it to happen
without typing it myself.

## A gap I found while testing this

The repo's `.gitignore` does not actually ignore `.env`. Lines 2-4 are indented with spaces, and
Git treats leading whitespace as part of the pattern, so the rule matches a file literally named
`   .env` and never the real one. I confirmed it with `git check-ignore -v .env`, which reports no
match, and a scratch `.env` duly appeared in `git status` as untracked.

That makes the `Read(./.env)` deny rule more than belt-and-braces here: on this repo, `.env` is an
ordinary visible file that both Git and Claude can pick up. The deny rule is the only thing
currently standing between a real secret and a transcript.

## Verification

`/memory` shows this `CLAUDE.md` loaded as project memory, and `/permissions` lists the allow, ask,
and deny rules above. Asking "How do I run the tests here?" in a fresh session gets `npm test`
back without me explaining the project.
