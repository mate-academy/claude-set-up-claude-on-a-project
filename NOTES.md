# Notes

## What's in CLAUDE.md, and what I left out

I kept `CLAUDE.md` to the four parts the brief asks for: a one-line description, the commands, the architecture and the conventions. The commands cover the dev server, the test suite, running a single test by name, and lint. It also notes that CI runs lint and then the tests, so Claude knows both have to pass. The architecture section explains how the files connect, which you only see by reading several of them. `server.js` exports `app` and only listens when it's run directly, which is why the tests can use supertest without opening a port. Each resource gets its own router, and all data access goes through `db/store.js`. Each convention is a "use X, not Y" rule that Claude can follow without asking: CommonJS rather than ES modules, routes go through the store instead of touching the array, errors use the JSON `{ error }` shape with 400/404/201, tests use `node:test` rather than Jest, and `.env` is never read or committed.

I left out anything Claude can see straight from the code, like a file-by-file listing, the list of endpoints and the dependency versions. I also left out generic advice such as "write clean code", one-off setup steps like `npm install` and the course instructions, and anything sensitive. The `.env.example` values stay in that file. Every line in `CLAUDE.md` should save a question or prevent a wrong guess. A longer file would just dilute the rules that matter.

## Permission rules

- **Allow `Bash(npm test:*)`**: running the tests is safe, read-only and happens constantly. Allowing it means Claude can check its own changes without asking me each time.
- **Ask `Bash(git push:*)`**: pushing is visible to other people and hard to undo, so I want to confirm each push.
- **Deny `Read(./.env)`**: real secrets would live in `.env`. Without this rule, Claude could read the file while looking around the project and copy values into its context, into a commit or into output I share. It matters more here because the leading spaces in `.gitignore` mean `.env` isn't actually ignored by Git.
- **Deny `Bash(git push --force:*)`**: a force-push can overwrite commits on the remote and wipe out other people's work. Without this rule, a single approved command could rewrite `main`. It only matches the exact `--force` prefix, so forms like `git push -f` fall through to the `git push` ask rule instead.

## Verification

In a fresh session, `/memory` listed the project `CLAUDE.md` as loaded, and `/permissions` showed the allow, ask and deny rules above. When I asked "How do I run the tests here?", Claude answered with `npm test` and the single-test command from `CLAUDE.md`.
