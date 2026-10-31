# NOTES.md

## CLAUDE.md choices

**Kept:**
- The four npm scripts and how to run a single test file — these are the commands you reach for constantly and aren't obvious from `package.json` alone (e.g. the single-file test invocation).
- The `server.js` export pattern — the fact that `app` is exported without calling `listen` is a subtle invariant that affects how tests work; it would surprise a reader who only looked at a route file.
- The three-layer architecture (`server.js` → `routes/` → `db/store.js`) and the rule that all data access flows through `db/store.js` — this is a constraint Claude needs to follow when adding features.
- CommonJS-only convention — the ESLint config enforces `sourceType: "script"`, so using `import`/`export` would silently break linting.

**Left out:**
- File-by-file descriptions — the directory tree is self-evident.
- The in-memory reset behaviour of `db/store.js` — it's documented in a comment in the file itself.
- Anything from `.env.example` — no real config decisions are made there yet.

## Permission rules

**Allow** — `npm test`, `npm run lint`, `npm run dev`, `npm install` run without a prompt. These are read-only or purely local and safe to run freely.

**Ask** — `git push` pauses for confirmation. Pushing to a shared remote is visible to others and hard to undo cleanly; one confirmation step is worth it.

**Deny** — `Read(./.env)` and `git push --force`.

Without the `.env` deny rule, Claude could read the file and inadvertently include a secret value in a response or a generated file. The file is git-ignored, but that only keeps it out of commits — it doesn't stop a tool call from opening it.

Without the force-push deny rule, a misguided `git push --force` could overwrite teammates' commits on a shared branch with no recovery path short of reflog surgery.
