# NOTES

## CLAUDE.md: what I included and what I left out

I kept CLAUDE.md to what a future session cannot infer from the code alone: the exact commands (`npm run dev`, `npm test`, `npm run lint`, and running a single test by name), the architecture (`server.js` exports `app` and only listens when run directly, one router per resource in `routes/`, data in `db/store.js`), and the conventions the code already follows (use `store` functions instead of the array, use `supertest` against `app`, use `process.env.PORT`, return `{ error }` with 400/404, name unused params `_`/`req`/`res`/`next`, keep secrets in `.env`). I left out the README's prose, the full contents of the Express docs, any API endpoint list (it changes with the code and belongs in the README), any secrets, and one-off tasks like "add a users endpoint," because those would go stale or clutter every session. The file should stay short so it is cheap to load and easy to keep correct.

## Permission rules: what I added and what could go wrong

In `.claude/settings.json` I allowed `npm test` and `npm run lint` so routine verification does not prompt every time, and set `git push` to ask, so pushing always needs a human decision. I denied `Read(./.env)` because `.env` holds real secrets; without that rule, Claude could read the file and put credentials into the conversation, logs, or a shared transcript. I also denied `git push --force`, because a force push can silently overwrite remote history, including commits teammates have already pulled. Without these deny rules, a single careless or misled action could leak a secret or destroy shared work, and neither outcome is easy to undo.

## Verification

- `claude --version` reports `2.1.332 (Claude Code)`, so the CLI is installed.
- `.claude/settings.json` contains at least one allow rule and one deny rule.
- `/memory` opens `CLAUDE.md` as the loaded project memory, and `/permissions` lists the rules above. I did not capture those screens here; run both commands in a session to confirm them.
