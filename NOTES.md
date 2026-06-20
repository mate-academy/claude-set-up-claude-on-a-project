# NOTES

## CLAUDE.md — what I kept and what I cut

I kept four lean sections: a one-line description, the **commands** that aren't obvious from `package.json` alone (notably the two single-test forms, `node --test tests/users.test.js` and `--test-name-pattern`), three enforceable **conventions** (CommonJS only, one router file per resource mounted in `server.js`, and data access only through `db/store.js`), and a short **architecture** note describing the `server.js → routes/*.js → db/store.js` request flow.

I deliberately left out the full file tree, the dependency list, and the course's step-by-step task instructions. Those are either discoverable from the repo in seconds or already live in the README, so repeating them would just add noise. The two architecture facts I *did* keep are the ones you can't see from a single file: the store is in-memory and resets on restart, and `server.js` only calls `app.listen()` when run directly so tests can import `app` without binding a port.

## Permission rules

`.claude/settings.json` has one **allow** rule, `Bash(npm test:*)`, and one **deny** rule, `Read(./.env)`.

The allow rule covers the command I run most often, so Claude can run the tests without prompting every time. The deny rule blocks Claude from reading `.env`. Without it, a routine request like "summarize the config" or "why won't the server connect" could pull real secrets (e.g. a `DATABASE_URL`) into the conversation — and from there into logs, a pasted snippet, or a commit. Denying the read keeps secrets out of the model's context entirely, which is safer than relying on `.env` staying git-ignored.

## Verification

- `/memory` lists this `CLAUDE.md` as a loaded project memory.
- `/permissions` shows the `Bash(npm test:*)` allow and `Read(./.env)` deny rules from `.claude/settings.json`.
