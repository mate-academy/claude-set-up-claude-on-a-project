# NOTES

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

I included the things Claude can't reliably infer from a quick scan: a one-line description of the project (minimal Express REST API, in-memory data, no DB), the key commands (`npm install`, `npm run dev`, `npm test`, `npm run lint`), the architecture (`server.js` entry point that exports `app` without binding a port so tests run clean, `routes/` one file per resource, `db/store.js` as the single data-access layer), and the conventions (add a resource by creating `routes/<resource>.js` and mounting it, all data access goes through the store, coerce URL params with `Number()`, return `{ error: "..." }` with the right status code).

I deliberately left out things that are noise or risk: secrets and actual `.env` values (those belong in `.env`, not in a file Claude reads aloud), an exhaustive file-by-file listing (it goes stale and duplicates what the directory already shows), and step-by-step explanations of code Claude can just read. The goal is durable, non-obvious guidance — not a copy of the codebase.

## Which permission rules did you add, and what could go wrong without your deny rule?

- **allow:** `Bash(npm test:*)` and `Bash(npm run lint:*)` — safe, frequently-run commands, so they don't prompt every time.
- **ask:** `Bash(git push:*)` — confirm each push before it goes to the remote.
- **deny:** `Read(./.env)` and `Bash(git push --force:*)`.

Without the deny rules: reading `.env` would expose secrets (API keys, DB credentials) into the conversation, where they could be logged, summarized, or accidentally committed. And `git push --force` could overwrite shared remote history and permanently destroy teammates' commits. Denying both removes the chance of those mistakes happening at all, rather than relying on me to remember to be careful.
