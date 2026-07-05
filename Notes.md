# Notes

## What did you put in your CLAUDE.md, and what did you deliberately leave out?

### What's in it

**Commands** — the four npm scripts (`dev`, `test`, `lint`, `start`) with their purpose and the local URL for the dev server. Claude needs these to run the project without guessing.

**Architecture** — entry point (`server.js`), the two-layer structure (`routes/` + `db/store.js`), and the public API of the store (`getAllUsers`, `getUserById`, `createUser`). This tells Claude where to look and how data flows without it having to trace every file.

**Data model** — in-memory only, resets on restart, two seed users. Prevents Claude from suggesting persistence solutions that don't fit the project's intentional simplicity.

**Conventions** — CommonJS (no ES modules), HTTP status codes (`201`, `400`, `404`), ESLint rules (especially the `_`-prefix exception for unused vars), and the CI setup. These are the non-obvious rules Claude would otherwise violate silently.

### What was deliberately left out

- **Implementation details** (actual code, function bodies, SQL queries) — Claude can read the source files directly; duplicating code in CLAUDE.md would go stale immediately.
- **Git history and recent changes** — `git log` is the authoritative source; a static summary in CLAUDE.md would be outdated within days.
- **Environment variables / secrets** — they don't belong in a checked-in markdown file.
- **Deployment or infrastructure config** — this is a learning project with no production deployment; adding it would create noise with no benefit.
- **Detailed test mechanics** — the fact that supertest is used against the app without starting a real server is mentioned, but the full test API is not documented because Claude can read `tests/users.test.js` directly.

The guiding principle: CLAUDE.md should capture the *why* and the *non-obvious constraints*, not repeat what is already plainly visible in the code.

---

## Which permission rules did you add, and what could go wrong without your deny rule?

### Rules configured in `.claude/settings.json`

| Type | Rule |
|------|------|
| **allow** | Run `npm` commands without asking |
| **deny** | Access `.env` to read private API keys |
| **deny** | Use `--force-with-lease` to push to the repo |
| **ask** | Always ask before running `git push` |

### What could go wrong without the deny rules

**Without the `.env` deny rule**
Claude could silently read the `.env` file while debugging or exploring configuration. Any secrets stored there — API keys, database credentials, tokens — would land in the conversation context and potentially in logs or transcripts. This is a data-exposure risk even if Claude never explicitly "leaks" them.

**Without the `--force-with-lease` deny rule**
`git push --force-with-lease` rewrites remote history. Without this rule, Claude could overwrite commits that teammates have already pushed or pulled, destroying work that cannot be recovered from a standard `git pull`. The `ask` rule on plain `git push` adds a confirmation gate for normal pushes, but a force-push bypasses that intent entirely — which is exactly why it needs a hard deny rather than just an ask.
