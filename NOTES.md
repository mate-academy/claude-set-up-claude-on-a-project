# NOTES

## CLAUDE.md — what I kept and what I cut

**Kept.** A one-line description of the project. The commands from `package.json`, including how to run a single test file, so Claude never guesses at tooling. Conventions written as rules that can be followed without asking a question — CommonJS not ESM, one router per resource, all data access through `db/store.js`, and the importable-not-self-starting `server.js` pattern that lets the tests import `app` without binding a port. And a short TOGAF BDAT architecture note, one line per domain.

**Cut.** Per-file walkthroughs of `server.js`, the two routers and the store: all of it is faster to read in the code than in a document that will drift out of date. Maintenance comments addressed to human editors, which reload into context every session and teach Claude nothing about the code. Speculative infrastructure — an earlier draft named a Cloudflare production stack (Workers, D1, KV, `wrangler`), none of which exists in this repo; a CLAUDE.md that asserts infrastructure the project does not have is worse than one that stays silent, because Claude will act on it. And any secret or env value; the file points at `.env.example` and stops there.

The test I applied to each line: will this still be true in three months, and would Claude do the wrong thing without it? Anything failing both was cut.

## Permission rules

**allow** — `npm test`, `npm run lint`, `npm run dev`, `npm start`, `node --test`, and read-only git (`status`, `diff`, `log`). These run constantly and change nothing, so a prompt for each is friction with no safety return.

**ask** — `git push`. Outward-facing, and worth a deliberate confirm each time.

**deny** — `Read(./.env)` and `git push --force`. Without the first, Claude can pull real credentials into the transcript, from where they can reach a summary, a commit message or a pasted snippet; denying the read keeps secrets out of context in the first place rather than relying on nothing going wrong downstream. Without the second, a single command rewrites shared branch history — and unlike almost anything else Claude does, that is not recoverable from the working tree.

`.claude/settings.json` is committed so the rules travel with the repo. Personal overrides stay in the git-ignored `.claude/settings.local.json`.

## Verification

In a fresh session: `/memory` shows this `CLAUDE.md` loaded, `/permissions` lists the allow / ask / deny rules above, and asking "how do I run the tests here?" is answered from the file without further explanation.
