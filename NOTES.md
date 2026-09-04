# NOTES.md

## CLAUDE.md — what I kept and what I left out

**Kept.** A one-line description of the project, the commands I actually run in this
repo (`npm run dev`, `npm test`, the single-file test `node --test tests/users.test.js`,
`npm run lint`), a short set of conventions, and a big-picture architecture note.

The conventions are the rules Claude can't infer safely on its own or would get wrong:
CommonJS instead of ES modules (the ESLint config uses `sourceType: "script"`), the
existing quote/semicolon style, that route handlers must go through `db/store.js`
rather than touch data directly, how a new resource is added (`routes/` file + mount
in `server.js`), and that `server.js` has to keep exporting `app` and only call
`app.listen` under `require.main === module` so the tests can import it.

The architecture section explains the parts you only understand by reading several
files together: `server.js` as the single entry point, one router per resource,
`db/store.js` as the only module that holds data, and how the tests drive the
exported `app`.

**Left out.** The `# CLAUDE.md` boilerplate header (I removed it on purpose — it adds
no guidance). A file-by-file listing of the repo, which Claude can discover instantly.
Generic advice ("write tests", "handle errors"). The course task steps from the
README — those are one-off instructions, not standing project rules. Anything
sensitive: no `.env` contents, no secrets, no pasted long documents.

## Permission rules

`.claude/settings.json`:

- **allow:** `Bash(npm test:*)`, `Bash(npm run lint:*)`, `Bash(node --test:*)` —
  safe, read-only commands I run constantly in this project, so Claude shouldn't
  stop to ask each time.
- **ask:** `Bash(git push:*)` — an outward-facing network action; I want to confirm
  every push before anything reaches the remote.
- **deny:** `Read(./.env)`, `Bash(git push --force:*)`, `Bash(git push --force-with-lease:*)`.

**What could go wrong without the deny rules.** Without `Read(./.env)`, Claude could
open the real `.env` while exploring the repo and pull secrets (a real
`DATABASE_URL`, API keys) straight into the conversation context, where they could
leak into a later message, a commit, or a bug report. Without the force-push denies,
a single `git push --force` could rewrite or wipe shared history on the remote —
work that is hard or impossible to recover.

## Verification

- `/memory` lists `./CLAUDE.md` as a loaded project memory file.
- `/permissions` shows the allow / ask / deny rules above.
- Asked "How do I run the tests here?" in a session and Claude answered with
  `npm test` and the single-file command straight from `CLAUDE.md`, without me
  explaining anything.
