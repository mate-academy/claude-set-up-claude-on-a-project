# Notes

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

My CLAUDE.md has a one-line description of the project and the commands that matter: dev server, the full test suite, a single test file or pattern, lint, and the fact that CI needs both lint and tests to pass. It also lists the conventions Claude couldn't safely guess: CommonJS only, routes go through `db/store.js`, errors come back as `{ error }` JSON, and tests use `node:test` with `supertest`. Last, it has a short architecture section explaining why `server.js` only calls `listen()` when run directly, and that the in-memory store is shared between tests. I left out anything Claude can find by reading the code in a few seconds, like a file-by-file tour, the full route list, dependency versions and generic advice like "write clean code". Every line in CLAUDE.md is loaded into every session, so I kept only what prevents real mistakes and didn't repeat what the code already says.

## Which permission rules did you add, and what could go wrong without your deny rule?

In `.claude/settings.json` I allowed `npm test`, `npm run lint` and `node --test`, so Claude can run the test and lint loop without asking me each time. `git push` is set to ask, so nothing leaves my machine without my approval. The deny rules block reading `.env` and `.env.local`, and block `git push --force` / `git push -f`. Without them, Claude could read secrets such as API keys into the conversation, where they could end up in output, logs or a commit. It could also force-push and overwrite history on the remote, deleting other people's commits in a way that's hard to undo. Deny rules beat allow and ask rules, so even if I approve something too quickly by accident, these actions stay blocked.
