# Notes

## CLAUDE.md choices

I kept it to four short sections: a one-line description, the three commands
I actually run (`dev`, `test`, `lint`), three conventions Claude couldn't
reliably infer just by reading one file (CommonJS over ESM, the error-response
shape, and routing all data access through `db/store.js`), and a short
architecture note on how `server.js`, `routes/`, and `db/store.js` fit
together.

I left out: anything obvious from reading the code (e.g. "GET /health returns
status ok" — that's one line in `routes/health.js`), install/setup steps
already covered in the README, a description of the test framework (`node
--test` + `supertest` is visible in `package.json` and the test file itself),
and any secrets or example env values. Nothing in `.env.example` made it in.

## Permission rules

- **allow**: `Bash(npm test:*)` and `Bash(npm run lint:*)` — both are read-only
  checks I run constantly and never want to approve manually.
- **ask**: `Bash(git push:*)` — pushing touches the shared remote, so I want a
  chance to look before it happens, even though it's not destructive.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)`. Without the first,
  Claude could read real secrets straight out of `.env` while debugging and
  potentially echo them back into chat, a commit message, or a generated
  file. Without the second, a force-push (e.g. while "cleaning up" a branch)
  could silently overwrite commits on the remote with no easy way back.

## Verification

Ran a fresh, non-interactive session in this folder (`claude -p "How do I run
the tests here?"`) and it answered "Run `npm test` — it uses Node's built-in
test runner (`node --test`)..." straight from `CLAUDE.md`, with no extra
explanation from me — confirms the file is being picked up and read.

That run also printed a warning: permission rules from `.claude/settings.json`
are ignored until this workspace is trusted, which needs one interactive
`claude` session where you accept the trust dialog. After that, `/memory`
should list `CLAUDE.md` as loaded and `/permissions` should show the
allow/ask/deny rules above — do that once locally to finish verification.
