# NOTES.md

## CLAUDE.md — what I kept and what I left out

**Kept:**
- A one-line description of the project.
- The three commands I actually run (`dev`, `test`, `lint`), plus the one non-obvious gotcha: the scripts need Node 18+, and fail confusingly on older Node. That single line saves a real debugging session.
- Conventions Claude can't infer safely on its own: CommonJS not ESM (the ESLint config enforces `sourceType: "script"`), one route file per resource, and all data access routed through `db/store.js`. These are the rules most likely to be violated by a well-meaning edit.
- A short architecture note explaining the `server.js` → `routes/` → `db/store.js` layering and the `require.main === module` guard that lets tests import the app without opening a port.

**Left out:**
- Anything obvious from reading the code (endpoint list, Express boilerplate, file names).
- One-off setup steps (`git clone`, `npm install`) — they belong in the README, not in per-session context.
- Secrets and env values — `.env` stays git-ignored and is never described here.

The goal was that every line earns its place: if Claude could figure it out by opening the file, it didn't go in.

## Permission rules

- **allow** `npm test`, `npm run lint`, `npm run dev` — safe, frequent, read-only-ish commands I don't want to approve each time.
- **ask** `git push` — I want a beat to confirm before publishing anything.
- **deny** `Read(./.env)`, `git push --force` / `-f` — the env file may hold real secrets that shouldn't enter the model's context, and a force-push can silently overwrite shared history.

**What could go wrong without the deny rules:** without `Read(./.env)` denied, a routine "what config does this use?" question could pull real credentials into the transcript. Without the force-push deny, an automated cleanup could rewrite `main` and destroy a teammate's commits with no easy undo. The deny list makes those two irreversible mistakes impossible rather than merely discouraged.

## Verification

- `/memory` shows this `CLAUDE.md` loaded at the project root.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" is answered from `CLAUDE.md` (`npm test`) without further explanation.
