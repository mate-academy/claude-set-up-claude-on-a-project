# Notes

## CLAUDE.md: what's in it and what I left out

I started from `/init` and kept four short sections:

- **Description:** one line on what the project is.
- **Commands:** `npm run dev`, `npm test`, `npm run lint`, plus how to run a single test by name. I tested each command, and the first single-test command I tried didn't work on Node 22.
- **Conventions:** rules I took from the existing code, such as CommonJS instead of ES modules, routes going through `db/store.js`, the `{ error: "..." }` error format, and the test setup. These are things Claude would otherwise guess wrong or have to ask about.
- **Architecture:** how `server.js`, `routes/` and `db/store.js` fit together. I also noted that the tests share the in-memory data during a run, which you can't see from any single file.

I left out anything Claude can see by opening a file (a full file list, the endpoint list, the `package.json` contents), setup steps like `npm install`, the course instructions from the README, and anything from `.env`. That keeps the file short, so every line is something Claude actually needs.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`. They only check the code and are run all the time, so asking every time would just slow things down.
- **Ask:** `git push`. Pushing publishes my code, so I want to approve each one.
- **Deny:** reading `.env`, and `git push --force` / `git push -f`.

Without the `.env` deny rule, Claude could read real secrets (passwords, API keys) and they could end up in its output or in a commit. This matters more here because I found that the repo's `.gitignore` doesn't actually ignore `.env`. The lines have leading spaces, so the pattern doesn't match (`git check-ignore .env` confirms it), and a `.env` could be committed by accident. The deny rule only covers Claude's file-reading tool, so it isn't a complete guarantee against something like `cat .env`. Without the force-push deny rule, one command could overwrite the history on GitHub.

## Verification

- `/memory` shows `./CLAUDE.md` as loaded.
- `/permissions` shows the allow, ask and deny rules above.
- When I asked "How do I run the tests here?", Claude answered with `npm test` and the single-test command from `CLAUDE.md` without any extra explanation from me.
