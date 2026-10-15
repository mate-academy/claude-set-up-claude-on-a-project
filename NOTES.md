# NOTES

## 1. CLAUDE.md: what's in it, what I left out

`CLAUDE.md` has four short parts: a one-line project description, the commands I run most (`npm run dev`, `npm test`, `npm run lint`, plus a single-test command), conventions written as "use X, not Y" rules (CommonJS not ESM, `node:test` + `supertest` not Jest, `{ error }` JSON for failures, `Number()` on route params, routes go through `db/store.js`), and a three-bullet architecture overview. These are the things Claude can't safely guess from one file, and each one stops a specific mistake.

I deliberately left out a file-by-file tour, generic advice such as "write tests" or "handle errors", and the full README setup steps. Claude can discover the file layout itself, and generic rules just add noise that crowds out the project-specific ones. I also left out the `.env` variables, because I couldn't read `.env.example` and didn't want to guess at them.

## 2. Permission rules

In `.claude/settings.json` I allowed `npm test`, `npm run lint` and `node --test:*`. They are read-only checks I'd run constantly, so prompting every time would only slow me down. I set `git push` to ask, so I confirm anything that leaves my machine. I denied reading `.env` and `.env.*`, and denied `git push --force` and `-f`.

Without the `.env` deny, Claude could read real secrets such as API keys or database credentials into the conversation. From there they could be echoed into code, logs or commits, and they'd leave my machine as part of the prompt. Without the force-push deny, a mistaken or over-eager command could overwrite shared branch history on the remote, and that is hard to undo.

One caveat: `.env.*` also matches `.env.example`, which is harmless, so Claude can't read it either. The prefix patterns for force-push also won't catch every flag ordering, so they reduce risk but aren't airtight.
