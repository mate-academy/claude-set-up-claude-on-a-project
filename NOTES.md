# CLAUDE.md — Decisions and Permissions

## What went into CLAUDE.md

### Commands
The three scripts you'll actually use during development: `npm run dev` (live-reload server), `npm test` (full test suite), and `npm run lint`. Also included the single-file test invocation (`node --test tests/users.test.js`) because the Node built-in runner doesn't have an obvious flag for this and it's easy to forget.

### Architecture
Three structural facts Claude can't reliably infer from file names alone:
- `server.js` exports `app` without calling `.listen()` — this is the non-obvious reason tests can import it safely.
- Routes are Express Routers in `routes/`, one file per resource.
- All data access goes through `db/store.js` — this is a convention constraint, not just a description.

### Conventions
The things most likely to cause a mismatch if Claude ignores them: CommonJS (not ESM), the specific ESLint rule about unused args, how route handlers should signal errors (JSON `{ error: "..." }` with appropriate status), and the pattern for adding new resources.

---

## What was left out and why

**`npm start`** — present in package.json but omitted. It just runs `node server.js` with no watch mode; `npm run dev` is strictly better for development and the distinction isn't worth explaining.

**Dependencies** — express, eslint, supertest are visible in package.json. Restating them in CLAUDE.md would create a second source of truth to keep in sync with no benefit.

**Test file contents** — `tests/users.test.js` describes itself. Summarizing what it tests would go stale as the tests evolve.

**The `:q` typo** — there's a stray `:q` on the last line of the Conventions section (a leaked vim command). It doesn't break anything but should be cleaned up.

---

## Permission rules added

### Allow: `npm test`
Added globally so Claude can run the test suite without prompting. Running tests is a read-only, low-risk operation that Claude does constantly when verifying changes. Requiring approval each time would make the workflow painful with no meaningful security benefit.

### Deny: `Read(./.env)` (project-level)
Blocks Claude from reading `.env` in this project directory.

**What could go wrong without this rule:** A `.env` file typically holds secrets — API keys, database credentials, JWT signing keys. Without the deny rule, Claude could read those values and then:
- Echo them back in a response visible in the terminal
- Include them in a commit message or code comment
- Pass them to a web fetch or other tool call
- Expose them in debug output or error messages

The deny rule is defense-in-depth. Even if you trust Claude's intent, mistakes happen — a rule that prevents the read entirely is safer than relying on Claude to handle secrets correctly every time. It also applies to any subagents or forked processes Claude might spawn during a task.
