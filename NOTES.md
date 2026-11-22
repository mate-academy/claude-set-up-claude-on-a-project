# Notes

## What is in CLAUDE.md, and what is left out

I started from `/init` and cut the draft down to four parts: a one-line description, Commands, Conventions and Architecture.

- **Commands** include the traps you would otherwise hit. `PORT` is read only from the shell because nothing loads `.env`. There is a way to run a single test by name, and "green" means exactly what CI runs.
- **Conventions** are rules that no single file reveals:
  - CommonJS, because ESLint uses `sourceType: "script"`.
  - Data access only through `db/store.js`.
  - Error bodies shaped `{ error }`, with `400` for bad input and `404` for unknown ids.
  - `Number(req.params.id)`, because the store compares ids with `===`.
  - Tests use `supertest` against the exported `app` and never call `listen()`.
- **Architecture** covers how `server.js` mounts one router per resource, where a new resource goes, and that the in-memory store is shared by all tests in a file.

I deliberately left out a file-by-file listing and the dependency list, because Claude can read `package.json` and the tree itself. I also left out generic advice ("write clean code"), the setup steps already in the README, anything from `.env` or `.env.example`, and one-off tasks. `CLAUDE.md` is loaded into every session, so each extra line costs context and dilutes the rules that matter.

## Permission rules

- **Allow `Bash(npm test)`**: runs the local test suite only, has no side effects and is needed constantly, so it should not prompt.
- **Ask `Bash(git switch *)`**: switching branches swaps the working tree under Claude, so I want to confirm each time.
- **Deny `Read(./.env)`**: `.env` is where real secrets live, such as API keys and database credentials. Without this rule, Claude could read the file while exploring the configuration. Its contents would then be in the conversation sent to the model, and could end up in code, logs or commits. The rule also covers shell reads Claude Code can parse, such as `cat .env`. It does not cover a script that opens the file itself.

The repo's `.gitignore` had leading spaces in front of `.env`, `npm-debug.log*` and `.claude/settings.local.json`. Git treats those spaces as part of the pattern, so none of the three files was actually ignored. I removed the spaces so that `.env` cannot be committed by accident.

## Verification

In a fresh session, `/memory` showed the project `CLAUDE.md` as loaded, and `/permissions` listed the allow, ask and deny rules above.
