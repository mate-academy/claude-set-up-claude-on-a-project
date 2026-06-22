# Notes — Setting Claude up on this project

## What I put in CLAUDE.md

The project `CLAUDE.md` describes a small in-memory Express JSON REST API. I included:

- **A one-line summary** of what the app is (Express JSON API for users + health, in-memory storage).
- **Commands** — the things Claude can't guess reliably: `npm run dev`, `npm test`, `npm run lint`, and how to run a single test file.
- **Conventions** — the project-specific rules that aren't obvious from the code:
  - go through `db/store.js`, never touch the `users` array directly
  - HTTP logic (validation, status codes, `400`/`404`) lives in the route, not the store
  - test by importing `app` with `supertest`, don't start a real server
  - use CommonJS `require`/`module.exports`, not ES `import`
- **Architecture** — how the pieces fit: `server.js` entry point that only `listen()`s when run directly, one router per resource in `routes/`, and `db/store.js` as the in-memory data owner.

## What I left out, and why

- **Full API endpoint docs / request-response examples** — that already lives in `README.md`, and Claude can read the route files. CLAUDE.md is for guidance, not a duplicate of the docs.
- **A file-by-file walkthrough** — Claude can read the tree itself. I only documented the non-obvious rules (e.g. "don't bypass the store").
- **Install / Node version / generic git instructions** — generic stuff Claude already knows; CLAUDE.md should hold what's *specific* to this repo.
- **Secrets / env values** — those belong in `.env` (gitignored), never in a committed guidance file.

The guiding idea: include what's surprising or project-specific; leave out what's discoverable or generic.

## Which permission I added

In the global `~/.claude/settings.json`:

- **Allow:** `Bash(npm test:*)` — so the test suite can run without prompting every time.
- **Ask:** `Bash(git push:*)` — pause and confirm before any push.
- **Deny:** `Read(./.env)` and `Bash(git push --force:*)` — block reading the secrets file and block force-pushes outright.

## What could go wrong with the deny rule

The deny rule `Read(./.env)` is narrower than it looks and can give a false sense of security:

- **It only matches that exact path via the Read tool.** It does **not** stop the file being read through Bash — `cat .env`, `grep`, `env`, or a script that prints it would all sidestep it. (The separate `Bash(git push --force:*)` deny is more robust because it targets the command form.)
- **It doesn't cover sibling secret files** — `.env.local`, `.env.production`, `.env.*`, or `.env` reached by a different relative/absolute path. A pattern like `Read(.env*)` (and a matching Bash deny) would be safer.
- **Secrets can still leak indirectly** — if the app loads `.env` and logs config, or a test prints `process.env`, the values can surface in tool output even though the file itself was never "read."
- **Deny is a guardrail, not a guarantee.** The real protection is keeping `.env` out of git (`.gitignore`) and not putting real secrets in the repo at all. Treat the deny rule as defense-in-depth, not the primary control.
