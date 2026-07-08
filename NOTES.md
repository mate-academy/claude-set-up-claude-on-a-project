# NOTES.md

## CLAUDE.md Design

### What I included

- **Project overview**: One sentence on what it does (Express API with in-memory store) and key constraint (no persistence)
- **Commands**: The three npm scripts that are run regularly (dev, test, lint) with brief descriptions
- **Conventions**: Two essential patterns—one file per resource in `routes/`, all data through `db/store.js`—phrased as guidance Claude can follow without asking
- **Architecture**: Minimal mental model (server mounts routers, tests use supertest without a port) to explain why things are structured as they are

### What I deliberately left out, and why

- **Route handler details** (how GET vs POST work, parameter handling): Obvious from reading `routes/users.js`; future Claude can infer the pattern
- **Express middleware** (express.json setup): Obvious from `server.js`; not guidance, just implementation
- **Step-by-step "how to add a route"**: Implied by the conventions; overly detailed for a file that should stay short
- **Test framework details** (assert patterns, supertest methods): Tests teach by example; no need to document
- **Dependency versions, ESLint rules, .env structure**: Can be read directly; not guidance

**Why:** The README says "shorter is stronger" and "cut anything obvious from the code." The CLAUDE.md should guide Claude on *what to do*, not describe *what's already there*. Future Claude can read the code for implementation details.

---

## Permission Rules

### Allow rules added

- `npm run dev:*` — starts the dev server; safe and frequently needed
- `npm run lint:*` — runs ESLint; safe, read-only check
- `npm install:*` — installs/updates dependencies; needed for project setup

### Deny rules added

**`git reset --hard:*`**
- Without this: Claude could discard commits you wanted to keep, losing work or forcing you to recover from git history
- Risk is high because hard reset is permanent and affects your branch history

**`git checkout -- .:*`**
- Without this: Claude could discard all unstaged changes in the working directory, wiping out edits you haven't committed
- Risk is high because it loses work with no undo

**`rm -rf:*`**
- Without this: Claude could delete files or entire directories, potentially destroying project structure or user-created work
- Risk is catastrophic because it's unrecoverable without backups

### Ask rule kept

`git push:*` stays in ask—you want to see what's being pushed to the remote before it goes up, but it's not dangerous enough to block entirely.

---

## Verification

Confirmed setup is working:
- `/memory` shows CLAUDE.md loaded and available to Claude
- `/permissions` shows all allow/ask/deny rules are active
