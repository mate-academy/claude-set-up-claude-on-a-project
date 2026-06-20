# Notes

## What went into CLAUDE.md — and what was left out

### What was included

**Commands** (`npm run dev`, `npm test`, `npm run lint`, single-file test command)
Claude cannot guess your exact npm scripts. Telling it the commands upfront means it never has to ask or guess wrong.

**Architecture overview** (which files do what: `server.js`, `routes/`, `db/store.js`, `tests/`)
This saves Claude from reading every file just to understand the structure. A short map lets it jump straight to the right file.

**Conventions** (store-only data access, required fields, 400 on missing fields, `.env` is git-ignored)
These are team rules that are not obvious from reading the code alone. Claude needs them to write new code that fits in — not just code that works.

### What was deliberately left out

**The actual code logic** — Claude can read the source files itself. Repeating code in CLAUDE.md would go stale the moment someone edits a file.

**npm dependencies** — they are already in `package.json`. No need to duplicate.

**How Express works** — Claude already knows Express. CLAUDE.md should only teach Claude things that are *specific to this project*.

**Git history / recent changes** — `git log` is the source of truth for that. Memory notes are not.

> Rule of thumb: if Claude could figure it out by reading a file, don't put it in CLAUDE.md. Only write things Claude cannot discover on its own.

---

## Permission rules — and why the deny rule matters

### What permission rules do

Claude Code can run shell commands on your machine. Permission rules in `.claude/settings.json` control which commands Claude is allowed to run automatically (without asking you first) and which are always blocked.

A typical setup looks like this:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npm test)",
      "Bash(npm run lint)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  }
}
```

### What the allow rules do

They let Claude run safe, read-only or reversible project commands (start the server, run tests, lint) without interrupting you for approval every time. This makes the workflow smooth.

### What could go wrong without a deny rule

Without a deny rule, Claude could — if confused or given a bad prompt — run a destructive shell command like:

- `rm -rf node_modules` or worse, `rm -rf *` (deletes files permanently)
- `git reset --hard` (throws away all uncommitted work)
- `git push --force` (overwrites history on the remote)

These commands are hard or impossible to undo. A deny rule is a safety net: even if Claude decides a command seems helpful, the rule blocks it before any damage is done.

> Think of allow rules as "Claude can do this without asking" and deny rules as "Claude must NEVER do this, no matter what."
