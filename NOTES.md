# NOTES

## What's in my CLAUDE.md, and what I left out

My `CLAUDE.md` starts with a one-line description of the project, then lists the three commands I use: `npm run dev`, `npm test` and `npm run lint`. It has two conventions that are easy to get wrong: the project is CommonJS only, and tests use `node:test` + `supertest` rather than Jest. The architecture section covers the `require.main === module` guard that lets tests import `app`, the one-router-per-resource pattern, and the in-memory store whose state is shared across tests.

I left out anything Claude can learn by reading the code, such as a file-by-file listing, the individual route handlers or the dependency versions. I also left out generic advice ("write clean code"), one-off task notes and anything sensitive like `.env` values. Everything in `CLAUDE.md` is loaded into every session, so each line should be something Claude would otherwise get wrong. A shorter file keeps the important rules from being buried.

## Permission rules, and why the deny rules matter

In `.claude/settings.json`:

- **allow:** `npm test` and `npm run lint` are safe, read-only checks I run constantly, so Claude doesn't have to ask each time.
- **ask:** `git push` publishes work to a shared remote, so I want to confirm every push.
- **deny:** `Read(./.env)`, `git push --force` and `git push -f`.

Without the `.env` deny rule, Claude could read my real secrets (API keys, database passwords) into the conversation. From there they could be quoted in output, logs or commit messages. Without the force-push deny rules, one mistaken command could overwrite the remote branch's history and destroy teammates' commits. Deny rules take precedence over allow and ask rules, so those two actions stay blocked even if a broader rule would permit them.

`Read(./.env)` only blocks the Read tool. A shell command like `cat .env` would still get through, so a stricter setup would also deny `Bash(cat .env)` or rely on sandboxing.

The force-push rules match by prefix, so they catch `git push --force origin main` but not `git push origin main --force`. That form still hits the `git push` **ask** rule, so I would see a confirmation prompt before it runs.
