# Notes — Claude Code setup

## CLAUDE.md: what I kept and what I cut
I kept four lean sections: a one-line description, the commands I actually run (dev, test, lint, plus how to run a single test), conventions Claude could get wrong without being told (CommonJS not ESM, stay on ESLint 8 legacy config, all data access through `db/store.js`, `node:test` + `supertest` instead of Jest, config from `process.env` and never touching `.env`), and a short architecture note (`server.js` exports `app`, one router per resource, in-memory store shared across tests).

I cut the generic header line that `/init` adds, because it tells Claude nothing about this project. I left out anything Claude can see by reading the code, any one-off tasks, and any secrets or values from `.env`.

## Permission rules
- **allow:** `npm test` and `npm run lint` — safe, read-only checks I run constantly, so no need to approve them every time.
- **ask:** `git push` — pushing is visible to others, so I want to confirm each one.
- **deny:** `Read(./.env)`, `Bash(cat .env:*)` and `Bash(git push --force:*)`. Without the `.env` deny, Claude could read real secrets and they could end up in a conversation or a commit. Without the force-push deny, a single command could overwrite history on the remote and lose other people's work.

## Extra fix: .gitignore
While setting this up I found that the `.env` and `.claude/settings.local.json` lines in `.gitignore` were indented, so git was not actually ignoring them. The deny rule stops Claude from reading `.env`, but it does not stop `git add` from committing it. I removed the indentation and confirmed with git that both are now ignored and that no real `.env` exists in the history. That is why `.gitignore` is included in this PR.

## Verification
In a fresh session, `/memory` showed `./CLAUDE.md` loaded, and `/permissions` listed my allow, ask and deny rules. Asking "How do I run the tests here?" got `npm test` straight from CLAUDE.md, without extra explanation.
