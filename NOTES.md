# Notes

## CLAUDE.md

**Included:** the essentials for working in this repo quickly and consistently — the three npm commands (`dev`, `test`, `lint`), two non-obvious conventions (early-return error handling instead of `else` nesting, and keeping unused Express params named `req`/`res`/`next` since ESLint allows it), and a one-paragraph architecture map (`server.js` entry point, one route file per resource, all data access funneled through `db/store.js`).

**Left out:** anything derivable by reading the code itself — e.g. the actual route implementations, the shape of the in-memory store, or a file-by-file walkthrough. Also left out general Express/Node best practices and boilerplate advice, since those aren't specific to this project. The goal was to capture only the things a fresh session (or a new contributor) couldn't reliably infer just by opening the files: naming/style conventions that look like they *should* be "fixed" but are intentional, and the one architectural rule (routes never touch data directly) that isn't enforced by the code structure alone.

## Permission rules

Added in `.claude/settings.json`:

- **allow:** `Bash(npm test:*)` — running the test suite is safe, frequent, and non-destructive, so it shouldn't need a prompt every time.
- **ask:** `Bash(git push:*)` — pushing affects shared/remote state, so it should require confirmation but isn't inherently destructive, hence "ask" rather than "deny".
- **deny:** `Read(./.env)` and `Bash(git push --force:*)`.

**What could go wrong without the deny rules:**
- Without denying `Read(./.env)`, an agent could open the `.env` file while exploring the repo (e.g. while debugging config or grepping broadly) and end up with secrets/credentials in its context — which could then leak into logs, commit messages, or other output.
- Without denying `git push --force:*`, a force-push (even one nested under the allowed/ask `git push` pattern) could silently overwrite or destroy commits on a shared branch, permanently losing someone else's work with no easy recovery.

## Runtime verification

Confirmed at the start of this session: CLAUDE.md's contents (commands, conventions, architecture) were loaded and shown as project instructions before any task began. `.claude/settings.json` was also inspected directly and contains the expected rules — `allow` for `Bash(npm test:*)`, `ask` for `Bash(git push:*)`, and `deny` for `Read(./.env)` and `Bash(git push --force:*)`. (This was checked by reading the loaded context and the settings file directly, not via the interactive `/memory` or `/permissions` commands, which are run by the human user in the CLI rather than by the assistant.)
