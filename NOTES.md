# Notes

## What's in CLAUDE.md, and what I left out

I kept the four required parts: a one-line description, Commands, Conventions and Architecture. Commands includes the single-file and single-test forms of `node --test`, because Claude can't guess those from `package.json`. It also notes that CI runs lint and then tests, so Claude knows both have to pass. The conventions are rules that aren't obvious from one file: CommonJS only, data access only through `db/store.js` (and `getAllUsers()` returns the live array), the `{ error }` response shape, converting `req.params.id` with `Number()`, and the test stack (`node:test` + `supertest`, no Jest). The architecture notes explain how pieces connect across files: `server.js` only calls `listen()` when run directly so tests can import `app`, there's one router per resource, and the in-memory store is shared between tests.

I left out a file-by-file listing, since Claude can see the tree itself. I also left out the README's course instructions and setup steps, because they're one-off tasks and don't help with working on the code. There are no secrets in it, only a pointer to `.env.example`. And I skipped generic advice like "write tests" or "handle errors". Each line should tell Claude something it would otherwise get wrong or have to ask about.

## Permission rules

- **allow** `Bash(npm test:*)`: running the tests is safe and happens constantly, so I don't want a prompt every time.
- **ask** `Bash(git push:*)`: pushing affects the shared repo and is hard to undo, so I want to confirm each one.
- **deny** `Read(./.env)`: `.env` is where real secrets go. Without this rule, Claude could read the file while debugging config, and the secrets would end up in the conversation and get sent to the model.
- **deny** `Bash(git push --force:*)`: a force-push can overwrite commits on the remote, including other people's work. Without the deny rule, the general `git push` ask rule might let one through after a quick, careless approval.

While setting this up I found that `.gitignore` had spaces at the start of each line, so `.env` wasn't actually being ignored. I removed them and checked with `git check-ignore`. The `Read(./.env)` deny rule stops Claude from reading the file, but only `.gitignore` stops it from being committed. The two together cover both risks.

## Verification

- `/memory`: TODO, confirm `CLAUDE.md` shows as loaded
- `/permissions`: TODO, confirm the allow / ask / deny rules above are listed
