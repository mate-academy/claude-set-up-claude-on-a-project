# NOTES.md

**1. What's in CLAUDE.md**

I wrote `CLAUDE.md` with a one-sentence project description ("a small Express API that manages users, with a health-check endpoint"), the everyday commands (install, dev, test, lint), four actionable conventions (one router module per resource mounted in `server.js`, all data access through `db/store.js`, `app.listen()` behind the `require.main === module` guard, and endpoint tests written with `node:test` and `supertest`), and a concise architecture summary covering `server.js`, `routes/`, `db/store.js`, and `tests/`.

**2. What I left out, and why**

I deliberately left out one-off assignment instructions, secrets, long pasted documentation, and details that are obvious from reading the code. I did this because `CLAUDE.md` should stay concise and useful in future sessions, not become a dumping ground for things that are either temporary, sensitive, or already discoverable by reading the codebase.

**3. Permissions I configured**

I set `npm test` (and `npm test` with arguments) to be allowed automatically. I set `git push` (bare and with arguments) to always require my confirmation. I denied reading `.env`. I denied both the long-form (`--force`) and short-form (`-f`) versions of `git push`, in any argument position.

**4. Why those deny rules matter**

Without the `.env` deny rule, secrets could be pulled into Claude's context just by it reading a file. Without the force-push deny rules, repository history could be overwritten, since a force push can silently discard commits on the remote.

**5. Verifying it worked**

I started a fresh session and confirmed `./CLAUDE.md` showed up as loaded in `/memory`, and that `/permissions` displayed the allow, ask, and deny rules exactly as configured.
