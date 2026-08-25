# Notes on the Claude Code setup

## CLAUDE.md

I kept it to four short sections: a one-line description, commands, conventions, and architecture.

- **Commands**: `npm run dev`, `npm test`, `npm run lint` — the three scripts actually defined in `package.json`, so Claude never has to guess or invent one.
- **Conventions**: CommonJS over ESM, one route file per resource, all data access through `db/store.js`, and the `400`/`404` error shape used in `routes/users.js`. These aren't obvious from a single file, so writing them down saves Claude from second-guessing the style on a new route.
- **Architecture**: a few lines on `server.js`, `routes/`, `db/store.js`, and the `require.main === module` guard that lets tests import `app` without binding a port — that guard is the one non-obvious thing in the whole codebase, worth calling out.

What I left out:

- Anything derivable by reading the code (e.g. exact route paths, the shape of the `users` array) — Claude can read the files itself.
- The `.env.example` contents — no secrets belong in `CLAUDE.md`, and there's nothing there Claude needs memorized.
- Course/assignment instructions and one-off setup steps — not relevant to future sessions working on this code.

## Permission rules (`.claude/settings.json`)

- **Allow**: `npm test`, `npm run lint`, `npm run dev` — safe, frequently-run, non-destructive commands. Letting these through without a prompt each time is the main quality-of-life win.
- **Ask**: `git push` — not dangerous by itself, but it's a shared/visible action, so I want a chance to glance at what's being pushed first.
- **Deny**: reading `.env` and `git push --force`. Without the `.env` deny rule, Claude could read real secrets into context and potentially echo them back or include them in a commit/PR description. Without the force-push deny rule, an assistant chasing a merge conflict or a "just make it work" prompt could silently overwrite shared history on a branch — hard to reverse and easy to lose someone else's work.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` lists the allow/ask/deny rules above, sourced from `.claude/settings.json`.
- Asking "How do I run the tests here?" is answered directly from `CLAUDE.md` (`npm test`) without further explanation needed.
