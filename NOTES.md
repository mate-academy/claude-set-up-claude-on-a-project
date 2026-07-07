# Notes

Why the `CLAUDE.md` and permission rules look the way they do.

## CLAUDE.md

- Kept it to four lean sections — description, Commands, Conventions, Architecture — and cut anything obvious from the code.
- **Commands** lists what I run most (`dev`, `test`, `lint`) plus how to run a single test file and the fact that CI gates on lint + test, so Claude knows both must pass.
- **Conventions** captures the non-obvious rules that keep new code consistent: CommonJS (enforced by ESLint's `sourceType: "script"`), quote/semicolon style, state only in `db/store.js`, one router per resource, and the validate-then-store error pattern.
- **Architecture** explains the one thing you can't see from a single file: the `require.main === module` guard in `server.js` is what lets tests import `app` and drive it with `supertest` without opening a port.

## Permission rules (`.claude/settings.json`)

- **allow** — the test, lint, and dev commands. These are safe and I run them constantly, so prompting each time just adds friction.
- **ask** — `git push`. I want a deliberate confirmation before anything leaves my machine.
- **deny** — reading `.env` (never expose secrets to the model) and force-pushes (`--force` / `-f`), which can destroy history. Deny always wins over allow/ask.

These live in `settings.json` so they're shared with anyone who clones the repo. Personal, machine-specific overrides belong in `.claude/settings.local.json`, which is already git-ignored.

## Verification

Settings are read at startup, so I restarted Claude in the project folder and confirmed:

- `/memory` lists `CLAUDE.md` as loaded.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" returns `npm test` straight from `CLAUDE.md`, with no extra explanation.
