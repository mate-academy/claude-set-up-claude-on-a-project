# Notes

## CLAUDE.md

I kept a one-line description, the three npm commands, five conventions and a short architecture section. Each convention is a rule Claude can't safely guess from one file: CommonJS instead of ES modules, data access only through `db/store.js`, the `{ error }` JSON shape, the `node:test` + `supertest` testing style, and keeping `.env` out of reach.

I left out anything Claude can read straight from the code: the individual endpoints, the contents of `package.json`, and what each function does. I also left out one-off tasks, long pasted docs and anything sensitive such as real config values. A shorter file is easier for Claude to follow and cheaper to load every session.

## Permissions (.claude/settings.json)

- **allow:** `npm test` and `npm run lint`. They are safe, I run them constantly, and approving them every time would slow Claude down.
- **ask:** `git push`. Pushing publishes work, so I want to confirm each one.
- **deny:** reading `.env` (and `.env.*.local`), and force-pushing (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets such as database URLs and API keys into the conversation, where they might end up in logs or be sent on to other tools. Without the force-push deny rule, a mistaken `git push --force` could overwrite shared history and destroy teammates' commits.

## Verification

- `npm test` passes (4/4) and `npm run lint` is clean with these files added.
- `.claude/settings.json` is valid JSON with allow, ask and deny rules.
- `/memory` and `/permissions`: in a fresh `claude` session in this repo, `/memory` should list `CLAUDE.md` as loaded and `/permissions` should show the allow (`npm test`, `npm run lint`), ask (`git push`) and deny (`.env` reads, force-push) rules. Asking "How do I run the tests here?" should answer `npm test` straight from `CLAUDE.md`.
