# NOTES.md

## CLAUDE.md choices

I kept it to four short parts: a one-line project description, the commands I run often (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file), a short architecture note (`server.js` entry point, one router per resource in `routes/`, data access only through `db/store.js`), and two real conventions (CommonJS not ESM, and `node:test`/`supertest` instead of Jest/Mocha).

I left out anything Claude can already discover by reading the code: the file/folder layout, the exact route list, and the in-memory store's implementation details. I also left out the course README's own step-by-step instructions and the `.env` / secrets guidance — that's project-setup context, not something Claude needs repeated on every task. Shorter felt stronger here since the whole app is only a handful of files.

## Permission rules

I added:
- **allow**: `Bash(npm test:*)` — I run tests constantly while iterating, so I don't want to approve it every time.
- **ask**: `Bash(git commit *)` — commits are easy to undo but I still want a chance to review the message and staged files before they're made.
- **deny**: `Bash(git push --force *)` — force-push rewrites history on a shared branch. Without this rule, Claude could force-push over a teammate's commits (or my own) during a rebase-and-push flow, silently destroying work that would otherwise need a reflog rescue or a request to whoever got overwritten.
