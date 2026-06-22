# Notes

## CLAUDE.md

I kept the file to four lean sections: a one-line description, the three commands I actually run (`dev`, `test`, `lint`), the conventions that aren't obvious from reading a single file (CommonJS over ESM, data access only through `db/store.js`, one route file per resource), and a short architecture map so Claude knows where things live and why `server.js` guards `listen()`.

I deliberately left out: anything ESLint already enforces in detail, the sample seed data in `db/store.js` (it's right there in the code), step-by-step install instructions (those live in the README), and any secrets or environment values. The aim was that every line tells Claude something it couldn't cheaply infer from the code itself.

## Permission rules

- **allow** — `npm test` and `npm run lint`. These are safe, read-only checks I run constantly, so approving them every time is just friction.
- **ask** — `git push`. I want a deliberate confirmation before anything leaves my machine.
- **deny** — reading `./.env` and `git push --force`. Without the `.env` deny rule, secrets could end up echoed into the conversation or a commit; without the force-push deny rule, a single command could overwrite shared branch history and destroy other people's work. Denying both removes the worst-case mistakes entirely rather than relying on me to catch them.

The committed `.claude/settings.json` is shared with the team; personal overrides stay in `.claude/settings.local.json`, which `.gitignore` already excludes.

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" is answered from `CLAUDE.md` (`npm test`) without further explanation.
