# NOTES

## CLAUDE.md: what's in, what's out

I kept four short sections: a one-line description, the commands I actually run (`dev`, `test`, a single-test command, `lint`), conventions, and architecture. The conventions are written as "X, not Y" rules (CommonJS not ESM, `node:test` + supertest not Jest, data only through `db/store.js`) so Claude can follow them without asking. The architecture section covers things you only learn by reading several files together: `server.js` exports `app` and only listens when run directly, and the in-memory store is shared across tests, so creating users in one test affects the next.

I deliberately left out the file tree, the endpoint list, and generic advice like "write good tests". Claude can discover those itself, and every extra line dilutes the rules that matter. I also left out anything secret or one-off: no `.env` values and no course task instructions.

## Permission rules

- **Allow:** `npm test`, `npm run lint`, `node --test`. These are safe, read-only checks I run constantly, so prompting for them is just friction.
- **Ask:** `git push`. Pushing publishes work outside my machine, so I want to confirm each time.
- **Deny:** reading or editing `./.env`, and `git push --force` / `-f`.

Without the `.env` deny rule, Claude could read real secrets (database passwords, API keys) into the conversation while exploring the project, and from there they could leak into output, logs, or a commit. Without the force-push deny, a single mistaken command could overwrite the remote branch and destroy other people's commits. The deny rules take precedence over the `git push` ask rule, so a force-push is blocked outright instead of being one click away.

## Found along the way: `.gitignore` doesn't ignore `.env`

Every line after `node_modules/` in `.gitignore` starts with spaces, and git treats leading spaces as part of the pattern. So `   .env` matches nothing, and `git check-ignore .env` confirms `.env` is **not** ignored (same for `.claude/settings.local.json`). A real `.env` could be committed by accident, which is exactly what the README says `.gitignore` prevents. The fix is removing the leading spaces. I kept it out of this PR to stay within the three intended files, and protected my own clone with `.git/info/exclude` instead. It's worth a separate fix upstream.

## Verification

- `/memory`: the project `CLAUDE.md` shows as loaded.
- `/permissions`: the allow / ask / deny rules above are listed.
