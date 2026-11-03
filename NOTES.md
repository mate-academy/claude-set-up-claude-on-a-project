# Notes: setting up Claude Code on this project

## What's in CLAUDE.md and what I left out

**What I kept:**

- **A one-line description.** It tells Claude this is a small Express REST API in CommonJS with an in-memory store.
- **Commands.** These are the ones I actually run: `dev`, `test`, `lint`, and how to run a single test file or filter tests by name. I also noted that CI runs lint and then tests, so Claude knows both have to pass.
- **Conventions.** Each one is a rule Claude can follow without asking. Use CommonJS, not ES modules (the ESLint config would reject ES modules anyway). Write tests with `node:test` and `supertest` instead of adding Jest. Handlers access data only through `db/store.js`. Error responses use the JSON `{ "error": ... }` shape with 400/404/201. Several of these aren't obvious from a single file, and getting them wrong would break lint or behave differently from the rest of the API.
- **Architecture.** It covers how `server.js` mounts routers and exports `app` (it only calls `listen()` when run directly), the one-router-per-resource layout, and the store. I also included the warning that the store is shared across tests, because that is the kind of thing that leads to flaky tests if Claude assumes a fresh state.
- **"Do not" rules.** Don't read or commit `.env`, and don't commit `.claude/settings.local.json`.

**What I left out:**

- A list of every endpoint and field. Claude can read `routes/` for that, and a copy in CLAUDE.md would go stale.
- Generic advice like "write clean code" or "add tests".
- One-off tasks, the course instructions, and anything from the README that Claude doesn't need for every session.
- Secrets and real config values. CLAUDE.md is committed and loaded into every session, so it only points to `.env.example`.

Keeping the file short means every line gets followed instead of getting lost.

## Permission rules

The rules live in `.claude/settings.json`, which is committed so the whole team shares them.

- **Allow.** These are safe, read-only or check-only commands I run constantly: `npm test`, `node --test`, `npm run lint`, `git status`, `git diff`, `git log`. Allowing them means Claude can check its own work without asking me each time.
- **Ask.** These need my confirmation every time:
  - `git push` and `git commit`, because they change shared history or what goes out.
  - `npm install`, because it changes dependencies and the lockfile.
- **Deny.**
  - Reading, editing, or `cat`-ing `.env`.
  - `git push --force` / `-f`.
  - `git reset --hard`.
  - `rm -rf`.

**What could go wrong without the deny rules:**

- **The `.env` rule:** if Claude read `.env`, the secrets in it would enter the conversation context. From there they could be echoed in output, pasted into a commit or a file, or sent to Anthropic's API as part of the prompt.
- **The force-push and `reset --hard` rules:** these can permanently destroy other people's commits or my uncommitted work with one mistaken command.

Deny rules take precedence over allow and ask, so these are blocked even in a more permissive mode.

## Verification

- **`/memory`:** a fresh session shows the project `CLAUDE.md` as loaded.
- **`/permissions`:** it lists the allow, ask, and deny rules above.
- **Test question:** when I asked "How do I run the tests here?", Claude answered straight from CLAUDE.md. It gave `npm test`, the single-file and name-pattern variants, and the warning about the shared store, without reading any other files.
