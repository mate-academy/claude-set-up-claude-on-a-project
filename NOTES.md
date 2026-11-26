# NOTES.md

## What went into CLAUDE.md — and what didn't

The file covers four things: a one-line description of the project, the three commands run most often, two non-obvious conventions, and the three-file architecture. That is everything Claude needs to work in this repo without asking questions.

Left out: the Node test runner name, the `supertest` library, the ESLint suppression rule for unused params, and the note about running a single test file. Those are either derivable from `package.json` and `.eslintrc.json` in seconds, or one-off details that clutter the file without helping on most tasks. Shorter files get read; longer ones get skimmed.

## Permission rules and what they protect

Three rules are in `.claude/settings.json`:

- **Allow `npm test`** — tests run constantly during development, so removing the confirmation prompt keeps the loop fast.
- **Ask on `git push`** — pushing sends code to a remote and is hard to undo cleanly, so a confirmation step is worth it.
- **Deny `cat .env*` and `git push --force`** — without the `.env` deny, an agent could silently read secrets (API keys, database URLs) and leak them into a response or a log. Without the force-push deny, an agent could overwrite shared history on a remote branch, destroying commits that other people depend on. Both are irreversible enough to block entirely rather than just ask about.
