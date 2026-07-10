# NOTES.md

## CLAUDE.md

I kept it to four things: a one-line description, the commands I actually run (`npm run dev`, `npm test`, running a single test file, `npm run lint`), the architecture (entry point, one router per resource, the in-memory store, tests importing the exported `app`), and two conventions (thin route handlers, secrets only in git-ignored `.env`).

I left out a file-by-file walkthrough of `routes/` and `db/store.js` — that's obvious from opening the files and would just go stale. I also left out the CI workflow details beyond a one-line mention, and skipped generic advice like "write tests" or "handle errors well," since that's not specific to this repo and doesn't save Claude any time.

## Permission rules

I added an allow rule for `npm test`, `npm run lint`, and `npm run dev` since those are safe, non-destructive, and I run them constantly — no reason to be prompted every time. I added an ask rule for `git push` because it's visible to others even though it's not destructive, so I want a chance to double check what's being pushed.

For deny, I blocked `Read(./.env)`, `git push --force`, and `rm -rf`. Without the `.env` deny rule, Claude could read real secrets straight off disk even though `.env` is git-ignored from commits — git-ignoring only stops it from being committed, it doesn't stop a local read. Without denying `git push --force` and `rm -rf`, a bad suggestion or a misread instruction could force-push over shared history or delete files with no way to undo it.
