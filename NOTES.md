# NOTES

## What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?

**Included:**
- **Commands** — `npm run dev`, `npm test` (+ single-test pattern), `npm run lint`. These are the exact entry points I'd otherwise have to guess or discover by reading `package.json` every session, so they're worth stating up front.
- **Conventions** — one route file per resource in `routes/`, all data access funneled through `db/store.js` (routes never touch the `users` array directly), and the ESLint rule on unused args (`_`, `req`, `res`, `next` are exempt). These are project-specific rules that aren't enforced by the type system and would be easy to violate without being told — e.g. reaching into the store's internal array directly.
- **Architecture** — how `server.js` avoids calling `app.listen` under test (`require.main === module`), that `db/store.js` is a non-persistent in-memory layer, and that `PORT`/no `.env` loading is intentional. These explain *why* the code is shaped the way it is, which isn't obvious from reading `server.js` alone and prevents "fixing" things that aren't broken (e.g. adding a real DB or `.env` loader unprompted).

**Left out, deliberately:**
- **Route-by-route API documentation** (endpoint list, request/response shapes). This is derivable by reading `routes/*.js` directly, and duplicating it in CLAUDE.md means it goes stale the moment a route changes — the code is the source of truth.
- **File/folder structure listing.** Same reason — a directory tree rots as soon as a file is added or renamed, and `ls`/Glob answer this instantly.
- **Git history or "recent changes."** `git log` is authoritative and always current; a static snapshot in CLAUDE.md would just be wrong within a few commits.
- **Deployment/production concerns** (hosting, environment config, secrets management). This is a course-starter project with no real deployment story — inventing one would be speculative and not grounded in the actual repo.

The general rule I followed: put in facts that are either non-derivable from the code (intent, constraints, gotchas) or expensive to rediscover each session; leave out anything that's a direct, cheap read of the current codebase, since that's guaranteed to drift out of sync.

## Which permission rules did you add, and what could go wrong without your deny rule?

From `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm test:*)"],
    "ask": ["Bash(git push:*)"],
    "deny": ["Read(./.env)", "Bash(git push --force:*)"]
  }
}
```

- **`allow: Bash(npm test:*)`** — running the test suite is safe, read-only from the repo's perspective, and something I'd otherwise be prompted for constantly during normal iteration. Auto-allowing it removes friction without adding risk.
- **`ask: Bash(git push:*)`** — pushing affects shared/remote state, so it should require a human in the loop each time rather than being silently allowed.
- **`deny: Read(./.env)`** — blocks reading the environment file outright, even though `ask` would otherwise let a human approve it. Without this deny rule, a prompt could talk me into reading `.env` (directly or via a crafted request), and its contents — API keys, credentials, connection strings — could then end up quoted back in a response, pasted into a commit message, sent to an external tool, or otherwise leaked. Since this project's CLAUDE.md explicitly notes "no `.env` is loaded by the app," there's no legitimate reason for me to ever need its contents, so a hard deny (not just an "ask") is the safer default.
- **`deny: Bash(git push --force:*)`** — force-push rewrites remote history and can silently destroy other people's commits or overwrite work that isn't mine to discard. An `ask` rule would rely on me correctly recognizing every disguised or indirect way a force-push could get invoked; a hard deny removes that judgment call entirely and fails closed instead of open.

Without these two deny rules, the failure mode isn't "Claude behaves maliciously" — it's that a single bad prompt, confused instruction, or my own misjudgment during a multi-step task could leak secrets or destroy remote history, and an `ask` prompt is only as strong as my ability to recognize the risk in the moment. `deny` removes that dependency.
