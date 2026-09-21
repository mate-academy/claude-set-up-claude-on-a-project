# Notes

## CLAUDE.md

I included a one-line project description, the three npm scripts I'd actually run day to day (`dev`, `test`, `lint`), two conventions that aren't obvious from skimming a single file (CommonJS-only, and always going through `db/store.js` rather than touching its internal array), and a short architecture section covering the entry point, the one-route-file-per-resource layout, and the in-memory store.

I left out: a file-by-file listing (the tree is small enough to `ls`), the `.env.example` contents (not a real convention, just a sample), and anything about deployment or CI, since none exists yet in this starter. I also didn't restate what `eslint:recommended` already enforces — Claude can read `.eslintrc.json` directly if it needs the exact rule set.

## Permission rules

- **Allow**: `npm test` and `npm run lint` — both are safe, read-only-ish commands I run constantly while iterating, so I don't want to be prompted every time.
- **Deny**: reading `.env` (real secrets, even though this starter's `.env.example` has none, a real `.env` could) and `git push --force` (rewrites remote history).
- **Ask**: `git push` — I want a chance to review what's being pushed each time, without fully blocking it.

Without the deny rule on `.env`, Claude could read and potentially echo real secrets into a response or a file it writes, if it were ever debugging a config issue. Without the deny rule on force-push, a well-intentioned "fix the branch" action could silently overwrite remote commits (mine or a collaborator's) with no way to easily recover them.
