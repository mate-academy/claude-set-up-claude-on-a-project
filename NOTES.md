# NOTES.md

## CLAUDE.md

**What I kept:** a one-line description of the project, the three commands I run constantly (`npm run dev`, `npm test`, `npm run lint`), two conventions Claude can't infer from code (plain JS, not TS/ES modules; config via env vars, never commit secrets), and a short architecture note (entry point `server.js` mounting one route file per resource, data through `db/store.js`).

**What I left out:** anything the code already says — route shapes, function names, response formats — plus one-off setup steps and anything sensitive. The file only holds rules that would genuinely change what Claude does, so it stays short and worth loading every session.

## Permission rules

In `.claude/settings.json`:

- **allow** `Bash(npm test*)` — safe, non-destructive, and the command I run most, so it shouldn't prompt every time.
- **ask** `Bash(git push*)` — pushing is outward-facing, so I want to confirm each time.
- **deny** `Read(./.env)` and `Bash(git push --force*)` — without the deny rule, debugging could prompt Claude to read `.env` and echo a secret into the transcript or a commit; a force-push can rewrite shared history and destroy collaborators' work in one command. Neither is ever needed here.

## Verified

`/memory` shows `CLAUDE.md` loaded, and `/permissions` shows the rules above.