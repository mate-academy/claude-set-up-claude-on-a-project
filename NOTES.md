# Notes — Claude Code setup

## What went into CLAUDE.md (and what did not)

I kept four lean sections: a one-line project description, the three npm scripts we actually use (`dev`, `test`, `lint`), conventions that are not obvious from a single file (CommonJS, store-only data access, JSON error shape, export-without-listen for tests), and a short architecture map of `server.js` → `routes/` → `db/store.js`.

I left out: anything you can see by opening one file (route paths, seed users), course/README instructions, one-off task notes, and secrets or env values. Those either go stale fast or do not help Claude write correct code.

## Permission rules

- **Allow** `npm test` and `npm run lint` so Claude can verify changes without asking every time.
- **Ask** on `git push` so remotes are never updated silently.
- **Deny** reading `.env` and force-pushes. Without the deny on `.env`, Claude could pull secrets into the session or a commit message; without blocking force-push, a bad recovery command could rewrite shared history on the remote.

## Verification

Claude Code is installed (`claude --version` → 2.1.220). After opening a fresh `claude` session in this repo, run `/memory` to confirm `CLAUDE.md` is loaded and `/permissions` to confirm the allow / ask / deny rules above.
