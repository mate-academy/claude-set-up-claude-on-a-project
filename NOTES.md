# NOTES.md

## What I put in CLAUDE.md — and what I left out

I kept CLAUDE.md to the things a future Claude session can't quickly infer from the
code: a one-line description, the common commands (`npm run dev`, `npm test`,
`npm run lint`, plus running a single test file and the CI gate), the request→router→
`db/store.js` data flow, and a few real conventions ("use CommonJS, not ES modules",
"keep data access in `db/store.js`"). I called out the load-bearing bits that aren't
obvious from a single file — the `require.main === module` guard in `server.js` that
lets tests import `app` in-process, and `store.js` being the single seam for a future
real database.

I deliberately left out the full file tree, the dependency list, and generic advice
("write tests", "handle errors") because those are discoverable or obvious. I also
left out the course/exercise instructions from the README, since they describe the
assignment, not how to work in the code — including them would just add noise.

## Permission rules — and what the deny rule prevents

I added **allow** rules for the safe commands I run constantly (`npm test`,
`npm run lint`, `git status`, `git diff`) so Claude doesn't stop to ask each time; an
**ask** rule for `git push *` so anything leaving my machine needs a confirmation; and
**deny** rules for `rm -rf *` and `Read(./.env)`.

Without the `Read(./.env)` deny, Claude could open the git-ignored `.env` and echo real
secrets into the transcript or a commit. Without the `rm -rf *` deny, a single
mis-scoped delete command could wipe files irreversibly. The deny rules turn both of
those from "one bad command away" into "not possible without me changing the rules."
