# Notes

## CLAUDE.md

I kept it to the four parts the assignment asks for: a one-line description, the commands I run often (`dev`, `test`, `lint`, `start`), two real conventions (CommonJS only, and routes must go through `db/store.js` rather than touching the in-memory array directly), and a short architecture note.

The one thing I made sure to call out explicitly was `server.js`'s `require.main === module` guard — it's not obvious from a directory listing, but it's why the tests can `require("../server")` without binding a real port, and it's exactly the kind of non-obvious fact Claude should know before touching `server.js` or the tests.

I deliberately left out: a restatement of the folder structure (discoverable by listing the repo), a description of what Express or the test runner does (general knowledge, not project-specific), and anything about `.env`/secrets (there's nothing sensitive here, and I didn't want to encourage Claude to go looking).

## Permissions (`.claude/settings.json`)

- **Allow**: `npm test`, `npm run lint` — both are read-only against the repo (no state changes), so there's no reason to be asked every time.
- **Ask**: `git push` — reversible, but visible to others once pushed, so I want a chance to review first.
- **Deny**: reading `.env`, and `git push --force` — without the `.env` deny rule, Claude could read real secrets into context the moment a teammate adds one (the file is currently just an example, but the rule should hold regardless); without the force-push deny rule, an agent working autonomously could overwrite someone else's pushed commits with no way to recover them.

To verify: start a fresh session and check `/memory` shows `CLAUDE.md` as loaded, and `/permissions` lists the allow/ask/deny rules above.
