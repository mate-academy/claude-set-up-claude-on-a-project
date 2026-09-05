# NOTES.md

## CLAUDE.md: what's in it, what's left out, and why

I kept CLAUDE.md to four lean sections: a one-line description, Commands,
Conventions, and Architecture.

- **Commands** covers the four scripts I actually run (`npm run dev`,
  `npm test`, running a single test by name, `npm run lint`) — nothing
  Claude could just read from `package.json` on its own wasn't worth
  repeating, but the exact invocations were.
- **Conventions** has three rules grounded in real patterns in the code,
  not generic advice: use CommonJS not ES modules (backed by
  `.eslintrc.json`'s `sourceType: "script"`), return errors as
  `res.status(<code>).json({ error })` rather than throwing (backed by the
  404/400 handling in `routes/users.js`), and only touch user data through
  `db/store.js`'s exported functions, never its internal array directly.
- **Architecture** explains the entry point (`server.js` only calls
  `app.listen()` when run directly, so tests can `require` it), the
  one-route-file-per-resource layout, and the data-access layer.

I deliberately left out: a per-file listing of the repo (that's already
visible from the folder structure and README), generic engineering
best-practices that aren't specific to this codebase, and anything
speculative about future features. Shorter felt stronger — the goal was a
file that saves Claude from re-deriving things by reading every file, not
a restatement of the whole codebase.

## Permission rules

`.claude/settings.json` has:
- **allow**: `Bash(npm test:*)` — a safe, frequent command I don't want to
  confirm every time.
- **ask**: `Bash(git push:*)` — pushing should get a quick confirmation
  since it affects the shared remote.
- **deny**: `Read(./.env)` and `Bash(git push --force:*)` — reading `.env`
  risks leaking secrets into a session or its output, and a force-push can
  silently overwrite or lose commits on the remote branch.

Without the deny rule, an over-eager or misinterpreted instruction could
have Claude read out actual secret values from `.env`, or force-push in a
way that rewrites shared history — both are the kind of mistake you want
blocked outright rather than caught after the fact.
