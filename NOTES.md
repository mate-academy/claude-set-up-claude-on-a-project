# NOTES.md

## CLAUDE.md: what's in, what's out, and why

A plain `/init` on a small repo like this tends to produce a longer, more generic
file: a "Project Overview" paragraph restating what's obvious from `package.json`,
a "Getting Started" / install section, a full file-by-file directory listing, and
often a "Testing" section that just repeats the npm script names. It's not wrong,
just padded — every extra section is one more thing Claude re-reads on every turn.

My CLAUDE.md keeps four sections and cuts the rest:

- **Project** — one line of orientation (what this API is, its two resources).
- **Commands** — only `dev` / `test` / `lint`, i.e. the ones actually run day to day.
- **Conventions** — three rules that aren't visible from reading any single file:
  no schema-validation library, `db/store.js` stays synchronous on purpose, and
  the ESLint `no-unused-vars` exception for `req`/`res`/`next`/`_*`. These are the
  kind of thing you'd otherwise "fix" by accident.
- **Architecture** — one line per file explaining *why* it's shaped that way
  (e.g. `server.js` only calls `app.listen()` when run directly, specifically so
  `tests/` can `require()` it against an unopened port).

**Deliberately left out:**
- A directory tree / file listing — `Glob`/`Grep` derive that live and it goes
  stale the moment a file is added.
- Install/setup instructions — one-time, not something Claude needs on every task.
- A restated list of what each npm script "does" — the `package.json` already
  says that; CLAUDE.md only adds the *when do I use this* framing where relevant.
- Anything about git history or who changed what — `git log`/`git blame` are the
  source of truth and drift out of sync with a static doc immediately.

The guiding rule: only put in CLAUDE.md what isn't recoverable by reading the
code, and phrase it as the non-obvious reason, not a restatement of the code.

## Permission rules

Added `.claude/settings.json` (committed, project-level) with:

- **Allow:** `npm test`, `npm run lint`, `npm run dev`, `npm install`, and the
  read/local-write git commands (`status`, `diff`, `log`, `add`, `commit`), plus
  `Read`/`Grep`/`Glob` everywhere. These are the commands actually needed to
  develop and verify changes in this repo, so allowing them removes prompts for
  the routine loop without widening scope beyond it.
- **Deny:**
  - `Read(.env)` — blocks Claude from reading the real secrets file (`.env.example`
    is untouched and still readable, since it's the template with no live values).
  - `git push --force*` / `git reset --hard*` — blocks history-rewriting git ops.
  - `rm -rf *` — blocks recursive force-deletes.

**What could go wrong without the deny rule:** without `Read(.env)` denied,
an "explain the config" or "help me debug the port" prompt could have Claude
read `.env` straight into the conversation transcript — and from there into
logs, shared session exports, or a pasted answer — even though nothing in the
task requires the actual secret value, only that the variable exists. Without
the git/`rm -rf` denies, a misfired refactor or an overly literal reading of an
ambiguous instruction ("clean up this branch") could force-push over shared
history or delete files with no local undo — in a teaching repo, that's a
lost lesson, not just a lost afternoon.
