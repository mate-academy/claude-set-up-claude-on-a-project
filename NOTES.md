# NOTES

## CLAUDE.md

I kept the file to four lean sections: a one-line description, the three commands worth running often (`dev`, `test`, `lint`), the conventions that aren't obvious from a single glance at the code, and a short architecture map.

The conventions are the part that earns its place: the project uses CommonJS with `"sourceType": "script"`, so Claude must not reach for `import`/`export`; strings are double-quoted; and all data access goes through `db/store.js` rather than touching the in-memory array directly. These are real "do X, not Y" rules Claude can follow without asking.

I deliberately left out anything the code already says plainly (the full route list, every function signature), one-off setup notes, and anything sensitive. There are no secrets in the file — the only config is `PORT`, and real secrets would live in a git-ignored `.env`. Shorter is stronger, so I cut everything that didn't change how Claude would act.

## Permissions

`.claude/settings.json` (committed, so the rules are shared) has:

- **allow** — `npm test` and `npm run lint`. These are safe, read-only-ish commands I run constantly, so prompting for them every time is pure friction.
- **ask** — `git push`. Pushing is outward-facing and worth a deliberate confirmation each time.
- **deny** — reading `.env` (keeps real secrets out of the context window), `git push --force` (can overwrite shared history), and `rm -rf` (destructive).

Without the `Read(./.env)` deny rule, Claude could pull real secrets into its context — and from there into a commit, a log, or a message — simply by reading a file that looks routine. The deny rule makes that mistake impossible rather than relying on good judgment. The `git push --force` and `rm -rf` deny rules similarly block the two changes that are hardest to undo.

Personal overrides stay in `.claude/settings.local.json`, which `.gitignore` already excludes.

## Verification

- `claude --version` → `2.1.195 (Claude Code)` (installed and signed in).
- `/memory` lists this project's `CLAUDE.md` as a loaded source.
- `/permissions` shows the allow / ask / deny rules above.
- Asking "How do I run the tests here?" returns `npm test` straight from `CLAUDE.md`, with no extra explanation from me.
