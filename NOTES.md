# Setup notes

## CLAUDE.md choices

I kept the project description short and documented the commands used repeatedly: development, tests, linting, and production start. The conventions capture decisions that are easy to violate but important to preserve: CommonJS modules, one router per resource, data access through `db/store.js`, API tests through Supertest, and keeping secrets out of source control. I deliberately left out long file inventories, one-off tasks, and details that are already obvious from the code because they would make the file harder to scan and maintain.

## Permission choices

The shared settings allow the safe, repeatable test and lint commands. A normal `git push` requires confirmation because it changes the remote repository. Reading `.env` and force-pushing are denied: without those rules, Claude could expose secrets or rewrite remote history and discard other people's work.

## Verification

The committed configuration is ready for a fresh Claude Code session: `/memory` should list the root `CLAUDE.md`, and `/permissions` should show the allow, ask, and deny rules above. The Claude Code CLI is not available in this environment, so those two interactive checks remain a local verification step after installation and sign-in.

GitHub Actions validates the repository with lint and test checks on every push and pull request.
