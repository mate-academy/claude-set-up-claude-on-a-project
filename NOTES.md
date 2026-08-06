# Notes

## CLAUDE.md — what I kept and what I cut

I kept the things Claude can't easily infer or that save real time:

- a one-line description of what the project is
- **Commands** — `npm run dev`, `npm test`, `npm run lint`, plus how to run a single
  test file (`node --test tests/users.test.js`), since the project uses Node's built-in
  test runner rather than a framework with obvious single-test syntax
- **Conventions** — the non-obvious rules: CommonJS only (ESLint is set to
  `sourceType: "script"`, so `import` breaks), double quotes, one router per resource
  mounted in `server.js`, and data access only through `db/store.js`
- **Architecture** — how `server.js`, `routes/`, and `db/store.js` fit together, and
  why the `require.main === module` guard / `app` export must stay (tests depend on it)

I deliberately left out anything discoverable or noise: the full file tree (a quick `ls`
shows it), generic Node/Express explanations, one-off task notes, and anything sensitive.
Shorter file = stronger signal.

## Permission rules

`.claude/settings.json`:

- **allow** — `npm test`, `npm run lint`, `npm run dev`. These are safe, read-only-ish
  commands I run constantly; allowing them removes repeated approval prompts.
- **ask** — `git push`. It publishes work outward, so I want to confirm each time.
- **deny** — `Read(./.env)` and `git push --force`.

What could go wrong without the deny rules: without denying `Read(./.env)`, Claude could
read real secrets out of `.env` (it's git-ignored but still present locally) and they
could end up in the transcript. Without denying `git push --force`, an automated push
could overwrite shared branch history and erase others' commits. The `ask` rule on plain
`git push` is the softer guard for ordinary pushes.

`.claude/settings.local.json` is already git-ignored, so this shared `settings.json` is
safe to commit; personal overrides stay local.

## Verification

In a fresh session, `/memory` shows `CLAUDE.md` loaded and `/permissions` shows the
allow / ask / deny rules above.
