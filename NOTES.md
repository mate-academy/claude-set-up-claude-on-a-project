# Notes

## What's in CLAUDE.md, and what I left out

The file has a one-line description, the commands I actually run (`npm run dev`, `npm test`, `npm run lint`, plus how to run a single test file or tests matching a name), a short architecture section and a list of conventions. Every convention is a concrete rule taken from the code or the lint config: CommonJS rather than ES modules, data access only through `db/store.js`, the `{ error: "..." }` response shape, `node:test` + `supertest` rather than Jest, and not relying on exact user counts in tests (the store is shared state in memory).

I left out anything Claude can read straight from the code in seconds, like a full file listing or what each route does line by line. I also left out generic advice ("write tests", "handle errors"), the course instructions from the README and anything secret. The only config value mentioned is `PORT`, which isn't sensitive. A shorter file is more likely to be read and followed, and every line costs context in every session.

## Permission rules

- **Allow:** `npm help`, `npm test`, `npm run lint`, `npm run dev`, `node --test …` and read-only git (`status`, `diff`, `log`). These are safe and run constantly, so prompting for them is just noise.
- **Ask:** `git push`. A push publishes work to a shared remote, so I want to confirm each one.
- **Deny:** reading `.env`, and any force-push (`--force` / `-f`).

Without the `.env` deny rule, Claude could read real secrets into its context while looking around the project, and from there they could end up in a reply, a commit or a log. Without the force-push deny rule, one mistaken command could overwrite the remote branch history, which can't be undone. These rules don't depend on Claude making the right call, because the harness enforces them.

I also fixed `.gitignore`: its lines had leading spaces, so `.env` and `.claude/settings.local.json` weren't actually being ignored.

## Verification

- `/memory`: lists the project `./CLAUDE.md` as loaded and opens it in the editor (`$VISUAL`, vim here)
- `/permissions`: confirm the allow / ask / deny rules appear
