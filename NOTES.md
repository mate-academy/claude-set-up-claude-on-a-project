# Notes: setting up Claude Code on this project

## What's in CLAUDE.md, and what I left out

I started from `/init` and trimmed. What's left is what Claude can't easily infer and would otherwise get wrong:

- the commands, including how to run a single test or a name-filtered test with `node --test`
- conventions the code follows but doesn't spell out: CommonJS rather than ES modules, `node:test` + `supertest` rather than Jest, data access only through `db/store.js`, and the `{ error }` + 400/404/201 response shape
- the architecture points that need several files to understand: `server.js` exports `app` and only listens when run directly (that's what lets tests import it), there's one router per resource, and the store is shared in-memory state that resets on restart

I cut these:

- the lint rule for unused `req`/`res`/`next` arguments, because ESLint enforces it already
- the CI file path, which is easy to find
- a file-by-file listing of the repo
- anything about secrets beyond one line saying `.env` is off-limits, because the deny rule below enforces that

Each line has to change what Claude does. Otherwise it only costs context.

## Permission rules

- **Allow:** `npm test`. It runs often, can't damage anything, and Claude needs it to check its own work without prompting me each time.
- **Ask:** `git push`. Pushing publishes my work, so I want to approve each one.
- **Deny:** reading `./.env`.

Without the `.env` deny rule, Claude could read real secrets into the conversation, for example while debugging config, and they could end up in output or a commit. The risk is higher in this repo because the `.gitignore` lines after the first one start with spaces. Git treats those spaces as part of the pattern, so `.env` and `.claude/settings.local.json` aren't actually ignored (`git check-ignore` confirms this).

## Verification

- `/memory` shows `CLAUDE.md` loaded from the project root.
- `/permissions` lists the allow, ask and deny rules above.
- In a fresh session, "How do I run the tests here?" is answered from `CLAUDE.md`.

## Claude's summary: the `API_NAME` change

Claude made a small change across four files so the API's name can be configured:

- `routes/health.js`: `GET /health` returns `{ status: "ok", name: API_NAME }`, with `"users-api"` as the default
- `server.js`: the startup log prints the name, e.g. `users-api listening on http://localhost:3000`
- `tests/users.test.js`: the health test also checks that `name` is a string
- `.env.example`: documents `API_NAME`. This is the easy-to-forget edit: the code works without it because of the default, but nobody setting up `.env` would learn the variable exists.

Before reviewing the diff, Claude wrote a prediction of what I'd changed (`notes-prediction.md`). The prediction was wrong: the diff was exactly Claude's edit, with nothing added by me. Two things looked unintended:

- the `process.env.API_NAME || "users-api"` default appears in both `server.js` and `routes/health.js`, so the two could drift apart
- lint and tests weren't run, because Node/npm wasn't on the PATH in Claude's shell
