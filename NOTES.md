# Setup Notes

## CLAUDE.md choices
**Kept:** a one-line description, the three commands I actually run (dev, test, lint, plus a note that CI needs lint and tests to pass), and a short architecture section (where the app is built, how routers are mounted, that the store is in-memory and resets on restart).

The conventions are rules Claude could plausibly get wrong without being told, each written as "do X, not Y" so it never has to ask: CommonJS instead of ESM, `node:test` + supertest instead of Jest, data access only through `db/store.js`, JSON `{ error }` responses with proper status codes, and new config going into `.env.example`, never `.env`.

**Left out:** a file-by-file listing and route details (Claude can read the code), setup steps already in the README, one-off task notes, and anything from `.env`. Every line in CLAUDE.md is loaded into every session, so I kept only what changes Claude's behaviour.

## Permission rules (`.claude/settings.json`)
- **allow** `npm test`, `npm run lint`: safe, read-only checks Claude should run freely after a change.
- **ask** `git push`: pushing is outward-facing, so I want to confirm each one.
- **deny** reading `.env` and its real variants (`.env.local`, `.env.*.local`, `.env.development`, `.env.production`, `.env.test`) via `Read` and `cat`: keeps secrets out of the conversation. The files are listed one by one rather than as `.env.*` so that `.env.example` stays readable, because CLAUDE.md tells Claude to add new config keys there and deny always beats allow. The Bash rules only catch `cat`, so they block the obvious workaround but aren't airtight.
- **deny** `git push --force` / `git push -f`: deny beats ask, so force pushes are blocked outright.

Without the deny rules, Claude could read `.env` while "looking around" and put real API keys or DB passwords into the transcript. It could also force-push over the remote branch and wipe out shared history.

I also fixed `.gitignore`: its entries were indented, and git treats leading spaces as part of the pattern, so `.env` and `.claude/settings.local.json` were **not** actually ignored. I also added `.DS_Store`.

## Verification
- `/memory` lists `./CLAUDE.md` as the loaded project memory.
- `/permissions` shows the allow, ask, and deny rules above under project settings.
- In a fresh session, "How do I run the tests here?" was answered with `npm test` / `node:test` + supertest, taken from CLAUDE.md.
