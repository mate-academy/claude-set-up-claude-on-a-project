# NOTES

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

**Included:**

- **Project purpose**: a small Express API used specifically as a course sandbox for practicing Claude Code setup — with an explicit note that app code isn't meant to change.
- **Commands**: install/dev/start/test/lint, plus how to run a single test file. Also documents that CI runs install → lint → test on Node 22.
- **Architecture**: the request flow (`server.js` → `routes/` → `db/store.js`), the `require.main === module` trick that lets tests import the app without booting a real server, and that the "DB" is in-memory and non-persistent.
- **Conventions**: validation/error handling lives inline in route handlers (no middleware layer), and why ESLint ignores unused `req`/`res`/`next`/`_` args.

**Deliberately left out:**

- No deployment/infra instructions — this is a local training repo, there's nothing to deploy.
- No API endpoint reference/OpenAPI-style docs — the routes are small enough (`users.js`, `health.js`) to read directly; duplicating them in CLAUDE.md would just drift out of sync.
- No "don't do X" behavioral rules — the repo is simple enough that architecture + conventions cover the judgment calls; padding it with generic advice would just be noise Claude has to re-read every time.

## Which permission rules did you add, and what could go wrong without your deny rule?

**`.claude/settings.json`:**

- **allow**: `npm test:*`, `npm run lint:*` — safe, read-only-in-effect, repeatedly-run commands; auto-approving them removes friction without adding risk.
- **ask**: `git push:*` — pushing affects shared state (a remote), so it should always get a human glance even though it's not destructive by itself.
- **deny**: `Read(./.env)` and `git push --force:*`.

**What could go wrong without those deny rules:**

- Without denying `Read(./.env)`: any prompt that gets Claude reading "config" or debugging env issues could pull real secrets (API keys, DB creds) into the conversation transcript — and from there into logs, shared context, or a pasted error message. `.env.example` exists precisely so Claude never needs the real `.env` to understand the shape of the config.
- Without denying `git push --force:*`: a force-push can silently overwrite commits on a shared branch (rewriting history other collaborators have already pulled), causing lost work that's hard to recover. Force-push is rare enough that it doesn't need a fast path — it should always require the user to type it themselves, not have an agent do it as a side effect of "fixing" a push conflict.
