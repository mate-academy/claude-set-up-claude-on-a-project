# Notes

## CLAUDE.md

**What's in it.** A one-line description, four commands, four conventions and three architecture lines.

- The commands are the ones run most often: `npm run dev`, `npm test`, `npm run lint`, plus `node --test tests/users.test.js` for a single test file, which is not in `package.json`.
- The conventions are rules the existing code already follows, written as "use X, not Y" so Claude does not have to ask: CommonJS not ES modules, Node's built-in test runner with supertest not Jest, data access only through `db/store.js`, and errors returned as JSON `{ error: "message" }` with the matching status code.
- The architecture note covers the one thing that takes reading several files to see: `server.js` exports the app and only listens when run directly, each resource has its own router in `routes/`, and `db/store.js` is the single in-memory data layer.

**What I left out, and why.**

- The `/init` boilerplate sentence, a second single-test command and the CI steps. They are either generic or readable straight from `package.json` and the workflow file.
- A list of every file and endpoint. Claude can find those by reading the code, and a list goes stale.
- A "never call `app.listen` in tests" rule, because the architecture line about `server.js` already says it.
- Anything from `.env`, and any one-off task notes. Secrets do not belong in a committed file, and one-off notes stop being true.

Every line in the file is loaded into each session, so anything Claude could work out alone only adds noise.

## Permission rules

- **Allow:** `npm test` and `npm run lint`. Both only read the code and report, and I run them constantly, so a prompt each time is friction with no benefit.
- **Ask:** `git push`. Pushing is visible to others, so I want to confirm it each time.
- **Deny:** reading `.env`, and force-pushing as either `git push --force` or `git push -f`.

**What could go wrong without the deny rules.** `.env` is where real secrets such as a database URL would live. Without the rule Claude could read it while exploring the project, and the values could then end up in a reply, a log or a commit. A force-push can overwrite commits on the remote that other people rely on, and it cannot be undone from my machine. Deny takes priority over ask, so a force-push is refused outright instead of prompted.

## Verification

- `claude --version` runs (2.1.290).
- `/permissions` in a fresh session shows the allow, ask and deny rules above.
- Asked "How do I run the tests here?" in a fresh session, Claude answered from `CLAUDE.md` without any explanation from me.
- `/memory` in a fresh terminal session shows `CLAUDE.md` loaded. (In the VS Code extension the same command opens the auto-memory panel, which does not list it.)
