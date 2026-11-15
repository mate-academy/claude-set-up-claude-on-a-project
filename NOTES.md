# NOTES

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

**Included:**

- A one-line project summary: an Express API with users and health endpoints, backed by an in-memory store.
- **Commands:** `npm run dev`, `npm test` (plus how to run a single test file) and `npm run lint`. It also notes that CI runs lint and then tests, so both must pass.
- **Conventions:** CommonJS (`require` / `module.exports`), tests written with `node:test` + `supertest`, and errors returned as `res.status(code).json({ error: "message" })`.
- **Architecture:**
  - `server.js` exports `app` and calls `listen` only when run directly.
  - There is one router file per resource in `routes/`.
  - Routes reach data only through `db/store.js`.

**Deliberately left out:**

- Anything Claude can learn by reading the code or `package.json`, such as the full file tree, dependency lists and what each endpoint does.
- Generic advice such as "write clean code" or "add comments".
- Long explanations and tutorials.
- Secrets and personal details.

**Why:** CLAUDE.md is loaded into context every session, so each line costs attention. It should hold only what Claude can't infer and would otherwise get wrong: the exact commands, the project's non-obvious rules, and the guard in `server.js` that tests depend on. A short, specific file is more likely to be followed than a long, generic one.

## Which permission rules did you add, and what could go wrong without your deny rule?

**Rules added in `.claude/settings.json`:**

- **allow:** `Bash(npm test:*)`. Claude can run the tests without prompting, since this is safe and frequent.
- **ask:** `Bash(git push:*)`. Claude must get my confirmation before any push.
- **deny:**
  - `Read(./.env)` blocks Claude from reading the `.env` file.
  - `Bash(git push --force:*)` blocks force pushes.

**What could go wrong without the deny rules:**

- **Without `Read(./.env)`:** Claude could read secrets such as API keys, database passwords and tokens. That content would enter the conversation context and be sent to the model provider. It could also end up in logs, generated code, commit messages or pasted output, and so leak.
- **Without `Bash(git push --force:*)`:** a force push can overwrite the remote history. Teammates' commits could be lost, and a shared branch such as `main` could be rewritten. CI and open PRs could break too. An ordinary `ask` prompt can be approved by accident, but a deny rule can't be overridden.
