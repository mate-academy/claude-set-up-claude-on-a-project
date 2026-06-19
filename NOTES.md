# Notes

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

**What's in it:**

- **Project summary** — one sentence describing what the app is (Express REST API, `/users` and `/health`, in-memory store). This orients Claude instantly without it having to infer purpose from filenames.
- **Commands** — the three npm scripts Claude will most commonly need (`dev`, `test`, `lint`). Having these here means Claude doesn't have to read `package.json` to know how to run things.
- **Architecture** — the role of `server.js`, `routes/`, and `db/store.js`. The key insight documented is that `server.js` exports `app` without binding a port, which is a non-obvious design decision that enables tests to import it directly.
- **Conventions** — CommonJS over ES modules, and the JSON error object shape. These are the two things most likely to cause silent divergence if Claude defaults to its own preferences (ES modules are increasingly common; plain string errors are tempting shortcuts).

**What's deliberately left out:**

- **File listings and dependency lists** — Claude can read `package.json` and `ls` the directory. Duplicating that here would rot as the project evolves.
- **How the API works** — route signatures, response shapes, validation rules — all of that is readable directly from the route files. Documenting it in CLAUDE.md would create a second source of truth.
- **Git workflow / PR process** — no team conventions exist yet for this project, so inventing them would be noise.
- **Comments explaining the architecture choices** — CLAUDE.md tells Claude *what* the conventions are, not *why* they were chosen. The why belongs in commit messages or a separate ADR if it ever matters.

The guiding principle: CLAUDE.md should only contain things that are non-obvious from reading the code and that Claude would need to know *before* it starts making changes.

---

## Which permission rules did you add, and what could go wrong without your deny rule?

**Allow rules** (no prompt, runs immediately):
- `Bash(npm test:*)` — Claude can run tests freely without interrupting the developer.
- `Bash(npm run lint:*)` — same rationale; safe read-only check.
- `Bash(npm run dev:*)` — Claude can start the dev server to verify changes.

**Ask rule** (requires confirmation):
- `Bash(git push:*)` — pushing to a remote is visible to others and hard to undo cleanly. Requiring a confirmation step means Claude can never silently push code mid-task.

**Deny rules** (blocked outright):
- `Read(./.env)` — prevents Claude from reading the `.env` file, which may contain secrets like API keys, database credentials, or tokens. Without this rule, Claude could inadvertently include secret values in responses, logs, or generated code, leaking them into the conversation context or any downstream system (logs, telemetry, third-party tools). The deny is unconditional because there is no legitimate reason for Claude to read raw secrets — it should work with environment variable *names*, not their values.
- `Bash(git push --force:*)` — force-pushing can silently overwrite remote history, destroying commits that teammates or CI may have already built on. Even with the `git push` ask rule in place, a force push is dangerous enough to warrant a hard block rather than just a prompt.
